import express from 'express';

import { randomController } from '../../../controllers/random.controller.js';

const router = express.Router();

router.get('/:quantity?', randomController)

export default router;
