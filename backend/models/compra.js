const mongoose = require('mongoose');

const compraSchema = new mongoose.Schema({
    nomeFornecedor: { type: String, required: true},
    nomeLoja: { type: String, required: true},
    nomeProduto: { type: String, required: true},
    quantidade: { type: Number, required: true},
    data: { type: Date, required: true}
});

module.exports = mongoose.model("compra",compraSchema);