import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GlobalText } from 'src/app/data/GlobalText';
import { ProductoServiceService } from 'src/app/data/services/productos/producto-service.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CatergoriaServiceService } from 'src/app/data/services/categorias/catergoria-service.service';


declare var bootstrap: any;

@Component({
  selector: 'app-editar-producto',
  templateUrl: './editar-producto.component.html',
  styleUrls: ['./editar-producto.component.css']
})
export class EditarProductoComponent implements OnInit {

  public productoForm: FormGroup;
  
  public id_producto:number;
  public producto:any;

  public message:string;
  public alertVisible: boolean = false; // Controla la visibilidad del alert
  public alertType: string = 'success'; // Tipo de alerta (success, danger, etc.)


  public categorias:any[];

                                                                                                                           
  constructor(public globalText:GlobalText, private productoService:ProductoServiceService, private router:Router,  private fb: FormBuilder, private categoriaService:CatergoriaServiceService, private route: ActivatedRoute){ 

    this.id_producto=this.route.snapshot.params["id_producto"];

    this.productoForm = this.fb.group({
      nombre_producto: ['', [Validators.required, Validators.maxLength(100)]],
      precio: [0, [Validators.required, Validators.min(0)]],
      stock: [0, [Validators.required, Validators.min(0)]],
      id_categoria:[0, [Validators.required, Validators.min(0)]]
    });
    
    
  }

  ngOnInit(): void {

    this.productById(this.id_producto);

    this.getCategory();
  }


  productById(id_producto:number){

    this.productoService.productById(id_producto).subscribe(d=>{

      this.productoForm.patchValue(d[0])

    })
  }

  getCategory(){
    this.categoriaService.getDatos().subscribe(data=>{

      console.log(data)
      this.categorias=data;//["categorias"];
    })
  }


  onConfirm() {
    console.log('Acción confirmada');
    // Aquí puedes llamar a tu servicio o ejecutar la lógica que desees

    this.onSubmit()
  }

  onCancel() {
    console.log('Acción cancelada');
  }

  closeModal(): void {
    const modalElement = document.getElementById('confirmModal'); // Obtén el elemento modal
    console.log("el modal element es:")
    console.log(modalElement)
    if (modalElement) {
      const modalInstance = bootstrap.Modal.getInstance(modalElement); // Obtén la instancia del modal
    
      modalInstance.hide(); // Cierra el modal
    }
  }

  // Método para mostrar el alert
  showAlert(message: string, type: string = 'success'): void {
    this.message = message;
    this.alertType = type;
    this.alertVisible = true;

  }

  hideAlert(){
    this.alertVisible = false;
  }

  onSubmit(): void {

    try{

      if (this.productoForm.valid) {

        const {nombre_producto, precio, stock, id_categoria}=this.productoForm.value
        const productData={
          "id_producto":this.id_producto,
          "nombre_producto":nombre_producto,
          "precio":Number(precio),
          "stock":stock,
          "fk_categoria":Number(id_categoria)
        };
  
        console.log(productData);
  
        this.productoService.editProduct(this.id_producto, productData).subscribe((response)=>{
            console.log('Respuesta del servidor:', response);
            // Aquí puedes hacer algo con la respuesta, como redirigir o mostrar un mensaje
            this.showAlert(response.mensaje)
            this.closeModal();
          },
          (error) => {
            console.error('Error al actualizar el producto, mensaje del back:', error);
            // Puedes manejar el error aquí, mostrando un mensaje de error al usuario
            this.showAlert("Error al actualizar el producto", "danger");
            this.closeModal();

          },
          ()=>{
           
            //this.productoForm.reset();
          }
        )
  
      }

    }catch(e){
      console.log("el error es: " + e)
    }
  
  }

}
