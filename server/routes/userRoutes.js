import express from 'express';
import { getUserTeams, addPlayerTeam, setUserTeams, getBidAmount } from '../controllers/userController.js';

const router = express.Router();

router.route('/player').post(addPlayerTeam);
router.route('/team').get(getUserTeams).post(setUserTeams);
router.route('/bidAmount').get(getBidAmount);

export default router;