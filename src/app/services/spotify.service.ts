import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {

  tokenSpotify: string;
  CLIENT_ID = 'f3e21eab246e4d7ea3cea1fe18407925';
  CLIENT_SECRET = '6463b37d1c8c484a93a68d7e5b0aa942';
  URL_TOKEN = 'https://spotify-get-token.herokuapp.com/spotify/';

  constructor( private http: HttpClient ) {}

  getToken() {
    return this.http.get( this.URL_TOKEN + this.CLIENT_ID + '/' + this.CLIENT_SECRET )
      .pipe( map( (token: any) => {
        this.tokenSpotify = token.access_token;
        return token.access_token;
      } ));
  }

  getQuery ( query: string ) {
    const url = `https://api.spotify.com/v1/${ query }`;

    const headers =  new HttpHeaders({
      'Authorization': `Bearer ${ this.tokenSpotify }` });

    return this.http.get( url, { headers });
  }

  getNewReleases() {

    return this.getQuery('browse/new-releases?country=CO&limit=15&offset=5')
      .pipe( map( (data: any) => {
        return data.albums.items;
      }));
  }

  getArtistas( termino: string) {

    // console.log(`search?q=${ termino }&type=artist&limit=15&offset=1`);
    return this.getQuery(`search?q=${ termino }&type=track%2Cartist&market=CO&limit=15&offset=5`)
      .pipe( map( (data: any) => {
        return data.artists.items;
      }));
  }

  getArtista( id: string ) {
    return this.getQuery(`artists/${ id }`);
      // .pipe( map( (data: any) => {
      //  return data.artists.items;
      // }));
  }

  getTopTracks( id: string ) {
    return this.getQuery(`artists/${ id }/top-tracks?country=CO`)
      .pipe( map( (data: any) => {
       return data.tracks;
      }));
  }
}
