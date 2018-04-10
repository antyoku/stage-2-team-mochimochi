/* global $ */
function outputFavorite (movieUrl) {
  $('.favorite__thumbnail-img').remove()
  var idMovie
  if (movieUrl.match(/watch/)) {
    idMovie = movieUrl.split(/.*v=([\d\w-]+).*/)
  } else if (movieUrl.match(/youtu.be/)) {
    idMovie = movieUrl.split(/.*\.be\/([\d\w-]+).*/)
  } else if (movieUrl.match(/embed/)) {
    idMovie = movieUrl.split(/.*embed\/([\d\w-]+).*/)
  }
  $('.heading--favorite').hide()
  $('.favorite__thumbnail-area').hide()
  $('.favorite__movie-area').show()
  $('#outputMovie').html('<div class=\'favorite__container\'><iframe class=\'favorite__movie\' src=\'https://www.youtube.com/embed/' + idMovie[1] + '?rel=0&amp;showinfo=0\' frameborder=\'0\' allow=\'autoplay; encrypted-media\'></iframe></div>')
}
