import mongoose, { model, Schema, models } from "mongoose";

const OtpSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    otp: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now(),
        expires: 300
    }
})

OtpSchema.index({ createdAt: 1 }, { expireAfterSeconds: 3000 })

const Otp = models.Otp || model("Otp", OtpSchema)

export default Otp