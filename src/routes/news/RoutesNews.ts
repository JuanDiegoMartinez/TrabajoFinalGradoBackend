import express from "express";
import {app} from '../../index';
import {comprobarFecha} from "../../ddbb/news/ComprobacionesNews";
import {obtenerUltimasNoticias, pedirNoticiasApi} from "../../ddbb/news/PeticionesNews";

//Obtenemos el express.Router() que es un middleware que sirve de direccionador de routes
const router = express.Router();

//Obtener las últimas noticias
app.get("/ultimasNoticias", async (req: express.Request, res: express.Response): Promise<void> => {

    //Comprobar si están en la bbdd
    const llamadaApi = await comprobarFecha();

    if (llamadaApi) {
        await pedirNoticiasApi();
        await sleep(3500);
    }

    const respuesta = await obtenerUltimasNoticias();

    res.send(respuesta);
})

function sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

//Hay que importarlo
module.exports = router;