$(document).ready(function(){

var quizBox = document.getElementById('quiz');
var resultsBox = document.getElementById('results');
var startButton = document.getElementById('start');

var questions = [
	{question: 'Which of the following movies was NOT made by Studio Ghibli?',
	answers: {
		a: 'Spirited Away', 
		b: 'Your Name', 
		c: "Kiki's Delivery Service", 
		d: 'Castle In The Sky'
	}, correctAnswer: 'b'
	},
	{question: 'Which Studio Ghibli movie is this screenshot from?',
	answers: {
		a: "Howl's Moving Castle", 
		b: 'Princess Mononoke', 
		c: 'Castle In The Sky', 
		d: 'Spirited Away'
	}, correctAnswer: 'c'
	}, 
	{question: 'Which movie of these four is the oldest?',
	answers: {
		a: 'Castle In The Sky',
		b: 'Nausicaa Of The Valley Of The Wind',
		c: 'Princess Mononoke',
		d: 'Spirited Away',
	}, correctAnswer: 'b',
	},
	{question: 'Which movie has the highest rating on imdb?',
	answers: {
		a: 'Spirited Away',
		b: 'My Neighbor Totoro',
		c: "Howl's Moving Castle",
		d: 'Ponyo',
	}, correctAnswer: 'a',
	}
];

var triviaGame = {

	time: 180,

	quiz: function() {
		const output = [];
		questions.forEach((currentQ, questionNum) => {
			const answers = [];
			for(letter in currentQ.answers){
				answers.push(`<label><input type='radio' name='question${questionNum}' value='${letter}'> 
					${letter} : ${currentQ.answers[letter]} </label>`);
				output.push(`<div class='question'> ${currentQ.question} </div>
					<div class='answers'> ${answers.join('')}</div>`);
			}
		});

		quizBox.innerHTML = output.join('');
		$(startButton).remove();
		$('#quiz').append("<button id='results'>Submit</button>")
	},


	countdown: function() {
	    triviaGame.time--;
	    $("#countdown").html(triviaGame.time);
	    if (triviaGame.time === 0) {
	      console.log("Time's up!");
	      game.over();
	    }
  	},

  	over: function() {
  		const answerBoxes = quizBox.querySelectorAll('.answers');
  		let numCorrect = 0;
  		questions.forEach((currentQ, questionNum) => {
  			const answerBox = answerBoxes[questionNum];
  			const selector = 'input[name=question' +questionNum +']:checked';
  			const userAnswer = (answerBox.querySelector(selector) || {}).value;
  		
  			if(userAnswer===currentQ.correctAnswer){
  				numCorrect++;
  				answerBoxes[questionNum].style.color = 'lightgreen';
  			} else{answerBoxes[questionNum].style.color = 'lightpink';}
  		});

  		resultsBox.innerHTML = numCorrect + ' out of ' + questions.length;

  	},

	};

$(startButton).click(triviaGame.quiz);
$('#submit').click(triviaGame.over);

});