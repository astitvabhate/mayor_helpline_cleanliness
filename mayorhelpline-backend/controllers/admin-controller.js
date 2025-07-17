import { admins } from "../config/hardcoded-admins.js";

export const adminLogin = (req, res) => {
  const { email, password } = req.body;

  const found = admins.find(
    (admin) => admin.email === email && admin.password === password
  );

  if (!found) {
    return res.status(401).json({ success: false, message: "Invalid credentials" });
  }

  res.json({
    success: true,
    message: "Login successful",
    user: { email: found.email },
    token: "dummy_token_" + found.email,
  });
};
