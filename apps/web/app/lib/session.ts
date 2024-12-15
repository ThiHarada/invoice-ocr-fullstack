"use server"

import {jwtVerify, SignJWT} from "jose"
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export type Session = {
    user:{
        id: string,
        username: string,
    },
    // accessToken: string,
    // refreshToken: string
}

const KEY = process.env.SESSION_SECRET_KEY!
const encodedKey = new TextEncoder().encode(KEY)

export async function createSession (payload:Session){
    const expiredAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

    const session = await new SignJWT(payload).setProtectedHeader({alg: "HS256"}).setIssuedAt().setExpirationTime(expiredAt).sign(encodedKey);

    (await cookies()).set("session", session, {
        httpOnly: true,
        secure: true,
        expires: expiredAt,
        sameSite: "lax",
        path:"/"
    })
}

export async function getSession(){
    const cookie = (await cookies()).get("session")?.value;
    if(!cookie) return null;
    
    try{
        const {payload} = await jwtVerify(cookie, encodedKey, {
            algorithms: ["HS256"]
        });
    
        return payload as Session;
    }
    catch (err){
        console.error("Error when verifying session", err);
        redirect("/auth/signin");
    }

}

export async function deleteSession() {
    (await cookies()).delete("session");
}