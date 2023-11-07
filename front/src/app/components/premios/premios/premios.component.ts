import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Premio } from 'src/app/models/premios/premio';
import { LoginService } from 'src/app/services/login/login.service';
import { PremiosService } from 'src/app/services/premios/premios.service';

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
      private formBuilder: FormBuilder,
      private loginService: LoginService,
      private promoService: PremiosService
    ) // declarar servicio de productos
    {}
    labels: string[] = ['Id', 'Nombre', 'Precio'];
    premioInfo: Premio = new Premio(0,0,0,new Date(),new Date());
    premioList: Premio[] = []

    formButtonLayoutTitle: string = 'Crear';
    
    createLayoutActivate: boolean = true;
    updateLayoutActivate: boolean = false;
  
    createProductform = this.formBuilder.group({
      id:[''],
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
        console.log(this.premioList);
      })
    }
  
    closeInputFormLayout() {
      this.premioInfo = new Premio(0,0,0,new Date(),new Date());
      this.createProductform.reset();
    }
    selectedPromo(promo: Premio){
      this.premioInfo = promo;
      this.formButtonLayoutTitle = 'Actualizar';
      this.createLayoutActivate = false;
      this.updateLayoutActivate = true;
    }
    onSubmit(){
      let id: number = parseInt(''+this.createProductform.value.id);
      let articuloId: number = parseInt(''+this.createProductform.value.articuloId);
      let precioNuevo: number = parseInt(''+ this.createProductform.value.precioNuevo);
      let fechaInicio: Date = new Date(''+this.createProductform.value.fechaInicio)
      let fechaFin: Date = new Date(''+this.createProductform.value.fechaFin);

      if(this.updateLayoutActivate){
        let promo = new Premio(
          id,
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
        this.createProductform.reset();
      })
    }
    //update
    updatePromo(promo: Premio): void{
      this.promoService.updatePromo(promo).subscribe((data) =>{
        console.log(data);
        this.getPremios();
        this.createProductform.reset();
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
