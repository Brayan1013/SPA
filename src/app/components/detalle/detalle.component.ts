import { Component, OnInit, OnChanges, Input, Output, EventEmitter } from '@angular/core';
import { Cliente } from '../clientes/cliente';
import { ClienteService } from '../../services/cliente.service';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { ModalServiceService } from '../../services/modal-service.service';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.css']
})
export class DetalleComponent implements OnInit {

  @Input() cliente:Cliente
  public nameFoto: File;
  public progres;


  constructor(private clieteService: ClienteService, private router: ActivatedRoute, public modalService: ModalServiceService) {
  }

  ngOnInit() {
    
  }

  ngOnChanges(changes: any): void {
    
    
  }

  obtenerImagen(evento){
   // console.log(evento);
    this.nameFoto = evento.target.files[0];
    this.progres = 0;
    console.log(this.nameFoto);

    if(this.nameFoto.type.indexOf('image') < 0){
      Swal.fire('Error', 'Necesitas proporcionar una imagen', 'error');
      this.nameFoto = null;
    }
    
  }

  subirFoto(){

    if(!this.nameFoto){
      Swal.fire('Error', 'Necesitas seleccionar una imagen', 'error');
    }else{
      this.clieteService.subirFoto(this.nameFoto, this.cliente.id).subscribe(event => {
       if(event.type === HttpEventType.UploadProgress){
         this.progres = Math.round((event.loaded / event.total) * 100);
       }else if(event.type === HttpEventType.Response){
         let response = event.body;
         this.cliente = response['cliente'] as Cliente;
         this.modalService.cliemteActualizado.emit(this.cliente);
         Swal.fire("Exito", `La imagen ${response['cliente'].foto} se ha subico correctamente`, 'success');
       }        
      });
    }
  }

  cerrarModal(){
    this.modalService.ocultarModal();
    this.progres = 0;
  }



}
