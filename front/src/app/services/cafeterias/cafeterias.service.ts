import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cafeteria } from 'src/app/models/cafeterias/cafeteria';

@Injectable({
  providedIn: 'root'
})
export class CafeteriasService {

  url = 'http://localhost:3000/cafeterias'
  constructor(private http: HttpClient) { }

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      // 'Authorization': 'Bearer '+localStorage.getItem('token')
    })
  };

  getAllcafeteria(): Observable<Cafeteria[]>{
    return this.http.get<Cafeteria[]>(this.url,this.httpOptions);
  }

  deleteCafeteria(id: number): Observable<any>{
    return this.http.delete<any>(this.url+ '/' + id);
  }
  getCafeteriaById(id: number){
    return this.http.get<Cafeteria>(this.url+'/'+id,this.httpOptions);
  }
  createCafeteria(cafeteria: Cafeteria): Observable<Cafeteria>{
    return this.http.post<Cafeteria>(this.url,cafeteria,this.httpOptions);
  }

  updateCafeteria(cafeteria: Cafeteria): Observable<Cafeteria>{
    return this.http.put<Cafeteria>(this.url+'/'+cafeteria.id_cafeteria,cafeteria,this.httpOptions);
  }
}
