import {Schema, model} from "mongoose";

const Editores = new Schema({
        name: {type: String},
        description: {type: String},
        urlImage: {type: String},
        juegos: {type: [String]},
    },
    {versionKey: false}
)

export default model("Editores", Editores);