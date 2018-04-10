/* global $ outputProfile outputWhat outputWhere outputFavorite */
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
    $('.tweet').show()
  }
})();
