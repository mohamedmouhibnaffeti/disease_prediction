import mongoose, { Schema, model, models } from "mongoose"

const SicknessSchema = new Schema({
    title: String
})

const Sickness = models.Sickness || model("Sickness", SicknessSchema)

export default Sickness