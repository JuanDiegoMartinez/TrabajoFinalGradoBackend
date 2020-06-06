import {inicializarFirebase} from "./firebase";
import * as path from "path";
import {app} from './server';

require("./database");

// Para obtener la referencia de auth
export const auth = inicializarFirebase.auth();

//Arrancar el servidor
app.listen(app.get('port'), () => {
   console.log("Servidor en el puerto ", app.get('port'));
});

// Handles any requests that don't match the ones above
app.get('*', (req: any,res: any) =>{
   res.sendFile(path.join(__dirname+'/client/build/index.html'));
});

/////////////////////////////////////////////////////////////////////////////////////////////
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