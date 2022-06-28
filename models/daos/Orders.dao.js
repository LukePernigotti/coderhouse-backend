const { STATUS } = require('../../utils/constants/api.constants.js');
const CustomError = require('../../utils/errors/CustomError.js');
const MongoDBContainer = require('../containers/Mongodb.container.js');
const OrderSchema = require('../schemas/Order.schema.js');

const collection = 'orders';

class OrdersDao extends MongoDBContainer {
    static instance;
    constructor() {
        if (!OrdersDao.instance) {
            super(collection, OrderSchema);
            
            OrdersDao.instance = this;
            return this;
        } else {
            return OrdersDao.instance;
        }
    }
}

module.exports = OrdersDao;