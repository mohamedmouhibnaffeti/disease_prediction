import mongoose, {Schema, model, models} from "mongoose"

const SymptomSchema = new Schema({
    title: String
})

const Symptom = models.Symptom || model("Symptom", SymptomSchema)

export default Symptom