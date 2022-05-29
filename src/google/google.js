import express from "express";
import passport from "passport";
import theModel from "./googleModel.js";
// =====================================
const googleRouter = express.Router();
googleRouter.get(
  "/googleLogin",
  passport.authenticate("google", { scope: ["profile", "email"] })
);
googleRouter.get(
  "/googleRedirect",
  passport.authenticate("google"),
  async (req, res, next) => {
    const { token } = req.user;
    res.redirect(`${process.env.FE_URL}/google?token=${token}`);
  }
);
export default googleRouter;
