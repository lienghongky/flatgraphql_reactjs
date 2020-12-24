import mongoose from "mongoose";

export const User = mongoose.model("users", { name: String });