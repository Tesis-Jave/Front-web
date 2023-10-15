export class Cafeteria {
    constructor(
        public id_cafeteria: number,
        public descripcion: string,
        public longitud: number,
        public latitud:number,
        public id_tarifa: number,
        public tipo: string
    ){}
    //Metodo describe: Array<string>
    //Devuelve: Array con los nombres de las propiedades de la clase
    //Ejemplo: ['codArticulo', 'descripcion', 'dpto', 'seccion', 'refProveedor', 'unidadMedida', 'medidaReferencia', 'tipoArticulo']
    public static getProperties(): Array<string> {
        let cafeteria: string[] = [
            'Codigo Cafeteria',
            'Descripcion',
            'longitud',
            'latitud',
            'Tarifa',
            'Tipo'
        ]
        return cafeteria;
    }
}
