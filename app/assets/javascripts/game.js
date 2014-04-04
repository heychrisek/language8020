var Word = function(text, translations){
  this.text = text;
  this.translations = $.map(translations.split("<br>"), function(translation){
    return translation.toLowerCase();
  });
};

var wordGame = {};

// CLOCK FOR THE GAME
wordGame.startTime = 0;
wordGame.clockUpdaterID = 0;

wordGame.drawClock = function(){
  wordGame.canvas = Raphael("clock_id",200, 200);
  wordGame.clock = wordGame.canvas.circle(100,100,95);
  wordGame.clock.attr({"fill":"#f5f5f5","stroke":"#444444","stroke-width":"5"}); 
  wordGame.second_hand = wordGame.canvas.path("M100 110L100 25");
  wordGame.second_hand.attr({stroke: "#444444", "stroke-width": 2});
  for(i=0;i<12;i++){
      wordGame.start_x = 100+Math.round(80*Math.cos(30*i*Math.PI/180));
      wordGame.start_y = 100+Math.round(80*Math.sin(30*i*Math.PI/180));
      wordGame.end_x = 100+Math.round(90*Math.cos(30*i*Math.PI/180));
      wordGame.end_y = 100+Math.round(90*Math.sin(30*i*Math.PI/180));    
      wordGame.canvas.path("M"+wordGame.start_x+" "+wordGame.start_y+"L"+wordGame.end_x+" "+wordGame.end_y);
  }
  wordGame.pointClockHandUp();
  wordGame.updateClock();
};

wordGame.prepareToStopClock = false;
wordGame.updateClock = function(){
  wordGame.now = new Date();
  wordGame.seconds = wordGame.now.getSeconds() - wordGame.startTime;
  wordGame.second_hand.rotate(6 * wordGame.seconds, 100, 100);
  if (wordGame.prepareToStopClock) {
    wordGame.stopClock();
  }
  if (wordGame.seconds == -1) {
    wordGame.prepareToStopClock = true;
  }
};

wordGame.stopClock = function(){
  clearInterval(wordGame.clockUpdaterID);
  $("#game").trigger("clockEnd");
  wordGame.prepareToStopClock = false;
};

wordGame.pointClockHandUp = function(){
  wordGame.startTime = new Date().getSeconds();
  wordGame.prepareToStopClock = false;
};

wordGame.resetClock = function(){
  wordGame.stopClock();
  wordGame.pointClockHandUp();
  wordGame.updateClock();
}

wordGame.restartClock = function(){
  wordGame.stopClock();
  wordGame.pointClockHandUp();
  wordGame.updateClock();
  wordGame.clockUpdaterID = setInterval("wordGame.updateClock()",1000);
};

// AJAX CALLS FOR FETCHING WORDS AND TRANSLATIONS
wordGame.numWords = "200";
wordGame.gameWords = [];

wordGame.checkReadyToLoadWords = function(){
  wordGame.languageCode = $("#s2id_language-dropdown").select2("val");
  wordGame.numWords = $("#num-words").find(":selected").text();
  if (wordGame.languageCode != "") {
    $("#game-start-button").removeClass("disabled");
  } else {
    $("#game-start-button").addClass("disabled");
  }
};

wordGame.failureToLoadGameWords = function() {
  $("#game-play").slideUp();
  alert("I can't fetch the words for your game.\n" +
        "Are you connected to the internet?");
};

wordGame.getWordData = function(callback){
  wordGame.gameWords.length = 0;
  wordGame.params = "?language_code=" + wordGame.languageCode + "&num_words=" + wordGame.numWords;
  $.getJSON("/game/words" + wordGame.params, function(response){
    $.each(response, function(index, word){
      wordGame.gameWords.push(new Word(word.word, word.translation));
    });
  }).then(callback, wordGame.failureToLoadGameWords);
};

// PLAYING THE GAME
wordGame.points = 0;
wordGame.currentWord = new Object;
wordGame.usedWords = [];

wordGame.showGameMessage = function(message){
  $("#game-alerts").text(message);
}

wordGame.clearUpGame = function(){
  wordGame.jGame = $("#game");
  wordGame.jGame.off("keypress.startGame");
  wordGame.jGame.off("clockEnd");
  wordGame.jGame.off("keyup.testWord");
  wordGame.jGame.off("keypress.dismiss");
};

wordGame.gameReset = function(event){
  event.preventDefault();
  event.stopPropagation();
  $("#translation-field").val('');
  if(event.which == 32) {
    $("#game").off("keypress.dismiss");
    wordGame.initiatePregameShow();
  }
};

wordGame.gameEnd = function(){
  wordGame.clearUpGame();

  $("#game").on("keypress.dismiss", "#translation-field", wordGame.gameReset);
  
  if (wordGame.points > 0) {
    $("#game-alerts").removeClass("bg-danger").addClass("bg-success");
    wordGame.wordOrWords = "word";
    if (wordGame.points > 1) wordGame.wordOrWords = "words";
    wordGame.showGameMessage("You got " + wordGame.points + " correct " +
      wordGame.wordOrWords + "! (press SPACE to reset the game)");
  } else {
    wordGame.showGameMessage("No correct words this time... " +
      "(press SPACE to reset the game)");
  }
};

wordGame.setupGameEnd = function(){
  $("#game").on("clockEnd", wordGame.gameEnd);
};

wordGame.newRandomWord = function(){
  return wordGame.gameWords[Math.floor(Math.random()*wordGame.gameWords.length)];
};

wordGame.displayFinishedWord = function(currentWord, correct){
  if (correct) {
    wordGame.points++;
    $("#translation-field").addClass("correct");
    setTimeout(function(){
      $("#translation-field").removeClass("correct");
    },100);
    wordGame.rowClass = "success";
  } else {
    $("#translation-field").addClass("incorrect")
    setTimeout(function(){
      $("#translation-field").removeClass("incorrect");
    },100);
    wordGame.rowClass = "danger";
  }
  wordGame.newTableRow = '<tr class="my-hidden ' + wordGame.rowClass + '">' +
    '<td>' + currentWord.text + '</td>' +
    '<td>' + currentWord.translations.join(", ") + '</td></tr>';
  $(wordGame.newTableRow).appendTo($('#game-results').find('tbody')).fadeIn();
}

wordGame.changePromptWord = function(){
  wordGame.currentWord = wordGame.newRandomWord();
  $("#word-prompt").text('"Translate: "' + wordGame.currentWord.text + '"');
};

wordGame.handleUserInputtingTranslation = function(correct){
  $("#translation-field").val('');
  wordGame.usedWords.push(wordGame.currentWord);
  wordGame.displayFinishedWord(wordGame.currentWord, correct);
  wordGame.changePromptWord();
};

wordGame.runGame = function(){
  wordGame.changePromptWord();
  $("#game").on("keyup.testWord", "#translation-field", function(e){
    wordGame.inputWord = $("#translation-field").val().toLowerCase();
    if ($.inArray(wordGame.inputWord, wordGame.currentWord.translations) > -1) {
      wordGame.handleUserInputtingTranslation(true);
    } else if (e.which == 13) {
      wordGame.handleUserInputtingTranslation(false);
    }
  });
};

wordGame.forceFocusOnTextField = function(){
  $("#translation-field").focus();
  $("#translation-field").off("blur").blur(function(){
    $("#translation-field").focus();
  });
};

wordGame.clearDisplay = function() {
  $("#word-prompt").text('');
  $("#game-results").find("tbody").text('');
  $("#game-alerts").removeClass("bg-success").addClass("bg-danger");
  wordGame.showGameMessage("Press ENTER to begin!");
};

wordGame.clearGameVariables = function() {
  wordGame.points = 0;
  wordGame.currentWord = new Object;
  wordGame.usedWords = [];
}

wordGame.resetGame = function(){
  wordGame.resetClock();
  wordGame.clearDisplay();
  wordGame.clearGameVariables();
  
  $("#game-play").slideDown();
  wordGame.forceFocusOnTextField();
};

wordGame.waitForEnter = function(){
  $("#game").on("keypress.startGame", "#translation-field", function(event){
    event.preventDefault();
    event.stopPropagation();
    $("#translation-field").val('');
    if(event.which == 13) {
      $("#game").off("keypress.startGame").
        on("keyup.begin", "#translation-field", function(){

        $("#game").off("keyup.begin");
        $("#translation-field").val("");
        wordGame.showGameMessage('Enter the translation! (or press ENTER to pass)');
        wordGame.restartClock();
        wordGame.setupGameEnd();
        wordGame.runGame();
      });
    }
  });
};

wordGame.initiatePregameShow = function(){
  wordGame.deferred = $.Deferred(wordGame.clearUpGame);
  wordGame.deferred.done(wordGame.resetGame);
  wordGame.deferred.done(wordGame.waitForEnter);
  wordGame.deferred.resolve();
};

wordGame.buttonClickHandler = function(){
  button = $(this);
  if (!button.hasClass("disabled")){
    button.text("RESET");
    wordGame.getWordData(wordGame.initiatePregameShow);
  }
};

wordGame.bindGameOptionSelectors = function(){
  $("body").on("change", "#game", wordGame.checkReadyToLoadWords);
  $("#game").on("click", "#game-start-button", wordGame.buttonClickHandler);
};

$(document).ready(function(){
  if ($("#game")[0]) {
    wordGame.bindGameOptionSelectors();
    wordGame.drawClock();
  }
});