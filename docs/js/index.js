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

'use strict'

$('#fav-input-id').change(function () {
  var urlFav = document.getElementById('fav-input-id').value;
  if (urlFav.match(/watch/)) {
    var idMovie = urlFav.split(/.*v=([\d\w\-]+).*/);
    var output = document.getElementById('output');
    output.innerHTML = "<img class=\"favorite__thumbnail-img\" src='https://img.youtube.com/vi/" + idMovie[1] + "/sddefault.jpg' alt=\"\">";
    $('.favorite__thumbnail-img').fadeIn();
  } else if (urlFav.match(/youtu.be/)) {
    var idMovie = urlFav.split(/.*\.be\/([\d\w\-]+).*/);
    var output = document.getElementById('output');
    output.innerHTML = "<img class=\"favorite__thumbnail-img\" src='https://img.youtube.com/vi/" + idMovie[1] + "/default.jpg' alt=\"\">";
    $('.favorite__thumbnail-img').fadeIn();
  } else if (urlFav.match(/embed/)) {
    var idMovie = urlFav.split(/.*\embed\/([\d\w\-]+).*/);
    var output = document.getElementById('output');
    output.innerHTML = "<img class=\"favorite__thumbnail-img\" src='https://img.youtube.com/vi/" + idMovie[1] + "/default.jpg' alt=\"\">";
    $('.favorite__thumbnail-img').fadeIn();
  } else {
    $('.favorite__thumbnail-img').remove();
  }
});

$('.focus').focus(function () {
  if (this.value === 'https://www.youtube.com/～') {
    $(this).val('').css('color', '#707070');
  }
});

$('.focus').blur(function () {
  if (this.value === '') {
    $(this).val('https://www.youtube.com/～').css('color', '#353535');
  }
});
/* global $ */
(function () {
  // -----パラメータを['AAA=XXX', 'BBB=YYY',...]の状態に分割
  var paramSplit = window.location.search.split('&')
  paramSplit[0] = paramSplit[0].slice(1) // 最初の?を削除

  // -----更にオブジェクト{AAA: 'XXX', BBB: YYY, ...}に変換
  var paramObj = {}
  for (var i = 0; i < paramSplit.length; i++) {
    var ary = paramSplit[i].split('=')
    paramObj[ary[0]] = ary[1]
  }

  // -----パラメータが揃っているならoutputを実行
  if (paramObj.bday && paramObj.gender && paramObj.city && paramObj.youtube && paramObj.wau) {
    // create-btnを非表示
    $('#js-create').hide()
    // 各output～()関数を実行
    outputProfile(paramObj.bday, paramObj.gender)
    outputWhat(decodeURIComponent(paramObj.wau))
    outputFavorite(decodeURIComponent(paramObj.youtube))
    // GoogleAPIが絡むのでload後に実行
    $(window).on('load', function () {
      outputWhere(paramObj.city)
    })
    outputTweet()
  }
})()

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

/* global $ */
// outputTweet関数
function outputTweet () {
  $('.tweet').show()
}

/* global $ */
function outputWhat (val) {
  $('#js-input-what,#js-what-length').hide()
  $('#js-what-output').text(val).show()
}

'use strict'

function outputWhere(outputAddress) {
  var geocoder = new google.maps.Geocoder();
  geocoder.geocode({
    'address': outputAddress
  }, function (results, status) {
    if (status == google.maps.GeocoderStatus.OK) {
      var map = new google.maps.Map(document.getElementById('map-area'), {
        zoom: 8,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        disableDefaultUI: true,
        scrollwheel: false,
        draggable: false
      });
      map.setCenter(results[0].geometry.location);
      var markerWidth;
      var markerHeight;
      if (window.innerWidth < 600) {
        markerWidth = 18.59;
        markerHeight = 30.86;
      } else {
        markerWidth = 45;
        markerHeight = 74.68;
      };
      var markerImg = new google.maps.MarkerImage(
        "image/map-marker.svg",
        new google.maps.Size(100, 100),
        new google.maps.Point(0, 0),
        new google.maps.Point(markerWidth / 2, markerHeight),
        new google.maps.Size(markerWidth, markerHeight)
      );
      var marker = new google.maps.Marker({
        map: map,
        position: results[0].geometry.location,
        icon: markerImg
      });
      map.setOptions({
        styles: styleOptions
      });
      $('.heading--where').hide();
    }
  });
}
/* global gapi */
/* global $ */

// a#js-tweetのhrefを書き換える
(function () {
  window.addEventListener('load', function () {
    shortener(window.location.href)
  })
  function shortener (url) {
    gapi.client.setApiKey('AIzaSyCubhNb4Ace1iEMQAJuoUQ07-6JXAZUlsg')
    gapi.client.load('urlshortener', 'v1', function () {
      var request = gapi.client.urlshortener.url.insert({
        'resource': {
          'longUrl': url
        }
      })
      request.execute(function (response) {
        changeHref(response.id)
      })
    })
  }
  function changeHref (shortenUrl) {
    $('#js-tweet').attr({
      href: 'https://twitter.com/intent/tweet' + '/?text=' + shortenUrl
    })
  }
})()

/* global $ */
$('#js-input-what').on('click change keyup', function () {
  var inputLength = this.value.length
  $('#js-input-what-length').text(inputLength <= 10 ? inputLength : 10)
})

'use strict'

var styleOptions = [{
    'elementType': 'geometry',
    'stylers': [{
      'color': '#212121'
    }]
  },
  {
    'elementType': 'labels',
    'stylers': [{
      'visibility': 'off'
    }]
  },
  {
    'elementType': 'labels.icon',
    'stylers': [{
      'visibility': 'off'
    }]
  },
  {
    'elementType': 'labels.text.fill',
    'stylers': [{
      'color': '#757575'
    }]
  },
  {
    'elementType': 'labels.text.stroke',
    'stylers': [{
      'color': '#212121'
    }]
  },
  {
    'featureType': 'administrative',
    'elementType': 'geometry',
    'stylers': [{
        'color': '#757575'
      },
      {
        'visibility': 'off'
      }
    ]
  },
  {
    'featureType': 'administrative.country',
    'elementType': 'labels.text.fill',
    'stylers': [{
      'color': '#9e9e9e'
    }]
  },
  {
    'featureType': 'administrative.land_parcel',
    'stylers': [{
      'visibility': 'off'
    }]
  },
  {
    'featureType': 'administrative.locality',
    'elementType': 'labels.text.fill',
    'stylers': [{
      'color': '#bdbdbd'
    }]
  },
  {
    'featureType': 'administrative.neighborhood',
    'stylers': [{
      'visibility': 'off'
    }]
  },
  {
    'featureType': 'poi',
    'stylers': [{
      'visibility': 'off'
    }]
  },
  {
    'featureType': 'poi',
    'elementType': 'labels.text.fill',
    'stylers': [{
      'color': '#757575'
    }]
  },
  {
    'featureType': 'poi.park',
    'elementType': 'geometry',
    'stylers': [{
      'color': '#181818'
    }]
  },
  {
    'featureType': 'poi.park',
    'elementType': 'labels.text.fill',
    'stylers': [{
      'color': '#616161'
    }]
  },
  {
    'featureType': 'poi.park',
    'elementType': 'labels.text.stroke',
    'stylers': [{
      'color': '#1b1b1b'
    }]
  },
  {
    'featureType': 'road',
    'stylers': [{
      'visibility': 'off'
    }]
  },
  {
    'featureType': 'road',
    'elementType': 'geometry.fill',
    'stylers': [{
      'color': '#2c2c2c'
    }]
  },
  {
    'featureType': 'road',
    'elementType': 'labels.icon',
    'stylers': [{
      'visibility': 'off'
    }]
  },
  {
    'featureType': 'road',
    'elementType': 'labels.text.fill',
    'stylers': [{
      'color': '#8a8a8a'
    }]
  },
  {
    'featureType': 'road.arterial',
    'elementType': 'geometry',
    'stylers': [{
      'color': '#373737'
    }]
  },
  {
    'featureType': 'road.highway',
    'elementType': 'geometry',
    'stylers': [{
      'color': '#3c3c3c'
    }]
  },
  {
    'featureType': 'road.highway.controlled_access',
    'elementType': 'geometry',
    'stylers': [{
      'color': '#4e4e4e'
    }]
  },
  {
    'featureType': 'road.local',
    'elementType': 'labels.text.fill',
    'stylers': [{
      'color': '#616161'
    }]
  },
  {
    'featureType': 'transit',
    'stylers': [{
      'visibility': 'off'
    }]
  },
  {
    'featureType': 'transit',
    'elementType': 'labels.text.fill',
    'stylers': [{
      'color': '#757575'
    }]
  },
  {
    'featureType': 'water',
    'elementType': 'geometry',
    'stylers': [{
      'color': '#000000'
    }]
  },
  {
    'featureType': 'water',
    'elementType': 'labels.text.fill',
    'stylers': [{
      'color': '#3d3d3d'
    }]
  }
]

function initMap() {
  var map = new google.maps.Map(document.getElementById('map-area'), {
    center: new google.maps.LatLng(35.65858, 139.745433),
    zoom: 4,
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    disableDefaultUI: true,
    scrollwheel: false,
    draggable: false
  });
  map.setOptions({
    styles: styleOptions
  });
}

var getMap = (function () {
  function codeAddress(address) {
    var geocoder = new google.maps.Geocoder();
    geocoder.geocode({
      'address': address
    }, function (results, status) {
      if (status == google.maps.GeocoderStatus.OK) {
        var map = new google.maps.Map(document.getElementById('map-area'), {
          zoom: 8,
          mapTypeId: google.maps.MapTypeId.ROADMAP,
          disableDefaultUI: true,
          scrollwheel: false,
          draggable: false
        });
        map.setCenter(results[0].geometry.location);
        map.setOptions({
          styles: styleOptions
        });
      } else {
        console.log('Geocode was not successful for the following reason: ' + status);
      }
    });
  }

  return {
    getAddress: function () {
      $('#where-input-id').change(function () {
        var address = document.getElementById('where-input-id').value;
        codeAddress(address);
      });
    }
  }
})();

google.maps.event.addDomListener(window, 'load', initMap);
getMap.getAddress();