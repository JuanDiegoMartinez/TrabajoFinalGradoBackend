import {Schema, model} from "mongoose";

const Noticias = new Schema({
    author: {type: String},
    title: {type: String},
    slug: {type: String},
    description: {type: String},
    urlNews: {type: String},
    urlImage: {type: String},
    published: {type: String},
    content: {type: String},
    },
    {versionKey: false}
    )

export default model("Noticias", Noticias);