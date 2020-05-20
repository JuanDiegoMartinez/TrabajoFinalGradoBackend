import {firestore} from "../index";

const USUARIOS = "usuarios";
const VALORACIONES = "valoraciones";
const VIDEOJUEGOS = "videojuegos";
const COMPANIA = "compania";
const GENERO = "genero";
const NOTICIAS = "noticias";
const WEBS = "webs";

export const COLLECTION_USUARIOS = firestore.collection(USUARIOS);
export const COLLECTION_VALORACIONES = firestore.collection(VALORACIONES);
export const COLLECTION_VIDEOJUEGOS = firestore.collection(VIDEOJUEGOS);
export const COLLECTION_COMPANIA = firestore.collection(COMPANIA);
export const COLLECTION_GENERO = firestore.collection(GENERO);
export const COLLECTION_NOTICIAS = firestore.collection(NOTICIAS);
export const COLLECTION_WEBS = firestore.collection(WEBS);

export const COLLECTION_GROUP_USUARIOS = firestore.collectionGroup(USUARIOS);
export const COLLECTION_GROUP_VALORACIONES = firestore.collectionGroup(VALORACIONES);
export const COLLECTION_GROUP_VIDEOJUEGOS = firestore.collectionGroup(VIDEOJUEGOS);
export const COLLECTION_GROUP_COMPANIA = firestore.collectionGroup(COMPANIA);
export const COLLECTION_GROUP_GENERO = firestore.collectionGroup(GENERO);
export const COLLECTION_GROUP_NOTICIAS = firestore.collectionGroup(NOTICIAS);
export const COLLECTION_GROUP_WEBS = firestore.collectionGroup(WEBS);