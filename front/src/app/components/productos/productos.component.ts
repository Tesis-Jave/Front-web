import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Articulo } from 'src/app/models/productos/articulo';
import { ProductosService } from 'src/app/services/productos/productos.service';

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
    private porductService: ProductosService // servicio para los articulos
  ) {}

  labels: string[] = ['Id', 'Nombre', 'Precio'];
  productosList: Articulo[] = [];
  productoInfo: Articulo = new Articulo(0, '', 0, 0, '', '', 0, '',0,0);

  updateProductState: boolean = false;

  createProductform = this.formBuilder.group({
    id_articulo: [''],
    descripcion: [''],
    id_dpto: [''],
    id_seccion: [''],
    proveedor: [''],
    unidadmedida: [''],
    medidareferencia: [''],
    tipoarticulo: [''],
    stock:[''],
    precio:[''],
  });

  ngOnInit(): void {
    this.labels = Articulo.getProperties();
    this.porductService.getAllproducto().subscribe((data) => {
      this.productosList = data;
      console.log(this.productosList);
    });
  }

  closeInputFormLayout() {
    this.productoInfo = new Articulo(0, '', 0, 0, '', '', 0, '',0,0);
    this.createProductform.reset();
  }

  selectedProduct(producto: Articulo): void {
    this.productoInfo = producto;
  }

  onSubmit() {

    let descripcion: string = '' + this.createProductform.value.descripcion;
    let id_seccion: number = parseInt('' + this.createProductform.value.id_seccion);
    let id_dpto: number = parseInt('' + this.createProductform.value.id_dpto);
    let proveedor: string = '' + this.createProductform.value.proveedor;
    let unidadmedida: string = '' + this.createProductform.value.unidadmedida;
    let medidareferencia: number = parseInt('' + this.createProductform.value.medidareferencia);
    let tipoarticulo: string = '' + this.createProductform.value.tipoarticulo;
    let stock:number= parseInt(''+this.createProductform.value.stock );
    let precio:number=parseFloat(''+this.createProductform.value.precio);
    //console.log('codigo articulo:' +codArticulo);

    if (this.updateProductState) {
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
  getProducts(): void{
    this.porductService.getAllproducto().subscribe((data) => {
      this.productosList = data;
    });
  }

  // create
  addNewProduct(product: Articulo): void{
    this.porductService.createProducto(product).subscribe((data)=> {
      console.log(data);
      this.getProducts();
      this.createProductform.reset();
    })
  }

  // update

  updateProduct(product: Articulo): void{
  this.porductService.updateProducto(product).subscribe((data)=>{
    console.log(data);
    this.getProducts();
  })

  }

  // delete

  deleteProduct(id: number): void{
    this.porductService.deleteProducto(id).subscribe((data)=>{
      console.log(data);
      this.getProducts();
    })
  }


  navigateTo(route: string) {
    this.router.navigate([route]);
  }
}
