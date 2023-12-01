import { Router } from "express";

const routes = Router();

routes.get("/", (req, res) => {
    res.send("Pagina principal");
});

export default routes;