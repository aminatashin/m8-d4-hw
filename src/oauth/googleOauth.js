import GoogleStrategy from "passport-google-oauth20";
import theModel from "../google/googleModel.js";

import { generateToken } from "../token/token.js";

const googleOauth = new GoogleStrategy(
  {
    clientID: process.env.GOOGLE_ID,
    clientSecret: process.env.GOOGLE_SECRET,
    callbackURL: `${process.env.BE_URL}/google/googleRedirect`,
  },
  async (accessToken, refreshToken, profile, passportNext) => {
    const user = await theModel.findOne({ email: profile._jason.email });
    if (user) {
      const token = await generateToken(user);
      passportNext(null, { token });
    } else {
      const { given_name, family_name, email } = profile._jason;
      const madeUser = new theModel({
        firstname: given_name,
        lastname: family_name,
        email: email,
        googleId: profile._id,
      });
      const newUser = await madeUser.save();
      const token = await generateToken(newUser);
      passportNext(null, { token });
    }
  }
);
export default googleOauth;
