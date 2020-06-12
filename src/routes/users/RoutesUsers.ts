import express from 'express';
import {app} from '../../server';
import {addUser, compruebaAliasyEmail, login, obtenerDatosUsuario} from "../../ddbb/users/PeticionesUsers";
import {compruebaLogin} from "../../ddbb/users/ComprobacionesUsers";

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
    res.send(req.session.user);
});

//Recibe un Login para comprobar el login
app.post("/compruebaLogin", async (req: express.Request, res: express.Response) : Promise<any> => {
    const respuesta = await compruebaLogin(req.body);
    res.send(respuesta);
})

//Obtener la sesion del usuario para que se vea en el navbar
app.get("/session", async (req: express.Request, res: express.Response) : Promise<any> => {
    // @ts-ignore
    res.send({user: req.session.user, imagen: req.session.imagen});
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



app.post("/imagen2", async (req: express.Request, res: express.Response): Promise<any> => {

    // @ts-ignore
    console.log("soy la putisima imagen: ", req.files.pic);

    // @ts-ignore
    const imagen = req.files.pic;

    const camino = "C:\\Users\\JD\\Desktop\\GitHub\\TrabajoFinalGrado\\src\\res\\img\\imagen2.png";

    //const a = "C:\\Users\\JD\\Desktop\\GitHub\\TrabajoFinalGradoBackend\\src\\imagenes\\imagen2.png";

    // @ts-ignore
    imagen.mv(camino, function(err: any) {
        if (err)
            return res.status(500).send(err);

        res.send(camino);
    });
});

//Hay que importarlo
module.exports = router;