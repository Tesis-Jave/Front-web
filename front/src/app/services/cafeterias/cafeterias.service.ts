import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cafeteria } from 'src/app/models/cafeterias/cafeteria';
import { CookieService } from "ngx-cookie-service";

@Injectable({
  providedIn: 'root'
})
export class CafeteriasService {

  url = 'http://localhost:3000/cafeterias'
  constructor(private http: HttpClient,private cookies:CookieService) { }

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.cookies.get('token')
    })
  };

  getAllcafeteria(): Observable<Cafeteria[]>{
    const headers = new HttpHeaders().set('Authorization',"Bearer "+this.cookies.get('token'));
    return this.http.get<Cafeteria[]>(this.url,{headers});
  }

  deleteCafeteria(id: number): Observable<any>{
    const headers = new HttpHeaders().set('Authorization',"Bearer "+this.cookies.get('token'));
    return this.http.delete<any>(this.url+ '/' + id,{headers});
  }
  getCafeteriaById(id: number){
    const headers = new HttpHeaders().set('Authorization',"Bearer "+this.cookies.get('token'));
    return this.http.get<Cafeteria>(this.url+'/'+id,{headers});
  }
  createCafeteria(cafeteria: Cafeteria): Observable<Cafeteria>{
    const headers = new HttpHeaders().set('Authorization',"Bearer "+this.cookies.get('token'));
    return this.http.post<Cafeteria>(this.url,cafeteria,{headers});
  }

  updateCafeteria(cafeteria: Cafeteria): Observable<Cafeteria>{
    const headers = new HttpHeaders().set('Authorization',"Bearer "+this.cookies.get('token'));
    return this.http.put<Cafeteria>(this.url+'/'+cafeteria.id_cafeteria,cafeteria,{headers});
  }
}
