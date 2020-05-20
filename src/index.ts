import express from 'express';
import cors from 'cors';
import fileUpload from 'express-fileupload';
import {inicializarFirebase} from "./database";

// Inicializamos el servidor express
export const app = express();

// Opciones
app.set('port', 8080);

// Middlewares
//Cuando me envíen un json entenderlo
app.use(express.json());
//Cuando me envíen un formulario poder entenderlo
app.use(express.urlencoded({extended: true}));
//Para que me deje de molestar el cors
app.use(cors());
//Para poder enviar imagenes por express
app.use(fileUpload());

// Para obtener la referencia de la bd en otros archivos
export const firestore =  inicializarFirebase.firestore();
// Para obtener la referencia de auth
export const auth = inicializarFirebase.auth();

// Routes (Para que se puedan utilizar las routes en otros archivos)
//Le digo a express que hay rutas en ese archivo para que las use (app.use puedes poner la ruta que quieras)
const user = require("./routes/users/RoutesUsers");
app.use('/', user);

//Arrancar el servidor
app.listen(app.get('port'), () => {
   console.log("Servidor en el puerto ", app.get('port'));
});

//Al utilizar el comando tsc en consola te crea una carpeta(en mi caso build) con el código javascript traducido

//Json
//clean para eliminar la carpeta build
//build para transformar en código js
//start para iniciar el servidor
//ts:node permite ejecutar código ts sin convertir (no hace falta instalar ts-node)


//dependencias
//nodemon se entera de cualquier cambio en nuestro código y reinicia el servidor automáticamente

//nodemon.js
// watch es la carpeta que va a estar vigilando
// ext el tipo de extensión
// exec que nodemon funcione ejecutando ts-node en vez de node