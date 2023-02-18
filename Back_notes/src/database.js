import mongoose from "mongoose";

mongoose.set("strictQuery", false);
const uri =
  "mongodb+srv://Cristian:515837020l@cluster0.ywnwo5p.mongodb.net/notes_socket";

export const connectDb = async () => {
  try {
    const db = await mongoose.connect(uri);
    console.log(`database connection established on ${db.connection.name}`);
  } catch (error) {
    console.log("error connecting to database", error.message);
  }
};
