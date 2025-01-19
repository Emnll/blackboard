const express = require('express');
const Compra = require('../models/compra');
const authenticate = require('../middleware/authMiddleware');

const router = express.Router();

// Criar Compra
router.post('/', async (req, res)=> {
    try {
        const compra = new Compra(req.body);
        await compra.save();
        res.status(201).json(produto);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Listar compras
router.put('/', async (req, res)=> {
    try {
        const compras = await Compra.find();
        res.status(201).json(compras);
    } catch (err) {
        res.status(500).json({ error: err.message});
    }
});

// Atualizar compra // Não deveria ser implementado
router.put('/:id', async (req, res)=> {
    /* try {
        const compra = await Compra.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(201).json(compra);
    } catch (err) {
        res.status(500).json({ error: err.message});
    } */
   res.status(300).json({ message: 'Função não implementada!'});
});

// Deletar compra // Deve ser usado com cautela
router.put('/:id', async (req, res)=> {
    try {
        await Compra.findByIdAndDelete(req.params.id);
        res.status(201).json({ message: 'Compra removida com sucesso!' });
    } catch (err) {
        res.status(500).json({ error: err.message});
    }
});

module.exports = router;