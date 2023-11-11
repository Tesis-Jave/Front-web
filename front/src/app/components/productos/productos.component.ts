import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Articulo } from 'src/app/models/productos/articulo';
import { ProductosService } from 'src/app/services/productos/productos.service';
import { LoginService } from 'src/app/services/login/login.service';
import { ProductoNuevo } from 'src/app/models/productos/producto-nuevo';

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
    private formBuilder: FormBuilder,
    private porductService: ProductosService, // servicio para los articulos
    private loginService: LoginService
  ) {}

  labels: string[] = [];
  productosList: Articulo[] = [];
  productoInfo: Articulo = new Articulo(0, '', 0, 0, '', '', '', '', 0, 0);

  formButtonLayoutTitle: string = 'Crear';

  createLayoutActivate: boolean = true;
  updateLayoutActivate: boolean = false;

  createProductform = this.formBuilder.group({
    descripcion: [''],
    id_dpto: [''],
    id_seccion: [''],
    proveedor: [''],
    unidadmedida: [''],
    medidareferencia: [''],
    tipoarticulo: [''],
    stock: [''],
    precio: [''],
  });

  ngOnInit(): void {
    this.labels = Articulo.getProperties();
    this.labels.push("Acciones");
    this.porductService.getAllproducto().subscribe((data) => {
      this.productosList = data;
      console.log('Estos son los productos ');
      console.log(this.productosList);
    });
    
  }

  closeInputFormLayout() {
    this.productoInfo = new Articulo(0, '', 0, 0, '', '', '', '', 0, 0);
    this.createProductform.reset();
    this.formButtonLayoutTitle = 'Crear';
  }

  selectedProduct(producto: Articulo): void {
    this.productoInfo = producto;
    this.updateLayoutActivate = true;
    this.createLayoutActivate = false;
    this.formButtonLayoutTitle = 'Actualizar';
  }

  onSubmit() {

    let descripcion: string = '' + this.createProductform.value.descripcion;
    let id_seccion: number = parseInt('' + this.createProductform.value.id_seccion);
    let id_dpto: number = parseInt('' + this.createProductform.value.id_dpto);
    let proveedor: string = '' + this.createProductform.value.proveedor;
    let unidadmedida: string = '' + this.createProductform.value.unidadmedida;
    let medidareferencia: string = '' + this.createProductform.value.medidareferencia;
    let tipoarticulo: string = '' + this.createProductform.value.tipoarticulo;
    let stock: number = parseInt('' + this.createProductform.value.stock);
    let precio: number = parseFloat('' + this.createProductform.value.precio);

    console.log('El estado de updateProduct es: ');
    console.log(this.updateLayoutActivate);

    if (this.updateLayoutActivate) {
      let product = new Articulo(
        this.productoInfo.id_articulo,
        descripcion,
        id_dpto,
        id_seccion,
        proveedor,
        unidadmedida,
        medidareferencia,
        tipoarticulo,
        stock,
        precio
      );
      console.log('Entra a update');
      //llamar metodo de update
      this.updateProduct(product);
    }
    if (this.createLayoutActivate) {
      console.log('entra a crear')
      let product = new ProductoNuevo(
        descripcion,
        id_dpto,
        id_seccion,
        proveedor,
        unidadmedida,
        medidareferencia,
        tipoarticulo,
        stock,
        precio
      );
      this.addNewProduct(product);
      this.closeInputFormLayout();
    }
  }
  // getAll
  getProducts(): void {
    this.porductService.getAllproducto().subscribe((data) => {
      this.productosList = data;
    });
  }

  // create
  addNewProduct(product: ProductoNuevo): void {
    this.porductService.createProducto(product).subscribe((data) => {
      console.log(data);
      this.getProducts();
      this.createProductform.reset();
    });
  }

  // update

  updateProduct(product: Articulo): void {
    this.porductService.updateProducto(product).subscribe((data) => {
      console.log(data);
      this.getProducts();
    });
    console.log('se ha actualizado el articulo');
  }

  // delete

  deleteProduct(id: number): void {
    this.porductService.deleteProducto(id).subscribe((data) => {
      console.log(data);
      this.getProducts();
    });
  }

  navigateTo(route: string) {
    this.router.navigate([route]);
  }

  cerrarSesion() {
    this.loginService.logout();
    this.navigateTo('login');
  }
}
