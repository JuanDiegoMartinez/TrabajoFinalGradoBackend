import {News, PartialNews} from "../../models/interfaces/News";
import Noticias from "../../models/mongoose/Noticias";
import Videojuegos from "../../models/mongoose/Videojuegos";
import {Videogame} from "../../models/interfaces/Videogame";
import Valoraciones from "../../models/mongoose/Valoraciones";
import {Valoracion} from "../../models/interfaces/Valoracion";

export const obtenerTodasLasNoticias = async (palabra: string): Promise<PartialNews[]> => {

    let listaNoticias: PartialNews[] = [];

    if (palabra !== "" && palabra !== undefined) {

        listaNoticias = await buscarNoticiasPorPalabra(palabra)
    }

    else {

         const a = await Noticias.find({}, (err: any, noticias: News[]) => {

             let lista: PartialNews[] = [];

            noticias.forEach((noticia: News) => {

                lista.push({title: noticia.title, slug: noticia.slug, description: noticia.description, urlImage: noticia.urlImage});
            })
             return lista
        })
        // @ts-ignore
        return a;
    }

    return listaNoticias;
}

export const buscarNoticiasPorPalabra = async (palabra: string): Promise<PartialNews[]> => {

    let listaNoticias: PartialNews[] = [];

    if (palabra === "" || palabra === undefined) {

        listaNoticias = await obtenerTodasLasNoticias("");
    }

    else {

        let palabraMinusculas = palabra.toLowerCase();
        let arrayPalabra = palabraMinusculas.split(' ');

        let palabraSlug = "";

        for (let i = 0; i < arrayPalabra.length - 1; i++) {
            palabraSlug += arrayPalabra[i] + "-";
        }

        palabraSlug += arrayPalabra[arrayPalabra.length - 1];

        const a = await Noticias.find({slug: { $regex: '.*' + palabraSlug + '.*' } }, (err: any, noticias: News[]) => {

            let lista: PartialNews[] = [];

            noticias.forEach((noticia: News) => {

                lista.push({title: noticia.title, slug: noticia.slug, description: noticia.description, urlImage: noticia.urlImage});
            })
            return lista;
        });
        // @ts-ignore
        return a;
    }

    return listaNoticias;
}

export const obtenerNoticia = async (slug: string): Promise<any> => {

    const noticia = await Noticias.find({slug: { $regex: '.*' + slug + '.*' } }, null);

    return {noticia};
}
