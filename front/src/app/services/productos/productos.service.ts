import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Articulo } from 'src/app/models/productos/articulo';
import { CookieService } from "ngx-cookie-service";
import { environment } from 'src/app/config';
import { ProductoNuevo } from 'src/app/models/productos/producto-nuevo';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  private apiUrl = environment.apiUrl
  private ext = '/articulos'
  constructor(private http: HttpClient,private cookies:CookieService) { }


  private httpOptions = {
    headers: new HttpHeaders().set('Authorization',this.cookies.get('token'))
  };

  getAllproducto(): Observable<Articulo[]>{
    const headers = new HttpHeaders().set('Authorization',"Bearer "+this.cookies.get('token'));
    return this.http.get<Articulo[]>(this.apiUrl +this.ext,{headers});
  }

  deleteProducto(id: number): Observable<any>{
    const headers = new HttpHeaders().set('Authorization',"Bearer "+this.cookies.get('token'));
    return this.http.delete<any>(this.apiUrl +this.ext+ '/' + id,{headers});
  }
  getProductoById(id: number){
    const headers = new HttpHeaders().set('Authorization',"Bearer "+this.cookies.get('token'));
    return this.http.get<Articulo>(this.apiUrl +this.ext+'/'+id,{headers});
  }
  createProducto(producto: ProductoNuevo): Observable<Articulo>{
    const headers = new HttpHeaders().set('Authorization',"Bearer "+this.cookies.get('token'));
    return this.http.post<Articulo>(this.apiUrl +this.ext,producto,{headers});
  }

  updateProducto(producto: Articulo): Observable<Articulo>{
    const headers = new HttpHeaders().set('Authorization',"Bearer "+this.cookies.get('token'));
    return this.http.put<Articulo>(this.apiUrl +this.ext+'/'+producto.id_articulo,producto,{headers});
  }

}

