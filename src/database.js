import mongoose from "mongoose";

const connectDB = async () => {
  try {
    // mongodb connection string
    const con = await mongoose.connect(
      "mongodb+srv://root:CQnmNTNfRtQb1SIG@cluster0.dxjqx.mongodb.net/e-commerce-api",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
  } catch (error) {
    process.exit(1);
  }
};

export default connectDB;