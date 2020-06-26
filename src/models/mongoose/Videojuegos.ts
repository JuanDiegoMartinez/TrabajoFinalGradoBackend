import {Schema, model} from "mongoose";

const Videojuegos = new Schema({
    name: {type: String},
    slug: {type: String},
    urlImage: {type: String},
    lanzamiento: {type: String},
    description: {type: String},
    metacritic: {type: String},
    urlMetacritic: {type: String},
    platforms: {type: [String]},
    genres: {type: [String]},
    stores: {type: [{}]},
    developers: {type: [String]},
    clip: {type: String},
    tags: {type: [String]},
    screenshots: {type: [String]},
    website: {type: String},
    publishers: {type: [String]}
    },
    {versionKey: false}
    )

export default model("Videojuegos", Videojuegos);