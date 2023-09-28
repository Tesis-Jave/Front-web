import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Cafeteria } from 'src/app/models/cafeterias/cafeteria';
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
      private formBuilder: FormBuilder
    ) // declarar servicio de productos
    {}
    labels: string[] = ['Id', 'Nombre', 'Precio'];
    cafeteriaInfo: Cafeteria = new Cafeteria(0,'','',0,'');
    createLayoutActivate: boolean = false;
    updateLayoutActivate: boolean = false;
    formButtonLayoutTitle: string = '';
  
    createProductform = this.formBuilder.group({
      id_cafeteria:[''],
      descripcion:[''],
      ubicacion:[''],
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
      this.cafeteriaInfo = new Cafeteria(0,'','',0,'');
      this.createProductform.reset();
    }

  
    navigateTo(route: string) {
      this.router.navigate([route]);
    }
  
    onSubmit() {}
  
  
}
