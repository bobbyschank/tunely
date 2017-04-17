/* CLIENT-SIDE JS
 *
 * You may edit this file as you see fit.  Try to separate different components
 * into functions and objects as needed.
 *
 */


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

  $('#albums').on('click', '.add-song', function(e) {
    var id= $(this).parents('.album').data('album-id'); // "5665ff1678209c64e51b4e7b"
    console.log('id',id);
    $('#songModal').data('album-id', id);
    console.log('songModal album-id: ' + $('#songModal').data('album-id'));
    $('#songModal').modal();
  });

  $('#saveSong').on('click', function handleNewSongSubmit(e) {
  e.preventDefault();
  // not crazy
  console.log('not crazy today');
  // get data from modal fields
  let songName = $('#songName').val();
  let trackNumber = $('#trackNumber').val();
  let entry = {
    name: songName,
    trackNumber: trackNumber
  };
  let albumId = $('#songModal').data('album-id');
  let URL = 'http://localhost:3000/api/albums/' + albumId + '/songs';
  console.log('songName: ' + songName);
  console.log('trackNumber: ' + trackNumber);
  console.log('album-id: ' + albumId);

  // POST to SERVER
  $.post(URL, entry);
  // clear form
  $('#songModal').modal('toggle');
  // close modal
  // update the correct album to show the new song
  });
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

  // this function takes a single album and renders it to the page
  function renderAlbum(album) {
    console.log('rendering album:', album);

    var songList = buildSongsHtml(album.songs);

    var albumHtml =
    "        <!-- one album -->" +
    "        <div class='row album' data-album-id='" + album._id + "'>" +
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
    "               <div class='panel-footer'>" +
    "                 <button class='btn btn-primary add-song'>Add Song</button>" +
    "               </div>" +
    "              </div>" +

    "            </div>" +
    "          </div>" +
    "          <!-- end one album -->";

    // render to the page with jQuery
    $("#albums").append(albumHtml);
    // $("#albums").append( "<p>Test</p>" );
    console.log('in renderAlbum');
  }

