import express from 'express';
import { getTime, getPlayers, getUsers, getFeed } from '../controllers/draftController.js';
import { authorize } from '../middleware/auth.js';

const router = express.Router();

router.use(authorize);

router.get('/time', getTime);
router.get('/players', getPlayers);
router.get('/users', getUsers);
router.get('/feed', getFeed);

export default router;