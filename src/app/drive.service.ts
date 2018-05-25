import { Injectable } from '@angular/core';
import { Observable, of, from} from 'rxjs';
import { pluck } from 'rxjs/operators';

import { Song } from './song';

declare var gapi: any;

@Injectable({
  providedIn: 'root'
})
export class DriveService {
  isSignIn: boolean;
  nextPageToken: string;
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
    }).then(this.updateSignInStatus.bind(this));
  }

  updateSignInStatus(): void {
    this.isSignIn = gapi.auth2.getAuthInstance().isSignedIn.get();
  }

  getSignInStatus(): Observable<boolean> {
    return of(gapi.auth2.getAuthInstance().isSignedIn.get());
  }

  /**
   *  Sign in the user upon button click.
   */
  handleAuthClick() {
    gapi.auth2.getAuthInstance().signIn().then(
      this.updateSignInStatus.bind(this));
  }

  /**
   *  Sign out the user upon button click.
   */
  handleSignoutClick() {
    gapi.auth2.getAuthInstance().signOut().then(
      this.updateSignInStatus.bind(this));
  }

  getSongs(): Observable<Song[]> {
    let res: Observable<any> = from(gapi.client.drive.files.list({
      'pageSize': 10,
      'fields': "nextPageToken, files(id, name, webContentLink, viewedByMeTime)",
      'q': "mimeType='audio/mpeg' and not name contains 'tlog'",
      'orderBy': "viewedByMeTime",
      'pageToken': this.nextPageToken
    }));
    res.pipe(pluck('result', 'nextPageToken')).subscribe(
      (token: string)=>this.nextPageToken=token);
    return res.pipe(pluck('result', 'files'));
  }
}
