import log4js from 'log4js';

import { getInfoService, getRootService } from '../services/root.service.js';

const getRootController = async (ctx) => {
    const consoleLogger = log4js.getLogger('default');
    consoleLogger.info(`Access to the path ${req.originalUrl} using method ${req.method}.`);
    
    const response = await getRootService(ctx);

    ctx.body= {
        success: true,
        data: response
    };
}

const getInfoController = async (ctx) => {
    const consoleLogger = log4js.getLogger('default');
    consoleLogger.info(`Access to the path ${req.originalUrl} using method ${req.method}.`);

    const response = await getInfoService(ctx);
    ctx.body= {
        success: true,
        data: response
    };
}

export { 
    getRootController,
    getInfoController
}