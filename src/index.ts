import express from 'express';

const cors = require('cors');

// Inicializaciones
const app = express();

// Opciones
app.set('port', 8080);

// Middlewares

//Cuando me envíen un json entenderlo
app.use(express.json());
//Cuando me envíen un formulario poder entenderlo
app.use(express.urlencoded({extended: false}));
app.use(cors());

// Routes
app.post("/culo", (req : express.Request, res: express.Response) : void => {
   console.log(req.body);
   res.send("Hola estoy en el servidor");
});

// Static files

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