export class Premio {
    constructor(
        public id: number,
        public articuloId: number,
        public precioNuevo: number,
        public fechaInicio: Date,
        public fechaFin: Date,
    ){}
}
