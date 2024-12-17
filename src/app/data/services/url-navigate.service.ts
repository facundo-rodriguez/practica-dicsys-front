import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UrlNavigateService {

  constructor(private router:Router) { }

  //metodo para navegar sin pasar datos
  navigateUrl(url:string){

    this.router.navigateByUrl(url);
  }

  //metodo para navegar pasando datos
  navigateUrlData(url:string, params:any){

    this.router.navigateByUrl(url, params);

  }

  navigate(url:string, id:number){

    this.router.navigate([url, id])
  }

}
