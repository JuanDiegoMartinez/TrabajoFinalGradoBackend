import {firestore} from "../index";

const USUARIOS = "usuarios";
const VALORACIONES = "valoraciones";
const VIDEOJUEGOS = "videojuegos";
const COMPANIAS = "companias";
const GENEROS = "generos";
const TEMAS = "temas";
const NOTICIAS = "noticias";
const WEBS = "webs";

export const COLLECTION_USUARIOS = firestore.collection(USUARIOS);
export const COLLECTION_VALORACIONES = firestore.collection(VALORACIONES);
export const COLLECTION_VIDEOJUEGOS = firestore.collection(VIDEOJUEGOS);
export const COLLECTION_COMPANIA = firestore.collection(COMPANIAS);
export const COLLECTION_GENERO = firestore.collection(GENEROS);
export const COLLECTION_NOTICIAS = firestore.collection(NOTICIAS);
export const COLLECTION_WEBS = firestore.collection(WEBS);
export const COLLECTION_TEMAS = firestore.collection(TEMAS);