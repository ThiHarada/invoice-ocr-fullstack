import { NextRequest, NextResponse } from "next/server";
import { deleteSession } from "../../../lib/session";
import { API_URL } from "../../../lib/constants";

export async function GET(req:NextRequest) {
    
    console.log(req)
    console.log("----------------")
    const resp = await fetch(`${API_URL}/auth/signout`, {
        method: "POST",
        body: JSON.stringify({
            user:{
                id: 1000
            }
        })
    })
    if (resp.ok){}
    await deleteSession();

    return NextResponse.redirect(new URL("/", req.nextUrl))
}