$(document).ready(function() {
  // retrieve questions and answers from JSON file
  $.getJSON("questions.json", function(data) {
    var questions = data.questions;
    var questionIndex = 0;
    var score = 0;

    // display initial question and answers
    displayQuestionAndAnswers(questionIndex, questions);

    // handle user input and calculate score
    $(".answer-btn").on("click", function() {
      var selectedAnswer = $(this).text();
      var correctAnswer = questions[questionIndex].answer;
      if (selectedAnswer === correctAnswer) {
        score++;
        $("#score").text(score);
      }
      questionIndex++;
      if (questionIndex < questions.length) {
        displayQuestionAndAnswers(questionIndex, questions);
      } else {
        endGame();
      }
    });

    // set up timer
    var timeLeft = 30;
    var timerInterval = setInterval(function() {
      $("#timer").text(timeLeft);
      timeLeft--;
      if (timeLeft < 0) {
        clearInterval(timerInterval);
        endGame();
      }
    }, 1000);

    // function to display question and answers
    function displayQuestionAndAnswers(index, questions) {
      var question = questions[index].question;
      var answers = questions[index].answers;
      $("#question").text(question);
      $("#answer-1").text(answers[0]);
      $("#answer-2").text(answers[1]);
      $("#answer-3").text(answers[2]);
      $("#answer-4").text(answers[3]);
    }

    // function to handle end of game
    function endGame() {
      clearInterval(timerInterval);
      $(".answer-btn").off("click");
      $("#question").text("Game Over!");
      $("#answer-1").text("Final Score: " + score);
      $("#answer-2").text("");
      $("#answer-3").text("");
      $("#answer-4").text("");
    }
  })
  // handle error if JSON file cannot be retrieved
  .fail(function() {
    $("#question").text("Oops! Something went wrong.");
    $("#answer-1").text("Please try again later.");
    $("#answer-2").text("");
    $("#answer-3").text("");
    $("#answer-4").text("");
  });
});
