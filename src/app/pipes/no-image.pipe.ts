import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'noImage'
})
export class NoImagePipe implements PipeTransform {

  transform(value: string): string {

    if(value === null){
      return 'assets/noImage.png';       
    }else{
      return `http://localhost:8080/api/uploads/img/${value}`;
    }
    return null;
  }

}
