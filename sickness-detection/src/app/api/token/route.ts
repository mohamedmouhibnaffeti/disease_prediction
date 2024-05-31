import { verify } from "jsonwebtoken";
import { NextResponse, NextRequest } from "next/server";

//encode the user id and role, ba3d ki tkaml l routing fel api, chouf kifech tverify l role mel jwt

export function GET(request: NextRequest){
    const token = request.nextUrl.searchParams.get("token") || ""
    const user = verify(token, process.env.JWT_SECRET || "")
    return NextResponse.json({message: user})
}