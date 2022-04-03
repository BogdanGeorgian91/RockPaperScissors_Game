// POPUP MODAL
$(".rules").on("click", function () {
  $(".popup-overlay, .popup-content").addClass("active");
});

//removes the "active" class to .popup and .popup-content when the "Close" button is clicked
$(".close-btn").on("click", function () {
  $(".popup-overlay, .popup-content").removeClass("active");
});

// HIDE MODAL ON OUTSIDE CLICK
$(window).click(function (e) {
  if (e.target == $(".popup-overlay")[0]) {
    $(".popup-overlay").removeClass("active");
    $(".popup-content").removeClass("active");
  }
});

const triangle = $(".triangle");
const confrontation = $(".confrontation");
let humanPick;
let machinePick;
let humanChoice;
let machineChoice;
const resetBtn = $(".confrontation__result__btn");

// GAME
$(".triangle__item").each(function (index) {
  $(this).click(async function () {
    triangle.addClass("triangle-disabled");
    confrontation.addClass("confrontation-active");

    let randomNr = Math.floor(Math.random() * 3);

    function showMachinePick(resolve) {
      machinePick = $(".confrontation__machine-imgs-img").addClass(
        `confrontation__machine-imgs-img-${randomNr}`
      );

      $(".confrontation__machine-imgs").css({
        "border-width": "2rem",
        "border-style": "solid",
        "border-color": `var(--border-color-${randomNr})`,
        "background-color": "antiquewhite",
      });
      resolve(true);

      return machinePick;
    }

    if ($(this).hasClass(`triangle__${index}`)) {
      humanPick = $(".confrontation__imgs__img").addClass(
        `confrontation__imgs__img-${index}`
      );
      $(".confrontation__imgs").css(
        "border-color",
        `var(--border-color-${index})`
      );
    }

    function tie() {
      $(".confrontation__result__text").text("it's a tie");
    }

    function lose() {
      $(".confrontation__result__text").text("you lose!");
    }

    function win() {
      $(".confrontation__result__text").text("you win!");
    }

    function showResult() {
      $(".confrontation__result").addClass("confrontation__result-active");
      $(".confrontation__result-mobile").addClass(
        "confrontation__result-mobile-active"
      );
    }

    function addPulseMachine() {
      $(".ring-machine").addClass("ring-machine-active");
    }

    function addPulseHuman() {
      $(".ring-human").addClass("ring-human-active");
    }

    function changeScore(action) {
      let scoreHuman = Number($(".board__score__nr-human").text());
      let scoreComputer = Number($(".board__score__nr-computer").text());
      if (action == "win") {
        scoreHuman++;
      } else if (action == "lose") {
        scoreComputer++;
      }
      $(".board__score__nr-human").text(scoreHuman);
      $(".board__score__nr-computer").text(scoreComputer);
    }

    const match = await new Promise((resolve, reject) => {
      setTimeout(() => showMachinePick(resolve), 1000);
    });

    humanChoice = parseInt(humanPick[0].className.replace(/[^0-9.]/g, ""));
    machineChoice = parseInt(machinePick[0].className.replace(/[^0-9.]/g, ""));

    console.log();

    if (humanChoice === machineChoice) {
      tie();
      showResult();
    } else if (humanChoice === 0 && machineChoice === 1) {
      lose();
      setTimeout(addPulseMachine, 1000);
      changeScore("lose");
      // showResult();
      setTimeout(showResult, 1500);
    } else if (humanChoice === 0 && machineChoice === 2) {
      win();
      setTimeout(addPulseHuman, 1000);
      changeScore("win");
      // showResult();
      setTimeout(showResult, 1500);
    } else if (humanChoice === 1 && machineChoice === 0) {
      win();
      setTimeout(addPulseHuman, 1000);
      changeScore("win");
      // showResult();
      setTimeout(showResult, 1500);
    } else if (humanChoice === 1 && machineChoice === 2) {
      lose();
      setTimeout(addPulseMachine, 1000);
      changeScore("lose");
      // showResult();
      setTimeout(showResult, 1500);
    } else if (humanChoice === 2 && machineChoice === 0) {
      lose();
      setTimeout(addPulseMachine, 1000);
      changeScore("lose");
      // showResult();
      setTimeout(showResult, 1500);
    } else if (humanChoice === 2 && machineChoice === 1) {
      win();
      setTimeout(addPulseHuman, 1000);
      changeScore("win");
      // showResult();
      setTimeout(showResult, 1500);
    }

    resetBtn.on("click", function () {
      $(".ring-human").removeClass("ring-human-active");
      $(".ring-machine").removeClass("ring-machine-active");
      triangle.removeClass("triangle-disabled");
      confrontation.removeClass("confrontation-active");
      humanPick.removeClass(`confrontation__imgs__img-${index}`);
      machinePick.removeClass(`confrontation__machine-imgs-img-${randomNr}`);
      $(".confrontation__machine-imgs").removeAttr("style");
      $(".confrontation__result").removeClass("confrontation__result-active");
      $(".confrontation__result-mobile").removeClass(
        "confrontation__result-mobile-active"
      );
    });
  });
});
