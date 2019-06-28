import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ClientesComponent } from './components/clientes/clientes.component';
import { NuevoClienteComponent } from './components/nuevo-cliente/nuevo-cliente.component';
import { DetalleComponent } from './components/detalle/detalle.component';

const routes: Routes = [
  {path: 'clientes', component: ClientesComponent},
  {path: 'clientes/page/:page', component: ClientesComponent},
  {path: 'nuevo', component: NuevoClienteComponent},
  {path: 'nuevo/:id', component: NuevoClienteComponent},
  {path: 'detalle/:id', component:DetalleComponent},
  {path: '**', pathMatch: 'full', redirectTo: '/clientes', }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash:true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
