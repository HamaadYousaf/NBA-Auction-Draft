import express from 'express';
import { getUserTeam } from '../controllers/userController.js';

const router = express.Router();

router.get('/', getUserTeam);

export default router;