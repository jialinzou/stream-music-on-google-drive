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
  }

  ngOnInit() { 
  }

  /**
   *  Sign in the user upon button click.
   */
  handleAuthClick() {
    this.sendMsg('signin');
    this.driveService.handleAuthClick();
    this.driveService.getSignInStatus().subscribe(
      (status) => this.sendMsg(status));
    this.driveService.getSignInStatus().subscribe(
      (status) => this.isSignIn = status);
    if (this.isSignIn) {
      this.driveService.listFiles().subscribe(
        (res)=>console.log(res));
    }
  }

  /**
   *  Sign out the user upon button click.
   */
  handleSignoutClick() {
    this.sendMsg('signout');
    this.driveService.handleSignoutClick();
    this.driveService.getSignInStatus().subscribe(
      (status) => this.isSignIn = status);
  }

  sendMsg(message) {
    this.messages.push(message);
  }

  clearMsg() {
    this.messages = [];
  }
}

