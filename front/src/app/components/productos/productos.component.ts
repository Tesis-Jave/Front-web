import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { Articulo } from 'src/app/models/productos/articulo';

@Component({
  selector: 'app-producto',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css'],
})
export class ProductoComponent {
  constructor(
    private formBuilder: FormBuilder
  ) // declarar servicio de productos
  {}
  labels: string[] = ['id', 'nombre', 'precio'];
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

  onSubmit() {}


}
