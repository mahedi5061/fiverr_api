import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import MONGO_URL from "./database/db.js";
import authRouter from "./routes/auth.route.js";
import conversationsRouter from "./routes/coversation.route.js";
import gigRouter from "./routes/gig.route.js";
import messagesRouter from "./routes/message.route.js";
import orderRouter from "./routes/order.route.js";
import reviewRouter from "./routes/review.route.js";
import userRouter from "./routes/user.route.js";
const app = express();
dotenv.config();
mongoose.set("strictQuery", true);

//database connect
MONGO_URL();

//test api
app.get("/", (req, res) => {
  res.send("Hello from fiverr server!");
});

//middleware
//This middleware is used for another system which system i want to get my jwt token key::://
// app.use(cors({ origin: "http://127.0.0.1:5173", credentials: true }));
app.use(cors());
app.use(express.json());
app.use(cookieParser());

//Route
app.use("/api/auth", authRouter);
app.use("/api/users", userRouter);
app.use("/api/gigs", gigRouter);
app.use("/api/reviews", reviewRouter);
app.use("/api/orders", orderRouter);
app.use("/api/conversations", conversationsRouter);
app.use("/api/messages", messagesRouter);

//error middleware
app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Something went to wrong!";

  res.status(errorStatus).json({
    errorMessage: errorMessage,
  });
});

const port = process.env.PORT || 10000;

app.listen(port, () => console.log(`Listening port is runnig at ${port}`));
