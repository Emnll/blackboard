
class publisher {
    constructor(clients,ProductModel){
        this.clients = clients;
        this.Product = ProductModel;
        this.notifyAlt = this.notifyAlt.bind(this);
        this.notifyChange = this.notifyChange.bind(this);
    }

    async notifyAlt(req,res,next) {
        console.log('CLIENTES EM PUBLISHER: ', this.clients.size);
        const flag = true;
        this.notifyChange(flag);
    }
    
    ////////////////////////////////////////////

    async notifyChange(flag) {
        const event = `event: change \n`;
        const data = `data: ${JSON.stringify({ flag })}\n\n`;
        console.log(data)
        this.clients.forEach((client) => {
            client.write(event);
            client.write(data);
        });
    }
}
module.exports = publisher;