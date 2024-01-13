import express from 'express';
import * as room from '../controllers/roomController.js';

const router = express.Router();

router.route('/users').get(room.getUsers).post(room.postUsers).delete(room.clearUsers).put(room.leaveUser);
router.route('/run').get(room.getRunning).post(room.setRunning).put(room.clearRunning);

export default router;