import express from 'express';
import * as room from '../controllers/roomController.js';

const router = express.Router();

router.route('/users').get(room.getUsers).post(room.postUsers).delete(room.clearUsers).put(room.leaveUser);
router.route('/users/names').get(room.getUsersNames);
router.route('/run').get(room.getRunning).post(room.setRunning).delete(room.clearRunning);

export default router;