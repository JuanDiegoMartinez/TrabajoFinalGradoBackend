import {PartialVideogame, Videogame} from "../../models/interfaces/Videogame";
import Videojuegos from "../../models/mongoose/Videojuegos";
import {Valoracion} from "../../models/interfaces/Valoracion";
import Valoraciones from "../../models/mongoose/Valoraciones";
import Usuarios from "../../models/mongoose/Usuarios";

export const obtenerTodosLosVideojuegos = async (palabra: string | undefined, pestanaActual: number | undefined, seleccionado: string | undefined): Promise<PartialVideogame[]> => {

    let listaVideojuegos: PartialVideogame[] = [];

    if ( (palabra !== undefined) || (pestanaActual !== undefined && seleccionado !== undefined)) {

        listaVideojuegos = await buscarVideojuegosPorPalabra(palabra, pestanaActual, seleccionado)
    }

    else {

        const a = await Videojuegos.find({}, (err: any, videojuegos: Videogame[]) => {

            let lista: PartialVideogame[] = [];

            videojuegos.forEach((videojuego: Videogame) => {

                listaVideojuegos.push({name: videojuego.name, lanzamiento: videojuego.lanzamiento, platforms: videojuego.platforms, urlImage: videojuego.urlImage, slug: videojuego.slug});
            })

            return lista;
        })
        // @ts-ignore
        return a;
    }
    return listaVideojuegos;
}

export const buscarVideojuegosPorPalabra = async (palabra: string | undefined, pestanaActual: number | undefined, seleccionado: string | undefined): Promise<PartialVideogame[]> => {

    let listaVideojuegos: PartialVideogame[] = [];

    if (palabra !== undefined) {

        let palabraMinusculas = palabra.toLowerCase();
        let arrayPalabra = palabraMinusculas.split(' ');

        let palabraSlug = "";

        for (let i = 0; i < arrayPalabra.length - 1; i++) {
            palabraSlug += arrayPalabra[i] + "-";
        }

        palabraSlug += arrayPalabra[arrayPalabra.length - 1];

        await Videojuegos.find({slug: { $regex: '.*' + palabraSlug + '.*' } }, (err: any, videojuegos: Videogame[]) => {

            videojuegos.forEach((videojuego: Videogame) => {

                listaVideojuegos.push({name: videojuego.name, lanzamiento: videojuego.lanzamiento, platforms: videojuego.platforms, urlImage: videojuego.urlImage, slug: videojuego.slug});
            })
        });
    }

    else if (pestanaActual !== undefined && seleccionado !== undefined) {

        //Géneros
        if (pestanaActual === 0) {

            await Videojuegos.find({genres: {$in: seleccionado } }, (err: any, videojuegos: Videogame[]) => {

                videojuegos.forEach((videojuego: Videogame) => {

                    listaVideojuegos.push({name: videojuego.name, lanzamiento: videojuego.lanzamiento, platforms: videojuego.platforms, urlImage: videojuego.urlImage, slug: videojuego.slug});
                })
            })
        }

        //Plataformas
        else if (pestanaActual === 1) {

            await Videojuegos.find({platforms: {$in: seleccionado } }, (err: any, videojuegos: Videogame[]) => {

                videojuegos.forEach((videojuego: Videogame) => {

                    listaVideojuegos.push({name: videojuego.name, lanzamiento: videojuego.lanzamiento, platforms: videojuego.platforms, urlImage: videojuego.urlImage, slug: videojuego.slug});
                })
            })
        }

        //Desarrolladores
        else {

            await Videojuegos.find({developers: {$in: seleccionado } }, (err: any, videojuegos: Videogame[]) => {

                videojuegos.forEach((videojuego: Videogame) => {

                    listaVideojuegos.push({name: videojuego.name, lanzamiento: videojuego.lanzamiento, platforms: videojuego.platforms, urlImage: videojuego.urlImage, slug: videojuego.slug});
                })
            })
        }

    }

    else {

        listaVideojuegos = await obtenerTodosLosVideojuegos(undefined, undefined, undefined)

    }
    return listaVideojuegos;
}

export const obtenerVideojuego = async (slug: string): Promise<any> => {

    const videojuego = await Videojuegos.find({slug: { $eq: slug } }, (err: any, videojuegos: Videogame[]) => {

        return videojuegos;
    });

    const valoraciones = await Valoraciones.find({slug: { $eq: slug } }, (err: any, valoracions: Valoracion[]) => {

        return valoracions;
    });

    return {videojuego, valoraciones};
}

export const obtenerValoraciones = async (slug: string): Promise<any> => {

    const valoraciones = await Valoraciones.find({slug: { $eq: slug } }, (err: any, valoracions: Valoracion[]) => {

        return valoracions;
    });

    return valoraciones;
}

export const nuevoComentario = async (datos: Comment): Promise<boolean> => {
    let nuevoComentario = new Valoraciones(datos);
    await nuevoComentario.save();
    return true;
}

