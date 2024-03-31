import { ObjectId } from "mongoose";
import { Types } from 'mongoose';

export interface Tip {
    key : number;
    tip : string
}

export interface Symptom {
    _id: Types.ObjectId;
    title: string;
}

export interface DoctorSignupformDataType {
    name: string,
    lastname: string,
    email: string,
    phone: string,
    password: string,
    confirmPassword: string,
    images: Array<any>
}

export interface PatientSignupformDataType {
    name: string,
    lastname: string,
    email: string,
    phone: string,
    password: string,
    confirmPassword: string
}

export interface LoginFormDataType {
    email: string,
    password: string
}