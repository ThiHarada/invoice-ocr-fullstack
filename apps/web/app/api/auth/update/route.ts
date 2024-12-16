import { NextRequest } from "next/server";
import { updateTokens } from "../../../lib/session";

export async function POST(req:NextRequest) {
    
    const body = await req.json();
    const {accessToken, refreshToken} = body;

    if(!accessToken || !refreshToken) return new Response("Provide tokens", {status: 401});

    await updateTokens({accessToken, refreshToken});

    return new Response("OK", {status: 200});
}