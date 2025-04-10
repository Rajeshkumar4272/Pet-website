import mongoose from "mongoose";
const connectDB = async () => {
  try {
    const conn = await mongoose.connect("mongodb+srv://rajeshdelta4infotech:rajeshdelta4infotech@cluster0.jqfagtu.mongodb.net/ainoPetsDB?retryWrites=true&w=majority&appName=Cluster0");
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(error);
    process.exit(1); // Exit process with failure
  }
}
export default connectDB; // Export the connectDB function for use in other modules




      
