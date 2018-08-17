//hide keys
require("dotenv").config();

//var for project
var keys = require("./keys.js");
var fs = require("fs");
var Spotify =require('node-spotify-api');
var spotify= new Spotify(keys);
var request= require("request");
var movieName = process.argv[3];
var liriReturn = process.argv[2];
var weather = require("weather-js");
console.log(process.argv)
switch (liriReturn) {
    case "spotify-this-song":
    spotifyThisSong(process.argv[3])
    break;
    
    case "movie-this":
    break;

    case "weather":
    break;

    case "do-what-it-says":
    break;

default: console.log("\n" + "type any command after 'node liri.js':  "  + "\n" +
    "spotify-this-song 'any song title' " + "\n" + 
    "movie-this 'any movie title' " + "\n" +
    "weather 'any city' "+ "\n" +
    "do-what-it-says " + "\n" +
    "Use quotes for multiword titles!");


    //spotify function//
function spotifyThisSong(trackName) {
    var trackName = process.argv[3];
    if(!trackName){
        trackName="The Sign";
    };
    songRequest = trackName;
    spotify.search({
        type:"track",
        query: songRequest
    },
    function(err,data){
   
        if(!err){
            var trackInfo = data.tracks.items;
            for  (var i = 0;i <5; i++){
                if (trackInfo[i]!=undefined){
                    var spotifyResults =
                    "Artists: " + trackInfo[i].artists[0].name + "\n"+
                    "Song: " + trackInfo[i].name + "\n" +
                    "Preview URL: " + trackInfo[i]. preview_url + "\n" +
                    "Album: " + trackInfo[i].name + "\n" 

                console.log(spotifyResults);
                console.log(' ');
             };
         };
        
        } else {
            console.log("error: "+ err);
            return;
        };
        });
    };
};

//movie function//

function movieThis() {

    var queryUrl= "http:www.omdbapi.com/?t=" + movieName + "&y=plot=short&apikey=trilogy";
    
    request(queryUrl, function (error, response, body) {

        if(!error && response.statusCode === 200) {

            var myMovieData = JSON.parse(body);
            var queryUrlResults =
                "Title: " + myMovieData.Title + "\n" +
                "Year: " + myMovieData.Year + "\n" +
                "IMDB Rating: " + myMovieData.Ratings[0].Value + "\n" +
                "Origin Country: " + myMovieData.Country + "\n" +
                "Language: " + myMovieData.Language + "\n" +
                "Plot: " + myMovieData.Plot + "\n" +
                "Actors: " + myMovieData.Actors + "\n" 

            console.log(queryUrlResults);
        }   else {
            console.log("error: " + err);
            return;
        };
    });
};

            fs.writeFile("random.txt", 'spotify-this-song,"The Sign"', function (err) {
                var song = "spotify-this-song 'Wings of a Butterfly'"

            if (err) {
                return console.log(err);
            };


            console.log(song);
        });
            


