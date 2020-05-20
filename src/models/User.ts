export interface UserComplete {
    user: string,
    nombre: string,
    email: string,
    password: string,
    nacimiento: string,
    rutaImagen: string,
    favoritos: string[]
}

export interface UserRegister {
    user: string,
    nombre: string,
    email: string,
    password: string,
    nacimiento: string
}