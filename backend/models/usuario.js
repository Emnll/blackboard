const mongoose = require("mongoose");

const usuarioSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  fornecedor: { type: Boolean, required: true },
  varejo: { type: Boolean, required: true },
  admin: { type: Boolean, required: true }
});

module.exports = mongoose.model("usuario", usuarioSchema);
