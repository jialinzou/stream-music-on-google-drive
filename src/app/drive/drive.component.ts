import { Component, OnInit, ChangeDetectorRef } from '@angular/core';

import { DriveService } from '../drive.service'

@Component({
  selector: 'app-drive',
  templateUrl: './drive.component.html',
  styleUrls: ['./drive.component.css']
})

export class DriveComponent implements OnInit {
  isSignIn: boolean;
  constructor(private driveService: DriveService, private ref: ChangeDetectorRef) { 
    driveService.isSignIn.subscribe((res)=>{
      this.isSignIn = res;
      ref.detectChanges();
    });
  }

  ngOnInit() { 
  }
}

