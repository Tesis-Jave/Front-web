export class Premio {
    constructor(
      public id_promocion: number,
      public descripcion: string,
      public articulosIds: number[], 
      public fechainicio: string,
      public fechafin: string
    ) {}
  
    public static getProperties(): Array<string> {
      let premio: string[] = [
        'Id',
        'Nombre', 
        'FechaInicio',
        'FechaFin'
      ];
      return premio;
    }
  }
  