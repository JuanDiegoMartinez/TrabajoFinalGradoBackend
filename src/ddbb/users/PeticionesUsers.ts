import {UserComplete, UserRegister} from "../../models/interfaces/User";
import {compruebaEmail, compruebaUser} from "./ComprobacionesUsers";
import {auth} from "../../index";
import Usuarios from "../../models/mongoose/Usuarios";
import {Login} from "../../models/interfaces/Login";
import {Valoracion} from "../../models/interfaces/Valoracion";
import Valoraciones from "../../models/mongoose/Valoraciones";
import {admon} from "../../firebase";

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
    const imagenDefecto = "https://firebasestorage.googleapis.com/v0/b/basedatosfinal-495d6.appspot.com/o/default-user-image.png?alt=media&token=76b0f93c-32a1-4975-bd1c-a0cc4904a863";

    const juegosFavoritos = [{
        name: "Juegos Favoritos",
        id: "Juegos Favoritos",
        thumbnailUrl: null,
        isDir: true,
        childrenIds: [],
        parentId: null
    }]

    const websFavoritas = [{
        name: "Webs Favoritas",
        id: "Webs Favoritas",
        thumbnailUrl: null,
        isDir: true,
        childrenIds: [],
        parentId: null
    }]

    let user: UserComplete = {...data, rutaImagen: imagenDefecto, juegosFavoritos, websFavoritas};
    let nuevoUsuario = new Usuarios(user);
    const a = await nuevoUsuario.save();
    return true;
};

//Maneja el login de los usuarios
export const login = async (data: Login): Promise<any> => {

    let error = false;
    let user = undefined;
    let imagen = undefined;
    let juegosFavoritos = undefined;
    let websFavoritas = undefined;

    const a = await auth.signInWithEmailAndPassword(data.email, data.password).catch(function (e) {
        error = true;
    });

    if (!error) {

        const b = await Usuarios.find({email: data.email}, (err: any, usuarios: UserComplete[]) => {
            user = usuarios[0].user;
            imagen = usuarios[0].rutaImagen;
            juegosFavoritos = usuarios[0].juegosFavoritos;
            websFavoritas = usuarios[0].websFavoritas;
        });
    }
    return {user, imagen, juegosFavoritos, websFavoritas};
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

//Modificar los datos del usuario
export const cambiarDatosUsuario = async (datosUsuario: UserComplete): Promise<any> => {

    const userData = await Usuarios.updateOne({user: datosUsuario.user}, {$set: {email: datosUsuario.email, nombre: datosUsuario.nombre, password: datosUsuario.password,
    nacimiento: datosUsuario.nacimiento}});

    const valoraciones = await Valoraciones.find({user: { $eq: datosUsuario.user } }, (err: any, valoracions: Valoracion[]) => {
        return valoracions;
    });

    let UserData  = {
        user: datosUsuario,
        comentarios: valoraciones
    }

    // @ts-ignore
    await admon.auth().deleteUser(auth.currentUser.uid).catch((err: any) => {console.log(err)});
    await auth.createUserWithEmailAndPassword(datosUsuario.email, datosUsuario.password).catch((err: any) => {console.log(err)});
    await auth.signInWithEmailAndPassword(datosUsuario.email, datosUsuario.password);

    return UserData;
}

//Modificar la imagen del usuario
export const cambiarImagen = async (url: string, usuario: string): Promise<any> => {

    const userData = await Usuarios.updateOne({user: usuario}, {$set: {rutaImagen: url}});

    const a = await Valoraciones.updateMany({user: usuario}, {$set: {image: url}});

    return url;
}

//Modificar los comentarios del usuario
export const cambiarComentarios = async (comentarios: Valoracion[], usuario: string): Promise<any> => {

    comentarios.forEach( async (comentario: Valoracion) => {
        await Valoraciones.updateOne({user: usuario, slug: comentario.slug}, {$set: {comment: comentario.comment, rating: comentario.rating}})
    })

    return comentarios;
}

//Obtener los favoritos del usuario
export const obtenerFavoritos = async (usuario: string): Promise<any> => {

    const datosUsuario = await Usuarios.find({user: usuario}, (err: any, usuarios: UserComplete[]) => {
        return usuarios;
    });

    return datosUsuario;
}

//Modificar los juegos favoritos
export const modificarJuegosFavoritos = async (usuario: string, listaJuegos: any[]) => {

    const datosUsuario = await Usuarios.updateOne({user: usuario}, {$set: {juegosFavoritos: listaJuegos}});
}

//Modificar las webs favoritas
export const modificarWebsFavoritas = async (usuario: string, listaWebs: any[]) => {

    const datosUsuario = await Usuarios.updateOne({user: usuario}, {$set: {websFavoritas: listaWebs}});
}
