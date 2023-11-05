import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders,HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/usuarios/usuario';
import { CookieService } from "ngx-cookie-service";

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  url = 'http://localhost:3000/perfils'

  constructor(
    private http: HttpClient,
    private cookies:CookieService
    ) { }

    login(user:string,password:string):Observable<any>{
      // Se crea el objeto HttpHeaders vacío
      const headers = new HttpHeaders();
      // Se crea el objeto body vacío
      const body = JSON.stringify({});
      // Se crean los parámetros con el usuario y la contraseña ingresados
      const params = new HttpParams().set('usuario', user).set('password', password);
      // Se realiza una petición POST a la URL especificada con los parámetros y body especificados
      return this.http.post(this.url+'/loginA', body, { params: params });
    }
    setToken(token: string) {
      this.cookies.set("token", token);
    }
    getToken() {
      return this.cookies.get("token");
    }

    logout(){
      this.cookies.delete('token');
    }
}
