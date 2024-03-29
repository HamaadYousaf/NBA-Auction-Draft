import express from 'express';
import * as draft from '../controllers/draftController.js';

const router = express.Router();

router.route('/time').get(draft.getTime).post(draft.postTime);
router.route('/player').get(draft.getPlayer).post(draft.postPlayer);
router.route('/bid').get(draft.getBid).post(draft.setBid).delete(draft.clearBid);

export default router;