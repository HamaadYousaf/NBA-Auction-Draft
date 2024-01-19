import express from 'express';
import { getUserTeams, addPlayerTeam, setUserTeams, getBidAmount, getDraftTeam } from '../controllers/userController.js';

const router = express.Router();

router.route('/player').get(getDraftTeam).post(addPlayerTeam);
router.route('/team').get(getUserTeams).post(setUserTeams);
router.route('/bidAmount').get(getBidAmount);

export default router;