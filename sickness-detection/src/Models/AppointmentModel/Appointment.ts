import mongoose, { Schema, model, models } from "mongoose";
import { Doctor, Patient, User } from "@/Models/UserModel/UserModel";

const AppointmentSchema = new Schema({
    doctor: {
        type: Schema.Types.ObjectId,
        ref: "User" // Reference to Doctor model
    },
    patient: {
        type: Schema.Types.ObjectId,
        ref: "User" // Reference to Patient model
    },
    date: {
        type: Date
    },
    state: {
        type: String,
        enum: ["finished", "overdue", "pending", "accepted", "waiting"],
        default: "pending"
    },
    duration: {
        type: Number
    },
    from: {
        type: Date
    },
    to: {
        type: Date
    },
    requestedAt: {
        type: Date,
        default: Date.now()
    }
});

const Appointment =models.Appointment || model("Appointment", AppointmentSchema)

export default Appointment;
