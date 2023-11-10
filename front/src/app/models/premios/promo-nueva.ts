export class PromoNueva {
    constructor(
        public descripcion: string,
        public articuloIds: number[], // Cambiado a un array de números
        public precioNuevo: number,
        public fechaInicio: Date,
        public fechaFin: Date
      ) {}
}
