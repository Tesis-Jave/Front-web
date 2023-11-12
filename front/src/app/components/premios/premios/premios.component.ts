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
import { PromoNueva } from 'src/app/models/premios/promo-nueva';

@Component({
  selector: 'app-premios',
  templateUrl: './premios.component.html',
  styleUrls: ['./premios.component.css'],
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
    private porductService: ProductosService
  ) {
    this.createPromoform = this.formBuilder.group({
      descripcion: [''],
      fechaInicio: [''],
      fechaFin: [''],
      productosSeleccionados: [[]],
    });
  }

  createPromoform: FormGroup;

  labels: string[] = [];
  premioInfo: Premio = new Premio(0, '', [], '', '');
  premioList: Premio[] = [];

  productosList: Articulo[] = [];

  idPromocion: number = 0;
  articulosXPromo: Articulo[] = [];

  formButtonLayoutTitle: string = 'Crear';

  createLayoutActivate: boolean = true;
  updateLayoutActivate: boolean = false;

  ngOnInit(): void {
    this.labels = Premio.getProperties();
    this.labels.push('Acciones');

    this.getPremios();

    // se crea lista con todos los articulos
    this.porductService.getAllproducto().subscribe((data) => {
      this.productosList = data;
    });
  }

  //  Método para agregar un nuevo artículo a la promoción
  agregarArticulo(idArticulo: number): void {
    this.promoService
      .agregarArticuloAPromocion(this.idPromocion, idArticulo)
      .subscribe((response) => {
        // Actualizar la lista de artículos después de agregar uno nuevo
        this.promoService
          .getArticulosPorPromocion(this.idPromocion)
          .subscribe((data) => {
            this.articulosXPromo = data;
          });
      });
  }

  closeInputFormLayout() {
    this.premioInfo = new Premio(0, '', [], '', '');
    this.formButtonLayoutTitle = 'Crear';
    this.createPromoform.reset();
  }

  selectedPromo(promo: Premio): void {
    console.log('Entrando a selectedPromo');
    console.log('Valor de promo:', promo.fechainicio);
    this.premioInfo = promo;
    if (promo) {
      if (promo.id_promocion !== undefined) {
        // Llamada asíncrona
        this.promoService
          .getArticulosPorPromocion(promo.id_promocion)
          .subscribe(
            (data) => {
              console.log('Respuesta de getArticulosPorPromocion:', data);
              this.articulosXPromo = data;

              console.log('this.articulosXPromo:', this.articulosXPromo);

              this.formButtonLayoutTitle = 'Actualizar';
              this.createLayoutActivate = false;
              this.updateLayoutActivate = true;
            },
            (error) => {
              console.error(
                'Error en la solicitud getArticulosPorPromocion:',
                error
              );
            }
          );
      } else {
        console.log('El id_promocion de promo es indefinido');
      }
    } else {
      console.log('El objeto promo es nulo o indefinido');
    }
  }

  productoEstaEnPromo(producto: Articulo): boolean {
    for (let i = 0; i < this.articulosXPromo.length; i++) {
      // console.log('antes: ', this.articulosXPromo[i])
      // console.log('producrto ', producto)
      if (this.articulosXPromo[i].id_articulo === producto.id_articulo) {
        console.log('entro a if: ');

        return true;
      }
    }

    return false;
  }

  get productosSeleccionados(): number[] {
    return this.createPromoform.value.productosSeleccionados;
  }

  onSubmit() {
    let id_promocion: number = parseInt(
      '' + this.createPromoform.value.id_promocion
    );
    let descripcion: string = '' + this.createPromoform.value.descripcion;
    let precioNuevo: number = parseInt(
      '' + this.createPromoform.value.precioNuevo
    );
    let fechaInicio: string = '' + this.createPromoform.value.fechaInicio;
    let fechaFin: string = '' + this.createPromoform.value.fechaFin;

    // Verificar si productosSeleccionados está definido y no es nulo
    let productosSeleccionados =
      this.createPromoform.value.productosSeleccionados;
    let productosIds: number[] = productosSeleccionados
      ? productosSeleccionados
      : [];
      
    console.log('productos ids', productosIds);
    if (this.updateLayoutActivate) {
      let promo = new Premio(
        id_promocion,
        descripcion,
        productosIds,
        fechaInicio,
        fechaFin
      );
      this.updatePromo(promo, productosIds);
    }
    if (this.createLayoutActivate) {
      let promo = new PromoNueva(
        descripcion,
        productosIds,
        fechaInicio,
        fechaFin
      );
      this.addNewPromo(promo, productosIds);
    }
  }

  //getAll
  getPremios() {
    console.log('esta es la lista de premios ');
    this.promoService.getAllpromos().subscribe((data) => {
      this.premioList = data;
      console.log(this.premioList);
    });
    this.premioList.forEach;
  }

  //delete
  deletePromo(id_promocion: number) {
    this.promoService.deletePromo(id_promocion).subscribe((data) => {
      console.log(data);
      this.getPremios();
    });
  }

  //getById
  getPromoById(id_promocion: number) {
    this.promoService.getPromoById(id_promocion).subscribe((data) => {
      this.premioInfo = data;
      console.log(this.premioInfo);
    });
  }

  //create promo con ids de promo
  addNewPromo(promo: PromoNueva, productosIds: number[]): void {
    console.log('Datos a enviar:', promo, productosIds);
    this.promoService.createPromo(promo, productosIds).subscribe((data) => {
      console.log('respuesta del servidor: ', data);
      this.getPremios();
      this.createPromoform.reset();
    });
  }
  //update promo con ids de products
  updatePromo(promo: Premio, productosIds: number[]): void {
    this.promoService.updatePromo(promo, productosIds).subscribe((data) => {
      console.log(data);
      this.getPremios();
      this.createPromoform.reset();
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
