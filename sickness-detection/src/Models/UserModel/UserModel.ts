import mongoose, { Schema, model, models } from "mongoose";
import Location from "../LocationModel/Location";

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
    },
    role: {
        type: String
    },
    phone: String,
}, { strict: 'throw' });

const AdminSchema = new Schema({
    role: {
        type: String,
        default: "admin"
    }
});

const PatientSchema = new Schema({
    gender: {
        type: String
    },
    age: {
        type: Number
    }
});

const DoctorSchema = new Schema({
    id_images: Array,
    speciality: String,
    location: {
        type: [Location.schema],
        required: true
    }
});

const User = models.User || model("User", UserSchema);
const Admin = models.Admin || User.discriminator("Admin", AdminSchema);
const Doctor = models.Doctor || User.discriminator("Doctor", DoctorSchema);
const Patient = models.Patient || User.discriminator("Patient", PatientSchema);

export { User, Patient, Admin, Doctor };
