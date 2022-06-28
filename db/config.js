const { DB_PASSWORD } = require("../env.config");

const config = {
    mongodb: {
        connectTo: (database) => `mongodb+srv://admin:${DB_PASSWORD}@coderhouseecommerceclus.ct8zd.mongodb.net/${database}?retryWrites=true&w=majority`
    }
}

module.exports = {
    config
};
