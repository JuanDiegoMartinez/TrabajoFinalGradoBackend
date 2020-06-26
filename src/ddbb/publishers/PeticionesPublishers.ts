import Videojuegos from "../../models/mongoose/Videojuegos";
import {Videogame} from "../../models/interfaces/Videogame";
import {PartialPublisher, Publisher} from "../../models/interfaces/Publisher";
import Editores from "../../models/mongoose/Editores";

//Obtener todos los editores
export const obtenerTodosLosEditores = async (): Promise<any> => {

    const editores = await Editores.find({}, null);

    return editores;
}

//Obtener el editor
export const obtenerEditor = async (editor: string): Promise<any> => {

    const editores = await Editores.find({name: editor}, (err: any, publishers: Publisher[]) => {

        return publishers;

    })

    let listaJuegos: any[] = [];

    // @ts-ignore
    const juegos = await Videojuegos.find({publishers: {$in: editor } }, null, {limit: 3});

    juegos.forEach((juego: any) => {
        listaJuegos.push({name: juego.name, urlImage: juego.urlImage, slug: juego.slug});
    })

    return {editores, listaJuegos};
}