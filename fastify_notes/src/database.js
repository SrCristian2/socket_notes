import mongoose from "mongoose";

mongoose.set("strictQuery", false);
const uri =
  "";

export const connectDb = async () => {
  try {
    const db = await mongoose.connect(uri);
    console.log(`database connection established on ${db.connection.name}`);
  } catch (error) {
    console.log("error connecting to database", error.message);
  }
};
