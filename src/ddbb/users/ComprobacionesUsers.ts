import Usuarios from "../../models/mongoose/Usuarios";
import {UserComplete} from "../../models/interfaces/User";
import {Login} from "../../models/interfaces/Login";
import {auth} from "../../index";

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

//Comprueba que el usuario existe
export const compruebaLogin = async (data: Login) : Promise<boolean> =>  {

    let error = false;

    await auth.signInWithEmailAndPassword(data.email, data.password).catch(function (e) {
        error = true;
    });

    await auth.signOut();

    return error;
}