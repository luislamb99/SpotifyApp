import { Component } from '@angular/core';
import { SpotifyService } from '../../services/spotify.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html'
})
export class SearchComponent {

  artistas: any[] = [];
  loading: boolean;

  constructor( private spotify: SpotifyService ) {}

  buscar( termino: string ) {
    this.loading = true;

    if ( !termino ) {

    } else {
      let nuevoTermino: any = [];

      for (let i = 0; i < termino.length; i++) {
        // console.log(termino[i]);
        if (termino[i] === ' ') {
          nuevoTermino = nuevoTermino + '%20';
        } else {
          nuevoTermino = nuevoTermino + termino[i];
        }
      }
      // console.log(nuevoTermino)
      this.spotify.getArtistas( nuevoTermino )
        .subscribe((data: any) => {
          // console.log( data );
          this.artistas = data;
          this.loading = false;
        });
    }
  }

}
