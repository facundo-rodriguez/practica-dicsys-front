import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './ui/pages/home/home.component';
import { ProductosComponent } from './ui/pages/productos/productos.component';
import { HeaderComponent } from './ui/components/header/header.component';
import { GlobalText } from './data/GlobalText';
import { SliderComponent } from './ui/components/slider/slider.component';
import { GlobalUrl } from './data/url';
import { FooterComponent } from './ui/components/footer/footer.component';
import { CatergoriaServiceService } from './data/services/categorias/catergoria-service.service';
import { HttpClientModule } from '@angular/common/http';
import { EditarProductoComponent } from './ui/pages/editar-producto/editar-producto.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ModalConfirmComponent } from './ui/components/modal-confirm/modal-confirm.component';
import { LoginComponent } from './ui/pages/login/login.component';
import { AuthService } from './data/services/auth/auth.service';
import { FormsModule } from '@angular/forms';  // Asegúrate de importar FormsModule


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ProductosComponent,
    HeaderComponent,
    SliderComponent,
    FooterComponent,
    EditarProductoComponent,
    ModalConfirmComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule ,
    FormsModule
  ],
  providers: [GlobalText, GlobalUrl, CatergoriaServiceService, AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
