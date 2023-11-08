import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cafeteria } from 'src/app/models/cafeterias/cafeteria';
import { CookieService } from 'ngx-cookie-service';
import { environment } from 'src/app/config';

@Injectable({
  providedIn: 'root',
})
export class CafeteriasService {
  private apiUrl = environment.apiUrl;
  private ext = '/cafeterias';
  // url = 'https://ds9vkcnn-3000.use2.devtunnels.ms/cafeterias'
  //url = 'http://localhost:3000/cafeterias'
  constructor(private http: HttpClient, private cookies: CookieService) {}

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: this.cookies.get('token'),
    }),
  };

  getAllcafeteria(): Observable<Cafeteria[]> {
    const headers = new HttpHeaders().set(
      'Authorization',
      'Bearer ' + this.cookies.get('token')
    );
    return this.http.get<Cafeteria[]>(this.apiUrl + this.ext, { headers });
  }

  deleteCafeteria(id: number): Observable<any> {
    const headers = new HttpHeaders().set(
      'Authorization',
      'Bearer ' + this.cookies.get('token')
    );
    return this.http.delete<any>(this.apiUrl + this.ext + '/' + id, {
      headers,
    });
  }
  getCafeteriaById(id: number) {
    const headers = new HttpHeaders().set(
      'Authorization',
      'Bearer ' + this.cookies.get('token')
    );
    return this.http.get<Cafeteria>(this.apiUrl + this.ext + '/' + id, {
      headers,
    });
  }
  createCafeteria(cafeteria: Cafeteria): Observable<Cafeteria> {
    const headers = new HttpHeaders().set(
      'Authorization',
      'Bearer ' + this.cookies.get('token')
    );
    return this.http.post<Cafeteria>(this.apiUrl + this.ext, cafeteria, {
      headers,
    });
  }

  updateCafeteria(cafeteria: Cafeteria): Observable<Cafeteria> {
    const headers = new HttpHeaders().set(
      'Authorization',
      'Bearer ' + this.cookies.get('token')
    );
    return this.http.put<Cafeteria>(
      this.apiUrl + this.ext + '/' + cafeteria.id_cafeteria,
      cafeteria,
      { headers }
    );
  }
}
