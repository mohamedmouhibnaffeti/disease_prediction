import mongoose from 'mongoose'

const connectMongoDB = async () => {
    try{
        await mongoose.connect(process.env.DATABASE_CONNECTION_STRING || "")
        console.log("Connected to database...")
    }catch(err){
        console.log(err)
    }
}

export default connectMongoDB