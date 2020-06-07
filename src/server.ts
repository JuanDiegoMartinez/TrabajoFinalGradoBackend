import express from "express";
import fileUpload = require("express-fileupload");
import session = require("express-session");

//Inicializamos el servidor express
export const app = express();

// Opciones
app.set('port', 5000);

// Middlewares
//Cuando me envíen un json entenderlo
app.use(express.json());
//Cuando me envíen un formulario poder entenderlo
app.use(express.urlencoded({extended: true}));
//Para poder enviar imagenes por express
app.use(fileUpload());
//Para utilizar sesiones
app.use(session({
    secret: 'secreto',
    resave: true,
    saveUninitialized: true,
}));

// Routes (Para que se puedan utilizar las routes en otros archivos)
//Le digo a express que hay rutas en ese archivo para que las use (app.use puedes poner la ruta que quieras)

const peticionesUnicas = require("./peticionesUnicas");
app.use("/", peticionesUnicas);
const user = require("./routes/users/RoutesUsers");
app.use('/user', user);
const news = require("./routes/news/RoutesNews");
app.use('/news', news);
const videogames = require("./routes/videogames/RoutesVideogames");
app.use("/videogames", videogames);
const cookies = require("./routes/cookies/RoutesCookies");
app.use("/cookies", cookies);


