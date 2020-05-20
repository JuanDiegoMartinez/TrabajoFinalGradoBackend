import {UserRegister} from "../../models/User";
import {compruebaEmail, compruebaUser} from "./ComprobacionesUsers";
import {COLLECTION_USUARIOS} from "../Collections";
import {auth} from "../../index";

//Comprueba que el alias y email del usuario no estén cogidos
export const compruebaAliasyEmail = async (alias: string, email: string): Promise<{}> => {

    //Comprueba si el alias del usuario está en la bbdd
    let estaAlias = await compruebaUser(alias);
    //Comprueba si el email del usuario está en la bbdd
    let estaEmail = await compruebaEmail(email);

    return {estaAlias, estaEmail};
}

//Maneja el añadir un nuevo usuario en la bbdd
export const addUser = async (data: UserRegister): Promise<any> => {

    await auth.createUserWithEmailAndPassword(data.email, data.password);
    data.password = "******";
    let usuario = await COLLECTION_USUARIOS.doc(data.user).set(data);
    //Poner los campos que faltan como rutaImagen
};