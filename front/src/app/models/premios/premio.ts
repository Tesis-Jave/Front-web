export class Premio {
    constructor(
      public id: number,
      public descripcion: string,
      public articuloIds: number[], // Cambiado a un array de números
      public precioNuevo: number,
      public fechaInicio: Date,
      public fechaFin: Date
    ) {}
  
    public static getProperties(): Array<string> {
      let premio: string[] = [
        'Id',
        'Descripcion',
        'ArticuloIds', // Cambiado a ArticuloIds para reflejar el cambio en el nombre del campo
        'PrecioNuevo',
        'FechaInicio',
        'FechaFin'
      ];
      return premio;
    }
  }
  