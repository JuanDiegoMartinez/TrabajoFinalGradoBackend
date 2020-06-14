import express from "express";
import {app} from "../../server";
import {obtenerGenero, obtenerTodosLosGeneros} from "../../ddbb/genres/PeticionesGenres";

//Obtenemos el express.Router() que es un middleware que sirve de direccionador de routes
const router = express.Router();

//Obtener el listado de los generos
app.get("/obtenerGeneros", async (req: express.Request, res: express.Response): Promise<void> => {

    const generos = await obtenerTodosLosGeneros();
    res.send(generos);
})

//Obtener un género
app.post("/obtenerGenero", async (req: express.Request, res: express.Response): Promise<void> => {

    const respuesta = await obtenerGenero(req.body.genero);
    res.send(respuesta);
})

//Hay que importarlo
module.exports = router;