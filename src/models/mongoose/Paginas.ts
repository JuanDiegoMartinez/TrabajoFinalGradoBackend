import {Schema, model} from "mongoose";

const Paginas = new Schema({
        name: {type: String},
        description: {type: String},
        urlImage: {type: String},
        urlWeb: {type: String},
        type: {type: [String]}
    },
    {versionKey: false}
)

export default model("Paginas", Paginas);