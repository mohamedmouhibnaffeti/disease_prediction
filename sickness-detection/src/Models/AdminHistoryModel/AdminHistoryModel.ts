import mongoose, { Schema, model, models } from "mongoose"
import {Admin, User} from "@/Models/UserModel/UserModel"

const AdminHistoryModel = new Schema({
    owner: {
        type: Schema.Types.ObjectId,
        ref: User.modelName
    },
    description: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
})