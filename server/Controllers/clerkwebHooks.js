import getRawBody from "raw-body";
import User from "../models/User.js";
import { Webhook } from "svix";

// Disable body parser
export const config = {
  api: {
    bodyParser: false,
  },
};

const clerkwebhook = async (req, res) => {
  try {
    const payload = (await getRawBody(req)).toString();
    const headers = {
      "svix-id": req.headers["svix-id"],
      "svix-timestamp": req.headers["svix-timestamp"],
      "svix-signature": req.headers["svix-signature"],
    };

    const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET);
    const evt = whook.verify(payload, headers); // ✅ verify raw body

    const { data, type } = evt;

    const userData = {
      _id: data.id,
      email: data.email_addresses[0].email_address,
      username: `${data.first_name} ${data.last_name}`,
      image: data.image_url,
    };

    // Handle event types
    switch (type) {
      case "user.created":
        await User.create(userData);
        break;
      case "user.updated":
        await User.findByIdAndUpdate(data.id, userData);
        break;
      case "user.deleted":
        await User.findByIdAndDelete(data.id);
        break;
      default:
        console.log("Unhandled event type:", type);
    }

    res.status(200).json({ success: true, message: "Webhook received ✅" });
  } catch (error) {
    console.error("Webhook error ❌:", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};

export default clerkwebhook;
