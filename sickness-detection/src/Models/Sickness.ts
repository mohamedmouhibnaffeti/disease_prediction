import mongoose, { Schema, model, models } from "mongoose"
import Symptom from "./Symptom"

const SicknessSchema = new Schema({
    title: {
        type: String
    },
    symptoms: {
        type: [ Symptom.schema],
        required: true
    }
})


const Sickness = models.Sickness || model("Sickness", SicknessSchema)

export default Sickness