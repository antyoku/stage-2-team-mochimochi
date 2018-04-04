function outputFavorite(movieUrl) {
  $('.favorite__thumbnail-img').remove();
  if (movieUrl.match(/watch/)) {
    var idMovie = movieUrl.split(/.*v=([\d\w\-]+).*/);
  } else if (movieUrl.match(/youtu.be/)) {
    var idMovie = movieUrl.split(/.*\.be\/([\d\w\-]+).*/);
  } else if (movieUrl.match(/embed/)) {
    var idMovie = movieUrl.split(/.*\embed\/([\d\w\-]+).*/);
  }
  $('.heading--favorite').hide();
  $('.favorite__thumbnail-area').hide();
  $('.favorite__movie-area').show();
  var output = document.getElementById('outputMovie');
  output.innerHTML = "<div class=\"favorite__container\"><iframe class=\"favorite__movie\" src='https://www.youtube.com/embed/" + idMovie[1] + "?rel=0&amp;showinfo=0' frameborder=\"0\" allow=\"autoplay; encrypted-media\"></iframe></div>";
}