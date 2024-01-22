import express from 'express';
import { postLogin, postRegister, getLogin, logout } from '../controllers/loginController.js';

const router = express.Router();

router.post('/', postLogin);
router.post('/create-account', postRegister);
router.get('/', getLogin);
router.post('/logout', logout)

export default router;