const mongoose = require("mongoose");

const produtoSchema = new mongoose.Schema({
    nome: { type: String, required: true, unique: true},
    precoUnit: { type: Number, required: true},
    quantidade: { type: Number, required: true, min: 0},
    imagem: { data: Buffer, contentType: String}
});

module.exports = mongoose.model("produto", produtoSchema);