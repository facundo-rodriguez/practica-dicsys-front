import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class CatergoriaServiceService {

  private apiUrl= environment.apiUrl;

  //private url:string="https://practica-node-dicsys.onrender.com/api/categorias"; 
  //"../assets/categoria.json" 
  
  //"../../src/assets/categoria.json"
 

  constructor(private http:HttpClient){ }

  getDatos():Observable<any[]> {
  
    return  this.http.get<any[]>(`${this.apiUrl}/api/categorias`)
  }
}
