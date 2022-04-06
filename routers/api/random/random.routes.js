import express from 'express';
// import { fork } from 'child_process';
import log4js from 'log4js';
const router = express.Router();

router.get('/:quantity?', (req, res) => {
    const consoleLogger = log4js.getLogger('default');
    consoleLogger.info(`Access to the path ${req.originalUrl} using method ${req.method}.`);
    const quantity = req.query.quantity || 100000000;

    // const calc = fork('controllers/random.controller.js');
    
    // calc.on('message', (results) => {
    //     return res.render('main', { body: '../pages/random', data: { results }});
    // })

    const randomNumber = (min, max) => parseInt(Math.random() * max) + min;
    const results = {};
    
    for (let index = 0; index < quantity; index++) {   
        const number = randomNumber(1, 2000);
        if (!results[number]) results[number] = 1;
        else results[number] = results[number] + 1;
    }
    // setTimeout to fix issue with es6 modules:
    // https://stackoverflow.com/questions/71139253/node-child-process-not-firing-message-event#comment125755446_71140295
    // setTimeout(() => {
        // res.send({results});
        return res.render('main', { body: '../pages/random', data: { results }});
        // calc.send({ quantity });
    // }, 500);
})

export default router;