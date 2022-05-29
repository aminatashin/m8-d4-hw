import mongoose from "mongoose";
import bcrypt from "bcrypt";
// =================================
const { Schema, model } = mongoose;
const googleSchema = new Schema({
  firstname: { type: String },
  lastname: { type: String },
  email: { type: String },
  password: { type: String },
  role: { type: String },
  googleId: { type: String },
});
googleSchema.pre("seve", async function (next) {
  const user = this;
  const plainPW = this.password;
  const hash = await bcrypt.hash(plainPW, 11);
  user.password = hash;
  next();
});
googleSchema.methods.JSON = function () {
  const user = this;
  const newUser = user.toObject();
  delete newUser.password;
  return newUser;
};
// =====================================
export default model("google", googleSchema);
