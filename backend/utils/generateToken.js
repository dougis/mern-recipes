import jwt from "jsonwebtoken";

const generateToken = (res, userId) => {
  const jwtExpiresIn = process.env.JWT_LIFETIME_DAYS + "d";
  // convert days to ms
  const jwtCookieExpirationTime =
    Number(process.env.JWT_LIFETIME_DAYS) * 24 * 60 * 60 * 1000;

  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: jwtExpiresIn,
  });

  // Set jwt as HTTP-Only cookie
  res.cookie("jwt", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== "development",
    sameSite: "strict",
    maxAge: jwtCookieExpirationTime,
  });
};

export default generateToken;
