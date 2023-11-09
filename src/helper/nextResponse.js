const { NextResponse } = require("next/server")

export const nextPostResponse =(message,successFlag,statusCode)=>{
    return NextResponse.json({message:message,success:successFlag,status:statusCode})
}
export const nextGetResponse =(message,successFlag,statusCode,data)=>{
    return NextResponse.json({message:message,success:successFlag,data:data,status:statusCode})
}