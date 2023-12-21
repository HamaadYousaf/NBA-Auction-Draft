import express from 'express';
import { postLogin, postRegister, getLogin } from '../controllers/loginController.js';

const router = express.Router();

router.post('/', postLogin);
router.post('/create-account', postRegister);
router.get('/', getLogin);

export default router;