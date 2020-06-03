import express from 'express';
import {app} from '../../index';
import {addUser, compruebaAliasyEmail, login} from "../../ddbb/users/PeticionesUsers";

//Obtenemos el express.Router() que es un middleware que sirve de direccionador de routes
const router = express.Router();

//Recibe el alias y el email de un nuevo usuario para comprobar que no sea igual
app.post("/compruebaAliasyEmail", async (req: express.Request, res: express.Response): Promise<any> => {
    const respuesta = await compruebaAliasyEmail(req.body.alias, req.body.email);
    return res.send(respuesta);
})

//Recibe un UserRegister para registrar un usuario en la bbdd
app.post("/register", async (req: express.Request, res: express.Response) : Promise<express.Response> => {
    const respuesta = await addUser(req.body);
    return res.send(respuesta);
});

//Recibe un Login para iniciar sesión del usuario
app.post("/login", async (req: express.Request, res: express.Response) : Promise<express.Response> => {
    console.log("request.body: ", req.body);
    //const respuesta = await login(req.body);

    // @ts-ignore
    req.session.domain(".app.localhost");
    console.log("soy la session: ", req.session);
    // @ts-ignore
    req.session.userData = "hola";
    console.log("soy la session después de añadir datos: ", req.session);
    // @ts-ignore
    //console.log("respuesta: ", req.session.userData);
    return res.send(req.session.userData);
});

//Obtener la sesion del usuario
app.get("/session", async (req: express.Request, res: express.Response) : Promise<any> => {
    // @ts-ignore
    console.log("respuesta en sesion: ", req.session.userData);
    // @ts-ignore
    return res.send(req.session.userData);
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