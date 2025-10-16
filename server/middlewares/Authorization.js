import User from "../models/user.model.js";

export const authorize = (allowedRoles) => {
  return async (req, res, next) => {
    const id = req.userId;
    if (!id) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    // Assuming you have a User model to fetch user details
    const response = await User.findById(id);
    if (!response || !allowedRoles.includes(response.role)) {
      return res.status(403).json({ message: "Forbidden" });
    }
    next();
  };
};

export const isRegister = async (req, res, next) => {
  const { email } = req.body;

  const isSignup = await User.findOne({ email });
  if (!isSignup) {
    res.status(405).json({ message: "User not register" });
  } else {
    next();
  }
};
