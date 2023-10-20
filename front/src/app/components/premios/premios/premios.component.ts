import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Premio } from 'src/app/models/premios/premio';
import { LoginService } from 'src/app/services/login/login.service';

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
      private loginService: LoginService
    ) // declarar servicio de productos
    {}
    labels: string[] = ['Id', 'Nombre', 'Precio'];
    premioInfo: Premio = new Premio(0,0,0,new Date(),new Date());
    createLayoutActivate: boolean = false;
    updateLayoutActivate: boolean = false;
    formButtonLayoutTitle: string = '';
  
    createProductform = this.formBuilder.group({
      id:[''],
      articuloId:[''],
      precioNuevo:[''],
      fechaInicio:[''],
      fechaFin:['']

    });
  
    launchCreateFormLayout() {
      this.createLayoutActivate = true;
      this.formButtonLayoutTitle = 'Crear servicio';
    }
  
    closeInputFormLayout() {
      this.createLayoutActivate = false;
      this.updateLayoutActivate = false;
      this.premioInfo = new Premio(0,0,0,new Date(),new Date());
      this.createProductform.reset();
    }

  
    navigateTo(route: string) {
      this.router.navigate([route]);
    }
  
    onSubmit() {}
  
    cerrarSesion(){
      this.loginService.logout();
      this.navigateTo('login');
    }

}
