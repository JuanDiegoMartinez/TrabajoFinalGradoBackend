import {COLLECTION_NOTICIAS} from "../Collections";
import {deleteCollection} from "../CollectionsDelete";
import {firestore, newsapi} from "../../index";
import {News} from "../../models/News";

const exec = require('child_process').exec;

//Obtener noticias de la api
export const pedirNoticiasApi = async (): Promise<void> => {

    //Borramos las noticias de la bbdd
    await deleteCollection(firestore, COLLECTION_NOTICIAS.path, 500);

    //Obtenemos las últimas noticias
    const response = await newsapi.v2.topHeadlines({
        category: 'technology',
        country: 'mx',
        pageSize: 50
    })

    let numNoticia = 0;
    let mierda: number[] = [];

    response.articles.forEach((articulo: any) => {

        const command = `curl ${articulo.url} | unfluff`;

        exec(command, (error: any, stdout: any, stderr: any) => {

            let noticia: News = {
                author: articulo.author,
                title: articulo.title,
                description: articulo.description,
                urlNews: articulo.url,
                urlImage: articulo.urlToImage,
                published: articulo.publishedAt.substring(0, 10),
                content: articulo.content
            }

            //Obtenemos toda la noticia
            let texto = JSON.parse(stdout);

            if (texto.text !== "") {

                if (articulo.author === null) {
                    noticia.author = "Anónimo"
                }

                noticia.content = texto.text;

                let numNoticiaString = numNoticia.toString();

                COLLECTION_NOTICIAS.doc(numNoticiaString).set(noticia);

                mierda.push(numNoticia);
                console.log(mierda);

                numNoticia++
            }
        });
    })
    console.log("soy la última mierda: ",mierda);
}

export const obtenerUltimasNoticias = async (): Promise<News[]> => {

    let listaNoticias: News[] = [];

    await COLLECTION_NOTICIAS.get().then( (snapshot) => {

        snapshot.forEach((noticia: any) => {

            listaNoticias.push(noticia.data());
        })
    })

    return listaNoticias;
}

//Probar curl con unfluff
export const pruebas = async () => {

}

