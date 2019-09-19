//How to use this code:
//Copy and paste this code into the developer console.
//Type startAnswering() to start the bot (WARNING: Must be on the page that has the question and answer choices)
//You can also press "s" to start the bot
//Type stopAnswering() to stop the bot.
//You can also press "e" to stop the bot.
//Be warned that the bot will get questions wrong initially. This happens because the bot needs 
//to guess to figure out the correct answer.
//The bot will currently not work if the view correct answer setting is off (although it could be improved to work).



//TODO: Handle view correct answer setting being off.
let results = {}
const sleep = m => new Promise(r => setTimeout(r, m))

async function answerQuestion() {
	//Element 0 is the question. 1-4 are the answer choices.
	let elements = document.querySelectorAll("body > div > div > div:nth-child(3) > div:nth-child(1) > div > div > div")
	let money = Number(document.querySelector("body > div > div").innerText.split("\n")[0].slice(1))

	let questionName = elements[0].innerText
	let index = 1

	if (results[questionName]) {
		let answer = results[questionName]
		for (let i=1;i<elements.length;i++) {
			if (elements[i].innerText === answer) {
				index = i
				break;
			}
		}
	}
		let guessing = elements[index].innerText
		elements[index].click()
	
		await sleep(450)
	
		let lost = document.querySelector("body > div > div > div:nth-child(3) > div:nth-child(1) > div > div > div").innerText.startsWith("-")
	
		//One of shop and viewCorrectAnswer exist
		if (!lost) {
			//We got the question correct
			let shop = document.querySelector("body > div > div > div:nth-child(3) > div:nth-child(1) > div > div > div:nth-child(2) > span:nth-child(1) > div")
			//shop.click()
			//Money per question, streak, multiplier, insurance (not useful).
			//TODO: Add powerups.
			//let options = document.querySelectorAll("body > div > div > div:nth-child(3) > div:nth-child(1) > div > div > div")
			//Indexes 3-12 are purchase options.
			//let selections = document.querySelectorAll("body > div > div > div:nth-child(3) > div:nth-child(1) > div > div > div > div")

			
			let nextQuestion = document.querySelector("body > div > div > div:nth-child(3) > div:nth-child(1) > div > div > div:nth-child(2) > span:nth-child(2) > div")
			results[questionName] = guessing
			nextQuestion.click()
		}
		else {
			let viewCorrectAnswer = document.querySelector("body > div > div > div:nth-child(3) > div:nth-child(1) > div > div > div:nth-child(2) > span:nth-child(1) > div")
			viewCorrectAnswer.click()
			await sleep(400)
			let correctAnswer = document.querySelector("body > div > div > div:nth-child(3) > div:nth-child(1) > div > div > div > div > div:nth-child(3)").innerText
			results[questionName] = correctAnswer
			let nextQuestion = document.querySelector("body > div > div > div:nth-child(3) > div:nth-child(1) > div > div > div:nth-child(2)")
			nextQuestion = nextQuestion.firstElementChild //Not sure why the code was written like this, but OK.
			nextQuestion.click()
		}
	await sleep(400)
	
}
//let oldlog = console.log;window.console.log = function(...data) {oldlog(...data);window.last = data}

let answering = false

function stopAnswering() {
	answering = false
}

async function startAnswering() {
	answering = true
	while (answering === true) {
		await answerQuestion()
	}
}



//Allow pressing s to start
window.addEventListener("keyup", function(e) {if (e.key === "s") {startAnswering()}})
//Allow pressing e to end
window.addEventListener("keyup", function(e) {if (e.key === "e") {stopAnswering()}})


