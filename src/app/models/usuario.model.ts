import { environment } from '../../environments/environment';

const base_url = environment.base_url;

export class Usuario {
    /* los parametros obligatorios deben ir al principio, los opcionales al final del constructor. 
        el signo de interrogación significa que el parametro es opcional */
    constructor(
        public nombre: string,
        public email: string,
        public password?: string,
        public img?: string,
        public google?:boolean,
        public role?: string,
        public uid?: string
    ) { }

    get imagenUrl(){

        if (this.img?.includes('https')) {
            return this.img;
        }

        if (this.img) {
            return `${base_url}/uploads/usuarios/${ this.img }`;
        }else{
            return `${base_url}/uploads/usuarios/no-image`;    
        }
    }
}    