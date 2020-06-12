import {UserComplete, UserRegister} from "../../models/interfaces/User";
import {compruebaEmail, compruebaUser} from "./ComprobacionesUsers";
import {auth} from "../../index";
import Usuarios from "../../models/mongoose/Usuarios";
import {Login} from "../../models/interfaces/Login";
import {Valoracion} from "../../models/interfaces/Valoracion";
import Valoraciones from "../../models/mongoose/Valoraciones";

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
    let user: UserComplete = {...data, rutaImagen: "/broken-image.jpg", juegosFavoritos: [], websFavoritas: []};
    let nuevoUsuario = new Usuarios(user);
    const a = await nuevoUsuario.save();
    return true;
};

//Maneja el login de los usuarios
export const login = async (data: Login): Promise<any> => {

    let error = false;
    let user = undefined;
    let imagen = undefined;

    const a = await auth.signInWithEmailAndPassword(data.email, data.password).catch(function (e) {
        error = true;
    });

    if (!error) {

        const b = await Usuarios.find({email: data.email}, (err: any, usuarios: UserComplete[]) => {
            user = usuarios[0].user;
            imagen = usuarios[0].rutaImagen;
        });
    }
    return {user, imagen};
}

//Obtener los datos y comentarios del usuario
export const obtenerDatosUsuario = async (usuario: string): Promise<any> => {

    const datosUsuario = await Usuarios.find({user: usuario}, (err: any, usuarios: UserComplete[]) => {
        return usuarios;
    });

    const valoraciones = await Valoraciones.find({user: { $eq: usuario } }, (err: any, valoracions: Valoracion[]) => {
        return valoracions;
    });

    let UserData  = {
        user: datosUsuario[0],
        comentarios: valoraciones
    }

    return UserData;
}