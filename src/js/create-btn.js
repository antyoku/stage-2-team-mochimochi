/* global $ */
(function () {
  $('#js-create').on('click', function () {
    // inputの値を変数に格納
    var year = $('.profile__birth-year').val()
    var month = $('.profile__birth-month').val()
    var day = $('.profile__birth-day').val()
    var sex = (function () {
      return $('input:radio[name="sex"]:checked').attr('id')
    })()
    var what = encodeURIComponent($('#js-input-what').val())
    var where = $('#where-input-id').val()
    var favorite = encodeURIComponent($('#fav-input-id').val())

    var isYoutube = $('.favorite__thumbnail-img')[0]

    // 全て入力しているか判定
    if (year && month && day && sex && what && where && where !== '　' && favorite) {
      if (isYoutube) {
        // URL+パラメータに移動
        var param = '?bday=' + year + '-' + month + '-' + day + '&gender=' + sex + '&city=' + where + '&youtube=' + favorite + '&wau=' + what
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
  })
})();
