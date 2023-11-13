export class ProductoNuevo {
    constructor(
        public descripcion: string,
        public id_dpto: number,
        public id_seccion: number,
        public proveedor: string,
        public unidadmedida: string,
        public medidareferencia: string,
        public tipoarticulo: string,
        public stock: number,
        public precio:number,
    ){}

}