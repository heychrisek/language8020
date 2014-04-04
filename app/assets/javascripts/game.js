// CLOCK FOR THE GAME
var startTime = 0;
clockUpdaterID = 0;

var drawClock = function(){
  canvas = Raphael("clock_id",200, 200);
  var clock = canvas.circle(100,100,95);
   clock.attr({"fill":"#f5f5f5","stroke":"#444444","stroke-width":"5"})  
   var hour_sign;
  for(i=0;i<12;i++){
      var start_x = 100+Math.round(80*Math.cos(30*i*Math.PI/180));
      var start_y = 100+Math.round(80*Math.sin(30*i*Math.PI/180));
      var end_x = 100+Math.round(90*Math.cos(30*i*Math.PI/180));
      var end_y = 100+Math.round(90*Math.sin(30*i*Math.PI/180));    
      hour_sign = canvas.path("M"+start_x+" "+start_y+"L"+end_x+" "+end_y);
  }    
  second_hand = canvas.path("M100 110L100 25");
  second_hand.attr({stroke: "#444444", "stroke-width": 2});
  pointClockHandUp();
  updateClock();
};

var prepareToStopClock;
var updateClock = function(){
  var now = new Date();
  var seconds = now.getSeconds() - startTime;
  second_hand.rotate(6 * seconds, 100, 100);
  if (prepareToStopClock) {
    stopClock();
  }
  if (seconds == -1) {
    prepareToStopClock = true;
  }
};

var stopClock = function(){
  clearInterval(clockUpdaterID);
  $("#game").trigger("clockEnd");
  prepareToStopClock = false;
};

var pointClockHandUp = function(){
  startTime = new Date().getSeconds();
  prepareToStopClock = false;
};

var resetClock = function(){
  stopClock();
  pointClockHandUp();
  updateClock();
}

var restartClock = function(){
  stopClock();
  pointClockHandUp();
  updateClock();
  clockUpdaterID = setInterval("updateClock()",1000);
};

// AJAX CALLS FOR FETCHING WORDS AND TRANSLATIONS
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

var Word = function(text, translations){
  this.text = text;
  this.translations = $.map(translations.split("<br>"), function(translation){
    return translation.toLowerCase();
  });
};

var failureToLoad = function() {
  $("#game-play").slideUp();
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

// PLAYING THE GAME
var points = 0;
var currentWord = new Object;
var usedWords = [];

var showMessage = function(message){
  $("#game-alerts").text(message);
}

var clearUp = function(){
  $("#game").off("keypress.startGame");
  $("#game").off("clockEnd");
  $("#game").off("keyup.testWord");
};

var gameEnd = function(){
  console.log("executing game end");
  clearUp();

  var reset = function(event){
    event.preventDefault();
    event.stopPropagation();
    $("#translation-field").val('');
    if(event.which == 32) {
      $("#game").off("keypress.dismiss");
      initiatePregameShow();
    }
  };
  $("#game").on("keypress.dismiss", "#translation-field", reset);
  
  if (points > 0) {
    $("#game-alerts").removeClass("bg-danger").addClass("bg-success");
    wordOrWords = "word";
    if (points > 1) wordOrWords = "words";
    showMessage("You got " + points + " correct " + wordOrWords + "! " +
      "(press SPACE to reset the game)");
  } else {
    showMessage("No correct words this time... (press SPACE to reset the game)");
  }
};

var setupGameEnd = function(){
  console.log("setting up game end");
  $("#game").on("clockEnd", gameEnd);
};

var newRandomWord = function(){
  return gameWords[Math.floor(Math.random()*gameWords.length)];
};

var displayFinishedWord = function(currentWord, correct){
  if (correct) {
    points++;
    var rowClass = "success";
  } else {
    var rowClass = "danger";
  }
  var row = '<tr class="my-hidden ' + rowClass + '">' +
    '<td>' + currentWord.text + '</td>' +
    '<td>' + currentWord.translations.join(", ") + '</td></tr>';
  $(row).appendTo($('#game-results').find('tbody')).fadeIn();
}

var changePromptWord = function(){
  currentWord = newRandomWord();
  $("#word-prompt").text('"Translate: "' + currentWord.text + '"');
};

var handleInput = function(correct){
  $("#translation-field").val('');
  usedWords.push(currentWord);
  displayFinishedWord(currentWord, correct);
  changePromptWord();
};

var runGame = function(){
  changePromptWord();
  $("#game").on("keyup.testWord", "#translation-field", function(e){
    var inputWord = $("#translation-field").val().toLowerCase();
    if ($.inArray(inputWord, currentWord.translations) > -1) {
      handleInput(true);
    } else if (e.which == 13) {
      handleInput(false);
    }
  });
};

var forceFocusOnTextField = function(){
  $("#translation-field").focus();
  $("#translation-field").off("blur").blur(function(){
    $("#translation-field").focus();
  });
};

var clearDisplay = function() {
  $("#word-prompt").text('');
  $("#game-results").find("tbody").text('');
  $("#game-alerts").removeClass("bg-success").addClass("bg-danger");
  showMessage("Press ENTER to begin!");
};

var clearVariables = function() {
  points = 0;
  currentWord = new Object;
  usedWords = [];
}

var resetGame = function(){
  resetClock();
  clearDisplay();
  clearVariables();
  
  $("#game-play").slideDown();
  forceFocusOnTextField();
};

var waitForEnter = function(){
  $("#game").on("keypress.startGame", "#translation-field", function(event){
    event.preventDefault();
    event.stopPropagation();
    $("#translation-field").val('');
    if(event.which == 13) {
      $("#game").off("keypress.startGame").
        on("keyup.begin", "#translation-field", function(){

        $("#game").off("keyup.begin");
        $("#translation-field").val("");
        showMessage('Enter the translation! (or press ENTER to pass)');
        restartClock();
        setupGameEnd();
        runGame();
      });
    }
  });
};

var initiatePregameShow = function(){
  deferred = $.Deferred(clearUp);
  deferred.then(resetGame);
  deferred.then(waitForEnter);
  deferred.resolve();
};

var buttonClickHandler = function(){
  button = $(this);
  if (!button.hasClass("disabled")){
    button.text("RESET");
    deferred = $.Deferred(clearUp);
    deferred.then(getWordData(initiatePregameShow));
    deferred.resolve();
  }
};

var bindGameOptionSelectors = function(){
  $("body").on("change", "#game", checkReady);
  $("body").on("click", "#game-start-button", buttonClickHandler);
};

$(document).ready(function(){
  bindGameOptionSelectors();
  drawClock();
});