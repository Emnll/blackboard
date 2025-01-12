// Aqui tem a lógica do blackboard, e define se houve uma baixa no estoque, produto novo ou retirado etc
const Blackboard = require("../models/blackboard");
const { adicionarproduto , atualizarproduto } = require("../services/blackboardService");


const processBlackboard = async (req, res) => {
    const { produtos } = req.body.produtos;
    const { fornecedores } = req.body.fornecedores;
    const { historicoCompra } = req.body.historicoCompra;
    const { historicoVenda } = req.body.historicoVenda;
    // Initialize blackboard
    const blackboard = await Blackboard.create({
        produtos: produtos,
        fornecedores: fornecedores,
        historicoCompra: historicoCompra,
        historicoVenda: historicoVenda
    });

    const updatedBlackboard = null;

    // Exemplo
    if(req.body.operacao === "adicionarProduto") {
        adicionarproduto(blackboard);
        updatedBlackboard = await Blackboard.findById(blackboard._id);
    }
    
    if(req.body.operacao === "atualizarProduto") {
        atualizarproduto(blackboard);
        updatedBlackboard = await Blackboard.findById(blackboard._id);
    }

    res.json({ blackboard: updatedBlackboard });
    // ...
};

module.exports = { processBlackboard }