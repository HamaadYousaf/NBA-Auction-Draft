import express from 'express';
import { getUserTeams } from '../controllers/userController.js';

const router = express.Router();

router.get('/', getUserTeams);

export default router;