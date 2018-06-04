# StreamMusicOnGoogleDrive

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.7.0.

## Warning
If you have a problem with modifying ViewByMeTime of your Google Drive files, you shouldn't use this app.

## Why and How

Over the years, I've collected thousands of songs. Google Drive is a natual place to store all these MP3 files, since I need them being synced easily on all my devices. Then I just need a 'Google Drive Music Player'. https://github.com/gsuitedevs/drive-music-player is a really awsome one, but it dosen't work for my listening habits, eg. I like to shuffle play all my collected songs. So I was thinking why not build a music player myself.

To use this player, you need to have MP3 files in your Google Drive(shared by others also works). Everytime you hit 'Add Songs' button, it fetchs 10 songs from your Google Drive 'randomly'. 

I just lied. In fact fecthing files randomly is not supported by Google Drive API. This app fetchs the 10 MP3 files with oldest ViewByMeTime(a meta data of Google Drive File). When you play a song or remove a song from current playlist, this app will modify that song file's ViewByMeTime randomly(a random time in the past 30 days). So if you have a problem with modifying ViewByMeTime of your Google Drive files, you shouldn't use this app. Besides that this app doesn't do any modification to your files. 

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:8000/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
