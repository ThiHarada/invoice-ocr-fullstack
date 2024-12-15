import { NextRequest, NextResponse } from "next/server";
import { deleteSession } from "../../../lib/session";

export async function GET(req:NextRequest) {
    await deleteSession();

    return NextResponse.redirect(new URL("/", req.nextUrl))
}