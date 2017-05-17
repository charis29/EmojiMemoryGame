"use strict";

var JavaScriptAudition = {
  itRuns: function() {
    return true;
  }
}

// Add your javascript here
var images = [];
var cards = [];
var ids = [];
var clickable = true;
createBoard();

(function($) {
  //flip each card on click
  $('.board').on('click', '.flip-container', function() {
    if (!clickable || $(this).hasClass('on') || $(this).hasClass('matched')) {
      return;
    }
    $(".alert").empty();
    var id = $(this).attr('id');
    $(this).toggleClass("on");
    ids.push($(this).find('img')[1].currentSrc);
    var on = document.getElementsByClassName("on");
    if ($('.on').length > 1) {
      clickable = false; //prevent additional clicks while checking for a match
      setTimeout(function() {
        if (ids[0] == ids[1]) {
          $(".alert").append("Match!");
          $('.on').toggleClass('matched on');
          $('.matched').off("click");
        } else {
          $(".alert").append("No match D:");
          $(".flip-container").removeClass("on");
        }
        ids = [];
        clickable = true;
      }, 500);
    }
    return false;
  });
}(jQuery));

function createBoard() {
  var nums = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18];
  var counter = 1;

  //merge the array of 18 into an array of 36 to create duplicates
  nums = _.concat(nums, nums);

  //randomize the images before sending to be displayed
  nums = _.shuffle(nums);

  //create the elements to show on the DOM
  _.forEach(nums, function(num) {
    $('.board').append('<div class="flip-container" id=card' + counter + '><div class="flipper"><div class="front"><img src="images/front.jpeg" /></div><div class="back"><img src="images/' + num + '.png" /></div></div></div>');
    counter++;
  });
};

//reset the board on button click
function reset() {
  $(".flip-container").removeClass("matched");
  $(".alert").empty();
  $(".board").empty();
  createBoard();
};
