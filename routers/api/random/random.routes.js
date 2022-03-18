import express from 'express';
import { fork } from 'child_process';
const router = express.Router();

router.get('/:quantity?', (req, res) => {
    const quantity = req.query.quantity;

    const calc = fork('controllers/random.controller.js');
    
    calc.on('message', (results) => {
        return res.render('main', { body: '../pages/random', data: { results }});
    })

    // setTimeout to fix issue with es6 modules:
    // https://stackoverflow.com/questions/71139253/node-child-process-not-firing-message-event#comment125755446_71140295
    setTimeout(() => {
        calc.send({ quantity });
    }, 300);
})

export default router;