import { ObjectId } from "mongoose";

export interface Tip {
    key : number;
    tip : string
}

export interface Symptom {
    _id: ObjectId,
    title: string
}