import mongoose from "mongoose";

const UserSchema = mongoose.Schema(
  {
    _id: { type: String, required: true },
    userName: { type: String, required: true },
    email: { type: String, required: true },
    image: { type: String, required: true },
    role: { type: String, enum: ["user", "admin"], default: "user" },
    RecentSearchCities: [{ type: String, required: true }],
  },
  { timeStamp: true }
);

// model Creation
const User = mongoose.model("User", UserSchema);
export default User;
