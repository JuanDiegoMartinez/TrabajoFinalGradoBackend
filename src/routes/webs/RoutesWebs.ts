import express from "express";
import {app} from "../../server";
import {buscarWebs, obtenerWebs} from "../../ddbb/webs/PeticionesWebs";

//Obtenemos el express.Router() que es un middleware que sirve de direccionador de routes
const router = express.Router();

//Obtener el listado de las webs
app.get("/obtenerWebs", async (req: express.Request, res: express.Response): Promise<void> => {

    // @ts-ignore
    const page = req.session.page;
    // @ts-ignore
    const rowsPerPage = req.session.rowsPerPage;
    // @ts-ignore
    const seleccionado = req.session.seleccionadoWebs;

    const webs = await obtenerWebs(seleccionado);

    const object = {
        webs,
        seleccionado,
        page,
        rowsPerPage
    }

    res.send(object);
})

//Barra de búsqueda de noticias
app.post("/busquedaWebs", async (req: express.Request, res: express.Response): Promise<void> => {

    // @ts-ignore
    req.session.seleccionadoWebs = req.body.seleccionado;
    //@ts-ignore
    req.session.page = 0;

    // @ts-ignore
    const page = 0;
    // @ts-ignore
    const rowsPerPage = req.session.rowsPerPage;
    // @ts-ignore
    const seleccionado = req.session.seleccionadoWebs;

    // @ts-ignore
    await req.session.save(function (err) {});

    const webs = await buscarWebs(req.body.seleccionado);

    const object = {
        webs,
        seleccionado,
        page,
        rowsPerPage
    }

    res.send(object);
})

//Hay que importarlo
module.exports = router;