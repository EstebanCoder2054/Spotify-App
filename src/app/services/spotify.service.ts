import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

//importación del map (filtrador de información)
import { map } from 'rxjs/operators';

//los headers permiten cambiar los headers para así poder enviar tokens

@Injectable()
export class SpotifyService {

  constructor( private http:HttpClient ) { 
    console.log('Spotify service listo!!');
   }

//el getQuery() funciona para centralizar y optimizar lo común que está en getReleases() y getArtista()
getQuery( query: string ){
  const url = `https://api.spotify.com/v1/${query}`;

  
  const headers = new HttpHeaders({
    'Authorization': 'Bearer BQCOXkVwITZNHEzcX2IeATakb242_h3yaT1SlML25ySBSDZ54oQ0cB8F227bi_w6cpR3elmIqR88N5q_YeA' 
  });

  return this.http.get( url, {headers} )

}

  //este evento me retorna los últimos hits lanzados en spotify 
  //el suscribe estará pendiente de los cambios que ocurran en la data
  getNewRealeses(){

    return this.getQuery('browse/new-releases?limit=20')
                .pipe( map( (data:any) => {
                  //el map recibe toda la información en bruto que le brinda spotify, pero éste lo filtra
                  //y retorna la data filtrada a todos aquellos suscritos
                  return data.albums.items;
                } ) )
   
  }

  //este evento me retorna el artista que tiene el value de la caja de texto en el search
  //este evento me retorna un array con muchos artistas según el término del search
  getArtistas( termino: string ){

    return this.getQuery(`search?q=${termino}&type=artist&limit=15`)
                .pipe( map( (data:any) => {
                  //el map recibe toda la información en bruto que le brinda spotify, pero éste lo filtra
                  //y retorna la data filtrada a todos aquellos suscritos
                  return data.artists.items;
                } ) )    

   }

   //este evento me retorna un solo artista que sea seleccionado el cual es referenciado por el id
   getArtista( id: string ){

    return this.getQuery(`artists/${id}`)
                // .pipe( map( (data:any) => {
                //   //el map recibe toda la información en bruto que le brinda spotify, pero éste lo filtra
                //   //y retorna la data filtrada a todos aquellos suscritos
                //   return data.artists.items;
                // } ) )    

   }  

   getTopTracks( id: string ){

    return this.getQuery(`artists/${id}/top-tracks?country=us`)
                .pipe( map( (data:any) => {
                  //el map recibe toda la información en bruto que le brinda spotify, pero éste lo filtra
                  //y retorna la data filtrada a todos aquellos suscritos
                  return data['tracks'];
                } ) )    

   } 
}
