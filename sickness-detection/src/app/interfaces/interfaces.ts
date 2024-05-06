import { ObjectId } from "mongoose";
import { Types } from 'mongoose';

export interface Tip {
    key : number;
    tip : string
}

export interface Symptom {
    _id: Types.ObjectId;
    title: string;
    body_part: string;
    gender: string;
}

export interface DoctorSignupformDataType {
    name: string,
    lastname: string,
    email: string,
    phone: string,
    password: string,
    confirmPassword: string,
    images: any,
    otp: string,
    location: Array<number>,
    speciality: string
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

export interface DoctorSignupErrorsType {
    name: string,
    lastname: string,
    email: string,
    phone: string,
    password: string,
    confirmPassword: string,
    images: string,
    location: [], 
    speciality: ""
}

export interface PatientSignupErrorsType {
    name: string,
    lastname: string,
    email: string,
    phone: string,
    password: string,
    confirmPassword: string
}

export interface LoginErrorsType {
    email: string,
    password: string
}

export interface ForgotPasswordDataType {
    email: string,
    otp: string,
    passwwd: string,
    confirmPasswd: string
}