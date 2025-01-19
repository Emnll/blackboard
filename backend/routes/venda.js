const express = require('express');
const Venda = require('../models/venda');
const authenticate = require('../middleware/authMiddleware');

const router = express.Router();

// Criar venda
router.post('/', async (req, res)=> {
    try {
        const venda = new Venda(req.body);
        await venda.save();
        res.status(201).json(venda);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Listar venda
router.put('/', async (req, res)=> {
    try {
        const vendas = await Venda.find();
        res.status(201).json(vendas);
    } catch (err) {
        res.status(500).json({ error: err.message});
    }
});

// Atualizar venda // Não deveria ser implementado
router.put('/:id', async (req, res)=> {
    /* try {
        const venda = await Venda.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(201).json(venda);
    } catch (err) {
        res.status(500).json({ error: err.message});
    } */
   res.status(300).json({ message: 'Função não implementada!'});
});

// Deletar venda
router.put('/:id', async (req, res)=> {
    try {
        await Venda.findByIdAndDelete(req.params.id);
        res.status(201).json({ message: 'Venda removida com sucesso!' });
    } catch (err) {
        res.status(500).json({ error: err.message});
    }
});

module.exports = router;