import { Component, OnInit } from '@angular/core';
import { Cliente } from '../clientes/cliente';
import { ClienteService } from '../../services/cliente.service';
import {Router, ActivatedRoute} from '@angular/router';
import Swal from 'sweetalert2';
import { Region } from '../clientes/region';

@Component({
  selector: 'app-nuevo-cliente',
  templateUrl: './nuevo-cliente.component.html',
  styleUrls: ['./nuevo-cliente.component.css']
})
export class NuevoClienteComponent implements OnInit {

  public cliente:Cliente = new Cliente();
  public regiones:Region[];
  public errores:string[];
  constructor(private clienteService: ClienteService, private router: Router, private activated: ActivatedRoute) { }

  ngOnInit() {
    this.cargarCliente();
    this.getRegion();
  }

  cargarCliente(){
    let id;
    this.activated.params.subscribe(response => id = response.id);
    if(id){
      this.clienteService.getCliente(id).subscribe(response => this.cliente = response);
    }
    
  }

  getRegion(){
    this.clienteService.getRegiones().subscribe(regiones => this.regiones = regiones);
  }

  crearCliente(){
   this.clienteService.crearCliente(this.cliente).subscribe(response => {
     this.router.navigate(['/clientes']);
     console.log(response);
     
     Swal.fire('Crear cliente', `El cliente ${response.nombre} se ha creado con éxito`, 'success');
     console.log(response.nombre);
     
   }, error => {
     this.errores = error.error.errors as string[];
     Swal.fire('Error', 'Ocurrio un error', 'error');
     console.log(error);
   });
  }

  updateCliente(){
    this.clienteService.updateCliente(this.cliente).subscribe(response => {
      this.router.navigate(['/clientes']);
      Swal.fire('Actualizar Cliente', `El cliente ${response.nombre} se ha actualizado correctamente`, 'success');  
    }, error => {
      this.errores = error.error.errors as string[];
      console.log(error);
      
    });
  }

  form(form:any){
    console.log(form);
    
  }

}
