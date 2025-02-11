import mongoose from "mongoose";

export const connectDB = async () => {
    await mongoose.connect('mongodb+srv://heniassme:DUdtPuPyFplyNpHs@cluster0.swtuz.mongodb.net/Food-delivery')
          .then(() => console.log("DB Connected"))
}