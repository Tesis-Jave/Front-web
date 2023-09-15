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
        public codArticulo: number,
        public descripcion: string,
        public dpto: number,
        public seccion: number,
        public refProveedor: string,
        public unidadMedida: string,
        public medidaReferencia: number,
        public tipoArticulo: string,
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
            'Tipo Articulo'
        ]
        return articulo;
    }
}