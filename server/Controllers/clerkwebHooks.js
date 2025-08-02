import User from "../models/User.js";
import { clerkMiddleware } from "@clerk/express";
import { Webhook } from "svix";

const clerkwebhook = async (req, res) => {
  try {
    const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET);
    const headers = {
      "svix-id": req.headers["svix-id"],
      "svix-timestamp": req.headers["svix-timestamp"],
      "svix-signature": req.headers["svix-signature"],
    };

    // verifying headers
    await whook.verify(JSON.stringify(req.body), headers);

    // getting data from request body
    const { data, type } = req.body;

    const userData = {
      _id: data.id,
      email: data.email_addresses[0].email_address,
      username: data.first_name + " " + data.last_name,
      image: data.image_url,
    };

    // Switch cases for Different Event
    switch (type) {
      case "user.created": {
        await User.create(userData);
        break;
      }
      case "user.update": {
        await User.findByIdAndUpdate(data.id, userData);
        break;
      }

      case "user.delete": {
        await User.findByIdAndDelete(data.id);
        break;
      }

      default:
        break;
    }
    res.json({ success: true, message: "webhook Recieved" });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, meassge: error.message });
  }
};

export default clerkwebhook;
