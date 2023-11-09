import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
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
    {}
    labels: string[] = ['Id', 'Nombre', 'Precio'];
    premioInfo: Premio = new Premio(0,'',0,0,new Date(),new Date());
    premioList: Premio[] = []
    productosList: Articulo[] = [];
    productosSeleccionados: Articulo[] = [];  // Lista de productos seleccionados

    idPromocion: number = 0;
    articulosXPromo: any[] = [];

    formButtonLayoutTitle: string = 'Crear';
    
    createLayoutActivate: boolean = true;
    updateLayoutActivate: boolean = false;
  
    createPromoform = this.formBuilder.group({
      id:[''],
      descripcion:[''],
      articuloId:[''],
      precioNuevo:[''],
      fechaInicio:[''],
      fechaFin:['']

    });
  
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
        this.productosSeleccionados.push(producto);
      } else {
        // Si el producto ya está en la lista de seleccionados, quítalo
        this.productosSeleccionados.splice(index, 1);
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
      this.premioInfo = new Premio(0,'',0,0,new Date(),new Date());
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

      if(this.updateLayoutActivate){
        let promo = new Premio(
          id,
          descripcion,
          articuloId,
          precioNuevo,
          fechaInicio,
          fechaFin
        );
        this.updatePromo(promo);

      }
      if(this.createLayoutActivate){
        let promo = new Premio(
          id,
          descripcion,
          articuloId,
          precioNuevo,
          fechaInicio,
          fechaFin
        );
        this.addNewPromo(promo);
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
    //create
    addNewPromo(promo:Premio): void{
      this.promoService.createPromo(promo).subscribe((data) =>{
        console.log(data);
        this.getPremios();
        this.createPromoform.reset();
      })
    }
    //update
    updatePromo(promo: Premio): void{
      this.promoService.updatePromo(promo).subscribe((data) =>{
        console.log(data);
        this.getPremios();
        this.createPromoform.reset();
      })
    }
  
  
    navigateTo(route: string) {
      this.router.navigate([route]);
    }

  
    cerrarSesion(){
      this.loginService.logout();
      this.navigateTo('login');
    }

}
