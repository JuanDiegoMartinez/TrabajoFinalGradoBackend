import {PartialVideogame, Videogame} from "../../models/interfaces/Videogame";
import Videojuegos from "../../models/mongoose/Videojuegos";

export const obtenerTodosLosVideojuegos = async (palabra: string): Promise<PartialVideogame[]> => {

    let listaVideojuegos: PartialVideogame[] = [];

    if (palabra !== "" && palabra !== undefined) {

        listaVideojuegos = await buscarVideojuegosPorPalabra(palabra)
    }

    else {

        await Videojuegos.find({}, (err: any, videojuegos: Videogame[]) => {

            videojuegos.forEach((videojuego: Videogame) => {

                listaVideojuegos.push({name: videojuego.name, lanzamiento: videojuego.lanzamiento, platforms: videojuego.platforms, urlImage: videojuego.urlImage});
            })
        })
    }

    return listaVideojuegos;
}

export const buscarVideojuegosPorPalabra = async (palabra: string): Promise<PartialVideogame[]> => {

    let listaVideojuegos: PartialVideogame[] = [];

    if (palabra === "" || palabra === undefined) {

        listaVideojuegos = await obtenerTodosLosVideojuegos("");
    }

    else {

        let palabraMinusculas = palabra.toLowerCase();
        let arrayPalabra = palabraMinusculas.split(' ');

        let palabraSlug = "";

        for (let i = 0; i < arrayPalabra.length - 1; i++) {
            palabraSlug += arrayPalabra[i] + "-";
        }

        palabraSlug += arrayPalabra[arrayPalabra.length - 1];

        await Videojuegos.find({slug: { $regex: '.*' + palabraSlug + '.*' } }, (err: any, videojuegos: Videogame[]) => {

            videojuegos.forEach((videojuego: Videogame) => {

                listaVideojuegos.push({name: videojuego.name, lanzamiento: videojuego.lanzamiento, platforms: videojuego.platforms, urlImage: videojuego.urlImage});
            })
        });
    }

    return listaVideojuegos;
}