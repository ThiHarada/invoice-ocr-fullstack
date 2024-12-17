"use server"

import { redirect } from "next/navigation";
import { API_URL } from "./constants";
import { FormState, LoginFormSchema, SignUpFormSchema } from "./type";
import { createSession, updateTokens } from "./session";

export async function signup(state: FormState, formData:FormData): Promise<FormState> {
    const validationFields = SignUpFormSchema.safeParse({
         username: formData.get("username"),
         password: formData.get("password")
    });

    if(!validationFields.success){
        return{
            error: validationFields.error.flatten().fieldErrors,
        }
    }

    const res = await fetch(`${API_URL}/auth/signup`, {
        method: 'POST',
        headers: {
            "Content-type" : "application/json",
        },
        body: JSON.stringify(validationFields.data),
    });

    if(res.ok){
        redirect("/auth/signin");
    }
    else{
        return{
            message: res.status === 409 ? "This user already exists" : res.statusText
        }
    }
}

export async function signIn(state:FormState, formData:FormData): Promise<FormState> {
    const validationFields = LoginFormSchema.safeParse({
        username: formData.get("username"),
        password: formData.get("password")
    })

    if(!validationFields.success) return {
        error: validationFields.error.flatten().fieldErrors,
    }

    const res = await fetch(`${API_URL}/auth/signin`, {
        method: "POST",
        headers: {
            "Content-type" : "application/json",
        },
        body : JSON.stringify(validationFields.data)
    })

    if(res.ok){
        const result = await res.json();
        await createSession({
            user: {
                id: result.id,
                username: result.username
            },
            accessToken: result.accessToken,
            refreshToken: result.refreshToken
        })
        redirect("/");
    }
    else{
        return {
            message: res.status === 401 ? "Invalid credentials" : res.statusText
        }
    }
}

export const refreshToken = async (oldRefreshToken:string) => {
    try{
        console.log(oldRefreshToken)
        const response = await fetch(`${API_URL}/auth/refresh`, {
            method:"POST",
            headers:{
                "Content-Type" : "application/json",
            },
            body: JSON.stringify({
                refresh: oldRefreshToken
            })
        })
        if(!response.ok) throw Error("Failed to refresh token: " + response.statusText)

        const {accessToken, refreshToken} = await response.json();
        const updateRes = await fetch("http://localhost:3000/api/auth/update", {
            method: "POST",
            body: JSON.stringify({
                accessToken,
                refreshToken
            }),
        });
        if(!updateRes.ok) throw new Error("Failed to update tokens")

        return accessToken;
    }catch (err) {
        console.error("Refresh token failed:", err)
        return null
    }
}