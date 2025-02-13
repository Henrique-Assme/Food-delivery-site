import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL)
        if(process.env.NODE_ENV !== "test") {
            console.log("DB Connected")
        }
    } catch (error) {
        console.log("Error connecting to database: ", error)
        process.exit(1)
    }
}

export const disconnectDB = async () => {
    await mongoose.connection.close()
    await new Promise(resolve => setTimeout(resolve, 500))
}