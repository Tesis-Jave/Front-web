import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Premio } from 'src/app/models/premios/premio';
import { LoginService } from 'src/app/services/login/login.service';
import { PremiosService } from 'src/app/services/premios/premios.service';
import { ActivatedRoute } from '@angular/router';
import { ProductosService } from 'src/app/services/productos/productos.service';
import { Articulo } from 'src/app/models/productos/articulo';



@Component({
  selector: 'app-premios',
  templateUrl: './premios.component.html',
  styleUrls: ['./premios.component.css']
})
export class PremiosComponent {

    /**
   * 
   * @param formBuilder 
   * 
   */
    constructor(
      private router: Router,
      private route: ActivatedRoute,
      private formBuilder: FormBuilder,
      private loginService: LoginService,
      private promoService: PremiosService,
      private porductService: ProductosService, // servicio opara productos
    ) // declarar servicio de productos
    {
      this.createPromoform = this.formBuilder.group({
        id: [''],
        descripcion: [''],
        articuloId: [''],
        precioNuevo: [''],
        fechaInicio: [''],
        fechaFin: [''],
        productosSeleccionados: []  // Inicializar como un array vacío
      });
    }

    createPromoform: FormGroup;

    labels: string[] = ['Id', 'Nombre', 'Precio'];
    premioInfo: Premio = new Premio(0, '', [], 0, new Date(), new Date());
    premioList: Premio[] = []
    productosList: Articulo[] = [];
    productosSeleccionados: Articulo[] = [];  // Lista de productos seleccionados

    idPromocion: number = 0;
    articulosXPromo: any[] = [];

    formButtonLayoutTitle: string = 'Crear';
    
    createLayoutActivate: boolean = true;
    updateLayoutActivate: boolean = false;
  
    // createPromoform = new FormGroup({
    //   id: new FormControl(''),
    //   descripcion:new FormControl(''),
    //   articuloId:new FormControl(''),
    //   precioNuevo:new FormControl(''),
    //   fechaInicio:new FormControl(''),
    //   fechaFin:new FormControl(''),
    //   productosSeleccionados: []

    // });
  
    ngOnInit(): void {
      this.labels = Premio.getProperties();
      console.log('onInit ');
      this.promoService.getAllpromos().subscribe((data) =>{
        this.premioList = data;
        console.log('estos son las promos: ')
        console.log(this.premioList);
      })

      // se crea lista con todos los articulos
      this.porductService.getAllproducto().subscribe((data) => {
        this.productosList = data;
        
        console.log('Estos son los productos ');
        console.log(this.productosList);
        console.log('Productos seleccionados:');
        console.log(this.productosSeleccionados);
      });

      this.route.paramMap.subscribe(params => {
        const idParam = params.get('id');
        this.idPromocion = idParam ? +idParam : 0;
  
        // Obtener los artículos relacionados con la promoción
        this.promoService.getArticulosPorPromocion(this.idPromocion).subscribe(data => {
          this.articulosXPromo = data;
        });
      });
    }
    toggleSeleccion(producto: Articulo): void {
      const index = this.productosSeleccionados.indexOf(producto);
      if (index === -1) {
        // Si el producto no está en la lista de seleccionados, agrégalo
        console.log('Producto agregado:', producto);
      } else {
        // Si el producto ya está en la lista de seleccionados, quítalo
        this.productosSeleccionados.splice(index, 1);
        console.log('Producto eliminado:', producto);
      }
    }

    //  Método para agregar un nuevo artículo a la promoción
    agregarArticulo(idArticulo: number): void {
      this.promoService.agregarArticuloAPromocion(this.idPromocion, idArticulo).subscribe(response => {
        // Actualizar la lista de artículos después de agregar uno nuevo
        this.promoService.getArticulosPorPromocion(this.idPromocion).subscribe(data => {
          this.articulosXPromo = data;
        });
      });
    }
  
    closeInputFormLayout() {
      this.premioInfo = new Premio(0, '', [], 0, new Date(), new Date());
      this.createPromoform.reset();
    }
    selectedPromo(promo: Premio){
      console.log('este es el id:  ',this.premioInfo.id);
      this.premioInfo = promo;
      this.formButtonLayoutTitle = 'Actualizar';
      this.createLayoutActivate = false;
      this.updateLayoutActivate = true;
    }
    onSubmit(){
      let id: number = parseInt(''+this.createPromoform.value.id);
      let descripcion: string = '' + this.createPromoform.value.descripcion;
      let articuloId: number = parseInt(''+this.createPromoform.value.articuloId);
      let precioNuevo: number = parseInt(''+ this.createPromoform.value.precioNuevo);
      let fechaInicio: Date = new Date(''+this.createPromoform.value.fechaInicio)
      let fechaFin: Date = new Date(''+this.createPromoform.value.fechaFin);

      // let productosIds: number[] = this.productosSeleccionados.map(producto => producto.id_articulo);
      let productosIds: number[] = this.productosSeleccionados
      .filter(producto => producto.id_articulo !== null) // Filtra los elementos que no son null
      .map(producto => producto.id_articulo as number);
      
      if(this.updateLayoutActivate){
        let promo = new Premio(
          id,
          descripcion,
          productosIds,
          precioNuevo,
          fechaInicio,
          fechaFin
        );
        this.updatePromo(promo, productosIds);

      }
      if(this.createLayoutActivate){
        let promo = new Premio(
          id,
          descripcion,
          productosIds,
          precioNuevo,
          fechaInicio,
          fechaFin
        );
        this.addNewPromo(promo, productosIds);
      }
    }

    //getAll
    getPremios(){
      this.promoService.getAllpromos().subscribe((data) =>{
        this.premioList = data;
        console.log(this.premioList);
      })
    }

    //delete
    deletePromo(id: number){
      this.promoService.deletePromo(id).subscribe((data) =>{
        console.log(data);
        this.getPremios();
      })
    }
    
    //getById
    getPromoById(id: number){
      this.promoService.getPromoById(id).subscribe((data) =>{
        this.premioInfo = data;
        console.log(this.premioInfo);
      })
    }

    //create promo con ids de promo
    addNewPromo(promo:Premio, productosIds: number[]): void{
      this.promoService.createPromo(promo, productosIds).subscribe((data) => {
        console.log(data);
        this.getPremios();
        this.createPromoform.reset();
      });
    }
    //update promo con ids de products
    updatePromo(promo: Premio, productosIds: number[]): void{
      this.promoService.updatePromo(promo, productosIds).subscribe((data) => {
        console.log(data);
        this.getPremios();
        this.createPromoform.reset();
      });
    }
  
  
    navigateTo(route: string) {
      this.router.navigate([route]);
    }

  
    cerrarSesion(){
      this.loginService.logout();
      this.navigateTo('login');
    }

}
