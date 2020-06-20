import {Web} from "../../models/interfaces/Web";
import Paginas from "../../models/mongoose/Paginas";
import Noticias from "../../models/mongoose/Noticias";
import {News} from "../../models/interfaces/News";
import Videojuegos from "../../models/mongoose/Videojuegos";
import {Videogame} from "../../models/interfaces/Videogame";

//Obtener todos los generos
export const obtenerWebs = async (seleccionado: string): Promise<any> => {

    if (seleccionado !== undefined) {

        let webs = await buscarWebs(seleccionado);
        return webs;
    }

    else {

        const webs = await Paginas.find({}, (err: any, webs: Web[]) => {});
        return webs;
    }


}

export const buscarWebs = async (seleccionado: string) : Promise<any> => {

    if (seleccionado === undefined) {

        let webs = await obtenerWebs(seleccionado);
        return webs;
    }

    else {

        const w = await Paginas.find({type: {$in: seleccionado } }, (err: any, webs: Web[]) => {

            let listaWebs: Web[] = [];

            webs.forEach((web: Web) => {

                listaWebs.push(web);
            })

            return listaWebs;
        })
        return w;
    }
}