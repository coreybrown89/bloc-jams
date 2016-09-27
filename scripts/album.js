var albumPicasso = {
	title: 'The Colors',
	artist: 'Pablo Picasso',
	label: 'Cubism',
	year: '1881',
	albumArtUrl: 'assets/images/album_covers/01.png',
	songs: [
	 { title: 'Blue', duration: '4:26' },
	 { title: 'Green', duration: '3:14' },
	 { title: 'Red', duration: '5:01' },
	 { title: 'Pink', duration: '3:21'},
	 { title: 'Magenta', duration: '2:15'}
	]
 };

var albumMarconi = {
	title: 'The Telephone',
	artist: 'Guglielmo Marconi',
	label: 'EM',
	year: '1909',
	albumArtUrl: 'assets/images/album_covers/20.png',
	songs: [
	 { title: 'Hello, Operator?', duration: '1:01' },
	 { title: 'Ring, ring, ring', duration: '5:01' },
	 { title: 'Fits in your pocket', duration: '3:21'},
	 { title: 'Can you hear me now?', duration: '3:14' },
	 { title: 'Wrong phone number', duration: '2:15'}
	]
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
  var songNumber = $(this).attr('data-song-number');

  if (currentlyPlayingSong !== null) {
    // Revert to song number for currently playing song because user started playing new song.
    var currentlyPlayingCell = $('.song-item-number[data-song-number="' + currentlyPlayingSong + '"]');
    currentlyPlayingCell.html(currentlyPlayingSong);
  }
  if (currentlyPlayingSong !== songNumber) {
    // Switch from Play -> Pause button to indicate new song is playing.
    $(this).html(pauseButtonTemplate);
    currentlyPlayingSong = songNumber;

  } else if (currentlyPlayingSong === songNumber) {
    // Switch from Pause -> Play button to pause currently playing song.
    $(this).html(playButtonTemplate);
    currentlyPlayingSong = null;
  }
};
  var $row = $(template);

  var onHover = function(event) {
      var songNumberCell = $(this).find('.song-item-number');
      var songNumber = songNumberCell.attr('data-song-number');

      if (songNumber !== currentlyPlayingSong) {
          songNumberCell.html(playButtonTemplate);
      }
  };

  var offHover = function(event) {
      var songNumberCell = $(this).find('.song-item-number');
      var songNumber = songNumberCell.attr('data-song-number');

      if (songNumber !== currentlyPlayingSong) {
          songNumberCell.html(songNumber);
      }
  };
  
 
  $row.find('.song-item-number').click(clickHandler);
  $row.hover(onHover, offHover);
  return $row;

 };

var setCurrentAlbum = function(album) {
	
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

//Album button templates
var playButtonTemplate = '<a class="album-song-button"><span class="ion-play"></span></a>';
var pauseButtonTemplate = '<a class="album-song-button"><span class="ion-pause"></span></a>';

// Store state of playing songs
var currentlyPlayingSong = null;



$(document).ready(function() { 
    // Set album on pageload
    setCurrentAlbum(albumPicasso);    
});


















