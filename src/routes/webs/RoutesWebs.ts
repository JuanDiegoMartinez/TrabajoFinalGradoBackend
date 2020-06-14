import express from "express";
import {app} from "../../server";
import {obtenerWebs} from "../../ddbb/webs/PeticionesWebs";

//Obtenemos el express.Router() que es un middleware que sirve de direccionador de routes
const router = express.Router();

//Obtener el listado de las webs
app.get("/obtenerWebs", async (req: express.Request, res: express.Response): Promise<void> => {

    const webs = await obtenerWebs();
    res.send(webs);
})

//Hay que importarlo
module.exports = router;