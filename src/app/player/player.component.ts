import { Component, OnInit, ViewChild, Output, EventEmitter, ChangeDetectorRef } from '@angular/core';

import { Song } from '../song';
import { DriveService } from '../drive.service'

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css']
})

export class PlayerComponent implements OnInit {
  @ViewChild('audioPlayer') audioPlayer: any;
  @Output() finished = new EventEmitter<boolean>();
  song: Song;

  constructor(private ref: ChangeDetectorRef, private driveService: DriveService) {
    this.song = {'webContentLink': '', 'id': '', 'name': ''};
  }

  ngOnInit() {
  }

  play(song: Song): void {
    this.driveService.randomViewByMeTime(song);
    this.song = song;
    this.audioPlayer.nativeElement.load();
    this.audioPlayer.nativeElement.play();
    this.ref.detectChanges();
  }

  onEnded() {
    this.finished.emit(true);
  }
}
