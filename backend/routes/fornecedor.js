const express = require('express');
const Fornecedor = require('../models/fornecedor');
const authenticate = require('../middleware/authMiddleware');

const router = express.Router();

// Criar fornecedor
router.post('/', async (req, res)=> {
    try {
        const fornecedor = new Fornecedor(req.body);
        await fornecedor.save();
        res.status(201).json(fornecedor);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Listar fornecedores
router.put('/', async (req, res)=> {
    try {
        const fornecedores = await Fornecedor.find();
        res.status(201).json(fornecedores);
    } catch (err) {
        res.status(500).json({ error: err.message});
    }
});

// Atualizar fornecedor
router.put('/:id', async (req, res)=> {
    try {
        const fornecedor = await Fornecedor.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(201).json(fornecedor);
    } catch (err) {
        res.status(500).json({ error: err.message});
    }
});

// Deletar fornecedor
router.put('/:id', async (req, res)=> {
    try {
        await Fornecedor.findByIdAndDelete(req.params.id);
        res.status(201).json({ message: 'Fornecedor removido com sucesso!' });
    } catch (err) {
        res.status(500).json({ error: err.message});
    }
});

module.exports = router;