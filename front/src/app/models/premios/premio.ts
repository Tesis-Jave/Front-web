export class Premio {
    constructor(
        public id: number,
        public descripcion: string,
        public articuloId: number,
        public precioNuevo: number,
        public fechaInicio: Date,
        public fechaFin: Date,
    ){}


    public static getProperties(): Array<string>{
        let premio: string[] = [
            'Id',
            'Descripcion',
            'ArticuloId',
            'PrecioNuevo',
            'FechaInicio',
            'FechaFin'
        ]
        return premio;
    }
}
