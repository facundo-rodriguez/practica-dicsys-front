import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RoleGuard } from './data/role.guard';
import { EditarProductoComponent } from './ui/pages/editar-producto/editar-producto.component';
import { HomeComponent } from './ui/pages/home/home.component';
import { LoginComponent } from './ui/pages/login/login.component';
import { ProductosComponent } from './ui/pages/productos/productos.component';

const routes: Routes = [
 
  {path:'home',component:HomeComponent}, 
  {path: '', component: HomeComponent, pathMatch: 'full'}, // Coincidencia exacta con la ruta raíz
  {path:'productos/:id_categoria',component:ProductosComponent},
  {path:'editar-producto/:id_producto', component:EditarProductoComponent, 
    canActivate: [RoleGuard],
    data: { roles: ['ADMIN'] }
  }, // Accesible para USER y ADMIN},
  {path:"login", component:LoginComponent}

]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
