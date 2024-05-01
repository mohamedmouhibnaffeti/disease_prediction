import { NextResponse } from "next/server";

export function middleware(request: Request){
    /*
    console.log('Middleware')
    console.log(request.method)
    console.log(request.url)
    */
    const allowedOrigin = 'http://localhost:3030/'
    const origin = request.headers.get('referer')
    if(!origin?.startsWith(allowedOrigin)){
        return NextResponse.json("Error fetching resource", {status: 403})
    }
    return NextResponse.next()
}

export const config = {
    matcher: '/api/:path*',
}