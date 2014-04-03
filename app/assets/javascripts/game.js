var languageCode = "";
var numWords = "200";
var gameWords = [];

var checkReady = function(){
  languageCode = $("#s2id_language-dropdown").select2("val")
  numWords = $("#num-words").find(":selected").text();
  if (languageCode != "") {
    $("#game-start-button").removeClass("disabled");
  } else {
    $("#game-start-button").addClass("disabled");
  }
};

var Word = function(text, translation){
  this.text = text;
  this.translation = translation;
};

var failureToLoad = function() {
  alert("I can't fetch the words for your game.\n" +
        "Are you connected to the internet?");
};

var getWordData = function(callback){
  gameWords.length = 0;
  var params = "?language_code=" + languageCode + "&num_words=" + numWords;
  $.getJSON("/game/words" + params, function(response){
    $.each(response, function(index, word){
      gameWords.push(new Word(word.word, word.translation));
    });
  }).then(callback, failureToLoad);
};

var playGame = function(){
  alert("playing... " + gameWords.length);
}

var buttonClickHandler = function(){
  if (!$(this).hasClass("disabled")){
    getWordData(playGame);
  }
}

var bindGameOptionSelectors = function(){
  $("body").on("change", "#game", checkReady);
  $("body").on("click", "#game-start-button", buttonClickHandler);
}

$(document).ready(function(){
  bindGameOptionSelectors();
});