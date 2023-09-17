import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Articulo } from 'src/app/models/productos/articulo';

@Component({
  selector: 'app-producto',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css'],
})


export class ProductoComponent {
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
  productoInfo: Articulo = new Articulo(0,'',0,0,'','',0,'');
  createLayoutActivate: boolean = false;
  updateLayoutActivate: boolean = false;
  formButtonLayoutTitle: string = '';

  createProductform = this.formBuilder.group({
    id: [''],
    descripcion: [''],
    departamento: [''],
    seccion: [''],
    refProveedor: [''],
    unidadMedida: [''],
    medidaReferencia: [''],
    tipoArticulo: ['']
  });

  launchCreateFormLayout() {
    this.createLayoutActivate = true;
    this.formButtonLayoutTitle = 'Crear servicio';
  }

  closeInputFormLayout() {
    this.createLayoutActivate = false;
    this.updateLayoutActivate = false;
    this.productoInfo = new Articulo(0,'',0,0,'','',0,'');
    this.createProductform.reset();
  }

  navigateTo(route: string) {
    this.router.navigate([route]);
  }

  onSubmit() {}


}
