'use strict'


$('#fav-input-id').change(function () {
  var urlFav = document.getElementById('fav-input-id').value;
  if (urlFav.match(/watch/)) {
    var idMovie = urlFav.split(/.*v=([\d\w\-]+).*/);
    var output = document.getElementById('output');
    output.innerHTML = "<img src='https://img.youtube.com/vi/"+idMovie[1]+"/default.jpg'>";
  } else if (urlFav.match(/youtu.be/)) {
    var idMovie = urlFav.split(/.*\.be\/([\d\w\-]+).*/);
    var output = document.getElementById('output');
    output.innerHTML = "<img src='https://img.youtube.com/vi/"+idMovie[1]+"/default.jpg'>";
  } else if (urlFav.match(/embed/)) {
    var idMovie = urlFav.split(/.*\embed\/([\d\w\-]+).*/);
    var output = document.getElementById('output');
    output.innerHTML = "<img src='https://img.youtube.com/vi/"+idMovie[1]+"/default.jpg'>";    
  }
});