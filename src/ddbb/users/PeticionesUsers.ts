import {UserComplete, UserRegister} from "../../models/interfaces/User";
import {compruebaEmail, compruebaUser} from "./ComprobacionesUsers";
import {auth} from "../../index";
import Usuarios from "../../models/mongoose/Usuarios";

//Comprueba que el alias y email del usuario no estén cogidos
export const compruebaAliasyEmail = async (alias: string, email: string): Promise<{estaAlias: boolean, estaEmail: boolean}> => {

    //Comprueba si el alias del usuario está en la bbdd
    let estaAlias = await compruebaUser(alias);
    //Comprueba si el email del usuario está en la bbdd
    let estaEmail = await compruebaEmail(email);

    return {estaAlias, estaEmail};
}

//Maneja el añadir un nuevo usuario en la bbdd
export const addUser = async (data: UserRegister): Promise<boolean> => {

    await auth.createUserWithEmailAndPassword(data.email, data.password);
    data.password = "******";
    let user: UserComplete = {...data, rutaImagen: "", juegosFavoritos: [], websFavoritas: []};
    let nuevoUsuario = new Usuarios(user);
    await nuevoUsuario.save();
    return true;
};

/*
//Maneja el login de los usuarios
export const login = async (data: Login): Promise<any> => {

    let error = false;
    let user = undefined;

    await auth.signInWithEmailAndPassword(data.email, data.password).catch(function (e) {
        error = true;
    });

    if (!error) {
        await COLLECTION_USUARIOS.where('email', '==', data.email).get().then(function(querySnapshot) {

            querySnapshot.forEach((object: any) => {
                user = object.data();
            })
        });
    }

    return user;
}
 */