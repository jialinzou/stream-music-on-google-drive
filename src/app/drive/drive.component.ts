import { Component, OnInit } from '@angular/core';
declare var gapi: any;

@Component({
  selector: 'app-drive',
  templateUrl: './drive.component.html',
  styleUrls: ['./drive.component.css']
})
export class DriveComponent implements OnInit {
  signed: boolean;
  constructor() { 
    this.signed = false;
    console.log('construtor');
  }

  ngOnInit() {
    console.log('init');
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
    }).then(function (this: DriveComponent) {
      // Listen for sign-in state changes.
      this.signed = gapi.auth2.getAuthInstance().isSignedIn.get();
      gapi.auth2.getAuthInstance().isSignedIn.listen(
        (isSignedIn) => {
          console.log(isSignedIn);
          this.signed = isSignedIn;
          if(isSignedIn){
            this.listFiles();
          }
        });
    }.bind(this));
  }

  /**
   *  Sign in the user upon button click.
   */
  handleAuthClick() {
    console.log('signin');
    gapi.auth2.getAuthInstance().signIn();
  }

  /**
   *  Sign out the user upon button click.
   */
  handleSignoutClick() {
    console.log('signout');
    gapi.auth2.getAuthInstance().signOut();
    console.log(this.signed);
  }

  appendPre(message) {
    var pre = document.getElementById('content');
    var textContent = document.createTextNode(message + '\n');
    pre.appendChild(textContent);
  }

  listFiles() {
    gapi.client.drive.files.list({
      'pageSize': 10,
      'fields': "nextPageToken, files(id, name)"
    }).then(function(response) {
      this.appendPre('Files:');
      var files = response.result.files;
      if (files && files.length > 0) {
        for (var i = 0; i < files.length; i++) {
          var file = files[i];
          this.appendPre(file.name + ' (' + file.id + ')');
        }
      } else {
        this.appendPre('No files found.');
      }
    }.bind(this));
  }
}

