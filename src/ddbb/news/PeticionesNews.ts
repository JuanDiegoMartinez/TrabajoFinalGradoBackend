import {News} from "../../models/interfaces/News";
import Noticias from "../../models/mongoose/Noticias";

// @ts-ignore
export const obtenerTodasLasNoticias = async (palabra: string): Promise<News[]> => {

    let listaNoticias: News[] = [];

    if (palabra !== "" && palabra !== undefined) {

        listaNoticias = await buscarNoticiasPorPalabra(palabra)
    }

    else {

        await Noticias.find({}, (err: any, noticias: News[]) => {

            listaNoticias = noticias;
        })
    }

    return listaNoticias;
}

export const buscarNoticiasPorPalabra = async (palabra: string) => {

    let listaNoticias: News[] = [];

    if (palabra === "" || palabra === undefined) {

        listaNoticias = await obtenerTodasLasNoticias("");
    }

    else {

        await Noticias.find({title: { $regex: '.*' + palabra + '.*' } }, (err: any, noticias: News[]) => {

            listaNoticias = noticias;
        });
    }

    return listaNoticias;
}