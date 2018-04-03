$('.create-btn__switch').on('click', function () {
  outputFavorite('https://www.youtube.com/watch?v=tyX7_bpALEM');
})

function outputFavorite(movieUrl) {
  $('.favorite__thumbnail-img').remove();
  if (movieUrl.match(/watch/)) {
    var idMovie = movieUrl.split(/.*v=([\d\w\-]+).*/);
    var output = document.getElementById('output');
  } else if (movieUrl.match(/youtu.be/)) {
    var idMovie = movieUrl.split(/.*\.be\/([\d\w\-]+).*/);
    var output = document.getElementById('output');
  } else if (movieUrl.match(/embed/)) {
    var idMovie = movieUrl.split(/.*\embed\/([\d\w\-]+).*/);
    var output = document.getElementById('output');
  }
  output.innerHTML = "<iframe class=\"favorite__movie\" src='https://www.youtube.com/embed/" + idMovie[1] + "?rel=0&amp;showinfo=0' frameborder=\"0\" allow=\"autoplay; encrypted-media\"></iframe>";
  $('.heading--favorite').hide();
}