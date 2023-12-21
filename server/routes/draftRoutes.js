import express from 'express';
import { getTime, getPlayers, getUsers, getFeed } from '../controllers/draftController.js';

const router = express.Router();

router.get('/time', getTime);
router.get('/players', getPlayers);
router.get('/users', getUsers);
router.get('/feed', getFeed);

export default router;