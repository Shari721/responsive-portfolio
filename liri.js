require("dotenv").config();

var keys = require("./keys")

var Twitter = require('twitter');
var Spotify = require('node-spotify-api');
var request = require('request');
var fs = require('fs');

var client = new Twitter(keys.twitter)


function movieTitle() {

var movieTitle = "";

if (process.argv[3]) {
	movieTitle = process.argv[3];
} else {
	movieTitle = "Mr. Nobody";
}

// Then run a request to the OMDB API with the movie specified
var queryUrl = "http://www.omdbapi.com/?t=" + movieTitle + "&y=&plot=short&apikey=trilogy";

// This line is just to help us debug against the actual URL.
console.log(queryUrl);

request(queryUrl, function(error, response, body) {

  // If the request is successful
  if (!error && response.statusCode === 200) {

    console.log("\nTitle: " + JSON.parse(body).Title + "\nRelease Year: " + JSON.parse(body).Year + "\nRating: " + JSON.parse(body).imdbRating + "\nProduced in: " + JSON.parse(body).Country + "\nLanguage: " + JSON.parse(body).Language + "\nPlot: " + JSON.parse(body).Plot + "\nActors: " + JSON.parse(body).Actors);
  }
});
}

//twitter function 
function twitterFunction(){

var params = {screen_name: 'CodingBrat721', count: 10};
client.get('statuses/user_timeline', params, function(error, tweets, response) {
  if (!error) {
    // console.log(tweets);
    for (var i = 0; i < tweets.length; i++) {
    	    console.log(tweets[i].text);
    }
  }
});
}

function doWhatItSays() {

    fs.readFile("random.txt", "utf8", function(error, data) {

        if (error) {
            return console.log(error);
        }

        console.log("random.txt");
       
        var dataArr = data.split(",");
        var songString = dataArr.slice(1).join();
        console.log(songString);
        return songString;

    });
  };

    function spotifyThisSong (title) {

        var user = "";
        
        for (var i = 3; i < process.argv.length; i++){
          user += process.argv[i] + "";
        }; 

        if (title){
            var songTitle = title;
        } else {
            var songTitle = "November Rain";
        }
      
        console.log(user)
        
          var spotify = new Spotify(keys.spotify);
        
          spotify.search({
            type: 'track',
            query: songTitle
          }, 

          function(err, data){
              if (err) {
                return console.log('Error occurred: ' + err);
              }

              var songs = data.tracks.items;

              for (var i = 0; i < songs.length; i++) {
        
                var albumName = songs[i].album.name;
                var artistName = songs[i].artists[0].name;
                var preview = songs[i].album.external_urls.spotify
                var songName = songs[i].name;
              
                console.log("Song: " + songName + "\nArtist: " + artistName + "\nAlbum: " + albumName); 
              };
        
            });
          }

if (process.argv[2] == "my-tweets") {
	twitterFunction();
} else if (process.argv[2] == "movie-this") {
	movieTitle();
} else if (process.argv[2] == "spotify-this-song") {
  spotifyThisSong();
} else if (process.argv[2] === "do-what-it-says") {
  doWhatItSays();
}
else {
	console.log("goodbye");
}
