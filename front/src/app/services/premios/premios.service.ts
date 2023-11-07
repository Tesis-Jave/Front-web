import { Injectable } from '@angular/core';
import { CookieService } from "ngx-cookie-service";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Premio } from 'src/app/models/premios/premio';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class PremiosService {

  url = 'http://localhost:3000/promociones'
  constructor(private http: HttpClient,private cookies:CookieService) { }


  private httpOptions = {
    headers: new HttpHeaders().set('Authorization',this.cookies.get('token'))
  };

  getAllpromos(): Observable<Premio[]>{
    const headers = new HttpHeaders().set('Authorization',"Bearer "+this.cookies.get('token'));
    return this.http.get<Premio[]>(this.url,{headers});
  }
  deletePromo(id: number): Observable <any>{
    const headers = new HttpHeaders().set('Authorization',"Bearer "+this.cookies.get('token'));
    return this.http.delete<any>(this.url+ '/' + id,{headers});
  }
  getPromoById(id: number){
    const headers = new HttpHeaders().set('Authorization',"Bearer "+this.cookies.get('token'));
    return this.http.get<Premio>(this.url+'/'+id,{headers});
  }
  createPromo(promo: Premio): Observable<Premio>{
    const headers = new HttpHeaders().set('Authorization',"Bearer "+this.cookies.get('token'));
    return this.http.post<Premio>(this.url,promo,{headers});
  }
  updatePromo(promo: Premio):Observable<Premio>{
    const headers = new HttpHeaders().set('Authorization',"Bearer "+this.cookies.get('token'));
    return this.http.put<Premio>(this.url+'/'+promo.id,promo,{headers});
  }

}
