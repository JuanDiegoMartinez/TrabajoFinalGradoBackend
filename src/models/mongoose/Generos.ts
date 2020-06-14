import {Schema, model} from "mongoose";

const Generos = new Schema({
        name: {type: String},
        description: {type: String},
        urlImage: {type: String},
        juegos: {type: [String]},
    },
    {versionKey: false}
)

export default model("Generos", Generos);