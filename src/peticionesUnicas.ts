import axios from "axios";
import {storeVideogame, Videogame} from "./models/interfaces/Videogame";
import express from "express";
import {app} from './server'
import {News} from "./models/interfaces/News";
import Noticias from "./models/mongoose/Noticias";
import Videojuegos from "./models/mongoose/Videojuegos";

// Api noticias
const NewsAPI = require('newsapi');
export const newsapi = new NewsAPI('4cc63e54f7ee4987b41f8b3f23b3e663');

//Obtenemos el express.Router() que es un middleware que sirve de direccionador de routes
const router = express.Router();

const exec = require('child_process').exec;

app.get("/unicaPeticionApi", async (req: express.Request, res: express.Response): Promise<void> => {

    await obtenerNoticiasApi();
    await obtenerVideojuegosApi();

})

//Obtener noticias de la api
const obtenerNoticiasApi = async (): Promise<void> => {

    //Borramos las noticias de la bbdd
    Noticias.collection.drop()
        .catch((err: any) => {
            console.log(err.message);
        });

    //Obtenemos las últimas noticias
    const response = await newsapi.v2.topHeadlines({
        category: 'technology',
        country: 'mx',
        pageSize: 100
    })

    response.articles.forEach((articulo: any) => {

        const command = `curl ${articulo.url} | unfluff`;

        exec(command, (error: any, stdout: any, stderr: any) => {

            let noticia: News = {
                author: articulo.author,
                title: articulo.title,
                slug: "",
                description: articulo.description,
                urlNews: articulo.url,
                urlImage: articulo.urlToImage,
                published: articulo.publishedAt.substring(0, 10),
                content: ""
            }

            //Obtenemos toda la noticia
            let texto = JSON.parse(stdout);

            if (texto.text !== "") {

                if (articulo.author === null) {
                    noticia.author = "Anónimo"
                }

                let textoTroceado = texto.text.split('\n');
                let contenidoNoticia = "";

                textoTroceado.forEach((elem: any) => {

                    if (elem.length > 0) {
                        contenidoNoticia += elem + "<br/><br/>";
                    }
                })

                let palabraMinusculas = articulo.title.toLowerCase();
                let arrayPalabra = palabraMinusculas.split(' ');

                let palabraSlug = "";

                for (let i = 0; i < arrayPalabra.length - 1; i++) {
                    palabraSlug += arrayPalabra[i] + "-";
                }

                palabraSlug += arrayPalabra[arrayPalabra.length - 1];

                noticia.slug = palabraSlug;

                noticia.content = contenidoNoticia;

                let Noticia = new Noticias(noticia);
                Noticia.save();
            }
        });
    })
}

//Obtener los videojuego de la api
const obtenerVideojuegosApi = async (): Promise<void> => {

    //Borramos las noticias de la bbdd
    await Videojuegos.collection.drop()
        .catch((err: any) => {
            console.log(err.message);
        });

    const Axios = axios.create({
        baseURL: 'https://api.rawg.io/api'
    })

    //Bucle para cambiar la página ya que solo envía 40
    for (let i = 1; i <= 3; i++) {

        const response = await Axios.get("/games", {
            params: {
                page_size: 40,
                page: i
            }
        });

        //Lista de videojuegos devuelta por la api
        const arrayJuegos = response.data.results;

        arrayJuegos.forEach(async (juego: any) => {

            //Pantallas
            const imagenes: string[] = [];

            for(let i = 1; i < juego.short_screenshots.length; i++) {
                imagenes.push(juego.short_screenshots[i].image)
            }

            //Obtenemos el nombre del juego para obtener sus otros datos
            const slug = juego.slug;

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

            //Editores
            let editores: string[] = [];

            data.publishers.forEach((publisher:any) => {
                editores.push(publisher.name)
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

            //Metacritic
            let urlCritica = "N/A";

            if (data.metacritic_platforms[0] !== undefined) {
                urlCritica = data.metacritic_platforms[0].url
            }

            //Clip
            let video = "N/A"

            if (data.clip !== null) {
                video = data.clip.clip;
            }

            const videogame: Videogame = {
                name: data.name,
                slug: data.slug,
                urlImage: data.background_image,
                lanzamiento: data.released,
                description: data.description,
                metacritic: data.metacritic,
                urlMetacritic: urlCritica,
                platforms: plataformas,
                genres: generos,
                stores: tiendas,
                developers: desarrolladores,
                clip: video,
                tags: etiquetas,
                screenshots: imagenes,
                website: data.website,
                publishers: editores
            }

            let Videojuego = new Videojuegos(videogame);
            Videojuego.save();
        });
    }
}

//Hay que importarlo
module.exports = router;

