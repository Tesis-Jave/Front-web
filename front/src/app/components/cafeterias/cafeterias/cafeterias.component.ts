import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Cafeteria } from 'src/app/models/cafeterias/cafeteria';
import { CafeteriasService } from 'src/app/services/cafeterias/cafeterias.service';
import { LoginService } from 'src/app/services/login/login.service';
@Component({
  selector: 'app-cafeterias',
  templateUrl: './cafeterias.component.html',
  styleUrls: ['./cafeterias.component.css']
})
export class CafeteriasComponent {
    /**
   * 
   * @param formBuilder 
   * 
   */
    constructor(
      private router: Router,
      private formBuilder: FormBuilder,
      private cafeteriaService: CafeteriasService,
      private loginService: LoginService
    ) // declarar servicio de productos
    {}
    labels: string[] = ['Id', 'Nombre', 'Precio'];
    cafeteriaList: Cafeteria[]=[];
    cafeteriaInfo: Cafeteria = new Cafeteria(0,'',0,0,0,'');

    updateCafeteriaState: boolean = false;
    createLayoutActivate: boolean = false;
    updateLayoutActivate: boolean = false;
    formButtonLayoutTitle: string = '';
  
    createCafeteriaform = this.formBuilder.group({
      id_cafeteria:[''],
      descripcion:[''],
      longitud:[''],
      latitud:[''],
      id_tarifa:[''],
      tipo:['']

    });
  
    launchCreateFormLayout() {
      this.createLayoutActivate = true;
      this.formButtonLayoutTitle = 'Crear servicio';
    }
  
    closeInputFormLayout() {
      this.createLayoutActivate = false;
      this.updateLayoutActivate = false;
      this.cafeteriaInfo = new Cafeteria(0,'',0,0,0,'');
      this.createCafeteriaform.reset();
    }

  
    navigateTo(route: string) {
      this.router.navigate([route]);
    }
  
    onSubmit() {

      let descripcion: string = '' + this.createCafeteriaform.value.descripcion;
      let longitud:number= parseFloat(''+this.createCafeteriaform.value.longitud);
      let latitud:number= parseFloat(''+this.createCafeteriaform.value.latitud);
      let id_tarifa:number=parseInt(''+this.createCafeteriaform.value.id_tarifa);
      let tipo:string=''+this.createCafeteriaform.value.tipo;

      if (this.updateCafeteriaState) {
        let cafeteria = new Cafeteria(
          this.cafeteriaInfo.id_cafeteria,
          descripcion,
          longitud,
          latitud,
          id_tarifa,
          tipo
        );
        //llamar metodo de update
      } else {
        //llamar metodo de creación =>
        // this.porductService.createProducto(producto).subscribe((data) => {
        //   this.productosList.push(data);
        // });
        // this.closeInputFormLayout();
      }
    }

    // getAll
  getCafeterias(): void{
    this.cafeteriaService.getAllcafeteria().subscribe((data) => {
      this.cafeteriaList = data;
    });
  }

    ngOnInit(): void {
      this.labels = Cafeteria.getProperties();
      this.cafeteriaService.getAllcafeteria().subscribe((data) => {
        this.cafeteriaList = data;
        console.log(this.cafeteriaList);
      });
    }
    
    selectedCafeteria(cafeteria: Cafeteria): void {
      this.cafeteriaInfo = cafeteria;
    }
    
    // delete

  deleteCafeteria(id: number): void{
    this.cafeteriaService.deleteCafeteria(id).subscribe((data)=>{
      console.log(data);
      this.getCafeterias();
    })
  }
  cerrarSesion(){
    this.loginService.logout();
    this.navigateTo('login');
  }
}
