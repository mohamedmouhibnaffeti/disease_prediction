import { NextRequest, NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

export async function POST(request: NextRequest) {
    try {
        const { token } = await request.json();
        const secret = process.env.JWT_SECRET;

        if (!secret) {
            return NextResponse.json({ error: "JWT_SECRET environment variable is not set" }, { status: 500 });
        }

        if (typeof token !== 'string') {
            return NextResponse.json({ error: "Invalid token format" }, { status: 400 });
        }

        const { payload } = await jwtVerify(token, new TextEncoder().encode(secret));
        return NextResponse.json({ payload }, { status: 200 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: "Token verification failed" }, { status: 401 });
    }
};
