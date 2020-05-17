//Copy and paste this code into the developer console. Close the console. 
//Press "s" to start the bot
//Press "e" to stop the bot.

//The bot can not purchase powerups. You will want to purchase the snowstorm powerup (if available) 
//once the bot gets a couple billion dollars. You may also want to purchase deflector, sheild, or other powerups
//that protect you against other players. 

//Please note that some themes may break the bot when applied. 

//Be warned that the bot will get questions wrong initially. This happens because the bot needs 
//to guess to figure out the correct answer.
//The bot will currently not work if the view correct answer setting is off. Improvements that handle this are welcomed. 
;
(function() {

    // UTIL
    const localGetEventListeners = getEventListeners; //For some reason, getEventListeners is not available unless we do this. 
    console.log(localGetEventListeners);
    const sleep = m => new Promise(r => setTimeout(r, m));

    const upgradePrices = {
        //TODO: Dynamically figure out prices, in case they change. 
        moneyPerQuestion: [undefined, 10, 100, 1e3, 1e4, 7.5e4, 3e5, 1e6, 1e7, 1e8],
        streakBonus: [undefined, 15, 1.5e2, 1.5e3, 1.5e4, 115e3, 450e3, 15e5, 15e6, 2e8],
        multiplier: [undefined, 50, 300, 2e3, 12e3, 85e3, 7e5, 65e5, 65e6, 1e9],
        insurance: [undefined, 10, 250, 1e3, 25e3, 1e5, 1e6, 5e6, 25e6, 5e7] // Ignored
    };

    const transporter = {};
    transporter.toggleLoc = () => { // If in shop - goes to questions, if in questions goes to shop
        clickElement(document.querySelector('div[style="font-weight: 900; cursor: pointer; font-size: 22px;"]'));
    };
    transporter.toShop = () => {
        clickElement(document.querySelectorAll('svg.MuiSvgIcon-root')[0]);
        clickElement(document.querySelectorAll('nav.MuiList-root.MuiList-padding svg.MuiSvgIcon-root')[1]);
    };
    transporter.toQuestion = () => {
        clickElement(document.querySelectorAll('svg.MuiSvgIcon-root')[0]);
        clickElement(document.querySelectorAll('nav.MuiList-root.MuiList-padding svg.MuiSvgIcon-root')[0]);
    };
    transporter.simpleClick = clickElement

    function clickElement(elem) {
        //Mobile event dispatch order
        let events = ["touchstart", "touchend", "mouseover", "mousemove", "mousedown", "mouseup", "click"];
        console.log(elem);

        events.forEach((event) => {
            if (event.includes("touch")) {
                elem.dispatchEvent(new TouchEvent(event, {
                    bubbles: true
                }))
            } else if (event.includes("mouse") || event === "click") {
                elem.dispatchEvent(new MouseEvent(event, {
                    bubbles: true
                }))
            }
        });

    }

    //TODO: Handle view correct answer setting being off.
    //We will remember what the questions were, and what the correct answer to them was. This will mean, that,
    //after we have guessed the correct answer to a question, we won't miss it in the future. 
    let results = {};

    function getMoney() {
        return Number(document.querySelector("body > div > div").innerText.split(",").join("").split("\n")[0].slice(1));
    };

    async function answerQuestion() {
        transporter.toQuestion();

        // elem[0] is question/header text, 1-4 are answer buttons
        let elements = document.querySelectorAll("span.notranslate.lang-en"),
        	questionName = elements[0].innerText,
        	index = 1

        if (results[questionName]) {
            let answer = results[questionName];

            for (let i = 1; i < elements.length; i++) {
                if (elements[i].innerText == answer) {
                    index = i;
                    break;
                }

            }

        }

        let guessing = elements[index].innerText;
        localGetEventListeners(document).click[0].listener({
            isTrusted: true,
            target: elements[index],
            type: "click"
        })
        console.log(elements)
        console.log(index)

        await sleep(450)

        let lost = document.querySelector("body > div > div > div:nth-child(3) > div:nth-child(1) > div > div > div").innerText.startsWith("-")
        // One of shop and viewCorrectAnswer exist
        if (!lost) {// Correct
            // Save the answer to the question. 
            results[questionName] = guessing

            let money = getMoney()
            let shopIndex; //Money per question, streak, multiplier, insurance (not useful).
            let moneyIndex = upgrades.moneyPerQuestion.findIndex((x) => {
                return money >= x;
            });
            let streakIndex = upgrades.streakBonus.findIndex((x) => {
                return money >= x;
            });
            let multiplierIndex = upgrades.multiplier.findIndex((x) => {
                return money >= x
            })
            let purchaseIndex

            if (moneyIndex != -1) {
                shopIndex = 0;
                purchaseIndex = moneyIndex;
                upgrades.moneyPerQuestion[moneyIndex] = undefined;
            } else if (streakIndex != -1) {
                shopIndex = 1;
                purchaseIndex = streakIndex
                upgrades.streakBonus[streakIndex] = undefined;
            } else if (multiplierIndex != -1) {
                shopIndex = 2;
                purchaseIndex = multiplierIndex;
                upgrades.multiplier[multiplierIndex] = undefined;
            }
            console.log(money)
            console.log(shopIndex)
            console.log(purchaseIndex)
            console.log(moneyIndex, streakIndex, multiplierIndex)

            if (shopIndex != undefined) {
                transporter.toShop()
                //TODO: Add powerups.
                await sleep(400)

                let options = document.querySelectorAll("body > div > div > div:nth-child(3) > div:nth-child(1) > div > div > div")
                console.log(options)
                transporter.simpleClick(options[shopIndex])

                await sleep(400)

                // Indexes 3-12 are purchase options.
                let selections = document.querySelectorAll("body > div > div > div:nth-child(3) > div:nth-child(1) > div > div > div > div")
                clickElement(selections[purchaseIndex + 3]) // Original attempts I see... for some reason none of these "shop selections work" just checking why - will be fixed
                // Select the upgrade
                await sleep(300)
                transporter.simpleClick(selections[2]) //Buy it.
                await sleep(300)
                // document.querySelectorAll("body > div > div > div > div > div")[2].click() //Click to go back to the questions.
                transporter.toQuestion()
            } else {
                // let nextQuestion = document.querySelector("#root > div > div.sc-lkqHmb.fDovdT > div:nth-child(1) > div > div > div.sc-bxivhb.guENId > span:nth-child(2) > div > div > div > div")
                // transporter.simpleClick(nextQuestion)
                transporter.toQuestion()
            }
        } else {
            //TODO: View Correct Answer button no longer being clicked. Probably requires the same getEventListeners change. 

            //Click "View Correct Answer"
            let viewCorrectAnswer = document.querySelector("#root > div > div > div > div > div > div:nth-child(2) > span:nth-child(1) > div")
            transporter.simpleClick(viewCorrectAnswer)
            await sleep(400)
            //Grab the answer
            let correctAnswer = document.querySelector("body > div > div > div:nth-child(3) > div:nth-child(1) > div > div > div > div > div:nth-child(3)").innerText
            //Store the correct answer for later use. 
            results[questionName] = correctAnswer
            //transporter.simpleClick(document.querySelector("span>div>div>div>div")) // Clicks the next button thing
            transporter.toQuestion()
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

	async function toggleAnswer() { // You can use if wanted
		answering = !answering
        while (answering) {
            await answerQuestion()
        }
	}

    //Allow pressing s to start
    window.addEventListener("keyup", function(e) {
        if (e.key == "s") {
            startAnswering()
        }
    })
    //Allow pressing e to end
    window.addEventListener("keyup", function(e) {
        if (e.key == "e") {
            stopAnswering()
        }
    })

}())
