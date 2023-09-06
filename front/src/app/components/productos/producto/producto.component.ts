import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Producto } from 'src/app/models/productos/producto';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css']
})
export class ProductoComponent {

  constructor(
    private formBuilder: FormBuilder,
    // declarar servicio de productos
  ) { };
  labels: string[] = [];
  productoInfo: Producto = new Producto(0,'','',0,0);
  createLayoutActivate: boolean = false;
  updateLayoutActivate: boolean = false;
  formButtonLayoutTitle: string = '';

  createProductform = this.formBuilder.group({
    nombre: [''],
    descripcion: [''],
    precio: [''],
    stock: [''],

  })

  launchCreateFormLayout() {
    this.createLayoutActivate = true;
    this.formButtonLayoutTitle = 'Crear servicio';
  }

  closeInputFormLayout() {
    this.createLayoutActivate = false;
    this.updateLayoutActivate = false;
    this.productoInfo = new Producto(0,'','',0,0);
    this.createProductform.reset();
  }

  onSubmit(){

  }


}
