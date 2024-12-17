import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private user: any = null;

  private apiUrlLocal:string="/api";

  private apiUrl= environment.apiUrl;

  private token: boolean | null = null;

  private login$=new Subject<boolean>();

  constructor(private http: HttpClient){ }

  login(username: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/api/login`, {"username":username, "password": password }, {withCredentials:true});
  }

  logout(): Observable<any>{


    return this.http.post(`${this.apiUrl}/api/login/logout`,{}, {withCredentials:true})
  }

  getProtectedData(token: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/protected`, {
      headers: { Authorization: token },
    });
  }

  getCurrentUser(){

    return this.user;
  }

  
  getToken(){

    return localStorage.getItem("token")
  } 

  getEstadoLogin():Observable<boolean>{

    (this.getToken()) ? this.setEstadoLogin(true) : this.setEstadoLogin(false)
    return this.login$.asObservable();
  }


  setCurrentUser(user:any):void{

    this.user=user;
  }

  setEstadoLogin(estado:boolean){

    this.login$.next(estado);
  }


}
