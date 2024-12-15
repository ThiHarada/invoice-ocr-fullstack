"use server"

import { redirect } from "next/navigation";
import { API_URL } from "./constants";
import { FormState, LoginFormSchema, SignUpFormSchema } from "./type";
import { responseCookiesToRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies";
import { userInfo } from "os";
import { createSession } from "./session";

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
            }
        })
        redirect("/");
    }
    else{
        return {
            message: res.status === 401 ? "Invalid credentials" : res.statusText
        }
    }
}