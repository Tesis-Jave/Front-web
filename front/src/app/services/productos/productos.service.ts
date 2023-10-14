import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Articulo } from 'src/app/models/productos/articulo';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  url = 'http://localhost:3000/articulos'
  constructor(private http: HttpClient) { }

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      // 'Authorization': 'Bearer '+localStorage.getItem('token')
    })
  };

  getAllproducto(): Observable<Articulo[]>{
    return this.http.get<Articulo[]>(this.url,this.httpOptions);
  }

  deleteProducto(id: number): Observable<any>{
    return this.http.delete<any>(this.url+ '/' + id);
  }
  getProductoById(id: number){
    return this.http.get<Articulo>(this.url+'/'+id,this.httpOptions);
  }
  createProducto(producto: Articulo): Observable<Articulo>{
    return this.http.post<Articulo>(this.url,producto,this.httpOptions);
  }

  updateProducto(producto: Articulo): Observable<Articulo>{
    return this.http.put<Articulo>(this.url+'/'+producto.codArticulo,producto,this.httpOptions);
  }

}

