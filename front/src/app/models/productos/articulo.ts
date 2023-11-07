// CREATE TABLE [dbo].[ARTICULOS](
//     [CODARTICULO] [int] NOT NULL,
//     [DESCRIPCION] [nvarchar](40) NULL,
//     [DPTO] [smallint] NULL,
//     [SECCION] [smallint] NULL,
//     [REFPROVEEDOR] [nvarchar](15) NULL,
//     [UNIDADMEDIDA] [nvarchar](10) NULL,
//     [MEDIDAREFERENCIA] [float] NULL,
//     [TIPOARTICULO] [nvarchar](1) NULL
// (


export class Articulo {

    constructor(
        public id_articulo: number,
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

    //Metodo describe: Array<string>
    //Devuelve: Array con los nombres de las propiedades de la clase
    //Ejemplo: ['codArticulo', 'descripcion', 'dpto', 'seccion', 'refProveedor', 'unidadMedida', 'medidaReferencia', 'tipoArticulo']
    public static getProperties(): Array<string> {
        let articulo: string[] = [
            'Codigo Articulo',
            'Descripcion',
            'Departamento',
            'Seccion',
            'Referencia Proveedor',
            'Unidad Medida',
            'Medida Referencia',
            'Tipo Articulo',
            'stock',
            'precio'
        ]
        return articulo;
    }
}