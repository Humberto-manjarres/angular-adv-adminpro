export class Usuario {
    /* los parametros obligatorios deben ir al principio, los opcionales al final del constructor. 
        el signo de interrogación significa que el parametro es opcional */
    constructor(
        public nombre: string,
        public email: string,
        public password?: string,
        public img?: string,
        public google?: boolean,
        public role?: string,
        public uid?: string
    ) { }
}