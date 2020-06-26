import express from 'express';
import {app} from '../../server';
import {
    addUser,
    compruebaAliasyEmail,
    cambiarDatosUsuario,
    login,
    obtenerDatosUsuario,
    cambiarImagen,
    cambiarComentarios,
    obtenerFavoritos,
    modificarJuegosFavoritos,
    modificarWebsFavoritas
} from "../../ddbb/users/PeticionesUsers";
import {compruebaLogin} from "../../ddbb/users/ComprobacionesUsers";
import {auth} from "../../index";

//Obtenemos el express.Router() que es un middleware que sirve de direccionador de routes
const router = express.Router();

//Recibe el alias y el email de un nuevo usuario para comprobar que no sea igual
app.post("/compruebaAliasyEmail", async (req: express.Request, res: express.Response): Promise<any> => {
    const respuesta = await compruebaAliasyEmail(req.body.alias, req.body.email);
    res.send(respuesta);
})

//Recibe un UserRegister para registrar un usuario en la bbdd
app.post("/register", async (req: express.Request, res: express.Response) : Promise<any> => {
    const respuesta = await addUser(req.body);
    res.send(respuesta);
});

//Recibe un Login para iniciar sesión del usuario
app.post("/login", async (req: express.Request, res: express.Response) : Promise<any> => {

    const respuesta = await login(req.body);

    // @ts-ignore
    req.session.user = respuesta.user;

    // @ts-ignore
    req.session.imagen = respuesta.imagen;

    // @ts-ignore
    res.send({user: req.session.user, imagen: req.session.imagen, juegosFavoritos: respuesta.juegosFavoritos, websFavoritas: respuesta.websFavoritas});
});

//Recibe un Login para comprobar el login
app.post("/compruebaLogin", async (req: express.Request, res: express.Response) : Promise<any> => {
    const respuesta = await compruebaLogin(req.body);
    res.send(respuesta);
})

//Obtener la sesion del usuario para que se vea en el navbar
app.get("/session", async (req: express.Request, res: express.Response) : Promise<any> => {

    // @ts-ignore
    if (req.session.user !== undefined) {
        // @ts-ignore
        const respuesta = await obtenerFavoritos(req.session.user);
        // @ts-ignore
        res.send({user: req.session.user, imagen: respuesta[0].rutaImagen, juegosFavoritos: respuesta[0].juegosFavoritos, websFavoritas: respuesta[0].websFavoritas});
    }
    else {
        res.send({});
    }

});

//Cerrar la sesion del usuario
app.get("/cerrarSession", async (req: express.Request, res: express.Response) : Promise<any> => {

    // @ts-ignore
    req.session.user = undefined;

    await auth.signOut();

    // @ts-ignore
    res.send({});
});

//Obtener los datos del usuario para modificar
app.get("/obtenerDatosUsuario", async (req: express.Request, res: express.Response) : Promise<any> => {

    // @ts-ignore
    if (req.session.user !== undefined) {
        // @ts-ignore
        const respuesta = await obtenerDatosUsuario(req.session.user);
        res.send(respuesta);
    }
    else {
        res.send({user: {}, comentarios: [] });
    }

});

//Obtener los datos del usuario para modificar
app.post("/cambiarDatosUsuario", async (req: express.Request, res: express.Response) : Promise<any> => {
    // @ts-ignore
    const respuesta = await cambiarDatosUsuario(req.body);
    res.send(respuesta);
});

//Cambiar la imagen del usuario
app.post("/cambiarImagen", async (req: express.Request, res: express.Response) : Promise<any> => {
    // @ts-ignore
    const respuesta = await cambiarImagen(req.body.url, req.session.user);
    res.send(respuesta);
});

//Cambiar los comentarios del usuario
app.post("/cambiarComentarios", async (req: express.Request, res: express.Response) : Promise<any> => {
    // @ts-ignore
    const respuesta = await cambiarComentarios(req.body, req.session.user);
    res.send(respuesta);
});

// Recuperar la password del usuario
app.post("/recuperarPassword", async (req: express.Request, res: express.Response) : Promise<any> => {
    await auth.sendPasswordResetEmail(req.body.email).catch((err: any) => {console.log(err)});
})

// Modificar los juegos favoritos del usuario
app.post("/modificarJuegosFavoritos", async (req: express.Request, res: express.Response) : Promise<any> => {
    // @ts-ignore
    const respuesta = await modificarJuegosFavoritos(req.session.user, req.body);

    res.send("juegos favoritos modificados")
})

// Modificar los juegos favoritos del usuario
app.post("/modificarWebsFavoritas", async (req: express.Request, res: express.Response) : Promise<any> => {
    // @ts-ignore
    const respuesta = await modificarWebsFavoritas(req.session.user, req.body);

    res.send("webs favoritas modificadas")
})

//Hay que importarlo
module.exports = router;