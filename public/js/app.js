/* CLIENT-SIDE JS
 *
 * You may edit this file as you see fit.  Try to separate different components
 * into functions and objects as needed.
 *
 */

/* hard-coded data! */
var sampleAlbums = [];
sampleAlbums.push({
             artistName: 'Ladyhawke',
             name: 'Ladyhawke',
             releaseDate: '2008, November 18',
             genres: [ 'new wave', 'indie rock', 'synth pop' ]
           });
sampleAlbums.push({
             artistName: 'The Knife',
             name: 'Silent Shout',
             releaseDate: '2006, February 17',
             genres: [ 'synth pop', 'electronica', 'experimental' ]
           });
sampleAlbums.push({
             artistName: 'Juno Reactor',
             name: 'Shango',
             releaseDate: '2000, October 9',
             genres: [ 'electronic', 'goa trance', 'tribal house' ]
           });
sampleAlbums.push({
             artistName: 'Philip Wesley',
             name: 'Dark Night of the Soul',
             releaseDate: '2008, September 12',
             genres: [ 'piano' ]
           });
/* end of hard-coded data */

$(document).ready(function() {
  console.log('app.js loaded!');

  $.get('http://localhost:3000/api/albums', function(albums) {
    albums.forEach(function(album) {
      renderAlbum(album);
    });
  });

  $("#newAlbum").submit(function(event) {
    console.log('SUBMIT baby, YEAH!!');
    event.preventDefault();
    var formdata = $(this).serialize();
    console.log('formdata: ' + formdata);
    console.log('formdata.songs: ' + formdata.songs);
    $.post('http://localhost:3000/api/albums',  formdata);
    $(this).trigger("reset");
  });

  var sampleSongs = [];
sampleSongs.push({ name: 'Famous',
                   trackNumber: 1
});
sampleSongs.push({ name: "All of the Lights",
                   trackNumber: 2
});
sampleSongs.push({ name: 'Guilt Trip',
                   trackNumber: 3
});
sampleSongs.push({ name: 'Paranoid',
                   trackNumber: 4
});
sampleSongs.push({ name: 'Ultralight Beam',
                   trackNumber: 5
});
sampleSongs.push({ name: 'Runaway',
                   trackNumber: 6
});
sampleSongs.push({ name: 'Stronger',
                   trackNumber: 7
});

  function buildSongsHtml(songs) {
    resultString = '';
    songs.forEach(function(song){
      resultString = resultString + `– (` + song.trackNumber + ') ' + song.name + ` –`;
    });
    console.log('resultString: ' + resultString);
    return(
      '<li class="list-group-item">' +
      '  <h4 class="inline-header">Songs:</h4>' +
      '  <span> ' + resultString + ' </span>' +
      '</li>'
    );
  }

  buildSongsHtml(sampleSongs);



  // this function takes a single album and renders it to the page
  function renderAlbum(album) {
    console.log('rendering album:', album);

    var songList = buildSongsHtml(album.songs);

    var albumHtml =
    "        <!-- one album -->" +
    "        <div class='row album' data-album-id='" + "HARDCODED ALBUM ID" + "'>" +
    "          <div class='col-md-10 col-md-offset-1'>" +
    "            <div class='panel panel-default'>" +
    "              <div class='panel-body'>" +
    "              <!-- begin album internal row -->" +
    "                <div class='row'>" +
    "                  <div class='col-md-3 col-xs-12 thumbnail album-art'>" +
    "                     <img src='" + "http://placehold.it/400x400'" +  " alt='album image'>" +
    "                  </div>" +
    "                  <div class='col-md-9 col-xs-12'>" +
    "                    <ul class='list-group'>" +
    "                      <li class='list-group-item'>" +
    "                        <h4 class='inline-header'>Album Name:</h4>" +
    "                        <span class='album-name'>" + album.name + "</span>" +
    "                      </li>" +
    "                      <li class='list-group-item'>" +
    "                        <h4 class='inline-header'>Artist Name:</h4>" +
    "                        <span class='artist-name'>" + album.artistName + "</span>" +
    "                      </li>" +
    "                      <li class='list-group-item'>" +
    "                        <h4 class='inline-header'>Released date:</h4>" +
    "                        <span class='album-releaseDate'>" + album.releaseDate + "</span>" +
    "                      </li>" + songList +
    "                    </ul>" +
    "                  </div>" +
    "                </div>" +
    "                <!-- end of album internal row -->" +

    "              </div>" + // end of panel-body

    "              <div class='panel-footer'>" +
    "              </div>" +

    "            </div>" +
    "          </div>" +
    "          <!-- end one album -->";

    // render to the page with jQuery
    $("#albums").append(albumHtml);
    // $("#albums").append( "<p>Test</p>" );
    console.log('in renderAlbum');
  }
});
