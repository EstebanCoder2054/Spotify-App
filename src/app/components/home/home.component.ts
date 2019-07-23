import { Component, OnInit } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
import { SpotifyService } from '../../services/spotify.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: []
})
export class HomeComponent  {

  nuevasCanciones:any[] = [];
  loading: boolean;

  // paises:any[] = [];

  constructor( private _spotify:SpotifyService ) {
    
    //cuando inicia el constructor el loading estará activo porque la data aún no ha llegado
    this.loading=true;

    this._spotify.getNewRealeses()
    //cuando el getNewRealeses es invocado me devuelve una información, entonces cuando dicha info llegue nos suscribimos
        .subscribe( (data:any) => {
            console.log(data);
            this.nuevasCanciones = data;
            //cuando ya se tenga toda la data lista y el usuario esté suscrito podemos dejar de mostrar el loading
            this.loading=false;
        } );





    // (dentro de los paréntesis va private http: HttpClient)

    // console.log('Constructor del home llamado!!');

    // //para hacer una petición http y para poder obtener la info hay que suscribirse
    // this.http.get('https://restcountries.eu/rest/v2/lang/es')
    //          .subscribe( (info:any) => {
    //             this.paises = info;
    //           console.log(info);
    //          } ) 

  }


}
