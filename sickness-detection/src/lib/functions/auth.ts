import jwt from "jsonwebtoken"
export const createToken = (id: any) => {
    return jwt.sign({id}, process.env.JWT_SECRET || "", {
        expiresIn: '1h'
    })
}