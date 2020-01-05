//How to use this code:
//Copy and paste this code into the developer console.
//Type startAnswering() to start the bot (WARNING: Must be on the page that has the question and answer choices)
//You can also press "s" to start the bot
//Type stopAnswering() to stop the bot.
//You can also press "e" to stop the bot.
//Be warned that the bot will get questions wrong initially. This happens because the bot needs 
//to guess to figure out the correct answer.
//The bot will currently not work if the view correct answer setting is off (although it could be improved to work).

//TODO: Dynamically figure out prices, in case they change. 
let moneyPerQuestion = [undefined, 10, 100, 1e3, 1e4, 7.5e4, 3e5, 1e6, 1e7, 1e8]
let streakBonus = [undefined, 15, 1.5e2, 1.5e3, 1.5e4, 115e3, 450e3, 15e5, 15e6, 2e8]
let multiplier = [undefined, 50, 300, 2e3, 12e3, 85e3, 7e5, 65e5, 65e6, 1e9]

//Insurance is currently ignored. 
let insurance = [undefined, 10, 250, 1e3, 25e3, 1e5, 1e6 , 5e6, 25e6, 5e7]

const transporter = {}
transporter.toggleLoc = () => { // If in shop - goes to questions, if in questions goes to shop
  clickElement(document.querySelector('div[style="font-weight: 900; cursor: pointer; font-size: 22px;"]'))
};
transporter.toShop = () => {
  clickElement(document.querySelectorAll('svg.MuiSvgIcon-root')[0])
  clickElement(document.querySelectorAll('nav.MuiList-root.MuiList-padding svg.MuiSvgIcon-root')[1])
};
transporter.toQuestion = () => {
  clickElement(document.querySelectorAll('svg.MuiSvgIcon-root')[0])
  clickElement(document.querySelectorAll('nav.MuiList-root.MuiList-padding svg.MuiSvgIcon-root')[0])
};
function clickElement(elem) {
	
	//Mobile event dispatch order
	let events = ["touchstart", "touchend", "mouseover", "mousemove", "mousedown", "mouseup", "click"]
	
	events.forEach((event) => {
		if (event.includes("touch")) {
			elem.dispatchEvent(new TouchEvent(event, {bubbles: true}))
		}
		else if (event.includes("mouse") || event === "click") {
			elem.dispatchEvent(new MouseEvent(event, {bubbles: true}))
		}
	})
}

transporter.simpleClick = clickElement


//TODO: Handle view correct answer setting being off.
let results = {}
const sleep = m => new Promise(r => setTimeout(r, m))

function getMoney() {
  return Number(document.querySelector("body > div > div").innerText.split(",").join("").split("\n")[0].slice(1))
}

async function answerQuestion() {
  //Element 0 is the question. 1-4 are the answer choices.
	let elements = document.querySelectorAll("span.notranslate.lang-en")

  let questionName = elements[0].innerText
  let index = 1

  if (results[questionName]) {
    let answer = results[questionName]
    for (let i = 1; i < elements.length; i++) {
      if (elements[i].innerText === answer) {
        index = i
        break;
      }
    }
  }
  let guessing = elements[index].innerText
  getEventListeners(document).click[0].listener({isTrusted: true, target: elements[index], type: "click"})
  console.log(elements)
  console.log(index)
	
  await sleep(450)

  let lost = document.querySelector("body > div > div > div:nth-child(3) > div:nth-child(1) > div > div > div").innerText.startsWith("-")

  // One of shop and viewCorrectAnswer exist
  if (!lost) {
    //We got the question correct
    results[questionName] = guessing

    let money = getMoney()

    let shopIndex; //Money per question, streak, multiplier, insurance (not useful).

    let moneyIndex = moneyPerQuestion.findIndex((x) => {
      return money >= x
    })
    let streakIndex = streakBonus.findIndex((x) => {
      return money >= x
    })
    let multiplierIndex = multiplier.findIndex((x) => {
      return money >= x
    })

    let purchaseIndex

    if (moneyIndex !== -1) {
      shopIndex = 0;
      purchaseIndex = moneyIndex;
      moneyPerQuestion[moneyIndex] = undefined
    } else if (streakIndex !== -1) {
      shopIndex = 1;
      purchaseIndex = streakIndex
      streakBonus[streakIndex] = undefined
    } else if (multiplierIndex !== -1) {
      shopIndex = 2;
      purchaseIndex = multiplierIndex
      multiplier[multiplierIndex] = undefined
    }

    console.log(money)
    console.log(shopIndex)
    console.log(purchaseIndex)
    console.log(moneyIndex, streakIndex, multiplierIndex)

    if (shopIndex !== undefined) {
      transporter.toShop()
      //TODO: Add powerups.
      //This little bit of code does not work yet.

      await sleep(400)

      let options = document.querySelectorAll("body > div > div > div:nth-child(3) > div:nth-child(1) > div > div > div")
      console.log(options)
      transporter.simpleClick(options[shopIndex])

      await sleep(400)

      //Indexes 3-12 are purchase options.
      let selections = document.querySelectorAll("body > div > div > div:nth-child(3) > div:nth-child(1) > div > div > div > div")
      clickElement(selections[purchaseIndex + 3]) // Original attempts I see... for some reason none of these "shop selections work" just checking why - will be fixed
      //Select the upgrade
      await sleep(300)
      transporter.simpleClick(selections[2]) //Buy it.
      await sleep(300)
      document.querySelectorAll("body > div > div > div > div > div")[2].click() //Click to go back to the questions.
    } else {
      let nextQuestion = document.querySelector("#root > div > div.sc-lkqHmb.fDovdT > div:nth-child(1) > div > div > div.sc-bxivhb.guENId > span:nth-child(2) > div > div > div > div")
      transporter.simpleClick(nextQuestion) // Updated - Floppian
    }
  } else {
    let viewCorrectAnswer = document.querySelector("#root > div > div.sc-lkqHmb.fDovdT > div:nth-child(1) > div > div > div.sc-VigVT.inslDi > div > div > div > div") // Actually - I changedd this to the text, but it works better - Floppian
transporter.simpleClick(viewCorrectAnswer)
    await sleep(400)
    let correctAnswer = document.querySelector("body > div > div > div:nth-child(3) > div:nth-child(1) > div > div > div > div > div:nth-child(3)").innerText
    results[questionName] = correctAnswer
    transporter.simpleClick(document.querySelector("span>div>div>div>div")) // Clicks the next button thing
  }
  await sleep(400)

}

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
window.addEventListener("keyup", function(e) {
  if (e.key === "s") {
    startAnswering()
  }
})
//Allow pressing e to end
window.addEventListener("keyup", function(e) {
  if (e.key === "e") {
    stopAnswering()
  }
})
