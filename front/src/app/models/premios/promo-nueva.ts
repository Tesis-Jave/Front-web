export class PromoNueva {
    constructor(
        public descripcion: string,
        public articuloIds: number[], 
        public precioNuevo: number,
        public fechaInicio: Date,
        public fechaFin: Date
      ) {}
}
