import {
  generateAccessToken,
  verifyAccessToken,
  verifyRefreshToken,
} from "../services/token.service.js";

const cookieOptionsAccess = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  maxAge: 30 * 60 * 1000, // 30 minutes
  sameSite: process.env.NODE_ENV === "production" ? "none" : "Strict",
};

export const Authenticate = (req, res, next) => {
  const refreshToken = req.cookies.refreshToken;
  const accessToken = req.cookies.accessToken;

  if (!accessToken && !refreshToken) {
    return res.status(401).json({ message: "Access token missing" });
  } else if (!accessToken && refreshToken) {
    const userData = verifyRefreshToken(refreshToken);

    if (!userData) {
      return res.status(401).json({ message: "Invalid refresh token" });
    }
    const tokens = {
      accessToken: generateAccessToken(userData.id),
    };
    res.cookie("accessToken", tokens.accessToken, cookieOptionsAccess);
    req.userId = userData.id;
  } else {
    const userData = verifyAccessToken(accessToken);
    if (!userData) {
      return res.status(403).json({ message: "Invalid access token" });
    }
    req.userId = userData.id;
  }
  next();
};
