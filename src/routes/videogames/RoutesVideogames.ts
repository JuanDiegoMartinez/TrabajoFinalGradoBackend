import express from 'express';
import {app} from '../../index';
import axios from "axios";
import {COLLECTION_VIDEOJUEGOS} from "../../ddbb/Collections";
import {storeVideogame, Videogame} from "../../models/Videogame";

//Obtenemos el express.Router() que es un middleware que sirve de direccionador de routes
const router = express.Router();

app.get("/unicaPeticionApiVideojuegos", async (req: express.Request, res: express.Response) : Promise<any> => {

    console.log("eliminar")
});


//Hay que importarlo
module.exports = router;