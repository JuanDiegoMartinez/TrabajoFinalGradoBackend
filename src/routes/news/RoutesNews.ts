import express from "express";
import {app} from '../../index';
import {buscarNoticias, obtenerUltimasNoticias} from "../../ddbb/news/PeticionesNews";

//Obtenemos el express.Router() que es un middleware que sirve de direccionador de routes
const router = express.Router();

//Obtener todas las noticias de la bbdd
app.post("/obtenerNoticias", async (req: express.Request, res: express.Response): Promise<void> => {

    console.log(req.body.page);

    // @ts-ignore
    req.session.page = req.body .page;

    const respuesta = await obtenerUltimasNoticias();

    res.send(respuesta);
})

//Barra de búsqueda de noticias
app.get("/busquedaNoticias", async (req: express.Request, res: express.Response): Promise<void> => {

    // @ts-ignore
    console.log("me han llamado: ", req.session.page);
    const respuesta = await buscarNoticias();

    res.send(respuesta);
})



//Hay que importarlo
module.exports = router;