import Videojuegos from "../../models/mongoose/Videojuegos";
import {Videogame} from "../../models/interfaces/Videogame";
import {PartialPublisher, Publisher} from "../../models/interfaces/Publisher";
import Editores from "../../models/mongoose/Editores";

//Obtener todos los editores
export const obtenerTodosLosEditores = async (): Promise<any> => {

    let listaEditores: PartialPublisher[] = [];

    const editores = await Editores.find({}, (err: any, editores: Publisher[]) => {

        editores.forEach((editor: Publisher) => {
            listaEditores.push({name: editor.name, urlImage: editor.urlImage})
        })
    })

    return listaEditores;
}

//Obtener el editor
export const obtenerEditor = async (editor: string): Promise<any> => {

    const editores = await Editores.find({name: editor}, (err: any, publishers: Publisher[]) => {

        return publishers;

    })

    let listaJuegos: any[] = [];

    // @ts-ignore
    const juegos = await Videojuegos.find({slug: editores[0].juegos}, (err: any, games: Videogame[]) => {});

    // @ts-ignore
    juegos.forEach((juego: Videogame) => {
        listaJuegos.push({name: juego.name, urlImage: juego.urlImage, slug: juego.slug});
    })

    return {editores, listaJuegos};
}