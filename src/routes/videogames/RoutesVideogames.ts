import express from "express";
import {app} from '../../server';
import {
    buscarVideojuegosPorPalabra, nuevoComentario,
    obtenerTodosLosVideojuegos, obtenerValoraciones,
    obtenerVideojuego
} from "../../ddbb/videogames/PeticionesVideogames";

//Obtenemos el express.Router() que es un middleware que sirve de direccionador de routes
const router = express.Router();

//Obtener todos los videojuegos de la bbdd
app.get("/obtenerVideojuegos", async (req: express.Request, res: express.Response): Promise<void> => {

    // @ts-ignore
    const palabra = req.session.palabraJuegos;

    // @ts-ignore
    const pestanaActual = req.session.pestanaActual;

    // @ts-ignore
    const seleccionado = req.session.seleccionado;

    const videojuegos = await obtenerTodosLosVideojuegos(palabra, pestanaActual, seleccionado);

    const object = {
        videojuegos,
        palabra,
        pestanaActual,
        seleccionado
    }

    res.send(object);
})

//Barra de búsqueda de videojuegos
app.post("/busquedaVideojuegos", async (req: express.Request, res: express.Response): Promise<void> => {

    // @ts-ignore
    req.session.palabraJuegos = req.body.palabra;

    // @ts-ignore
    req.session.pestanaActual = req.body.pestanaActual;

    // @ts-ignore
    req.session.seleccionado = req.body.seleccionado;

    // @ts-ignore
    const palabra = req.session.palabraJuegos;

    // @ts-ignore
    const pestanaActual = req.session.pestanaActual;

    // @ts-ignore
    const seleccionado = req.session.seleccionado;

    // @ts-ignore
    await req.session.save(function (err) {});

    const videojuegos = await buscarVideojuegosPorPalabra(req.body.palabra, req.body.pestanaActual, req.body.seleccionado);

    const object = {
        videojuegos,
        palabra,
        pestanaActual,
        seleccionado
    }

    res.send(object);
})

//Obtener los datos de un videojuego y sus valoraciones
app.post("/obtenerVideojuego", async (req: express.Request, res: express.Response): Promise<void> => {

    const respuesta = await obtenerVideojuego(req.body.slug);
    res.send(respuesta).json;
})

//Obtener las valoraciones de un juego
app.post("/obtenerValoraciones", async (req: express.Request, res: express.Response): Promise<void> => {

    const respuesta = await obtenerValoraciones(req.body.slug);
    res.send(respuesta).json;
})

//Nuevo comentario
app.post("/newComment", async (req: express.Request, res: express.Response): Promise<any> => {

    const respuesta = await nuevoComentario(req.body);
    res.send(respuesta).json;
})

//Hay que importarlo
module.exports = router;