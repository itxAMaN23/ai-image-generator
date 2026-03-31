import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    process.stdout.write(`MongoDB Connected: ${conn.connection.host}\n`);
  } catch (error) {
    process.stderr.write(`MongoDB Connection Error: ${error.message}\n`);
    process.exit(1);
  }
};

export default connectDB;
