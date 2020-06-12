import {Schema, model} from "mongoose";

const Valoraciones = new Schema({
        user: {type: String},
        image: {type: String},
        slug: {type: String},
        comment: {type: String},
        rating: {type: Number},
        date: {type: String}
    },
    {versionKey: false}
)

export default model("Valoraciones", Valoraciones);