import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';
import { registerLocaleData } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ClientesComponent } from './components/clientes/clientes.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import {HttpClientModule} from '@angular/common/http';
import { NuevoClienteComponent } from './components/nuevo-cliente/nuevo-cliente.component';
import { FormsModule }   from '@angular/forms';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';

  // importar locales
import localePy from '@angular/common/locales/es-MX';
import { PaginadorComponent } from './components/paginador/paginador.component';
import { DetalleComponent } from './components/detalle/detalle.component';
import { NoImagePipe } from './pipes/no-image.pipe';



  registerLocaleData(localePy, 'es')

@NgModule({
  declarations: [
    AppComponent,
    ClientesComponent,
    NavbarComponent,
    NuevoClienteComponent,
    PaginadorComponent,
    DetalleComponent,
    NoImagePipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    SweetAlert2Module.forRoot({
      buttonsStyling: false,
      customClass: 'modal-content',
      confirmButtonClass: 'btn btn-primary',
      cancelButtonClass: 'btn'
  })
  ],
  providers: [
    {provide: LOCALE_ID, useValue: 'es'}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
