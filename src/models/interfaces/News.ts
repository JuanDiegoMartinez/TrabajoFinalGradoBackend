export interface News {
    author: string,
    title: string,
    slug: string,
    description: string,
    urlNews: string,
    urlImage: string,
    published: string,
    content: string
}

export interface PartialNews {
    title: string,
    slug: string,
    description: string,
    urlImage: string
}