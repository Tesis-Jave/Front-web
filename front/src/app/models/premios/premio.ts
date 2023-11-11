export class Premio {
    constructor(
      public id_promocion: number,
      public descripcion: string,
      public articuloIds: number[], 
      public precioNuevo: number,
      public fechaInicio: Date,
      public fechaFin: Date
    ) {}
  
    public static getProperties(): Array<string> {
      let premio: string[] = [
        'Id',
        'Descripcion', 
        'PrecioNuevo',
        'FechaInicio',
        'FechaFin'
      ];
      return premio;
    }
  }
  