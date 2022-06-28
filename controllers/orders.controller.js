const { completeOrderService } = require('../services/orders.service.js');

const completeOrderController = async (req, res) => {
    try {
        const response = await completeOrderService(req, res);
    
        return res.json(response);
    } catch (error) {
        return res.status(error.status).send(error.description);
    }
}


module.exports = {
    completeOrderController
}