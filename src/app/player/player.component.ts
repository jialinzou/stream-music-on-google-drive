import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { Song } from '../song';
@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css']
})
export class PlayerComponent implements OnInit {
  @ViewChild('audioPlayer') audioPlayer: any;
  @Output() finished = new EventEmitter<boolean>();
  song: Song;

  constructor() {}

  ngOnInit() {
  }

  play(song: Song): void {
    this.song = song;
    this.audioPlayer.nativeElement.load();
    this.audioPlayer.nativeElement.play();
  }

  onEnded() {
    this.finished.emit(true);
  }
}
