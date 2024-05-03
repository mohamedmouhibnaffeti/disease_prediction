import mongoose, {Schema, model, models} from "mongoose"

const SymptomSchema = new Schema({
    title: {
        type: String
    },
    body_part: {
        type: String
    },
    gender: {
        type: String
    }
})

const Symptom = models.Symptom || model("Symptom", SymptomSchema)

export default Symptom