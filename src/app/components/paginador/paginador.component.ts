import { Component, OnInit, Input , OnChanges, SimpleChange} from '@angular/core';

@Component({
  selector: 'app-paginador',
  templateUrl: './paginador.component.html',
  styleUrls: ['./paginador.component.css']
})
export class PaginadorComponent implements OnInit {

  @Input() pages:any;
  totalPagesArray;

  desde:number;
  hasta:number;
  constructor() {

    
   }

  ngOnInit() {
    this.pagiandor();
  }

  ngOnChanges(changes: SimpleChange){
    //console.log(changes['pages']);
    if(changes['pages'].previousValue){
      this.pagiandor();
    }
    
  }

  public pagiandor(){
    this.desde = Math.min(Math.max(1, this.pages.number-4), this.pages.totalPages -5);
    this.hasta = Math.max(Math.min(this.pages.totalPages, this.pages.number+4), 6);

    if(this.pages.totalPages > 5){
      this.totalPagesArray = new Array(this.hasta - this.desde + 1).fill(0).map((value, index) => index + this.desde);    
    }else {
    //console.log(this.pages);
    this.totalPagesArray = new Array(this.pages.totalPages).fill(0).map((value, index) => index + 1);
    }
  }

}
