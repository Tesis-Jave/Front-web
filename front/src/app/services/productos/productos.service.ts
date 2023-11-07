import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Articulo } from 'src/app/models/productos/articulo';
import { CookieService } from "ngx-cookie-service";

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  url = 'https://ds9vkcnn-3000.use2.devtunnels.ms/articulos'
  //url = 'http://localhost:3000/articulos'
  constructor(private http: HttpClient,private cookies:CookieService) { }


  private httpOptions = {
    headers: new HttpHeaders().set('Authorization',this.cookies.get('token'))
  };

  getAllproducto(): Observable<Articulo[]>{
    const headers = new HttpHeaders().set('Authorization',"Bearer "+this.cookies.get('token'));
    return this.http.get<Articulo[]>(this.url,{headers});
  }

  deleteProducto(id: number): Observable<any>{
    const headers = new HttpHeaders().set('Authorization',"Bearer "+this.cookies.get('token'));
    return this.http.delete<any>(this.url+ '/' + id,{headers});
  }
  getProductoById(id: number){
    const headers = new HttpHeaders().set('Authorization',"Bearer "+this.cookies.get('token'));
    return this.http.get<Articulo>(this.url+'/'+id,{headers});
  }
  createProducto(producto: Articulo): Observable<Articulo>{
    const headers = new HttpHeaders().set('Authorization',"Bearer "+this.cookies.get('token'));
    return this.http.post<Articulo>(this.url,producto,{headers});
  }

  updateProducto(producto: Articulo): Observable<Articulo>{
    const headers = new HttpHeaders().set('Authorization',"Bearer "+this.cookies.get('token'));
    return this.http.put<Articulo>(this.url+'/'+producto.id_articulo,producto,{headers});
  }

}

