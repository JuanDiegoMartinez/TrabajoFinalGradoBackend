import {COLLECTION_GROUP_USUARIOS} from "../Collections";

//Comprueba que el alias no está cogido
export const compruebaUser = async (user: string): Promise<boolean> => {

    let esta = false;

    await COLLECTION_GROUP_USUARIOS.where('user', '==', user).get().then(function(querySnapshot) {

        if (querySnapshot.size >= 1) {
            esta = true;
        }
    });
    return esta;
}

//Comprueba que el email no esté cogido
export const compruebaEmail = async (email: string): Promise<boolean> => {

    let esta = false;

    await COLLECTION_GROUP_USUARIOS.where('email', '==', email).get().then(function(querySnapshot) {

        if (querySnapshot.size >= 1) {
            esta = true;
        }
    });
    return esta;
}