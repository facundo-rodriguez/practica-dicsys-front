import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GlobalText } from 'src/app/data/GlobalText';
import { AuthService } from 'src/app/data/services/auth/auth.service';
import { CatergoriaServiceService } from 'src/app/data/services/categorias/catergoria-service.service';
import { ProductoServiceService } from 'src/app/data/services/productos/producto-service.service';
import { UrlNavigateService } from 'src/app/data/services/url-navigate.service';
import { GlobalUrl } from 'src/app/data/url';

declare var bootstrap: any;

@Component({
  selector:'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {

  public id_categoria:number;
  public nombre_categoria:any;
  public productos:any[];
  public id_producto:number;

  
  public logueado:boolean=false;

  public message:string;
  public alertVisible: boolean = false; 
  public alertType: string = 'success'; 


  constructor(public globalText:GlobalText, public router:Router, public categoriaService:CatergoriaServiceService, public productoService:ProductoServiceService, public urlNavigateService:UrlNavigateService, public globalUrl:GlobalUrl, private route: ActivatedRoute, private authService:AuthService){
  
    /* EJEMPLO DE NAVEGACION CON NAVIGATEBYURL. EN ESTE CASO SE RECIBEN DATOS.

      const navegabilidad= this.router.getCurrentNavigation();

      if(navegabilidad && navegabilidad.extras && navegabilidad.extras.state){

        const data=navegabilidad.extras.state;
        this.nombre=data["nombre"]
        this.apellido=data["apellido"]
        this.id_categoria=data["id_categoria"]
      }
    */
      this.id_categoria=this.route.snapshot.params['id_categoria']
  }


  ngOnInit(): void {

    this.authService.getEstadoLogin().subscribe(data=>{

      console.log("en producto el estado loguin es: ",data)
      this.logueado=data;
    })

    this.categoriaService.getDatos().subscribe(data=>{

      const categorias=data.filter(d=> d.id_categoria==this.id_categoria)[0];
      
        this.nombre_categoria=categorias["nombre_categoria"];
    })

    this.productByCategory();
  }

  productByCategory():void{

    this.productoService.productByCategory(this.id_categoria).subscribe(data=>{

      this.productos=data
    })
  }

  onConfirm() {
    console.log('Acción confirmada');
    // Aquí puedes llamar a tu servicio o ejecutar la lógica que desees
    this.delete(this.id_producto )
  }

  onCancel() {
    console.log('Acción cancelada');
  }

  deleteProduct(id_producto){

    this.id_producto=id_producto;
    console.log(this.id_producto)
  }


  showAlert(message: string, type: string = 'success'): void {
    
    const modalElement = document.getElementById('deleteConfirmModal'); // Obtén el elemento modal
    const myModal= new bootstrap.Modal(modalElement)
    myModal.show(modalElement)
    
    this.message = message;
    this.alertType = type;
    this.alertVisible = true;

  }

  closeModal(element): void {
    const modalElement = document.getElementById(element); // Obtén el elemento modal
    if (modalElement) {
      const modalInstance = bootstrap.Modal.getInstance(modalElement); // Obtén la instancia del modal
      modalInstance.hide(); // Cierra el modal
    }
  }

  hideAlert(){
    this.alertVisible = false;
    this.closeModal("deleteConfirmModal")
  }

  delete(id_producto){
    
    this.productoService.deleteProduct(id_producto).subscribe(
      (response)=>{ 
        this.showAlert(response.mensaje)
        this.productByCategory()
      },
      (error)=>{
        this.showAlert("Error al crear el producto","danger")
      },
      ()=>{
        this.closeModal('confirmModal');
      }
    )
    
  }

  pagEditar(id_producto:number){

    this.urlNavigateService.navigate(this.globalUrl.editProduct, id_producto )
  }

}
