import db from "../database";

const USUARIOS = "usuarios";
const VALORACIONES = "valoraciones";
const VIDEOJUEGOS = "videojuegos";
const COMPANIA = "compania";
const GENERO = "genero";
const NOTICIAS = "noticias";
const WEBS = "webs";

export const COLLECTION_USUARIOS = db.collection(USUARIOS);
export const COLLECTION_VALORACIONES = db.collection(VALORACIONES);
export const COLLECTION_VIDEOJUEGOS = db.collection(VIDEOJUEGOS);
export const COLLECTION_COMPANIA = db.collection(COMPANIA);
export const COLLECTION_GENERO = db.collection(GENERO);
export const COLLECTION_NOTICIAS = db.collection(NOTICIAS);
export const COLLECTION_WEBS = db.collection(WEBS);

export const COLLECTION_GROUP_USUARIOS = db.collectionGroup(USUARIOS);
export const COLLECTION_GROUP_VALORACIONES = db.collectionGroup(VALORACIONES);
export const COLLECTION_GROUP_VIDEOJUEGOS = db.collectionGroup(VIDEOJUEGOS);
export const COLLECTION_GROUP_COMPANIA = db.collectionGroup(COMPANIA);
export const COLLECTION_GROUP_GENERO = db.collectionGroup(GENERO);
export const COLLECTION_GROUP_NOTICIAS = db.collectionGroup(NOTICIAS);
export const COLLECTION_GROUP_WEBS = db.collectionGroup(WEBS);