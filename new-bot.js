

//note script may not perform well on kits with 50+ questions
var safeMode = true;
var map1;

//only for tampermonkey
try {
    if (GM_getValue(1) == undefined) {
        var test = new Map().set("test question", "test answer")
        var temp2 = []
        test.forEach((value, name) => temp2.push({ name, value }));


        GM_setValue(1, temp2)

        map1 = new Map(
            GM_getValue(1).map(object => {
                return [object.name, object.value];
            }),
        );
    } else {
        map1 = new Map(
            GM_getValue(1).map(object => {
                return [object.name, object.value];
            }),
        );
    }
    console.log(GM_getValue(1))
} catch (error) {
    console.log("Could not access Tampermonkey functions. Defaulting to temporary store")
    map1 = new Map()
}



var arr = document.querySelectorAll('span')

//get dynamic div position
function getOffset(elem) {
    var top=2, left=2; // offset so the mouse can actually click on the span
    while(elem) {
        top = top + parseInt(elem.offsetTop);
        left = left + parseInt(elem.offsetLeft);
        elem = elem.offsetParent;
    }
    return [left, top];
}

var running = false;

//set up listner
window.addEventListener("keypress", function onEvent(event) {
    if (event.key === "p") {
        running = true
        determineKeyPress()

    }
    if (event.key === "u") {
        safeMode = !safeMode
        if (safeMode == true) {
            alert("Safe mode on. Best used for gamemodes such as Trust No One and Classic")
        } else if (safeMode == false) {
            alert("Safe mode off. May cause Gimkit to flag. Best used for gamemodes such as Capture the Flag and Tag")
        }
    }
    if (event.key === 'q') {
        //only for capture the flag or tag
        try {
            var button = document.querySelectorAll("span")

            for (let i = 1; i <= button.length; i++) {
                if (button[i].textContent == "Answer Questions") {var temp = button[i]}
            }
        }
        catch(err) {
            console.log("Could not find the button tied to hotkey")
        }

        pressOnPos(getOffset(temp)[0], getOffset(temp)[1])

    }
    if (event.key === "e") {
        //only for capture the flag
        try {
            button = document.querySelectorAll("span")

            for (let i = 1; i <= button.length; i++) {
                if (button[i].textContent == "Become Invisible") {temp = button[i]}
            }
        }
        catch(err) {
            console.log("Could not find the button tied to hotkey")
        }

        pressOnPos(getOffset(temp)[0], getOffset(temp)[1])
    }
    if (event.key === "o") {
        running = false
    }
});



//temp questions and answers
var tQuestion = null;
var tAns1 = null;
var tAns2 = null;
var tAns3 = null;
var tAns4 = null;

var selected = null; //the answer selected to guess


var temp = new Map() //temp map for storing answers to keys
var blacklist = new Map() // questions to their blacklisted answers
var answersMap = map1 //ultimate map for stories questions to answers


 function determineKeyPress() {
    temp.clear();
    setTemps()

     if (running == false) {
         return;
     }

    if (answersMap.has(tQuestion)) {
        var answer = answersMap.get(tQuestion)
        selected = answer
        if (tAns1 == answer) {showKey(temp.get(tAns1))}
        else if (tAns2 == answer) {showKey(temp.get(tAns2))}
        else if (tAns3 == answer) {showKey(temp.get(tAns3))}
        else {showKey(temp.get(tAns4))}
        return
    }

    //no answer has been found for this question? Have we been here before and found any blacklists?
    if (blacklist.has(tQuestion)) {
        //get blacklists
        var temp1 = blacklist.get(tQuestion)
        if (!temp1.includes(tAns1)) {selected = tAns1; showKey(temp.get(tAns1))}
        else if (!temp1.includes(tAns2)) {selected = tAns2; showKey(temp.get(tAns2))}
        else if (!temp1.includes(tAns3)) {selected = tAns3; showKey(temp.get(tAns3))}
        else if (!temp1.includes(tAns4)) {selected = tAns4; showKey(temp.get(tAns4))}
        else {
            blacklist.set(tQuestion, [])
            selected = tAns1
            showKey(temp.get(tAns1))
        } //reset because error
    } else {
        //completey new question?
        blacklist.set(tQuestion, [])
        selected = tAns1
        showKey(temp.get(tAns1))
    }


}
//70 works for tag or ctf
//check if answer was correct and blacklist if wrong
 function checkAnswer() {
    console.log(answersMap)
    var newArr = document.querySelectorAll('span')

    var ans = newArr[4].textContent
    var conti = newArr[5]
    console.log(ans)

     if ((ans.includes("Close") || ans.includes("Mission") || ans.includes("Shop")) && answersMap.has(tQuestion)) {
         pressOnPos(getOffset(conti)[0], getOffset(conti)[1])
         if (running == true) {
             setTimeout(function() {
                 determineKeyPress()
             }, timeOut());
         }
         return
     }


    if ((ans.includes("Close") || ans.includes("Mission") || ans.includes("Shop")) && !answersMap.has(tQuestion)) {
        console.log('found corret one')
        answersMap.set(tQuestion, selected)
        pressOnPos(getOffset(conti)[0], getOffset(conti)[1])
        if (running == true) {
            saveAnswers()
            setTimeout(function() {
                determineKeyPress()
            }, timeOut());
        }
        return
    }
    else {
        if (!blacklist.has(tQuestion)) {
            blacklist.set(tQuestion, [])
        }
        console.log("psuhed")
        blacklist.get(tQuestion).push(selected)
        pressOnPos(getOffset(conti)[0], getOffset(conti)[1])
        if (running == true) {
            setTimeout(function() {
                determineKeyPress()
            }, timeOut());
        }
        return
    }
}
//450 minimum
//slow network or slow pc speeds may need values 700+
 function showKey(key) {
    //show client key press with color
    console.log(key)

    if (key == 1) {
        pressOnPos(getOffset(arr[5])[0], getOffset(arr[5])[1])
        setTimeout(function() {
          checkAnswer()
        }, 500);
    }
    else if (key == 2) {
        pressOnPos(getOffset(arr[6])[0], getOffset(arr[6])[1])
        setTimeout(function() {
          checkAnswer()
        }, 500);
    }
    else if (key == 3) {
        pressOnPos(getOffset(arr[7])[0], getOffset(arr[7])[1])
        setTimeout(function() {
          checkAnswer()
        }, 500);
    }
    else if (key == 4) {
        pressOnPos(getOffset(arr[8])[0], getOffset(arr[8])[1])
        setTimeout(function() {
          checkAnswer()
        }, 500);
    }
}

function setTemps() {
    try {
        arr = document.querySelectorAll('span')
        tQuestion = arr[4].textContent.replace(/ /g, '')

        tAns1 = arr[5].textContent.replace(/ /g, '')
        tAns2 = arr[6].textContent.replace(/ /g, '')
        tAns3 = arr[7].textContent.replace(/ /g, '')
        tAns4 = arr[8].textContent.replace(/ /g, '')

        temp.set(tAns1, 1)
        temp.set(tAns2, 2)
        temp.set(tAns3, 3)
        temp.set(tAns4, 4)
    } catch (error){
        alert("Script crashed. Likely due to slow network or a slow pc")
        console.log(error)
        running = false
    }


}

function pressOnPos(posX, posY) {
    console.log(posX, posY)
    window.dispatchEvent(new MouseEvent("mousedown-is-trusted", {composed: true, bubbles: true, clientX: posX, clientY: posY, button: 0, buttons: 1}));
    window.dispatchEvent(new MouseEvent("mousemove-is-trusted", {composed: true, bubbles: true, clientX: posX, clientY: posY, button: 1, buttons: 2}));
    window.dispatchEvent(new MouseEvent("mouseup-is-trusted", {composed: true, bubbles: true, clientX: posX, clientY: posY, button: 0, buttons: 3}));
}

//only for tampermonkey
function saveAnswers() {
    try {
        temp2 = []
        answersMap.forEach((value, name) => temp2.push({ name, value }));
        GM_deleteValue(1)
        GM_setValue(1, temp2)
    } catch (error) {
        console.log("Couldn't save qustions to tampermonkey")
    }

}

//keeps the click is trusted extension alive
function keepAlive() {
    window.dispatchEvent(new MouseEvent("mousemove-is-trusted", {composed: true, bubbles: true, clientX: 23, clientY: 25, button: 1, buttons: 2}));
    setTimeout(function() {
        keepAlive()
        console.log("alive")
    }, 1200);
}
keepAlive()

function timeOut() {
    if (safeMode == true) {
        return 210;
    } else {
        return 30;
    }
}

