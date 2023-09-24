import { Component } from '@angular/core';
import { FormBuilder } from "@angular/forms";
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms'

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  usuario: string = '';
  contrasena: string = '';
  failed: boolean = false;
  authenticated: number = 0;
  userName: string = '';

  public usuarioDefault: string ='usuario';
  public contrasenaDefault: string ='contrasena';
  invalidUsername: boolean | undefined;
  invalidPassword: boolean | undefined;

  constructor(private formbuilder: FormBuilder, private router: Router) {};

  navigateTo(route: string){
    this.router.navigate([route]);
  }

  onSubmit() {

    if (this.usuario === this.usuarioDefault && this.contrasena === this.contrasenaDefault) {
      this.failed = false;
      this.authenticated = 1;
      this.userName = this.usuario;
      this.navigateTo('home');
    } else {
      this.failed = true;
      this.authenticated = 0;
      this.userName = '';
      this.invalidUsername = this.usuario !== 'usuario';
      this.invalidPassword = this.contrasena !== 'contrasena';
    }
  }
}
