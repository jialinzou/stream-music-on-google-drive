import { Component, OnInit } from '@angular/core';
import { DriveService } from '../drive.service'

@Component({
  selector: 'app-drive',
  templateUrl: './drive.component.html',
  styleUrls: ['./drive.component.css']
})
export class DriveComponent implements OnInit {
  messages: string[];
  isSignIn: boolean;
  constructor(private driveService: DriveService) { 
    this.messages = [];
    driveService.isSignIn.subscribe((res)=>{
      if (res) {
        this.sendMsg('Signed In');
      } else {
        this.sendMsg('Signed out');
        console.log('Signed out');
      }
     })
  }

  ngOnInit() { 
  }

  /**
   *  Sign in the user upon button click.
   */
  handleAuthClick() {
    this.sendMsg('comp request signin');
    this.driveService.handleAuthClick();
  }

  /**
   *  Sign out the user upon button click.
   */
  handleSignoutClick() {
    this.sendMsg('comp request signout');
    this.driveService.handleSignoutClick();
  }

  sendMsg(message) {
    this.messages.push(message);
  }

  clearMsg() {
    this.messages = [];
  }
}

