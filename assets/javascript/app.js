$(document).ready(function(){

var quizBox = document.getElementById('quiz');
var resultsBox = document.getElementById('results');
var start = document.getElementById('start');
var submit = document.getElementById('submit');

var questions = [
	{question: 'Which of the following movies was NOT made by Studio Ghibli?',
	answers: ['Spirited Away', 'Your Name', "Kiki's Delivery Service", 'Castle In The Sky'],
	correctAnswer: 'Your Name'
	},
	{question: 'Which Studio Ghibli movie is this screenshot from?',
	answers: ["Howl's Moving Castle", 'Princess Mononoke', 'Castle In The Sky', 'Spirited Away'],
	correctAnswer: 'Castle In The Sky'
	}, 
	{question: 'Which movie of these four is the oldest?',
	answers: ['Castle In The Sky', 'Nausicaa Of The Valley Of The Wind', 'Princess Mononoke', 'Spirited Away'], 
	correctAnswer: 'Nausicaa Of The Valley Of The Wind'
	},
	{question: 'Which movie has the highest rating on imdb?',
	answers: ['Spirited Away', 'My Neighbor Totoro', "Howl's Moving Castle", 'Ponyo'],
	correctAnswer: 'Spirited Away'
	}
];

var timerRunning = false;
var intervalId;

var timer = {

	time: 180,

	start: function() {
		if (!timerRunning){
			intervalId = setInterval(timer.countdown, 1000);
		}
	},

	countdown: function() {
	    timer.time--;
	    if (timer.time === 0) {
	      console.log("Time's up!");
	      triviaGame.over();
	    }

	    $("#countdown").html('<p>You have ' + timer.time + ' seconds left!</p>');
  	},

};

var triviaGame = {

	correct:0,
	incorrect:0,
	time:180,

	quiz: function() {

		if (!timerRunning){
			intervalId = setInterval(timer.countdown, 1000);
		};

		for (var i = 0; i < questions.length; i++) {
			$('#quiz').append("<p>" + questions[i].question + "</p>");
			for (var j = 0; j < questions[i].answers.length; j++) {
				$('#quiz').append("<input id='radio' type='radio' name='question-" + i + "' value='" + 
				questions[i].answers[j] + "''>" + questions[i].answers[j]);
			}
		};

		$('#quiz').append("<br><br><button id='results'>Submit</button>");

		start.remove();	
	},

	countdown: function() {
	    timer.time--;
	    if (timer.time === 0) {
	      console.log("Time's up!");
	      triviaGame.over();
	    }

	    $("#countdown").html('<p>You have ' + timer.time + ' seconds left!</p>');
  	},

  	over: function() {
  		$('#quiz').clear();
  		
  		$.each($("input[name='question-0']:checked"), function(){
  			if($(this).val() === questions[0].correctAnswer){
  				triviaGame.correct++;
  			} else {
  				triviaGame.incorrect++;
  			}
  		});

  		$.each($("input[name='question-1':checked"), function(){
  			if ($(this).val() ===questions[1].correctAnswer){
  				triviaGame.correct++;
  			}
  		});

  	},

	};

$(start).click(triviaGame.quiz);
$(submit).click(triviaGame.over);

});