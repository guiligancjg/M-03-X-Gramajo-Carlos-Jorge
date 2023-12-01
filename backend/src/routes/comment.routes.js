import express from 'express';
import { createComment, deleteCommentById, getAllComment, updateComment } from '../controllers/comment.controller.js';
import { verificarToken }  from "../middlewares/auth.jwt.js"

const commentRouter = express.Router();

// Rutas públicas
commentRouter.get('/allComment/', getAllComment);

// Rutas privadas
commentRouter.post('/createComment/', verificarToken, createComment);
commentRouter.put('/updateComment/:commentId', verificarToken, updateComment);
commentRouter.delete('/updateComment/:commentId', verificarToken, deleteCommentById);



export default commentRouter;