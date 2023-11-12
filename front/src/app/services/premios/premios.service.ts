import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Premio } from 'src/app/models/premios/premio';
import { Observable } from 'rxjs';
import { environment } from 'src/app/config';
import { PromoNueva } from 'src/app/models/premios/promo-nueva';

@Injectable({
  providedIn: 'root',
})
export class PremiosService {
  private apiUrl = environment.apiUrl;
  private ext = '/promociones';

  // url = 'http://localhost:3000/promociones/1/articulos';
  constructor(private http: HttpClient, private cookies: CookieService) {}

  private get httpOptions() {
    return {
      headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.cookies.get('token')),
    };
  }

  // Obtener artículos por id de promoción
  getArticulosPorPromocion(idPromocion: number): Observable<any> {
    return this.http.get(`${this.apiUrl}${this.ext}/${idPromocion}/articulos`, this.httpOptions);
  }

  // Agregar un nuevo artículo a una promoción
  agregarArticuloAPromocion(
    idPromocion: number,
    idArticulo: number
  ): Observable<any> {
    const body = {
      id_promocion: idPromocion,
      id_articulo: idArticulo,
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
  createPromo(
    promo: PromoNueva,
    productosIds: number[]
  ): Observable<PromoNueva> {
    const headers = new HttpHeaders().set(
      'Authorization',
      'Bearer ' + this.cookies.get('token')
    );
    promo.articulosIds = productosIds;
    return this.http.post<PromoNueva>(this.apiUrl + this.ext + 'A', promo, {
      headers,
    });
  }

  updatePromo(promo: Premio, productosIds: number[]): Observable<Premio> {
    const headers = new HttpHeaders().set(
      'Authorization',
      'Bearer ' + this.cookies.get('token')
    );
    promo.articulosIds = productosIds;
    console.log( 'URL::',this.apiUrl + this.ext + 'A' + '/' + promo.id_promocion)
    console.log('Promocion: ', promo)
    return this.http.patch<Premio>(
      this.apiUrl + this.ext + 'A' + '/' + promo.id_promocion,
      promo,
      { headers }
    );
  }
}
