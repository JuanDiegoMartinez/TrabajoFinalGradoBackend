import express from "express";
import {app} from '../../server';
import {buscarNoticiasPorPalabra, obtenerNoticia, obtenerTodasLasNoticias} from "../../ddbb/news/PeticionesNews";
import {obtenerVideojuego} from "../../ddbb/videogames/PeticionesVideogames";

//Obtenemos el express.Router() que es un middleware que sirve de direccionador de routes
const router = express.Router();

//Obtener todas las noticias de la bbdd
app.get("/obtenerNoticias", async (req: express.Request, res: express.Response): Promise<void> => {

    // @ts-ignore
    const palabra = req.session.palabra;
    // @ts-ignore
    const page = req.session.page;
    // @ts-ignore
    const rowsPerPage = req.session.rowsPerPage;

    // @ts-ignore
    const noticias = await obtenerTodasLasNoticias(palabra);

    const object = {
        noticias,
        palabra,
        page,
        rowsPerPage
    }

    res.send(object);
})

//Barra de búsqueda de noticias
app.post("/busquedaNoticias", async (req: express.Request, res: express.Response): Promise<void> => {

    // @ts-ignore
    req.session.palabra = req.body.palabra;
    //@ts-ignore
    req.session.page = 0;

    // @ts-ignore
    const palabra = req.session.palabra;
    // @ts-ignore
    const page = 0;
    // @ts-ignore
    const rowsPerPage = req.session.rowsPerPage;

    // @ts-ignore
    await req.session.save(function (err) {});

    const noticias = await buscarNoticiasPorPalabra(req.body.palabra);

    const object = {
        noticias,
        palabra,
        page,
        rowsPerPage
    }

    res.send(object);
})

//Obtener los datos de una noticia
app.post("/obtenerNoticia", async (req: express.Request, res: express.Response): Promise<void> => {

    const respuesta = await obtenerNoticia(req.body.slug);
    res.send(respuesta).json;
})

//Hay que importarlo
module.exports = router;