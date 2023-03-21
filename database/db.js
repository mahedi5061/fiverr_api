import mongoose from "mongoose";

const MONGO_URL = async () => {
  try {
    await mongoose.connect(
      `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.taqt5.mongodb.net/fiverr?retryWrites=true&w=majority`,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
    console.log("Database is connected successfully...");
  } catch (err) {
    console.log(err);
  }
};

export default MONGO_URL;
