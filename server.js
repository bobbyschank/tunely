// SERVER-SIDE JAVASCRIPT

//require express in our app
var express = require('express');
// generate a new express app and call it 'app'
var app = express();

// Set up bodyParser
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));

// serve static files from public folder
app.use(express.static(__dirname + '/public'));

/************
 * DATABASE *
 ************/

/**********
 * ROUTES *
 **********/

/*
 * HTML Endpoints
 */

app.get('/', function homepage (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


/*
 * JSON API Endpoints
 */

var db = require('./models');

app.get('/api', function api_index (req, res){
  res.json({
    message: "Welcome to tunely!",
    documentation_url: "https://github.com/tgaff/tunely/api.md",
    base_url: "http://tunely.herokuapp.com",
    endpoints: [
      {method: "GET", path: "/api", description: "Describes available endpoints"}
    ]
  });
});

app.get('/api/albums/:album_id', function (req, res) {
  console.log('IN SERVER SIDE UPDATE ALBUM');
  console.log('album_id: ' + req.params.album_id);
  let albumId = req.params.album_id;

  var query = {};
  query._id = albumId;
  db.Album.find(query, function(err, foundAlbum) {
    console.log('foundAlbum: ' + foundAlbum);
    res.json({foundAlbum: foundAlbum});
  });
    // .exec(function(err, foundAlbum) {
    //   console.log('foundAlbum: ' + foundAlbum);
    //   res.json(foundAlbum);      
    // });
});

app.get('/api/albums', function album_index(req, res){
  db.Album.find({}, function(err, albums) {
    res.json(albums);
  });
});
console.log('server');

app.post('/api/albums/:album_id/songs', function (req, res) {
  // Get book id from url params (`req.params`)
  var albumId = req.params.album_id;
  db.Album.findById(albumId)
    .exec(function(err, foundAlbum) {
      console.log('foundAlbum: ' + foundAlbum);
      if (err) {
        res.status(500).json({error: err.message});
      } else if (foundAlbum === null) {
        res.status(404).json({error: "No Book found by this ID"});
      } else {
        foundAlbum.songs.push(req.body);
        foundAlbum.save();
        res.status(201).json(foundAlbum);
      }
    }
  );
});

app.post('/api/albums', function(req, res) {
  let genresString = req.body.genres;
  let genresArray = genresString.split(", ");
  console.log('IN POSTMASTER GENERAL');
  console.log('req.body: ' + req.body);
  console.log('req.body.name: ' + req.body.name);
  console.log('req.body.genres: ' + req.body.genres);
  console.log('req.body.genresArray: ' + genresArray[2]);

  db.Album.create({
    artistName: req.body.artistName, 
    name: req.body.name,
    releaseDate: req.body.releaseDate,
    genres: genresArray
  }, function(error, album) {
    res.json(album);
  });
});

/**********
 * SERVER *
 **********/

// listen on port 3000
app.listen(process.env.PORT || 3000, function () {
  console.log('Express server is running on http://localhost:3000/');
});
