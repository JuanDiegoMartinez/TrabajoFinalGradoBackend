import {COLLECTION_NOTICIAS} from "../Collections";

// Comprueba la fecha de las últimas noticias de la bbdd para cambiarlas o no.
export const comprobarFecha = async (): Promise<boolean> => {

    let fecha = new Date();
    let diaActual = fecha.getDate();
    let mesActual = fecha.getMonth() + 1;
    let anoActual = fecha.getFullYear();

    let tipoMes = "-0";

    if (mesActual >= 10) {
        tipoMes = "-"
    }
    let fechaActualComprobar = anoActual + tipoMes + mesActual + "-" + diaActual;

    let fechaUltimaNoticia = "";

    await COLLECTION_NOTICIAS.orderBy("published", 'desc').limit(1).get().then(function (querySnapshot) {

        querySnapshot.forEach((object) => {
            fechaUltimaNoticia = object.data().published;
        })
    });

    let llamadaApi = false;

    //Si fechaUltimaNoticia está vacío entra ya que no hay ninguna noticia y tendría que hacer la llamada
    if (fechaUltimaNoticia < fechaActualComprobar) {
        llamadaApi = true;
    }
    return llamadaApi;
}