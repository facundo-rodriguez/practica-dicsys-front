import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GlobalText } from 'src/app/data/GlobalText';
import { AuthService } from 'src/app/data/services/auth/auth.service';
import { CatergoriaServiceService } from 'src/app/data/services/categorias/catergoria-service.service';
import { ProductoServiceService } from 'src/app/data/services/productos/producto-service.service';
import { UrlNavigateService } from 'src/app/data/services/url-navigate.service';


declare var bootstrap: any;

@Component({
  selector:'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public array:number[];
  public categorias:any[];

  public createProductForm: FormGroup;

  private logueado:boolean;


  public message:string;
  public alertVisible: boolean = false; // Controla la visibilidad del alert
  public alertType: string = 'success'; // Tipo de alerta (success, danger, etc.)



  constructor(public globalText:GlobalText, private urlNavigateService:UrlNavigateService, private fb: FormBuilder, private categoriaService:CatergoriaServiceService, private productoService:ProductoServiceService, private authService:AuthService){
    
    this.createProductForm = this.fb.group({
      nombre_producto: ['', [Validators.required, Validators.maxLength(100)]],
      precio: [0, [Validators.required, Validators.min(0)]],
      stock: [0, [Validators.required, Validators.min(0)]],
      id_categoria:[0, [Validators.required, Validators.min(0)]]
    });
   }


  ngOnInit(): void {

    this.authService.getEstadoLogin().subscribe(data=>{

      console.log(data)
      this.logueado=data;
    })


    this.categoriaService.getDatos().subscribe(data=>{

    console.log(data);
      this.categorias=data;
    })

  }

  navigateProducts(id:number):void{

    /* 
      EJEMPLO DE NAVEGACION CON NAVIGATEBYURL. EN ESTE CASO SE PASAN DATOS.
      this.urlNavigateService.navigateUrlData("/productos", {

        state:{
          nombre:"facu",
          apellido:"rodriguez",
          id_categoria: id}
      });
    */
  
    this.urlNavigateService.navigate("/productos",id)
  }

  public getLogueado(){

    return this.logueado;
  }

  showAlert(message: string, type: string = 'success'): void {
    
    this.message = message;
    this.alertType = type;
    this.alertVisible = true;
  }
  
  hideAlert(){
    this.alertVisible = false;
  }

  closeModal(): void {
    const modalElement = document.getElementById('createModal'); // Obtén el elemento modal
    if (modalElement) {
      const modalInstance = bootstrap.Modal.getInstance(modalElement); // Obtén la instancia del modal
      // if (modalInstance) {
      //   modalInstance.hide(); // Cierra el modal
      // } else {
      //   const newModalInstance = new bootstrap.Modal(modalElement); // Crea una nueva instancia si no existe
      //   newModalInstance.hide();
      // }

      modalInstance.hide(); // Cierra el modal
    }
  }


  onCreate():void{

    if(this.createProductForm.valid && this.logueado){

      const {nombre_producto, precio, stock, id_categoria}=this.createProductForm.value
      const productData={
        "nombre_producto":nombre_producto,
        "precio":Number(precio),
        "stock":stock,
        "fk_categoria":Number(id_categoria)
      };

      this.productoService.createProduct(productData).subscribe((response)=>{
          console.log('Respuesta del servidor:', response);
          // Aquí puedes hacer algo con la respuesta, como redirigir o mostrar un mensaje
          this.showAlert(response.mensaje)
        },
        (error) => {
          console.error('Error al crear el producto, mensaje del back:', error);
          // Puedes manejar el error aquí, mostrando un mensaje de error al usuario
          this.showAlert("Error al crear el producto","danger");
        
        }, 
        ()=>{
          this.closeModal();
          this.createProductForm.reset()
        }
      )
    
    }

    
  }



}
