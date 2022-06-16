
var arr = null;

//get span position dynamically, works with window resizing 
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
    if (event.key === "p" && running == false) {
        running = true
        determineKeyPress()
       
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
var answersMap = new Map() //final map for storing questions to answers 


 function determineKeyPress() {
    temp.clear();
    setTemps()
  
    if (answersMap.has(tQuestion)) {
        var answer = answersMap.get(tQuestion)
        selected = answer
        if (tAns1 == answer) {showKey(temp.get(tAns1))}
        else if (tAns2 == answer) {showKey(temp.get(tAns2))}
        else if (tAns3 == answer) {showKey(temp.get(tAns3))}
        else {showKey(temp.get(tAns4))}
        return
    }
    
    //no answer has been found for this question? any blacklists?
    if (blacklist.has(tQuestion)) {
        //get blacklists
        var temp1 = blacklist.get(tQuestion) 
        if (!temp1.includes(tAns1)) {selected = tAns1; showKey(temp.get(tAns1))}
        else if (!temp1.includes(tAns2)) {selected = tAns2; showKey(temp.get(tAns2))}
        else if (!temp1.includes(tAns3)) {selected = tAns3; showKey(temp.get(tAns3))}
        else if (!temp1.includes(tAns4)) {selected = tAns4; showKey(temp.get(tAns4))}
        else { //reset blacklist because error
            blacklist.set(tQuestion, [])
            selected = tAns1
            showKey(temp.get(tAns1))
        } 
    }
    else {
        //completey new question?
        blacklist.set(tQuestion, [])
        selected = tAns1
        showKey(temp.get(tAns1))
    }
    
    
}

//check if answer was correct and blacklist if wrong
 function checkAnswer() {
    console.log(answersMap)
     var newArr = document.querySelectorAll('span')
    
    var ans = newArr[4].textContent
    console.log(ans)
    
    
    if (ans.includes("Close") && !answersMap.has(tQuestion)) {
        console.log('found correct one')
        answersMap.set(tQuestion, selected)
        document.dispatchEvent(new KeyboardEvent('keydown', {'keyCode': '13'}));
        if (running == true) {
            setTimeout(function() {
                determineKeyPress() 
            }, 300);
        }
        return
    }
    else {
        console.log("pushed to blacklist")
        blacklist.get(tQuestion).push(selected)
        document.dispatchEvent(new KeyboardEvent('keydown', {'keyCode': '13'}));
        if (running == true) {
            setTimeout(function() {
                determineKeyPress() 
            }, 300);
        }
        return
    }
}

//presses on the button
 function showKey(key) {
    
    console.log(key)
    
    if (key == 1) {
        pressOnPos(getOffset(arr[5])[0], getOffset(arr[5])[1])
        setTimeout(function() {
          checkAnswer() 
        }, 400);
    } 
    else if (key == 2) {
        pressOnPos(getOffset(arr[6])[0], getOffset(arr[6])[1])
        setTimeout(function() {
          checkAnswer() 
        }, 400);
    }
    else if (key == 3) {
        pressOnPos(getOffset(arr[7])[0], getOffset(arr[7])[1])
        setTimeout(function() {
          checkAnswer() 
        }, 400);
    }
    else if (key == 4) {
        pressOnPos(getOffset(arr[8])[0], getOffset(arr[8])[1])
        setTimeout(function() {
          checkAnswer() 
        }, 400);
    }
}

function setTemps() {
    arr = document.querySelectorAll('span')
    tQuestion = arr[4].textContent
    
    tAns1 = arr[5].textContent
    tAns2 = arr[6].textContent
    tAns3 = arr[7].textContent
    tAns4 = arr[8].textContent
    
    temp.set(tAns1, 1)
    temp.set(tAns2, 2)
    temp.set(tAns3, 3)
    temp.set(tAns4, 4)
    
}

//also presses the button 
function pressOnPos(posX, posY) {
    console.log(posX, posY)
    window.dispatchEvent(new MouseEvent("mousedown-is-trusted", {composed: true, bubbles: true, clientX: posX, clientY: posY, button: 0, buttons: 1}));
    window.dispatchEvent(new MouseEvent("mousemove-is-trusted", {composed: true, bubbles: true, clientX: posX, clientY: posY, button: 1, buttons: 2}));
    window.dispatchEvent(new MouseEvent("mouseup-is-trusted", {composed: true, bubbles: true, clientX: posX, clientY: posY, button: 0, buttons: 3}));
}