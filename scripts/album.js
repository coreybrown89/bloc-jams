


var setSong = function(songNumber) {
  if (currentSoundFile) {
    currentSoundFile.stop();
  }
  // Set a new current song
  currentlyPlayingSongNumber = parseInt(songNumber);
  currentSongFromAlbum = currentAlbum.songs[songNumber - 1];

  currentSoundFile = new buzz.sound(currentSongFromAlbum.audioUrl, {
    formats: ['mp3'],
    preload: true
  });
  setVolume(currentVolume);
};
 var setVolume = function(volume) {
    if (currentSoundFile) {
      currentSoundFile.setVolume(volume);
    }
 };

var getSongNumberCell = function(number) {
  return $('.song-item-number[data-song-number="' + number + '"]');
};

var createSongRow = function(songNumber, songName, songLength) {
	// html song row template
	var template =
	'<tr class="album-view-song-item">'
	+ '  <td class="song-item-number" data-song-number="' + songNumber + '">' + songNumber + '</td>'
	+ '  <td class="song-item-title">' + songName + '</td>'
	+ '  <td class="song-item-duration">' + songLength + '</td>'
	+ '</tr>'
	;

var clickHandler = function() {

  var songNumber = parseInt($(this).attr('data-song-number'));

  if (currentlyPlayingSongNumber !== null) {
      // Revert to song number for currently playing song because user started playing new song.
      var currentlyPlayingCell = getSongNumberCell(currentlyPlayingSongNumber);
      
      currentlyPlayingCell = getSongNumberCell(currentlyPlayingSongNumber);
      currentlyPlayingCell.html(currentlyPlayingSongNumber);
  }
  
   if (currentlyPlayingSongNumber !== songNumber) {
       // Switch from Play -> Pause button to indicate new song is playing.
       setSong(songNumber);
      currentSoundFile.play();
       $(this).html(pauseButtonTemplate);
       currentSongFromAlbum = currentAlbum.songs[songNumber - 1];
       updatePlayerBarSong();
   } else if (currentlyPlayingSongNumber === songNumber) {
      
      if (currentSoundFile.isPaused()) {
          $(this).html(pauseButtonTemplate);
          $('.main-controls .play-pause').html(playerBarPauseButton);
          currentSoundFile.play();
      } else {
          $(this).html(playButtonTemplate);
          $('.main-controls .play-pause').html(playerBarPlayButton);
          currentSoundFile.pause();   
      }

   }

   };
  var $row = $(template);

  var onHover = function(event) {
      var songNumberCell = $(this).find('.song-item-number');
      var songNumber = songNumberCell.attr('data-song-number');

      if (songNumber !== currentlyPlayingSongNumber) {
          songNumberCell.html(playButtonTemplate);
      }
  };

  var offHover = function(event) {
      var songNumberCell = $(this).find('.song-item-number');
      var songNumber = songNumberCell.attr('data-song-number');

      if (songNumber !== currentlyPlayingSongNumber) {
          songNumberCell.html(songNumber);
      }
      // console.log("songNumber type is " + typeof songNumber + "\n and currentlyPlayingSongNumber type is " + typeof currentlyPlayingSongNumber);
  };
  
 
  $row.find('.song-item-number').click(clickHandler);
  $row.hover(onHover, offHover);
  return $row;

 };

var setCurrentAlbum = function(album) {
  currentAlbum  = album;
  var $albumTitle = $('.album-view-title');
	
	// target elements
	var $albumTitle = $('.album-view-title');
  var $albumArtist = $('.album-view-artist');
  var $albumReleaseInfo = $('.album-view-release-info');
  var $albumImage = $('.album-cover-art');
  var $albumSongList = $('.album-view-song-list');

	// assign target element values
  $albumTitle.text(album.title);
  $albumArtist.text(album.artist);
  $albumReleaseInfo.text(album.year + ' ' + album.label);
  $albumImage.attr('src', album.albumArtUrl);

	// clear all html
	$albumSongList.empty();

	// Loop through each song, add each to song list
	for (var i = 0; i < album.songs.length; i++) {
      var $newRow = createSongRow(i + 1, album.songs[i].title, album.songs[i].duration);
      $albumSongList.append($newRow);
    }
};
var trackIndex = function(album, song) {
  return album.songs.indexOf(song);
};

var updatePlayerBarSong = function() {

    $('.currently-playing .song-name').text(currentSongFromAlbum.title);
    $('.currently-playing .artist-name').text(currentAlbum.artist);
    $('.currently-playing .artist-song-mobile').text(currentSongFromAlbum.title + " - " + currentAlbum.artist);
    $('.main-controls .play-pause').html(playerBarPauseButton);
};
var nextSong = function() {
    
  var getLastSongNumber = function(index) {
      return index == 0 ? currentAlbum.songs.length : index;
  };
  
  var currentSongIndex = trackIndex(currentAlbum, currentSongFromAlbum);
  currentSongIndex++;
  
  if (currentSongIndex >= currentAlbum.songs.length) {
      currentSongIndex = 0;
  }
  
 setSong(currentSongIndex + 1);
 currentSoundFile.play();
 updatePlayerBarSong();
  
  var lastSongNumber = getLastSongNumber(currentSongIndex);
  var $nextSongNumberCell = getSongNumberCell(currentlyPlayingSongNumber);
  var $lastSongNumberCell = getSongNumberCell(getLastSongNumber);
  
  $nextSongNumberCell.html(pauseButtonTemplate);
  $lastSongNumberCell.html(lastSongNumber);
    
};

var previousSong = function() {
    
  var getLastSongNumber = function(index) {
      return index == (currentAlbum.songs.length - 1) ? 1 : index + 2;
  };

  var currentSongIndex = trackIndex(currentAlbum, currentSongFromAlbum);
  currentSongIndex--;
  
  if (currentSongIndex < 0) {
      currentSongIndex = currentAlbum.songs.length - 1;
  }
  
  setSong(currentSongIndex + 1)
  currentSoundFile.play();
  updatePlayerBarSong();
  
  var lastSongNumber = getLastSongNumber(currentSongIndex);
  var $previousSongNumberCell = getSongNumberCell(currentlyPlayingSongNumber);
  var $lastSongNumberCell = getSongNumberCell(lastSongNumber);
  
  $previousSongNumberCell.html(pauseButtonTemplate);
  $lastSongNumberCell.html(lastSongNumber);
    
};

var togglePlayFromPlayerBar = function() {
  var songNumberCell = $(this).find('.song-item-number');
  
  if (currentSoundFile.isPaused() ) {
    songNumberCell.html(pauseButtonTemplate);
    $mainPlayPause.html(playerBarPauseButton);
    currentSoundFile.play();
  }
  if (currentSoundFile) {
    $mainPlayPause.html(playerBarPlayButton);
    songNumberCell.html(playButtonTemplate);
    currentSoundFile.pause();
  }
};

//Album button templates
var playButtonTemplate = '<a class="album-song-button"><span class="ion-play"></span></a>';
var pauseButtonTemplate = '<a class="album-song-button"><span class="ion-pause"></span></a>';
var playerBarPlayButton = '<span class="ion-play"></span>';
var playerBarPauseButton = '<span class="ion-pause"></span>';

// Store state of playing songs
var currentAlbum = null;
var currentlyPlayingSongNumber = null;
var currentSongFromAlbum = null;
var currentSoundFile = null;
var currentVolume = 80;

var $previousButton = $('.main-controls .previous');
var $nextButton = $('.main-controls .next');
var $mainPlayPause = $('.main-controls .play-pause');



$(document).ready(function() { 
    // Set album on pageload
    setCurrentAlbum(albumPicasso);
    $previousButton.click(previousSong);
    $nextButton.click(nextSong);
    $mainPlayPause.click(togglePlayFromPlayerBar);
});


















