/* global $ */
(function () {
  $('#fav-input-id').on('input', function () {
    var urlFav = $('#fav-input-id').val()
    var output = $('#output')
    if (urlFav.match('watch')) {
      var idWatch = urlFav.split(/.*v=([\d\w-]+).*/)
      output.html("<img class=\"favorite__thumbnail-img\" src='https://img.youtube.com/vi/" + idWatch[1] + "/sddefault.jpg' alt=\"\">")
      $('.favorite__thumbnail-img').fadeIn()
    } else if (urlFav.match(/youtu.be/)) {
      var idTube = urlFav.split(/.*.be\/([\d\w-]+).*/)
      output.html("<img class=\"favorite__thumbnail-img\" src='https://img.youtube.com/vi/" + idTube[1] + "/default.jpg' alt=\"\">")
      $('.favorite__thumbnail-img').fadeIn()
    } else if (urlFav.match(/embed/)) {
      var idEmbed = urlFav.split(/.*embed\/([\d\w-]+).*/)
      output.html("<img class=\"favorite__thumbnail-img\" src='https://img.youtube.com/vi/" + idEmbed[1] + "/default.jpg' alt=\"\">")
      $('.favorite__thumbnail-img').fadeIn()
    } else {
      $('.favorite__thumbnail-img').remove()
    }
  })

  $('.favorite-btn--focus').focus(function () {
    if (this.value === 'https://www.youtube.com/～') {
      $(this).val('').css('color', '#707070')
    }
  })

  $('.favorite-btn--focus').blur(function () {
    if (this.value === '') {
      $(this).val('https://www.youtube.com/～').css('color', '#353535')
    }
  })
})();
