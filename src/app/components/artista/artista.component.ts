import { Component } from '@angular/core';

//para saber cuál es la ruta activa a la cuál se redireccionará se importa ActivatedRouter
import { ActivatedRoute } from '@angular/router';
import { SpotifyService } from '../../services/spotify.service';

@Component({
  selector: 'app-artista',
  templateUrl: './artista.component.html',
  styles: []
})
export class ArtistaComponent {

  artista: any = {};

  topTracks: any[] = [];

  loadingArtist: boolean;

  constructor( private _activatedRoute: ActivatedRoute,
               private _spotify: SpotifyService ) { 
    
     this.loadingArtist=true;           

     this._activatedRoute.params.subscribe( (params) => {
      //se pone entre llaves cuadradas [] para evitar que en la consola se vea como un objeto y que solo me devuelva textualmente el id
      this.getArtista( params['id'] );
      this.getTopTracks( params['id'] );


    } )

  }

  //éste evento llama al servicio
  //este evento necesita el id por parámetro por lo cual va en el constructor como activatedRoute
  getArtista( id: string ){
    
    
    this.loadingArtist=true;

    this._spotify.getArtista( id )
                 .subscribe( (artista) => {
                   console.log(artista);
                   //el objeto vacío artista ahora se llanará con la data que trae spotify acerca de un artista
                   this.artista = artista;
                   this.loadingArtist=false;
                 } )
  }

  //llama al servicio de spotify para así poder obtener ladata
  //este evento necesita el id por parámetro por lo cual va en el constructor como activatedRoute
  getTopTracks( id: string ){

    this._spotify.getTopTracks( id )
                 .subscribe( (topTracks) => {
                   console.log(topTracks);
                   this.topTracks = topTracks;
                 } ) 

  }


}
