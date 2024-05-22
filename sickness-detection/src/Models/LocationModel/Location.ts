import mongoose, { model, Schema, models } from "mongoose"

const LocationSchema = new Schema ({
    cordonnees: {
        type: [Number],
        required: true
    }
})

const Location = models.Location || model("Location", LocationSchema)
export default Location