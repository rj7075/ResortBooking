import express from "express";
import "dotenv/config";
import cors from "cors";
import mongoose from "mongoose";
import { clerkMiddleware } from "@clerk/express";
import clerkwebhook from "./Controllers/clerkwebHooks.js";

const app = express();
app.use(cors()); //Enable cross origin Resource Sharing
mongoose
  .connect(
    "mongodb+srv://rj7075yadav:MGlrLghJubnRTv4S@cluster0.te58gpq.mongodb.net/HotelBooking"
  )
  .then(() => console.log("MongoDB Connected Successfully"))
  .catch((error) => console.log(error));

//  clerkmiddleware

app.use(express.json());
app.use(clerkMiddleware());

app.use("/api/clerk", clerkwebhook);

app.get("/", (req, res) => res.send("API is Working good"));

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server is Running on PORT ${PORT}`));
