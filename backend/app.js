import express from "express";
import indexRoutes from "./src/routes/index.routes.js";
import "./src/database/db.js";
import { settingDotEnv } from "./src/views/config.js"
import { authRouter } from "./src/routes/auth.routes.js"
import postRouter from "./src/routes/posteos.routes.js";
import commentRouter from "./src/routes/comment.routes.js";
import cors from 'cors';
import cookieParser from "cookie-parser";


const app = express();

const listaBlanca = ['http://localhost:5173'];
app.use(cors({
    origin: listaBlanca,
    credentials: true,
}));

app.use(cookieParser());
app.use(express.json());
app.use(indexRoutes);
app.use(authRouter);
app.use(postRouter);
app.use(commentRouter);





const {port} = settingDotEnv();
app.listen(port, ()=> 
console.log(`Servidor Express corriendo en el puerto ${port}`)
);