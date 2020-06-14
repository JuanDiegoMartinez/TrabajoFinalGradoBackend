import express from "express";
import {app} from "../../server";
import {obtenerEditor, obtenerTodosLosEditores} from "../../ddbb/publishers/PeticionesPublishers";

//Obtenemos el express.Router() que es un middleware que sirve de direccionador de routes
const router = express.Router();

//Obtener el listado de los editores
app.get("/obtenerEditores", async (req: express.Request, res: express.Response): Promise<void> => {

    const editores = await obtenerTodosLosEditores();
    res.send(editores);
})

//Obtener un editor
app.post("/obtenerEditor", async (req: express.Request, res: express.Response): Promise<void> => {

    const respuesta = await obtenerEditor(req.body.editor);
    res.send(respuesta);
})

//Hay que importarlo
module.exports = router;