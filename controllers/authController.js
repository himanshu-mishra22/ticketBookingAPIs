const db = require("../db/mysql");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const {
  isStrongPassword,
  isValidEmail,
  allowedRoles,
} = require("../utils/functions");

const signup = (req, res) => {
  // console.log(req.body);
  const { email, password, role } = req.body;
  email = email?.trim();
  password = password?.trim();
  role = role?.trim().toLowerCase() || "user";

  // Validation
  if (!email || !password) {
    return res
      .status(400)
      .json({ message: "Email and password are required." });
  }
  if (!isValidEmail(email)) {
    return res.status(400).json({ message: "Invalid email format." });
  }
  if (!isStrongPassword(password)) {
    return res.status(400).json({
      message:
        "Password must be at least 8 characters long and include uppercase, lowercase, number, and special character.",
    });
  }
  if (!allowedRoles.includes(role)) {
    return res
      .status(400)
      .json({ message: `Role must be one of: ${allowedRoles.join(", ")}` });
  }

  const hashed = bcrypt.hashSync(password, 10);
  db.query(
    `INSERT INTO users (email, password, role) VALUES (?, ?, ?)`,
    [email, hashed, role],
    (err) => {
      if (err) return res.status(400).json(err);
      res.json({ message: `${email}: registered` });
    }
  );
};

const login = (req, res) => {
  // console.log(req.body);
  const { email, password } = req.body;
  email = email?.trim();
  password = password?.trim();

  // Validation
  if (!email || !password) {
    return res
      .status(400)
      .json({ message: "Email and password are required." });
  }
  if (!isValidEmail(email)) {
    return res.status(400).json({ message: "Invalid email format." });
  }
  db.query(`SELECT * FROM users WHERE email = ?`, [email], (err, results) => {
    if (err || results.length === 0)
      return res.status(400).json({ message: "Invalid credentials" });

    // console.log(results);

    const user = results[0];

    const match = bcrypt.compareSync(password, user.password);
    if (!match) return res.status(400).json({ message: "Invalid credentials" });
    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET
    );
    if (err) return res.status(400).json(err);
    res.json({ token, id, email });
  });
};

module.exports = { signup, login };
