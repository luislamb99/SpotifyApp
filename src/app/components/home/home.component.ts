import { Component } from '@angular/core';
import {SpotifyService} from '../../services/spotify.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent {

  nuevasCanciones: any[] = [];
  loading: boolean;
  error: boolean;
  mensajeError: string;

  constructor( private spotify: SpotifyService ) {
    this.loading = true;
    this.error = false;
    this.spotify.getToken()
      .subscribe( (data: any) => {
        // console.log('Data: ' + data);

        this.spotify.getNewReleases()
          .subscribe( (dataR: any) => {
            // console.log( data );
            this.nuevasCanciones = dataR;
            this.loading = false;
          }, (error) => {
            // console.log( error );
            this.loading = false;
            this.mensajeError = error.error.error.message;
            this.error = true;
          });
      }, );
  }

}
