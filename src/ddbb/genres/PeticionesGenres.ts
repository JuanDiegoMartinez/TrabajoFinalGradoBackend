import {Genre, PartialGenre} from "../../models/interfaces/Genre";
import Generos from "../../models/mongoose/Generos";
import Videojuegos from "../../models/mongoose/Videojuegos";
import {Videogame} from "../../models/interfaces/Videogame";

//Obtener todos los generos
export const obtenerTodosLosGeneros = async (): Promise<any> => {

    let listaGeneros: PartialGenre[] = [];

    const generos = await Generos.find({}, (err: any, generos: Genre[]) => {

        generos.forEach((genero: Genre) => {
            listaGeneros.push({name: genero.name, urlImage: genero.urlImage})
        })
    })

    return listaGeneros;
}

//Obtener el género
export const obtenerGenero = async (genero: string): Promise<any> => {

    const generos = await Generos.find({name: genero}, (err: any, genres: Genre[]) => {

        return genres;

    })

    let listaJuegos: any[] = [];

    // @ts-ignore
    const juegos = await Videojuegos.find({slug: generos[0].juegos}, (err: any, games: Videogame[]) => {});

    // @ts-ignore
    juegos.forEach((juego: Videogame) => {
        listaJuegos.push({name: juego.name, urlImage: juego.urlImage, slug: juego.slug});
    })

    return {generos, listaJuegos};
}