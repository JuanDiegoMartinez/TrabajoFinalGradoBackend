export interface Videogame {
    name: string,
    slug: string,
    urlImage: string,
    lanzamiento: string,
    description: string,
    metacritic: string,
    urlMetacritic: string,
    platforms: string[],
    genres: string[],
    stores: storeVideogame[],
    developers: string[],
    clip: string,
    tags: string[],
    screenshots: string[],
    website: string
}

export interface storeVideogame {
    name: string,
    url: string
}

export interface PartialVideogame {
    name: string,
    lanzamiento: string,
    platforms: string[],
    urlImage: string,
    slug: string
}