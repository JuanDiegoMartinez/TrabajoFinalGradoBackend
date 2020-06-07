import express from "express";
import {app} from '../../server';
import {buscarVideojuegosPorPalabra, obtenerTodosLosVideojuegos} from "../../ddbb/videogames/PeticionesVideogames";

//Obtenemos el express.Router() que es un middleware que sirve de direccionador de routes
const router = express.Router();

//Obtener todos los videojuegos de la bbdd
app.get("/obtenerVideojuegos", async (req: express.Request, res: express.Response): Promise<void> => {

    // @ts-ignore
    const palabra = req.session.palabraJuegos;

    const videojuegos = await obtenerTodosLosVideojuegos(palabra);

    const object = {
        videojuegos,
        palabra,
    }

    res.send(object);
})

//Barra de búsqueda de videojuegos
app.post("/busquedaVideojuegos", async (req: express.Request, res: express.Response): Promise<void> => {

    // @ts-ignore
    req.session.palabra = req.body.palabra;

    // @ts-ignore
    const palabra = req.session.palabraJuegos;

    // @ts-ignore
    await req.session.save(function (err) {});

    const videojuegos = await buscarVideojuegosPorPalabra(req.body.palabra);

    const object = {
        videojuegos,
        palabra,
    }

    res.send(object);
})

//Hay que importarlo
module.exports = router;