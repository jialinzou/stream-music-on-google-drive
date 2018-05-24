import { Component, OnInit, ViewChild } from '@angular/core';

import { Song } from '../song';
import { SONGS } from '../mock-songs';

@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.css']
})
export class PlaylistComponent implements OnInit {
  @ViewChild('player') player: any;
  songs: Song[];
  playingSong: Song;

  constructor() { }

  ngOnInit() {
    this.songs = SONGS;
    this.player.play(this.songs[0]);
    this.playingSong = this.songs[0];
  }

  addSongs(): void {
    this.songs.push.apply(this.songs, SONGS);
  }

  deleteSong(song: Song): void {
    this.songs = this.songs.filter(h => h !== song);
  }

  playRandomSong() {
    let i: number = Math.floor(Math.random() * this.songs.length);
    this.playingSong = this.songs[i];
    this.player.play(this.playingSong);
  }
  //play(song: Song): void {
  //  this.playingSong = song;
  //  console.log(this.playingSong);
  //}
}
