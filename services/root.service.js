import { products } from "./products.service.js";

const getRootService = async (ctx) => {
    try {
        const user = ctx.req.user;

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
        ctx.body = {
            success: false,
            message: error.description
        };
        ctx.status = error.status;
    }
}

const getInfoService = async (ctx) => {
    const response = {
        body: '../pages/info',
        data: {
            entryArgs: args,
            platform: process.platform,
            nodeVersion: process.version,
            rss: process.memoryUsage().rss,
            path: process.argv[1],
            pid: process.pid,
            cwd: process.cwd(),
            cpusLength: os.cpus().length
        }
    }

    return response;
}

export {
    getRootService,
    getInfoService
}