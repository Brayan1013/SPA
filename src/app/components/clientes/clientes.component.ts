import { Component, OnInit, OnChanges, SimpleChange } from '@angular/core';
import { Cliente } from './cliente';
import { ClienteService } from '../../services/cliente.service';
import {Router, ActivatedRoute} from '@angular/router';
import Swal from 'sweetalert2';
import { HttpEventType } from '@angular/common/http';
import { ModalServiceService } from '../../services/modal-service.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit {

  clientes: Cliente[];
  clienteSeleccionado:Cliente;
  pages: any;
   constructor(private clienteService: ClienteService, 
               private router: Router, 
               private activatedRouter: ActivatedRoute,
               public modalService: ModalServiceService) {
  }

   ngOnInit() {
    let page: number;
    this.activatedRouter.paramMap.subscribe(param => {
      page = param['params'].page
      if(!page){
        page = 0;
      }

        this.clienteService.getClientes(page).subscribe(response => {
        this.clientes = response['content']
        this.pages =  response;
        //response['totalPages'];
        
      });
    });

    //traemos al cliente
    this.modalService.cliemteActualizado.subscribe(clienteActualizado => {
      this.clientes = this.clientes.map(cliente => {
        if(cliente.id == clienteActualizado.id){
          cliente.foto = clienteActualizado.foto;
        }
        return cliente;
      })
      
    })
  }

  

  getCliente(id){
    this.router.navigate(['/nuevo', id]);
  }

  deleteCliente(cliente: Cliente){
    Swal.fire({
      title: '¿Estas seguro?',
      text: `¿Deseas eliminar al cliente ${cliente.nombre}?`,
      type: 'question',
      showCancelButton: true,
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar',
      reverseButtons: true
    }).then((result) => {
      if (result.value) {
        this.clienteService.deletCliente(cliente).subscribe(response => {
          this.clientes = this.clientes.filter(cli => cli !== cliente);
          if(this.clientes.length == 0){
            this.router.navigate(['/clientes/page/', this.pages.number-1])
          }
          Swal.fire('Eliminado!',`El cliente ha sido eliminado con éxito`,'success');
        })
      }
    })
  }

  abrirModal(id: number){
    this.modalService.mostraModal();
    this.clienteService.getCliente(id).subscribe(cliente => {
      this.clienteSeleccionado = cliente;
    })
    
  }

}
