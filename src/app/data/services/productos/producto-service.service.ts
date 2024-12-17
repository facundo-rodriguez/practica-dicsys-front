import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductoServiceService {

  private url:string="/api/productos"
  private apiUrl= environment.apiUrl;

  //private url:string="https://practica-node-dicsys.onrender.com/api/productos"
  //"../assets/categoria.json" 
  
  //"../../src/assets/categoria.json"

  constructor(private http:HttpClient){ }

  //todos los productos
  getDatos():Observable<any[]> {
  
    return  this.http.get<any[]>(`${this.apiUrl}/api/productos` )
  }

  //producto por id

  productById(id_producto:number):Observable<any>{

    return  this.http.get<any>(`${this.apiUrl}/api/productos/${id_producto}` )    
  }

  //producto por categoria
  productByCategory(id_categoria:number):Observable<any[]>{

    return  this.http.get<any[]>(`${this.apiUrl}/api/productos/categoria/${id_categoria}` )    
  }

  //eliminar producto
  deleteProduct(id_producto:number):Observable<any>{

    return  this.http.delete<any>(`${this.apiUrl}/api/productos/${id_producto}`, {withCredentials:true} )    
  }

  editProduct(id_producto:number, producto:object):Observable<any>{
    
    return this.http.put<any>(`${this.apiUrl}/api/productos/${id_producto}`, producto, {withCredentials:true} );  //this.url +"/"+id_producto  
  }

  createProduct(producto:object):Observable<any>{
    
    return this.http.post<any>(`${this.apiUrl}/api/productos`, producto, {withCredentials:true} );    
  }
}
