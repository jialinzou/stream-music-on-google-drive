import { Component, OnInit } from '@angular/core';

import { Song } from '../song';
import { SONGS } from '../mock-songs';

@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.css']
})
export class PlaylistComponent implements OnInit {
  songs: Song[];
  playingSong: Song;

  constructor() { }

  ngOnInit() {
    this.songs = SONGS;
  }

  addSongs(): void {
    this.songs.push.apply(this.songs, SONGS);
  }

  deleteSong(song: Song): void {
    this.songs = this.songs.filter(h => h !== song);
  }

  play(song: Song): void {
    this.playingSong = song;
    console.log(this.playingSong);
  }
}
