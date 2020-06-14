import {Web} from "../../models/interfaces/Web";
import Paginas from "../../models/mongoose/Paginas";

//Obtener todos los generos
export const obtenerWebs = async (): Promise<any> => {

    const webs = await Paginas.find({}, (err: any, webs: Web[]) => {})

    return webs;
}