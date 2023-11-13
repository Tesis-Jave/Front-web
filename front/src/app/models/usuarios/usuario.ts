// CREATE TABLE `perfil` (
//  `id_perfil` int NOT NULL AUTO_INCREMENT,
//  `usuario` varchar(50) NOT NULL,
//  `password` varchar(50) NOT NULL,
//  `nombre` varchar(255) DEFAULT NULL,
//  `cedula` bigint NOT NULL,
//  `cargo` varchar(50) DEFAULT NULL,
//  `admin` tinyint NOT NULL,
//  PRIMARY KEY (`id_perfil`)
//) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

import { UrlSegment } from "@angular/router";


export class User {

    constructor(
        public id_perfil: number,
        public usuario: string,
        public password: string,
        public nombre:string,
        public cedula:number,
        public cargo:string,
        public admin: boolean
    ){}

    //Metodo describe: Array<string>
    //Devuelve: Array con los nombres de las propiedades de la clase
    public static getProperties(): Array<string> {
        let User: string[] = [
            'Codigo usuario',
            'usuario',
            'nombre',
            'cedula',
            'cargo',
            'admin'
        ]
        return User;
    }
}