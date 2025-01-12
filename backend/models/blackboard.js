const mongoose = require("mongoose");
// Schemas a serem usados
const produtoSchema = require("./produto");
const usuarioSchema = require("./usuario");
const transacaoSchema = require("./transacao");

const blackboardSchema = new mongoose.Schema({
    produtos: [produtoSchema],
    fornecedores: [usuarioSchema],
    historicoCompra: [transacaoSchema],
    historicoVenda: [transacaoSchema]
});

module.exports = mongoose.model("blackboard", blackboardSchema);