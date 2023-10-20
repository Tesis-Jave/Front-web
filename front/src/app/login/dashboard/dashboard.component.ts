import { Component } from '@angular/core';
import { FormBuilder } from "@angular/forms";
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms'
import { NgModel } from '@angular/forms';
import { LoginService } from 'src/app/services/login/login.service';
import { CookieService } from "ngx-cookie-service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  failed: boolean = false;
  authenticated: number = 0;
  userName: string = '';

  public usuarioDefault: string ='usuario';
  public contrasenaDefault: string ='contrasena';
  invalidUsername: boolean | undefined;
  invalidPassword: boolean | undefined;

  checkOutForm = this.formbuilder.group({
    usuario:'',
    password:''
  })

  constructor(private formbuilder: FormBuilder, private router: Router,private loginService: LoginService,private cookies:CookieService) {};

  navigateTo(route: string){
    this.router.navigate([route]);
  }

  ngOnInit(){
    if(this.cookies.get('token')!=""){
      this.authenticated=1;
      this.userName=this.cookies.get('user');
    }
  }

  onSubmit() {
    let userParam: string;
    let passParam: string;
    userParam= ''+ this.checkOutForm.value.usuario;
    passParam=''+this.checkOutForm.value.password;

    this.loginService.login(userParam,passParam).subscribe(
      (data):void=>{
        if (data.token == "error"){
          alert("Usuario o contraseña incorrecta");
          this.failed = true;
        } else {
          this.loginService.setToken(data.token);
          this.failed = false;
          this.userName = userParam;
          this.authenticated = 1;
          this.navigateTo('productos');
        }
      }
    )
  }
  
}
