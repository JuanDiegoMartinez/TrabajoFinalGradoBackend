import express from 'express';
import session from 'express-session';
import cors from 'cors';
import fileUpload from 'express-fileupload';
import {inicializarFirebase} from "./database";
import {obtenerVideojuegos} from "./peticionesUnicas";

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
//Para utilizar sesiones
app.use(session({
   secret: 'secreto',
   resave: true,
   saveUninitialized: true
}));

// Para obtener la referencia de la bd en otros archivos
export const firestore =  inicializarFirebase.firestore();
// Para obtener la referencia de auth
export const auth = inicializarFirebase.auth();

// Api noticias
const NewsAPI = require('newsapi');
export const newsapi = new NewsAPI('4cc63e54f7ee4987b41f8b3f23b3e663');

//Inicializar la bbdd con datos
//obtenerVideojuegos().then(r => {});


// Routes (Para que se puedan utilizar las routes en otros archivos)
//Le digo a express que hay rutas en ese archivo para que las use (app.use puedes poner la ruta que quieras)
const user = require("./routes/users/RoutesUsers");
app.use('/user', user);
const news = require("./routes/news/RoutesNews");
app.use('/news', news);
const videogames = require("./routes/videogames/RoutesVideogames");
app.use("/videogames", videogames);

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