import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Premio } from 'src/app/models/premios/premio';
import { Observable } from 'rxjs';
import { environment } from 'src/app/config';

@Injectable({
  providedIn: 'root',
})
export class PremiosService {
  private apiUrl = environment.apiUrl;
  private ext = '/promociones';

  // url = 'http://localhost:3000/promociones';
  constructor(private http: HttpClient, private cookies: CookieService) {}

  private httpOptions = {
    headers: new HttpHeaders().set('Authorization', this.cookies.get('token')),
  };

  // Obtener artículos por id de promoción
  getArticulosPorPromocion(idPromocion: number): Observable<any> {
    return this.http.get(`${this.apiUrl}${idPromocion}/articulos/`);
  }

   // Agregar un nuevo artículo a una promoción
   agregarArticuloAPromocion(idPromocion: number, idArticulo: number): Observable<any> {
    const body = {
      id_promocion: idPromocion,
      id_articulo: idArticulo
    };
    return this.http.post(`${this.apiUrl}/articulopromocion`, body);
  }

  getAllpromos(): Observable<Premio[]> {
    const headers = new HttpHeaders().set(
      'Authorization',
      'Bearer ' + this.cookies.get('token')
    );
    return this.http.get<Premio[]>(this.apiUrl + this.ext, { headers });
  }
  deletePromo(id: number): Observable<any> {
    const headers = new HttpHeaders().set(
      'Authorization',
      'Bearer ' + this.cookies.get('token')
    );
    return this.http.delete<any>(this.apiUrl + this.ext + '/' + id, {
      headers,
    });
  }
  getPromoById(id: number) {
    const headers = new HttpHeaders().set(
      'Authorization',
      'Bearer ' + this.cookies.get('token')
    );
    return this.http.get<Premio>(this.apiUrl + this.ext + '/' + id, {
      headers,
    });
  }
  createPromo(promo: Premio): Observable<Premio> {
    const headers = new HttpHeaders().set(
      'Authorization',
      'Bearer ' + this.cookies.get('token')
    );
    return this.http.post<Premio>(this.apiUrl + this.ext, promo, { headers });
  }
  updatePromo(promo: Premio): Observable<Premio> {
    const headers = new HttpHeaders().set(
      'Authorization',
      'Bearer ' + this.cookies.get('token')
    );
    return this.http.put<Premio>(
      this.apiUrl + this.ext + '/' + promo.id,
      promo,
      { headers }
    );
  }
}
