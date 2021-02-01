'use strict';

// NOTE: This is a global used only in the controller
var gLastRes = null;

$(document).ready(init);
$('.btn-start').click(onStartGuessing);
$('.btn-yes').click({ ans: 'yes' }, onUserResponse);
$('.btn-no').click({ ans: 'no' }, onUserResponse);
$('.btn-add-guess').click(onAddGuess);

function init() {
  $('.black-screen').hide()
  createQuestsTree();
}

function onStartGuessing() {
  // TODO: hide the game-start section
  $('.game-start').hide()
  renderQuest();
  // TODO: show the quest section
  $('.quest').show()
}

function renderQuest() {
  // TODO: select the <h2> inside quest and update
  // its text by the currQuest text
  $('.quest h2').text(gCurrQuest.txt)
}

function onUserResponse(ev) {
  var res = ev.data.ans;
  // If this node has no children
  if (isChildless(getCurrQuest())) {
    if (res === 'yes') {
      $('.black-screen').show()
      $('.btn-restart').click(onRestartGame);
      // TODO: improve UX
    } else {
      $('.new-quest').show()
      // TODO: hide and show new-quest section
    }
  } else {
    // TODO: update the lastRes global var
    moveToNextQuest(res);
    renderQuest();
  }
}

function onAddGuess(ev) {
  ev.preventDefault();
  var newGuess = $('#newGuess').val();
  var newQuest = $('#newQuest').val();
  if (!newGuess || !newQuest) return
  addGuess(newQuest, newGuess, gCurrQuest.txt)
  // TODO: Get the inputs' values
  // TODO: Call the service addGuess
  onRestartGame();
}

function onRestartGame() {
  $('.quest').hide()
  $('.new-quest').hide();
  $('.game-start').show();
  gLastRes = null;
  gCurrQuest = gQuestsTree;
  gPrevQuest = null;
  $('.black-screen').hide()
  init()
}

