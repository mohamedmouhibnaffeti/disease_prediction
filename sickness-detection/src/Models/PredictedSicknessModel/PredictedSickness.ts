import mongoose, { Schema, model, models } from "mongoose"
import Symptom from "../SymptomsModel/Symptom"

const PredictedSicknessSchema = new Schema({
    title: {
        type: String
    },
    symptoms: {
        type: [ Symptom.schema],
        required: true
    },
    age: {
        type: Number
    },
    sex: {
        type: String
    },
    conditions: {
        type: []
    }
})


const PredictedSickness = models.PredictedSickness || model("PredictedSickness", PredictedSicknessSchema)

export default PredictedSickness