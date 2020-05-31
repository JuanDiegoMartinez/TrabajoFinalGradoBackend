import axios from "axios";
import {storeVideogame, Videogame} from "./models/Videogame";
import {COLLECTION_VIDEOJUEGOS} from "./ddbb/Collections";

export const obtenerVideojuegos = async () => {

    const Axios = axios.create({
        baseURL: 'https://api.rawg.io/api'
    })

    let contador = 0;

    //Bucle para cambiar la página ya que solo envía 40
    for (let i = 1; i < 5; i++) {

        const response = await Axios.get("/games", {
            params: {
                page_size: 1,
                page: i
            }
        });

        //Lista de videojuegos devuelta por la api
        const arrayJuegos = response.data.results;

        arrayJuegos.forEach(async (juego: any) => {

            //Pantallas
            const imagenes: string[] = [];

            juego.short_screenshots.forEach((screen: any) => {
                imagenes.push(screen.image);
            })

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

            let contadorString = contador.toString();
            await COLLECTION_VIDEOJUEGOS.doc(contadorString).set(videogame);
            contador++;
        });
    }
}