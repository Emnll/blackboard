const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const usuario = require("../models/usuario");

const register = async (req, res) => {
  const { username, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const newUser = await usuario.create({ username, password: hashedPassword });
    res.status(201).json({ message: "Usuario registrado", userId: newUser._id });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await usuario.findOne({ username });
    if (!user) return res.status(404).json({ error: "Usuario não encontrado" });

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) return res.status(401).json({ error: "Credenciais inválidas" });

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { register, login };
