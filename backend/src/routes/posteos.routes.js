import express from 'express';
import { createPost, deletePostById, getAllPosteos, updatePost ,getAllPosteosSinToken } from '../controllers/posteos.controller.js';
import { verificarToken }  from "../middlewares/auth.jwt.js"
import { createComment } from '../controllers/comment.controller.js';

const postRouter = express.Router();


// Rutas públicas
postRouter.get('/post',verificarToken, getAllPosteos);
postRouter.get('/postsintoken', getAllPosteosSinToken);



// Rutas privadas
postRouter.post('/createPost/', verificarToken, createPost);
postRouter.put('/post/:postId', verificarToken, updatePost);
postRouter.delete('/post/:postId', verificarToken, deletePostById);
postRouter.post('/post/:postId', verificarToken, createComment);


export default postRouter;
