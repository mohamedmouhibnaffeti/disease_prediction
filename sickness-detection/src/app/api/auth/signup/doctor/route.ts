import { Doctor, User } from "@/Models/UserModel/UserModel"
import { isValidEmail } from "@/lib/functions/strings"
import connectMongoDB from "@/lib/mongodb"
import bcrypt from "bcryptjs"
import jwt from 'jsonwebtoken'
import { createAccessToken, createRefreshToken } from "@/lib/functions/auth"
import { NextRequest, NextResponse } from 'next/server';
import { writeFileSync } from "fs"
import { writeFile } from "fs/promises"
import path from "path"

export async function POST(request: NextRequest) {
    try {
        const images = []
        const imagepaths: string[] = [];
        const data = await request.formData();
        images.push(data.get("image0") as File)
        images.push(data.get("image1") as File)
        const name = data.get("name") as string;
        const lastname = data.get("lastname") as string;
        const phone = data.get("phone") as string;
        const email = data.get("email") as string;
        const password = data.get("password") as string;
        const confirmPassword = data.get("confirmPassword") as string;
        console.log({ name, lastname, phone, email, password, confirmPassword })
        if (!images || images.length < 2) {
            return NextResponse.json({ message: 'Images were not provided' }, { status: 400 });
        }
        if(name.length < 5 || lastname.length < 5 || !isValidEmail(email) || password.length < 5 || confirmPassword !== password ||  phone.length < 9 ){
            return NextResponse.json({ message: "Please check form data" }, { status: 400 })
        }
        for(const image of images){
            const buffer = Buffer.from(await image.arrayBuffer())
            const imageName = name + "_" + lastname + "_" + Date.now() + "_" + image.name.replaceAll(/\s+/g, "_")
            await writeFile(
                path.join(process.cwd(), "src/uploads/" + imageName),
                buffer
            )
            imagepaths.push(process.cwd() + "src/uploads/" + imageName)
        }
        await connectMongoDB()
        const exisingDoctor = await User.findOne({email: email})
        if(exisingDoctor){
            return NextResponse.json({message: "Email already exists in database." }, { status: 400 })
        }else{
            const salt = await bcrypt.genSalt(10)
            const hashedPassword = await bcrypt.hash(password, salt)
            const CreatedDoctor = await Doctor.create({ name, lastname, phone, email, password: hashedPassword })
            if(CreatedDoctor){
                const RefreshToken = createRefreshToken(CreatedDoctor._id)
                const AccessToken = createAccessToken(CreatedDoctor._id)
                return NextResponse.json({ message: "Doctor Created", user: CreatedDoctor, AccessToken: AccessToken, RefreshToken: RefreshToken }, { status: 201 })
            }else{
                return NextResponse.json({ message: "doctor not created" }, { status: 400 })
            }
        }
    } catch (error) {
        return NextResponse.json({ message: "error signing up doctor", error: error }, { status: 500 })
    }
}
