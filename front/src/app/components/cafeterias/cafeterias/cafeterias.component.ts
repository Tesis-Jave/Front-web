import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Cafeteria } from 'src/app/models/cafeterias/cafeteria';
import { CafeteriaNueva } from 'src/app/models/cafeterias/cafeteria-nueva';
import { CafeteriasService } from 'src/app/services/cafeterias/cafeterias.service';
import { LoginService } from 'src/app/services/login/login.service';
@Component({
  selector: 'app-cafeterias',
  templateUrl: './cafeterias.component.html',
  styleUrls: ['./cafeterias.component.css'],
})
export class CafeteriasComponent {
  /**
   *
   * @param formBuilder
   *
   */
  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private cafeteriaService: CafeteriasService,
    private loginService: LoginService // declarar servicio de productos
  ) {}
  labels: string[] = [];
  cafeteriaList: Cafeteria[] = [];
  cafeteriaInfo: Cafeteria = new Cafeteria(0, '', 0, 0, 0, '');

  formButtonLayoutTitle: string = 'Crear';
  
  createLayoutActivate: boolean = true;
  updateLayoutActivate: boolean = false;

  createCafeteriaform = this.formBuilder.group({
    descripcion: [''],
    longitud: [''],
    latitud: [''],
    id_tarifa: [''],
    tipo: [''],
  });

  selectedCafeteria(cafeteria: Cafeteria): void {
    this.cafeteriaInfo = cafeteria;
    console.log('Cafeteria: '+cafeteria.descripcion)
    console.log('CafeteriaInfo: '+this.cafeteriaInfo.descripcion)
    this.updateLayoutActivate = true;
    this.createLayoutActivate = false;
    this.formButtonLayoutTitle = 'Actualizar';
  }

  closeInputFormLayout() {
    this.createLayoutActivate = false;
    this.updateLayoutActivate = false;
    this.cafeteriaInfo = new Cafeteria(0, '', 0, 0, 0, '');
    this.formButtonLayoutTitle = 'Crear';
    this.createCafeteriaform.reset();
  }

  navigateTo(route: string) {
    this.router.navigate([route]);
  }

  ngOnInit(): void {
    this.labels = Cafeteria.getProperties();
    this.cafeteriaService.getAllcafeteria().subscribe((data) => {
      this.cafeteriaList = data;
      console.log(this.cafeteriaList);
    });
   
  }

  onSubmit() {

    let descripcion: string = '' + this.createCafeteriaform.value.descripcion;
    let longitud: number = parseInt(
      '' + this.createCafeteriaform.value.longitud
    );
    let latitud: number = parseInt(
      '' + this.createCafeteriaform.value.latitud
    );
    let id_tarifa: number = parseInt(
      '' + this.createCafeteriaform.value.id_tarifa
    );
    let tipo: string = '' + this.createCafeteriaform.value.tipo;

    if (this.updateLayoutActivate) {
      let cafeteria = new Cafeteria(
        this.cafeteriaInfo.id_cafeteria,
        descripcion,
        longitud,
        latitud,
        id_tarifa,
        tipo
      );
      console.log('update: ')
      console.log(cafeteria)
      this.updateCafeteria(cafeteria);
    } if(this.createLayoutActivate) {
      console.log('create: ')
      let cafeteria = new CafeteriaNueva(
        descripcion,
        longitud,
        latitud,
        id_tarifa,
        tipo
        );
      console.log(cafeteria)
      this.createCafeteria(cafeteria);
      this.closeInputFormLayout();
    }
  }

  // getAll
  getCafeterias(): void {
    this.cafeteriaService.getAllcafeteria().subscribe((data) => {
      this.cafeteriaList = data;
    });
  }

  //update cafeteria
  updateCafeteria(cafeteria: Cafeteria): void {
    this.cafeteriaService.updateCafeteria(cafeteria).subscribe((data) => {
      console.log(data);
      this.getCafeterias();
      this.createCafeteriaform.reset();
    });
    
  }

  //create cafeteria
  createCafeteria(cafeteria: CafeteriaNueva): void{
    this.cafeteriaService.createCafeteria(cafeteria).subscribe((data)=>{
      console.log(data);
      this.getCafeterias();
      this.createCafeteriaform.reset();
    })
  }

  // delete
  deleteCafeteria(id: number): void {
    this.cafeteriaService.deleteCafeteria(id).subscribe((data) => {
      console.log(data);
      this.getCafeterias();
    });
  }
  cerrarSesion() {
    this.loginService.logout();
    this.navigateTo('login');
  }
}
