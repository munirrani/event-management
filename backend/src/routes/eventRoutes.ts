import express from 'express';
import * as eventController from '../controllers/eventController';
import { authMiddleware } from '../middleware/authMiddleware';
import upload from '../config/uploadConfig';

const router = express.Router();

router.post('/', upload.single('thumbnailUrl'), authMiddleware, eventController.createEvent);
router.get('/', eventController.getEvents);
router.put('/:id', authMiddleware, eventController.updateEvent);
router.delete('/:id', authMiddleware, eventController.deleteEvent);

export default router;