const express = require('express');
const Transferencia = require('../models/transferencia');
const authenticate = require('../middleware/authMiddleware');

const router = express.Router();

// Criar transferencia
router.post('/',  async (req, res)=> {
    try {
        const transferencia = new Transferencia(req.body);
        await transferencia.save();
        res.status(201).json(transferencia);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Listar transferencia
router.put('/', async (req, res)=> {
    try {
        const transferencias = await Transferencia.find();
        res.status(201).json(transferencias);
    } catch (err) {
        res.status(500).json({ error: err.message});
    }
});

// Atualizar transferencia // Não deveria ser implementado
router.put('/:id', async (req, res)=> {
    /* try {
        const transferencia = await Transferencia.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(201).json(transferencia);
    } catch (err) {
        res.status(500).json({ error: err.message});
    } */
   res.status(300).json({ message: 'Função não implementada!'});
});

// Deletar transferencia
router.put('/:id', async (req, res)=> {
    try {
        await Transferencia.findByIdAndDelete(req.params.id);
        res.status(201).json({ message: 'Transferencia removido com sucesso!' });
    } catch (err) {
        res.status(500).json({ error: err.message});
    }
});

module.exports = router;