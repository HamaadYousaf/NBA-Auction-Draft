import express from 'express';
import { getUserTeams, addPlayerTeam, setUserTeams } from '../controllers/userController.js';

const router = express.Router();

router.route('/player').post(addPlayerTeam);
router.route('/team').get(getUserTeams).post(setUserTeams);
// router.get('/bidAmount', getUserTeams);

export default router;