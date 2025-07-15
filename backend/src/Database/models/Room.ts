import mongoose from "mongoose";

const RoomSchema = new mongoose.Schema({
  _id: { type: String, required: true },
  available: Boolean,
  isSaved: Boolean,
  name: String,
  capacity: Number,
  description: String,
  petFriendly: Boolean,
  price: Number,
  rating: Number,
});

export const Room = mongoose.model("Room", RoomSchema, "rooms");
