import {COLLECTION_NOTICIAS} from "../Collections";
import {News} from "../../models/News";

export const obtenerUltimasNoticias = async (): Promise<News[]> => {
    /*
    let listaNoticias: News[] = [];

    await COLLECTION_NOTICIAS.get().then( (snapshot) => {

        snapshot.forEach((noticia: any) => {

            listaNoticias.push(noticia.data());
        })
    })
    return listaNoticias;
     */
    return [{
        author: "Juan diego",
        content: "dñkjfaklsdjfkñdsafkas",
        description: "jñfsdjfklñsadjfkadsjfasfjfkñadsjf",
        published: "2020-20-03",
        title: "noticia",
        urlImage: "https://larepublica.pe/resizer/B5Nd_2IJYBLDTL9Iyq8QXXie3Gs=/1200x660/top/cloudfront-us-east-1.images.arcpublishing.com/gruporepublica/ZNP2DVKXSFEEXKDOEO67AKUNPA.jpg",
        urlNews: "https://larepublica.pe/tendencias/2020/05/29/google-maps-visita-famoso-parque-de-estados-unidos-y-capta-a-shrek-con-fiona-en-divertida-escena-fotos-google-street-view-google-earth-hollywood-universal-studios-redes-sociales/"
        },
        {
            author: "Juan diego",
            content: "dñkjfaklsdjfkñdsafkas",
            description: "jñfsdjfklñsadjfkadsjfasfjfkñadsjf",
            published: "2020-20-03",
            title: "noticia",
            urlImage: "https://larepublica.pe/resizer/B5Nd_2IJYBLDTL9Iyq8QXXie3Gs=/1200x660/top/cloudfront-us-east-1.images.arcpublishing.com/gruporepublica/ZNP2DVKXSFEEXKDOEO67AKUNPA.jpg",
            urlNews: "https://larepublica.pe/tendencias/2020/05/29/google-maps-visita-famoso-parque-de-estados-unidos-y-capta-a-shrek-con-fiona-en-divertida-escena-fotos-google-street-view-google-earth-hollywood-universal-studios-redes-sociales/"
        },
        {
            author: "Juan diego",
            content: "dñkjfaklsdjfkñdsafkas",
            description: "jñfsdjfklñsadjfkadsjfasfjfkñadsjf",
            published: "2020-20-03",
            title: "noticia",
            urlImage: "https://larepublica.pe/resizer/B5Nd_2IJYBLDTL9Iyq8QXXie3Gs=/1200x660/top/cloudfront-us-east-1.images.arcpublishing.com/gruporepublica/ZNP2DVKXSFEEXKDOEO67AKUNPA.jpg",
            urlNews: "https://larepublica.pe/tendencias/2020/05/29/google-maps-visita-famoso-parque-de-estados-unidos-y-capta-a-shrek-con-fiona-en-divertida-escena-fotos-google-street-view-google-earth-hollywood-universal-studios-redes-sociales/"
        },
        {
            author: "Juan diego",
            content: "dñkjfaklsdjfkñdsafkas",
            description: "jñfsdjfklñsadjfkadsjfasfjfkñadsjf",
            published: "2020-20-03",
            title: "noticia",
            urlImage: "https://larepublica.pe/resizer/B5Nd_2IJYBLDTL9Iyq8QXXie3Gs=/1200x660/top/cloudfront-us-east-1.images.arcpublishing.com/gruporepublica/ZNP2DVKXSFEEXKDOEO67AKUNPA.jpg",
            urlNews: "https://larepublica.pe/tendencias/2020/05/29/google-maps-visita-famoso-parque-de-estados-unidos-y-capta-a-shrek-con-fiona-en-divertida-escena-fotos-google-street-view-google-earth-hollywood-universal-studios-redes-sociales/"
        },
        {
            author: "Juan diego",
            content: "dñkjfaklsdjfkñdsafkas",
            description: "jñfsdjfklñsadjfkadsjfasfjfkñadsjf",
            published: "2020-20-03",
            title: "noticia",
            urlImage: "https://larepublica.pe/resizer/B5Nd_2IJYBLDTL9Iyq8QXXie3Gs=/1200x660/top/cloudfront-us-east-1.images.arcpublishing.com/gruporepublica/ZNP2DVKXSFEEXKDOEO67AKUNPA.jpg",
            urlNews: "https://larepublica.pe/tendencias/2020/05/29/google-maps-visita-famoso-parque-de-estados-unidos-y-capta-a-shrek-con-fiona-en-divertida-escena-fotos-google-street-view-google-earth-hollywood-universal-studios-redes-sociales/"
        },
        {
            author: "Juan diego",
            content: "dñkjfaklsdjfkñdsafkas",
            description: "jñfsdjfklñsadjfkadsjfasfjfkñadsjf",
            published: "2020-20-03",
            title: "noticia",
            urlImage: "https://cdn.hobbyconsolas.com/sites/navi.axelspringer.es/public/styles/1200/public/media/image/2020/04/ps5-stock-limitado-1918919.jpg?itok=KIwzizbr",
            urlNews: "https://larepublica.pe/tendencias/2020/05/29/google-maps-visita-famoso-parque-de-estados-unidos-y-capta-a-shrek-con-fiona-en-divertida-escena-fotos-google-street-view-google-earth-hollywood-universal-studios-redes-sociales/"
        },
        {
            author: "Juan diego",
            content: "dñkjfaklsdjfkñdsafkas",
            description: "jñfsdjfklñsadjfkadsjfasfjfkñadsjf",
            published: "2020-20-03",
            title: "noticia",
            urlImage: "https://cdn.hobbyconsolas.com/sites/navi.axelspringer.es/public/styles/1200/public/media/image/2020/04/ps5-stock-limitado-1918919.jpg?itok=KIwzizbr",
            urlNews: "https://larepublica.pe/tendencias/2020/05/29/google-maps-visita-famoso-parque-de-estados-unidos-y-capta-a-shrek-con-fiona-en-divertida-escena-fotos-google-street-view-google-earth-hollywood-universal-studios-redes-sociales/"
        },
        {
            author: "Juan diego",
            content: "dñkjfaklsdjfkñdsafkas",
            description: "jñfsdjfklñsadjfkadsjfasfjfkñadsjf",
            published: "2020-20-03",
            title: "noticia",
            urlImage: "https://cdn.hobbyconsolas.com/sites/navi.axelspringer.es/public/styles/1200/public/media/image/2020/04/ps5-stock-limitado-1918919.jpg?itok=KIwzizbr",
            urlNews: "https://larepublica.pe/tendencias/2020/05/29/google-maps-visita-famoso-parque-de-estados-unidos-y-capta-a-shrek-con-fiona-en-divertida-escena-fotos-google-street-view-google-earth-hollywood-universal-studios-redes-sociales/"
        },
        {
            author: "Juan diego",
            content: "dñkjfaklsdjfkñdsafkas",
            description: "jñfsdjfklñsadjfkadsjfasfjfkñadsjf",
            published: "2020-20-03",
            title: "noticia",
            urlImage: "https://cdn.hobbyconsolas.com/sites/navi.axelspringer.es/public/styles/1200/public/media/image/2020/04/ps5-stock-limitado-1918919.jpg?itok=KIwzizbr",
            urlNews: "https://larepublica.pe/tendencias/2020/05/29/google-maps-visita-famoso-parque-de-estados-unidos-y-capta-a-shrek-con-fiona-en-divertida-escena-fotos-google-street-view-google-earth-hollywood-universal-studios-redes-sociales/"
        },
        {
            author: "Juan diego",
            content: "dñkjfaklsdjfkñdsafkas",
            description: "jñfsdjfklñsadjfkadsjfasfjfkñadsjf",
            published: "2020-20-03",
            title: "noticia",
            urlImage: "https://cdn.hobbyconsolas.com/sites/navi.axelspringer.es/public/styles/1200/public/media/image/2020/04/ps5-stock-limitado-1918919.jpg?itok=KIwzizbr",
            urlNews: "https://larepublica.pe/tendencias/2020/05/29/google-maps-visita-famoso-parque-de-estados-unidos-y-capta-a-shrek-con-fiona-en-divertida-escena-fotos-google-street-view-google-earth-hollywood-universal-studios-redes-sociales/"
        },
    ]
}

export const buscarNoticias = async () => {
    return [{
        author: "Juan diego",
        content: "dñkjfaklsdjfkñdsafkas",
        description: "dfasdfsdafsafasdfds",
        published: "2020-20-03",
        title: "noticia",
        urlImage: "https://larepublica.pe/resizer/B5Nd_2IJYBLDTL9Iyq8QXXie3Gs=/1200x660/top/cloudfront-us-east-1.images.arcpublishing.com/gruporepublica/ZNP2DVKXSFEEXKDOEO67AKUNPA.jpg",
        urlNews: "https://larepublica.pe/tendencias/2020/05/29/google-maps-visita-famoso-parque-de-estados-unidos-y-capta-a-shrek-con-fiona-en-divertida-escena-fotos-google-street-view-google-earth-hollywood-universal-studios-redes-sociales/"
    },]
}
