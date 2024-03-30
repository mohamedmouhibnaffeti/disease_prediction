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

export interface SignupformDataType {
    name: string,
    lastname: string,
    email: string,
    password: string,
    confirmPassword: string,
    images: Array<any>
}