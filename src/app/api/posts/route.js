import { NextResponse } from "next/server";

export function GET(request) {
    return NextResponse.json({ 'dynamic id': "2" })
}