//How to use this code:
//Copy and paste this code into the developer console.
//Type startAnswering() to start the bot (WARNING: Must be on the page that has the question and answer choices)
//You can also press "s" to start the bot
//Type stopAnswering() to stop the bot.
//You can also press "e" to stop the bot.
//Be warned that the bot will get questions wrong initially. This happens because the bot needs 
//to guess to figure out the correct answer.
//The bot will currently not work if the view correct answer setting is off (although it could be improved to work).

let moneyPerQuestion = [undefined, 10, 100, 1e3, 1e4, 7.5e4, 3e5, 1e6, 1e7, 1e8]
let streakBonus = [undefined, 15, 1.5e2, 1.5e3, 1.5e4, 115e3, 450e3, 15e5, 15e6, 2e8]
let multiplier = [undefined, 50, 300, 2e3, 12e3, 85e3, 7e5, 65e5, 65e6, 1e9]


//TODO: Handle view correct answer setting being off.
let results = {}
const sleep = m => new Promise(r => setTimeout(r, m))


function getMoney() {
	return Number(document.querySelector("body > div > div").innerText.split("\n")[0].slice(1))
}

async function answerQuestion() {
	//Element 0 is the question. 1-4 are the answer choices.
	let elements = document.querySelectorAll("body > div > div > div:nth-child(3) > div:nth-child(1) > div > div > div")

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
			results[questionName] = guessing

			let money = getMoney()			
			
			let shopIndex; //Money per question, streak, multiplier, insurance (not useful).
			
			let moneyIndex = moneyPerQuestion.findIndex((x) => {return money >= x})
			let streakIndex = streakBonus.findIndex((x) => {return money >= x})
			let multiplierIndex = multiplier.findIndex((x) => {return money >= x})
			
			let purchaseIndex
			
			if (moneyIndex !== -1) {
				shopIndex = 0; 
				purchaseIndex = moneyIndex; 
				moneyPerQuestion[moneyIndex] = undefined
			}
			else if (streakIndex !== -1) {
				shopIndex = 1; 
				purchaseIndex = streakIndex
				streakBonus[streakIndex] = undefined
			}
			else if (multiplierIndex !== -1) {
				shopIndex = 2; 
				purchaseIndex = multiplierIndex
				multiplier[multiplierIndex] = undefined
			}
			
			console.log(shopIndex)
			console.log(purchaseIndex)
			console.log(moneyIndex, streakIndex, multiplierIndex)
			
			if (shopIndex !== undefined) {
				let shop = document.querySelector("body > div > div > div:nth-child(3) > div:nth-child(1) > div > div > div:nth-child(2) > span:nth-child(1) > div")
				shop.click()
				//TODO: Add powerups.
				//This little bit of code does not work yet.
				
				await sleep(400)
				
				let options = document.querySelectorAll("body > div > div > div:nth-child(3) > div:nth-child(1) > div > div > div")
				options[shopIndex].click()
				
				await sleep(400)
				
				//Indexes 3-12 are purchase options.
				let selections = document.querySelectorAll("body > div > div > div:nth-child(3) > div:nth-child(1) > div > div > div > div")
				selections[purchaseIndex + 3].dispatchEvent(new Event("mousedown", {bubbles: true, composed: true})) //Select the upgrade
				await sleep(300)
				selections[2].click() //Buy it.
				await sleep(300)
				document.querySelectorAll("body > div > div > div > div > div")[2].click() //Click to go back to the questions.
			}
			else {
				let nextQuestion = document.querySelector("body > div > div > div:nth-child(3) > div:nth-child(1) > div > div > div:nth-child(2) > span:nth-child(2) > div")
				nextQuestion.click()
			}
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
