import Usuarios from "../../models/mongoose/Usuarios";
import {UserComplete} from "../../models/interfaces/User";

//Comprueba que el alias no está cogido
export const compruebaUser = async (user: string): Promise<boolean> => {

    let esta = false;

    await Usuarios.find({user: user}, (err: any, usuarios: UserComplete[]) => {

        if (usuarios.length >= 1) {
            esta = true;
        }
    });
    return esta;
}

//Comprueba que el email no esté cogido
export const compruebaEmail = async (email: string): Promise<boolean> => {

    let esta = false;

    await Usuarios.find({email: email}, (err: any, usuarios: UserComplete[]) => {

        if (usuarios.length >= 1) {
            esta = true;
        }
    });
    return esta;
}