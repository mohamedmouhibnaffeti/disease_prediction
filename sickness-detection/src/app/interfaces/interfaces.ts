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