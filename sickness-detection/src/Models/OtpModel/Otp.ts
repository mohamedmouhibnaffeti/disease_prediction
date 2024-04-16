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
    createdAt: { type: Date, default: Date.now }
})

const Otp = models.Otp || model("Otp", OtpSchema)

export default Otp