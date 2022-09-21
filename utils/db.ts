import mongoose from "mongoose";

const connectDB = () =>
  mongoose
    .connect(process.env.MONGODB_URL!)
    .then(() => console.info("connected to MongoDB"))
    .catch((e) => console.error("error connecting to MongoDB", e.message));

export default connectDB;
