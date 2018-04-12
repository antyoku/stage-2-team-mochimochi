/* global $ */
(function () {
  $('.profile__birth-month').on('click', function () {
    var selectedMonth = $('.profile__birth-month :selected').attr('class')
    if (selectedMonth === 'profile__birth-month--one-digit') {
      $('.profile__birth-month').css('text-indent', '38px')
    } else {
      $('.profile__birth-month').css('text-indent', '30px')
    }
  })

  $('.profile__birth-day').on('click', function () {
    var selectedDay = $('.profile__birth-day :selected').attr('class')
    if (selectedDay === 'profile__birth-day--one-digit') {
      $('.profile__birth-day').css('text-indent', '38px')
    } else {
      $('.profile__birth-day').css('text-indent', '30px')
    }
  })
})();
