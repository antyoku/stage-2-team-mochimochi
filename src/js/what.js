/* global $ */
(function () {
  $('#js-input-what').on('click change keyup', function () {
    var inputLength = this.value.length
    $('#js-input-what-length').text(inputLength <= 10 ? inputLength : 10)
  })
})();
