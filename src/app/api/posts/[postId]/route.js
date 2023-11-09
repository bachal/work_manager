import { NextResponse } from "next/server";

export function GET(request,{params}){
    const {postId}=params;
    return NextResponse.json({"dynamic id":postId})

}