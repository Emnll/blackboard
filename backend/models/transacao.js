const mongoose = require("mongoose");
const produtoSchema = require("./produto");
const usuarioSchema = require("./usuario");

const transacaoSchema = mongoose.Schema({
    produtos: [produtoSchema],
    usuario: { type: usuarioSchema, required: true },
    foiCompra: { type: Boolean, required: true},
    foiVenda: { type: Boolean, required: true},
});

module.exports = mongoose.model("transacao",transacaoSchema);