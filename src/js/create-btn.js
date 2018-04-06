/* global $ */
$('#js-create').on('click', function () {
  var year, month, day, sex, what, where, favorite,
    param, isYoutube

  // inputの値を変数に格納
  year = $('.profile__birth-year').val()
  month = $('.profile__birth-month').val()
  day = $('.profile__birth-day').val()
  sex = (function () {
    var sexCheck = $('input:radio[name="sex"]:checked').attr('id')
    if (sexCheck === 'male') {
      return 'male'
    } else if (sexCheck === 'female') {
      return 'female'
    } else {
      return null
    }
  })()
  what = encodeURIComponent($('#js-input-what').val())
  where = $('#where-input-id').val()
  favorite = encodeURIComponent($('#fav-input-id').val())

  if ($('.favorite__thumbnail-img')[0]) {
    isYoutube = true
  } else {
    isYoutube = false
  }

  // 全て入力しているか判定
  if (year && month && day && sex && what && where && favorite) {
    if (isYoutube) {
      // URL+パラメータに移動
      param = '?bday=' + year + '-' + month + '-' + day + '&gender=' + sex + '&city=' + where + '&youtube=' + favorite + '&wau=' + what
      window.location.href = window.location.href.slice(0, window.location.search.length * -1) + param
    } else {
      window.alert('「What is your favorite movie?」にはYouTube動画のURLを入力してください。')
    }
  } else {
    if (isYoutube) {
      window.alert('未入力の項目があります。')
    } else {
      window.alert('未入力の項目があります。\n\n「What is your favorite movie?」にはYouTube動画のURLを入力してください。')
    }
  }
});
