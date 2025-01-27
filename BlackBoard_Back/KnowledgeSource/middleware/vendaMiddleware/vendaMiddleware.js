const iVendaService = require('./iVendaService');

class VendaMiddleware extends iVendaService {
    constructor(VendaModel) {
        super();
        this.Venda = VendaModel;
        this.addVenda = this.addVenda.bind(this);
        this.listVenda = this.listVenda.bind(this);
        this.updateVenda = this.updateVenda.bind(this);
        this.deleteVenda = this.deleteVenda.bind(this);
    }

    async addVenda(req, res, next) {
        try {
            const Venda = new this.Venda(req.body);
            await Venda.save();

            req.vendas = Venda
            return next();
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }
    async listVenda(req, res, next) {
        try {
            const Vendas = await this.Venda.find();
            req.vendas = Vendas;
            return next();
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }
    async updateVenda(req, res, next) {
        try {
            const VendaALT = await this.Venda.findByIdAndUpdate(req.params.id, req.body, { new: true });
            req.vendas = VendaALT;

            return next();
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }
    async deleteVenda(req, res, next) {
        try {
            await this.Venda.findByIdAndDelete(req.params.id);
            //res.vendas = req.params.id;
            return next();
        } catch (err) {
            res.status(500).json({ error: err.message });
        }

    }
}
module.exports = VendaMiddleware;