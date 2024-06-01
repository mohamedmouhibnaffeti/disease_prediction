import { User } from "@/Models/UserModel/UserModel";
import { createAccessToken } from "@/lib/functions/auth";
import connectMongoDB from "@/lib/mongodb";
import jwt, { JwtPayload } from "jsonwebtoken";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        const { refresh_token } = await request.json();

        const decodedToken = jwt.verify(refresh_token, process.env.JWT_SECRET || '') as JwtPayload;

        if (!decodedToken || typeof decodedToken !== 'object' || !decodedToken.user) {
            return NextResponse.json({ message: 'Invalid refresh token' }, { status: 401 });
        }

        await connectMongoDB();
        const user = await User.findById(decodedToken.user.id);

        if (!user) {
            return NextResponse.json({ message: 'User not found' }, { status: 404 });
        }

        const accessToken = createAccessToken(user);

        return NextResponse.json({ accessToken }, { status: 200 });
    } catch (error) {
        console.error('Error refreshing token:', error);
        return NextResponse.json({ message: 'Error refreshing token' }, { status: 500 });
    }
}
