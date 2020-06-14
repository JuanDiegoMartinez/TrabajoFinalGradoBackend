export interface Publisher {
    name: string,
    description: string,
    urlImage: string,
    juegos: string[]
}

export interface PartialPublisher {
    name: string,
    urlImage: string
}