const mongoose = require('mongoose');

const vendaSchema = new mongoose.Schema({
    nomeLoja: { type: String, required: true},
    nomeProduto: { type: String, required: true},
    quantidade: { type: Number, required: true},
    data: { type: Date, required: true}
});

module.exports = mongoose.model("venda",vendaSchema);