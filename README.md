## This project is currently unmaintained. If you are interested in maintaining it, please send me an email or open an issue on this repository. 
# gimkit-bot
Cause total havoc on gimkit games by earning FAR too much money - because it's a bot - not you - answering the questions.

![too rich.png](https://ecc521.github.io/gimkit-bot/too%20rich.png "I'm way too rich")


## Some Info
Takes about 2 minutes to max out all upgrades, minus time wasted guessing at answers. Answers about one question per second. 

### Collaboration 
**Please**, If anybody is interested in maintaining this project, please send me an email or open up an issue on this repository. All help would be appreciated, since I don't have enough time to work on this.

Otherwise, if you have small fixes for bugs, making a simple PR request would be appreciated.

### Instructions

Follow the instructions at https://ecc521.github.io/gimkit-bot/bot.js
The bot uses APIs in Chrome Desktop DevTools. Non-Chrome browsers, and mobile versions of Chrome are NOT supported. 

## How It Works
For future developers and those interested...

This bot runs a loop that answers questions, and buys upgrades. It starts off by answering questions until it has enough money to buy a upgrade ( which it knows by checking the balance elem ). When that happens - it goes to the store and buys the next thing it needs. All the information on upgrade cost is kept in the script. 

### Difficulties

GimKit is attempting to block this bot from functioning, by changing it's website design and imposing restrictions on the rate of answers. If you have information about, or fixes for such restrictions, please make a PR or open an issue. 

<hr>

Again, if anybody is interested in maintaining this project, please send me an email or open up an issue on this repository. All help would be appreciated, since I don't have enough time to work on this.

