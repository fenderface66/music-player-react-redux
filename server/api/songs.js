/**
 * Script that performs deals with all song based endpoints.
 */

var fs = require('fs');
var path = require('path');

exports.getSongs = function(req, res) {
  var obj;
  fs.readFile(path.join(__dirname, 'model/songs.json'), function (err, data) {
    if (err) throw err;
    obj = JSON.parse(data);
    res.send(obj);
  });
}

exports.updateRating = function(req, res) {
  var id = parseInt(req.query.id);
  fs.readFile(path.join(__dirname, 'model/songs.json'), function (err, data) {
    var obj
    obj = JSON.parse(data);
    obj.map(function(song) {
      if (song.id === id) {
        if (req.query.positive == 'true' && song.rating < 5) {
          song.rating++
        } else if (req.query.positive == 'false' && song.rating > 0) {
          song.rating--
        }
      }
    })
    
    fs.writeFile(path.join(__dirname, 'model/songs.json'), JSON.stringify(obj), function (err) {
      if (err) return console.log(err);
      console.log('writing to ' + path.join(__dirname, 'model/songs.json'));
      res.send(obj);
    });
    
  });
}

