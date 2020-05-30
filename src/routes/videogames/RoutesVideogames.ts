import express from 'express';
import {app} from '../../index';
import axios from "axios";
import {COLLECTION_VIDEOJUEGOS} from "../../ddbb/Collections";
import {storeVideogame, Videogame} from "../../models/Videogame";

//Obtenemos el express.Router() que es un middleware que sirve de direccionador de routes
const router = express.Router();

app.get("/unicaPeticionApiVideojuegos", async (req: express.Request, res: express.Response) : Promise<any> => {

    const Axios = axios.create({
        baseURL: 'https://api.rawg.io/api'
    })

    //Bucle para cambiar la página ya que solo envía 40

    const response = await Axios.get("/games", {
        params: {
            page_size: 1
        }
    });

    //Pantallas
    const imagenes: string[] = [];

    response.data.results[0].short_screenshots.forEach((screen: any) => {
        imagenes.push(screen.image);
    })


    const slug = response.data.results[0].slug;

    const otraResponse = await Axios.get(`/games/${slug}`);

    const data = otraResponse.data;

    //Plataformas
    let plataformas: string[] = [];

    data.platforms.forEach((platform: any) => {
        plataformas.push(platform.platform.name);
    })

    //Tiendas
    let tiendas: storeVideogame[] = [];

    data.stores.forEach((store: any) => {
        tiendas.push({
            name: store.store.name,
            url: store.url
        })
    })

    //Desarrolladores
    let desarrolladores: string[] = [];

    data.developers.forEach((developer: any) => {
        desarrolladores.push(developer.name)
    })

    //Generos
    let generos: string[] = [];

    data.genres.forEach((genre: any) => {
        generos.push(genre.name);
    })

    //Etiquetas
    let etiquetas: string[] = [];

    data.tags.forEach((tag: any) => {

        if (tag.language == "eng") {
            etiquetas.push(tag.name);
        }
    })

    const videogame: Videogame = {
        name: data.name,
        slug: data.slug,
        urlImage: data.background_image,
        lanzamiento: data.released,
        description: data.description,
        metacritic: data.metacritic,
        urlMetacritic: data.metacritic_platforms[0].url,
        platforms: plataformas,
        genres: generos,
        stores: tiendas,
        developers: desarrolladores,
        clip: data.clip.clip,
        tags: etiquetas,
        screenshots: imagenes,
        website: data.website
    }

    await COLLECTION_VIDEOJUEGOS.doc("1").set(videogame);
});


//Hay que importarlo
module.exports = router;