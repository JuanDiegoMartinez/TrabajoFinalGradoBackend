import {Genre, PartialGenre} from "../../models/interfaces/Genre";
import Generos from "../../models/mongoose/Generos";
import Videojuegos from "../../models/mongoose/Videojuegos";
import {Videogame} from "../../models/interfaces/Videogame";

//Obtener todos los generos
export const obtenerTodosLosGeneros = async (): Promise<any> => {

    const generos = await Generos.find({}, null)

    return generos;
}

//Obtener el género
export const obtenerGenero = async (genero: string): Promise<any> => {

    const generos = await Generos.find({name: genero}, (err: any, genres: Genre[]) => {

        return genres;

    })

    let listaJuegos: any[] = [];

    // @ts-ignore
    const juegos = await Videojuegos.find({genres: {$in: genero } }, null, {limit: 3});

    juegos.forEach((juego: any) => {
        listaJuegos.push({name: juego.name, urlImage: juego.urlImage, slug: juego.slug})
    })

    return {generos, listaJuegos};
}