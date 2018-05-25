import { Component, OnInit, ViewChild } from '@angular/core';
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
  constructor(private driveService: DriveService) { }

  ngOnInit() {
    this.songs = [];
    //this.driveService.getSongs().subscribe(
    //  (songs) => this.songs = songs);
    //this.player.play(this.songs[0]);
    //this.playingSong = this.songs[0];
  }

  addSongs(): void {
    this.driveService.getSongs().subscribe(
      (songs) => this.songs.push.apply(this.songs, songs));
  }

  deleteSong(song: Song): void {
    this.songs = this.songs.filter(h => h !== song);
  }

  playRandomSong() {
    let i: number = Math.floor(Math.random() * this.songs.length);
    this.playingSong = this.songs[i];
    this.player.play(this.playingSong);
  }

  getstatus(): void {
    console.log(this.driveService.nextPageToken);
    console.log(this.driveService.isSignIn);
  }


}
