import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Song } from '../song';
@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css']
})
export class PlayerComponent implements OnInit {
  @ViewChild('player') player: any;
  @Input() song: Song;

  constructor() { console.log('player constructor'); }

  ngOnInit() {
    console.log('player init');
  }

  reload(): void {
    console.log(this.song);
    this.player.load();
    this.player.play();
  }
}
