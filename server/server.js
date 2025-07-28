import express from "express";
import "dotenv/config";
import cors from "cors";
import mongoose from "mongoose";
import { clerkMiddleware } from "@clerk/express";
mongoose
  .connect(
    "mongodb+srv://rj7075yadav:MGlrLghJubnRTv4S@cluster0.te58gpq.mongodb.net/HotelBooking"
  )
  .then(() => console.log("MongoDB Connected Successfully"))
  .catch((error) => console.log(error));

app.use(cors()); //Enable cross origin Resource Sharing
const app = express();
//  clerkmiddleware

app.use(express.json());
app.use(clerkMiddleware());

app.get("/", (req, res) => res.send("API is Working good"));

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server is Running on PORT ${PORT}`));
