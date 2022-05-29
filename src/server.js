import express from "express";
import cors from "cors";
import ListEndpoints from "express-list-endpoints";
import mongoose from "mongoose";
import passport from "passport";
import googleOauth from "./oauth/googleOauth.js";
import googleRouter from "./google/google.js";

// =================================================
const server = express();
const port = process.env.PORT || 3002;
passport.use("google", googleOauth);
// =================================================
server.use(express.json());
server.use(cors());
server.use(passport.initialize());
server.use("/google", googleRouter);
// ==================================================
mongoose.connect(process.env.MONGO_CONNECTION);
mongoose.connection.on("connected", () => {
  console.log("Mongo is Connected");
  server.listen(port, () => {
    console.table(ListEndpoints(server));
    console.log(`${port}`);
  });
});
