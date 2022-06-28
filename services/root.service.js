const minimist = require('minimist');
const os = require('os');

const { args } = require('../app.js');
const { products } = require('./products.service.js');

const getRootService = async (req, res) => {
    try {
        const user = req.user;

        const response = { 
            body: '../pages/home', 
            data: { 
                isAdmin: true,
                user,
                products: await products.getAll()
            }
        }

        return response;
    } catch (error) {
        return res.status(error.status).send(error.description);
    }
}

const getInfoService = (req, res) => {
    const response = {
        entryArgs: args,
        platform: process.platform,
        nodeVersion: process.version,
        rss: process.memoryUsage().rss,
        path: process.argv[1],
        pid: process.pid,
        cwd: process.cwd(),
        cpusLength: os.cpus().length
    }

    return response;
}

module.exports = {
    getRootService,
    getInfoService
}