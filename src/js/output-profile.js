/* global $ */
function outputProfile (bDay, gender) {
  // -----初期設定
  var config = {
    delay: 333, // ライトが点灯する間隔
    lifeSpanFemale: 87, // 女性の平均寿命
    lifeSpanMale: 80 // 男性の平均寿命
  }
  var $lightBox = $('.output-profile__light-box') // スクロールの検出の基準となる要素
  var $lights = $('.output-profile__light') // 年齢/寿命を表すライトの要素
  var $ageText = $('.output-profile__age') // 年齢を表示する要素
  var onClass = 'output-profile__light--on' // 点灯させるlightに付与するクラス
  var ageFemaleClass = 'output-profile__age--female' // 性別が女性の時、年齢欄に付与するクラス

  // ------年齢を算出、年齢を表示
  var age
  var bDaySplit = bDay.split('-')
  var birthDate = new Date(bDaySplit[0], bDaySplit[1] - 1, bDaySplit[2])
  var today = new Date()
  age = today.getFullYear() - birthDate.getFullYear()
  if (today < new Date(today.getFullYear(), bDaySplit[1] - 1, bDaySplit[2])) {
    age--
  }
  // 年齢がマイナスなら0に
  if (age < 0) {
    age = 0
  }
  $ageText.text(age)

  // -----性別ごとの初期処理
  var maxAge
  if (gender === 'female') {
    maxAge = config.lifeSpanFemale
    $ageText.addClass(ageFemaleClass)
  } else if (gender === 'male') {
    maxAge = config.lifeSpanMale
    for (var i = config.lifeSpanMale; i <= config.lifeSpanFemale; i++) {
      $lights.eq(i).hide()
    }
  }

  // ------.profileを非表示に
  $('.profile').hide()

  // -----.output-profileを表示
  $('.output-profile').show()

  // -----要素までスクロールしたらアニメーション
  var isActive = false // アクティブ状態切り替え用

  // setTimer()を読み込み時に一度だけ実行,スクロールごとにも実行
  if (age > 0) {
    setTimer()
    $(window).on('scroll', setTimer)
  }

  function setTimer () {
    if (!(isActive)) {
      // 要素が画面内かを判定
      var scrollBottom = $(window).scrollTop() + $(window).height()
      var scrollTop = $(window).scrollTop()
      if (!($lightBox.offset().top + $lightBox.height() < scrollTop) && !(scrollBottom < $lightBox.offset().top)) {
        // アクティブ状態にする
        isActive = true
        var i = 1
        var timer = setInterval(function () {
          // 時間差で行う処理
          $lights.eq(i - 1).addClass(onClass)

          // 年齢回数or平均寿命回数終わったらタイマーストップ
          if (i >= age || i >= maxAge) {
            clearInterval(timer)
          }
          i++
        }, config.delay)
      }
    }
  }
}
