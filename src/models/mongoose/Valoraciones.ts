import {Schema, model} from "mongoose";

const Valoraciones = new Schema({
        user: {type: String},
        slug: {type: String},
        comment: {type: String},
        rating: {type: Number},
    },
    {versionKey: false}
)

export default model("Valoraciones", Valoraciones);