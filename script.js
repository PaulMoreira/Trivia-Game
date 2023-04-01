$(document).ready(function () {

	// load questions from JSON file
	$.getJSON("questions.json", function (data) {
	  var questions = data.questions;
	  var numQuestions = questions.length;
	  var currentQuestion = 0;
	  var score = 0;
	  var time = 10;
  
	  // display current question and choices
	  function displayQuestion() {
		$("#question").text(questions[currentQuestion].question);
		$("#choice-1").text(questions[currentQuestion].choices[0]);
		$("#choice-2").text(questions[currentQuestion].choices[1]);
		$("#choice-3").text(questions[currentQuestion].choices[2]);
		$("#choice-4").text(questions[currentQuestion].choices[3]);
	  }
  
	  // display initial question and choices
	  displayQuestion();
  
	  // start timer
	  var timer = setInterval(function () {
		time--;
		$("#time").text(time);
  
		if (time == 0) {
		  clearInterval(timer);
		  $("#message").text("Time's up! The correct answer was: " + questions[currentQuestion].answer);
		  $("#next-btn").removeClass("hidden");
		  time = 10;
		}
	  }, 1000);
  
	  // user clicks answer choice
	  $(".choice").click(function () {
		var selected = $(this).text();
		if (selected == questions[currentQuestion].answer) {
		  score++;
		  $("#score").text(score);
		  $("#message").text("Correct!");
		} else {
		  $("#message").text("Incorrect. The correct answer was: " + questions[currentQuestion].answer);
		}
		$("#next-btn").removeClass("hidden");
		clearInterval(timer);
	  });
  
	  // user clicks next question button
	  $("#next-btn").click(function () {
		if (currentQuestion == numQuestions - 1) {
		  // end of game
		  $("#question").text("Game over!");
		  $("#choice-1").addClass("hidden");
		  $("#choice-2").addClass("hidden");
		  $("#choice-3").addClass("hidden");
		  $("#choice-4").addClass("hidden");
		  $("#message").text("Final score: " + score + " out of " + numQuestions);
		  $("#next-btn").addClass("hidden");
		} else {
		  // next question
		  currentQuestion++;
		  displayQuestion();
		  $("#message").text("");
		  $("#next-btn").addClass("hidden");
		  time = 10;
		  timer = setInterval(function () {
			time--;
			$("#time").text(time);
  
			if (time == 0) {
			  clearInterval(timer);
			  $("#message").text("Time's up! The correct answer was: " + questions[currentQuestion].answer);
			  $("#next-btn").removeClass("hidden");
			  time = 10;
			}
		  }, 1000);
		}
	  });
	});
  });


  
  