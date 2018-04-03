/* global $ */
function outputWhat (val) {
  $('#js-input-what').hide()
  $('#js-what-length').hide()

  $('#js-what-output').text(val).show()
}
