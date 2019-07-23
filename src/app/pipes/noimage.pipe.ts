import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'noimage'
})
export class NoimagePipe implements PipeTransform {

  //el value(images) es el arreglo de las imagenes que pueden ir en la card y retorna un string
  transform( images: any[] ): string {

    //si no llega el arreglo con las imagenes
    if( !images ){
      return 'assets/img/noimage.png';
    }

    //en caso de que si llegue el arreglo con las imagenes
    if( images.length > 0 ){
       return images[0].url; 
    }else{
      return 'assets/img/noimage.png';
    }

    return null;
  }

}
