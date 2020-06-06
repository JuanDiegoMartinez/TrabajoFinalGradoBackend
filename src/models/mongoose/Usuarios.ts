import {Schema, model} from "mongoose";

const Usuarios = new Schema({
    user: {type: String},
    nombre: {type: String},
    email: {type: String},
    password: {type: String},
    nacimiento: {type: String},
    rutaImagen: {type: String},
    juegosFavoritos: {type: [String]},
    websFavoritas: {type: [String]}
    },
    {versionKey: false}
    )

export default model("Usuarios", Usuarios);