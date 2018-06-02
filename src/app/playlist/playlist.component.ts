import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';

import { Song } from '../song';
import { DriveService } from '../drive.service';

@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.css']
})

export class PlaylistComponent implements OnInit {
  @ViewChild('player') player: any;
  songs: Song[];
  playingSong: Song;
  constructor(private driveService: DriveService, private ref: ChangeDetectorRef) {
    this.songs = [];
    driveService.isSignIn.subscribe((res)=>{
      if (res) {
        this.addSongs();
      } 
    })
  }

  ngOnInit() { }

  addSongs(): void {
    this.driveService.getSongs().subscribe((songs) => {
      if (songs.length === 0) {
        this.songs.push({'id': '', 'webContentLink': '', 'name': 'No playable audio file in your Google Drive'});
      } else {
        this.songs.push.apply(this.songs, songs);
      }
      this.ref.detectChanges();
      });
  }

  deleteSong(song: Song): void {
    this.driveService.randomViewByMeTime(song);
    this.songs = this.songs.filter(h => h !== song);
    this.ref.detectChanges();
  }

  playRandomSong() {
    let i: number = Math.floor(Math.random() * this.songs.length);
    this.playingSong = this.songs[i];
    this.player.play(this.playingSong);
    this.ref.detectChanges();
  }

  removeAllSongs() {
    for (let song of this.songs) {
      this.driveService.randomViewByMeTime(song);
    }
    this.songs = [];
  }
}
