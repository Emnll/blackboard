// Aqui aplica-se regras de negócio e retorna um blackboard pronto para o POST, tipo produto.quantidade >= 0 se todos os campos estão preenchidos etc
const Blackboard = require("../models/blackboard");

const adicionarProduto = async (blackboard) => {

    await blackboard.save();
}

const atualizarProduto = async (blackboard) => {

    await blackboard.save();
}
//....

module.exports = { adicionarProduto , atualizarProduto }