const express = require('express');
const Produto = require('../models/produto');
const authenticate = require('../middleware/authMiddleware');

const router = express.Router();

// Criar produto
router.post('/', async (req, res)=> {
    try {
        const produto = new Produto(req.body);
        await produto.save();
        res.status(201).json(produto);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Listar produtos
router.put('/', async (req, res)=> {
    try {
        const produtos = await Produto.find();
        res.status(201).json(produtos);
    } catch (err) {
        res.status(500).json({ error: err.message});
    }
});

// Atualizar produto
router.put('/:id', async (req, res)=> {
    try {
        const produto = await Produto.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(201).json(produto);
    } catch (err) {
        res.status(500).json({ error: err.message});
    }
});

// Deletar produto
router.put('/:id', async (req, res)=> {
    try {
        await Produto.findByIdAndDelete(req.params.id);
        res.status(201).json({ message: 'Produto removido com sucesso!' });
    } catch (err) {
        res.status(500).json({ error: err.message});
    }
});

module.exports = router;