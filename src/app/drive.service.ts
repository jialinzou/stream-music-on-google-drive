import { Injectable } from '@angular/core';
import { Observable, of, from} from 'rxjs';
import { pluck } from 'rxjs/operators';

import { Song } from './song';
import { SONGS } from './mock-songs';

declare var gapi: any;

@Injectable({
  providedIn: 'root'
})
export class DriveService {
  isSignIn: boolean;
  constructor() {
    gapi.load('client:auth2', this.initClient.bind(this));
  }

  /**
   *  Initializes the API client library and sets up sign-in state
   *  listeners.
   */
  initClient() {
    gapi.client.init({
      apiKey: 'AIzaSyCbtINucCL1O5JBEJcugReLwJ2I_5lqGkQ',
      clientId: '171562641950-gnt54el5k5sdu02r4do0qt5aok56fd0h.apps.googleusercontent.com',
      discoveryDocs: ["https://www.googleapis.com/discovery/v1/apis/drive/v3/rest"],
      scope: 'https://www.googleapis.com/auth/drive'
    }).then(()=>{
      this.getSignInStatus().subscribe(
        (status) => this.isSignIn = status);
      console.log(this.isSignIn);
    });
  }

  getSignInStatus(): Observable<boolean> {
    return of(gapi.auth2.getAuthInstance().isSignedIn.get());
  }

  /**
   *  Sign in the user upon button click.
   */
  handleAuthClick() {
    gapi.auth2.getAuthInstance().signIn();
  }

  /**
   *  Sign out the user upon button click.
   */
  handleSignoutClick() {
    gapi.auth2.getAuthInstance().signOut();
  }

  listFiles(): Observable<any>{
    return from(gapi.client.drive.files.list({
      'pageSize': 10,
      'fields': "nextPageToken, files(id, name, webContentLink)"
    })).pipe(pluck('result'));
    /*.then(function(res){
      console.log(res);
    });
    console.log(res);
    let files = res.result.files;
    if (files && files.length > 0) {
      for (var i = 0; i < files.length; i++) {
        var file = files[i];
        songs.push({'name': file.name, 'link':file.webContentLink });
      }
    } 
    console.log(songs);
    return of(songs);*/
  }

  getSongs(): Observable<Song[]> {
    return of(SONGS);
  }
}
