import { NextRequest, NextResponse } from "next/server";
import { deleteSession } from "../../../lib/session";
import { authFetch } from "../../../lib/authFetch";
import { API_URL } from "../../../lib/constants";

export async function GET(req:NextRequest) {
    
    const resp = await authFetch(`${API_URL}/auth/signout`, {
        method: "POST"
    })
    if (resp.ok){}
    await deleteSession();

    return NextResponse.redirect(new URL("/", req.nextUrl))
}