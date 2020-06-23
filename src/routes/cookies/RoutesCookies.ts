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

app.post("/eliminarCookieNoticias", async (req: express.Request, res: express.Response): Promise<void> => {

    // @ts-ignore
    req.session.rowsPerPage = undefined;
    // @ts-ignore
    req.session.page = undefined;
    // @ts-ignore
    req.session.palabra = undefined;

    // @ts-ignore
    await req.session.save(function (err) {
    });

    res.send("cookies noticias eliminadas")
})

app.post("/eliminarCookieVideojuegos", async (req: express.Request, res: express.Response): Promise<void> => {

    // @ts-ignore
    req.session.pestanaActual = undefined;
    // @ts-ignore
    req.session.seleccionado = undefined;
    // @ts-ignore
    req.session.palabraJuegos = undefined;

    // @ts-ignore
    await req.session.save(function (err) {});

    res.send("cookies videojuegos eliminadas")
})

app.post("/eliminarTodasLasCookies", async (req: express.Request, res: express.Response): Promise<void> => {

    if (req.body.nombre === "noticias") {
        // @ts-ignore
        req.session.pestanaActual = undefined;
        // @ts-ignore
        req.session.seleccionado = undefined;
        // @ts-ignore
        req.session.palabraJuegos = undefined;
        // @ts-ignore
        req.session.pageWebs = undefined;
        // @ts-ignore
        req.session.seleccionadoWebs = undefined;
        // @ts-ignore
        req.session.rowsPerPageWebs = undefined;
        // @ts-ignore
        await req.session.save(function (err) {});
    }

    else if (req.body.nombre === "videojuegos" ) {
        // @ts-ignore
        req.session.rowsPerPage = undefined;
        // @ts-ignore
        req.session.page = undefined;
        // @ts-ignore
        req.session.palabra = undefined;
        // @ts-ignore
        req.session.pageWebs = undefined;
        // @ts-ignore
        req.session.seleccionadoWebs = undefined;
        // @ts-ignore
        req.session.rowsPerPageWebs = undefined;
        // @ts-ignore
        await req.session.save(function (err) {});
    }

    else if (req.body.nombre === "webs") {
        // @ts-ignore
        req.session.rowsPerPage = undefined;
        // @ts-ignore
        req.session.page = undefined;
        // @ts-ignore
        req.session.palabra = undefined;
        // @ts-ignore
        req.session.pestanaActual = undefined;
        // @ts-ignore
        req.session.seleccionado = undefined;
        // @ts-ignore
        req.session.palabraJuegos = undefined;
        // @ts-ignore
        await req.session.save(function (err) {});
    }

    else {
        // @ts-ignore
        req.session.pestanaActual = undefined;
        // @ts-ignore
        req.session.seleccionado = undefined;
        // @ts-ignore
        req.session.palabraJuegos = undefined;
        // @ts-ignore
        req.session.pageWebs = undefined;
        // @ts-ignore
        req.session.seleccionadoWebs = undefined;
        // @ts-ignore
        req.session.rowsPerPageWebs = undefined;
        // @ts-ignore
        req.session.rowsPerPage = undefined;
        // @ts-ignore
        req.session.page = undefined;
        // @ts-ignore
        req.session.palabra = undefined;
        // @ts-ignore
        await req.session.save(function (err) {});
    }

    res.send("cookies eliminadas")
})


//Hay que importarlo
module.exports = router;