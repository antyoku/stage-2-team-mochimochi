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
