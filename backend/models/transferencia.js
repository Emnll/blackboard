const mongoose = require("mongoose");

const transferenciaSchema = new mongoose.Schema({
    lojaSaida: { type: String, required: true},
    lojaEntrada: { type: String, required: true},
    nomeProduto: { type: String, required: true},
    quantidade: { type: Number, required: true},
    data: { type: Date, required: true}
});

module.exports = mongoose.model("transferencia", transferenciaSchema);