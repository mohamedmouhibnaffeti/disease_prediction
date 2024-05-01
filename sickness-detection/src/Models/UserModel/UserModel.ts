import mongoose, { Schema, model, models } from "mongoose";

const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    }
}, { strict: 'throw' }); // Enforce strict schema mode

const AdminSchema = new Schema({
    role: {
        type: String,
        default: "admin"
    }
});

const PatientSchema = new Schema({
    role: {
        type: String,
        default: "patient"
    },
    phone: String,
});

const DoctorSchema = new Schema({
    role: {
        type: String,
        default: "doctor"
    },
    phone: String,
    id_images: Array
});

const User = models.User || model("User", UserSchema);
const Admin = models.Admin || User.discriminator("Admin", AdminSchema);
const Doctor = models.Doctor || User.discriminator("Doctor", DoctorSchema);
const Patient = models.Patient || User.discriminator("Patient", PatientSchema);

export { User, Patient, Admin, Doctor };
