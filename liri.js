
require("dotenv").config();

var fs = require('fs');
//var prompt = require('prompt');
var keys = require("./keys.js");
var request = require("request");
var Twitter = require('twitter');
var spotify = require("spotify");
//grab user input
var userInput = '';


var userSelection = '';

var tweet = 'tweet';
var spotified = 'spotify-this-song';
var movieInfo = 'movie';


var criteria = process.argv[2];
var nodeArgv = process.argv;

//movie or song
var x = "";
//attaches multiple word arguments
for (var i=3; i<nodeArgv.length; i++){
  if(i>3 && i<nodeArgv.length){
    x = x + "+" + nodeArgv[i];
  } else{
    x = x + nodeArgv[i];
  }
}



getInfo(criteria)

function getInfo(criteria, args) {
    if (random()) {
        switch (criteria) {
        case 'tweet':
            tweet();
            break;
        case 'spotify-this-song':
            if (args) {
                console.log(' Argument passed: ' + args);
                spotified(args);
            }
            else {
                if (process.argv[3] != null) {
                    var song = process.argv.slice(3).join('+');
                    spotified(song);
                }
                else {
                    spotified('The Sign');
                }
            }
            break;
            
            case 'movie-this':
            if (args) {
                movieInfo(args);
            }
            else {
                var movie = process.argv.slice(3).join('+');
                movieInfo(movie);
            }
            break;
        case 'do-what-it-says':
            grab();
            break;
        }
    }
}
function tweet() {
  var client = new Twitter(keys.twitterKeys);
  var params = {
      screen_name: 'JoeJohnson'
      , count: 20
  };
  client.get('statuses/user_timeline', params, function (error, tweets, response) {
      if (!error) {
          for (var i = 0; i < tweets.length; i++) {
              console.log(' Tweet: ' + tweets[i].text)
              console.log(" Tweet Number: " + (i + 1))
              console.log(' Created: ' + tweets[i].created_at)
              
          }
      }
  });
}

function spotified(song) {
  spotify.criteria({
      'type': 'track',
      'query': song 
  }, function (error, data) {
      if (error) {
          console.log(error);
      }
      else {
              console.log('Artist: ' + data.tracks.items[0].album.artists[0].name);
              console.log('Song Name: ' + data.tracks.items[0].name);
              console.log('Preview URL: ' + data.tracks.items[0].preview_url);
              console.log('Album Name: ' + data.tracks.items[0].album.name);
              console.log('')
      }
  });
}
function movieInfo(movie) {
  var query = 'http://www.omdbapi.com/?t=' + movie + '&plot=short&r=json&tomatoes=true';
  request(query, function (error, response, body) {
      if (!error && response.statusCode == 200) {
          var movieDetails = JSON.parse(body);
          if (movieDetails.Response === 'False') {
              myMovieDetails('Mr. Nobody');
          }
          else {
                console.log(" Title: " + JSON.parse(body)["Title"]);
                console.log(" Release Year: " + JSON.parse(body)["Released"]);
                console.log(" IMDB Rating: " + JSON.parse(body)["imdbRating"]);
                console.log(" Rotten Tomatoes Rating: " + JSON.parse(body)["tomatoRating"]);
                console.log(" Country: " + JSON.parse(body)["Country"]);
                console.log(" Language: " + JSON.parse(body)["Language"]);
                console.log(" Plot: " + JSON.parse(body)["Plot"]);
                console.log(" Actors: " + JSON.parse(body)["Actors"]);
                

              }
            }
        });
    }
    

    function grab() {
      fs.readFile('random.txt', 'utf-8', function (error, data) {
          var info = data.split(',');
          getInput(info[0], info[1]);
      });
  }

  function random() {
   var inputs = process.argv.slice(2).join(" ");
    fs.appendFile("log.txt", "node liri.js: " + inputs + "\n", function (error) {
        if (error) {
            throw error;
        }
        else {
            console.log(" info stored ");
        }
    });
    return true;
}

//trying to append to log.txt file
fs.appendFile('log.txt', 'data to append', function (err) {
  if (err) throw err;
  console.log('Logged it!');
});