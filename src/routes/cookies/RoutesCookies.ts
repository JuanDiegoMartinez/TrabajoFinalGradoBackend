import express from "express";
import {app} from '../../server';

//Obtenemos el express.Router() que es un middleware que sirve de direccionador de routes
const router = express.Router();

app.post("/cookiePage", async (req: express.Request, res: express.Response): Promise<void> => {

    // @ts-ignore
    req.session.page = req.body.page;

    // @ts-ignore
    await req.session.save(function (err) {
    });
})

app.post("/cookieRowsPerPage", async (req: express.Request, res: express.Response): Promise<void> => {

    // @ts-ignore
    req.session.rowsPerPage = req.body.rowsPerPage;
    // @ts-ignore
    req.session.page = req.body.page;

    // @ts-ignore
    await req.session.save(function (err) {
    });
})

app.post("/cookiePalabra", async (req: express.Request, res: express.Response): Promise<void> => {

    console.log("Estoy en /cookiePalabra, soy la palabra: ", req.body.palabra);
    // @ts-ignore
    req.session.palabra = req.body.palabra;
})

//Hay que importarlo
module.exports = router;