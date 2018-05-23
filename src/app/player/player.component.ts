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

  constructor() { console.log('player constructor'); }

  ngOnInit() {
    console.log('player init');
  }

  play(song: Song): void {
    this.song = song;
    console.log(this.song);
    this.audioPlayer.nativeElement.load();
    this.audioPlayer.nativeElement.play();
  }

  ended(): void {
    console.log('ended');
    this.finished.emit(true);
  }
}
