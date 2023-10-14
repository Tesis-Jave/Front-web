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
  productoInfo: Articulo = new Articulo(0, '', 0, 0, '', '', 0, '');

  updateProductState: boolean = false;

  createProductform = this.formBuilder.group({
    id: [''],
    descripcion: [''],
    departamento: [''],
    seccion: [''],
    refProveedor: [''],
    unidadMedida: [''],
    medidaReferencia: [''],
    tipoArticulo: [''],
  });

  ngOnInit(): void {
    this.labels = Articulo.getProperties();
    this.porductService.getAllproducto().subscribe((data) => {
      this.productosList = data;
    });
  }

  closeInputFormLayout() {
    this.productoInfo = new Articulo(0, '', 0, 0, '', '', 0, '');
    this.createProductform.reset();
  }

  selectedProduct(producto: Articulo): void {
    this.productoInfo = producto;
  }

  onSubmit() {

    let descripcion: string = '' + this.createProductform.value.descripcion;
    let seccion: number = parseInt('' + this.createProductform.value.seccion);
    let dpto: number = parseInt('' + this.createProductform.value.departamento);
    let refProveedor: string = '' + this.createProductform.value.refProveedor;
    let unidadMedida: string = '' + this.createProductform.value.unidadMedida;
    let medidaReferencia: number = parseInt('' + this.createProductform.value.medidaReferencia);
    let tipoArticulo: string = '' + this.createProductform.value.tipoArticulo;
    //console.log('codigo articulo:' +codArticulo);

    if (this.updateProductState) {
      let product = new Articulo(
        this.productoInfo.codArticulo,
        descripcion,
        dpto,
        seccion,
        refProveedor,
        unidadMedida,
        medidaReferencia,
        tipoArticulo
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
