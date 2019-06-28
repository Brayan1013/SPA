import { Injectable, Output, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModalServiceService {

  @Output()
  private notificarUpload = new EventEmitter();

  modalShow:boolean
  constructor() { }

  get cliemteActualizado(): EventEmitter<any>{
    return this.notificarUpload;
  }


  public mostraModal(){
    this.modalShow = true
  }

  public ocultarModal(){
    this.modalShow = false;
  }
}
