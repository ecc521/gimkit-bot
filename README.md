## This project is currently unmaintained and I have no intention to maintain it in the future. 

## All code from ecc521 can be used unrestricted (https://creativecommons.org/public-domain/cc0/) - Code from other authors still follows the GPL license. 

## If you have an actively working fork / similar project, send me an email and I might link it here. 

# gimkit-bot
(INSTRUCTIONS FOR USE BELOW) Cause total havoc on gimkit games by earning FAR too much money - because it's a bot - not you - answering the questions.

![too rich.png](https://ecc521.github.io/gimkit-bot/too%20rich.png "I'm way too rich")


## Some Info
Takes about 2 minutes to max out all upgrades, minus time wasted guessing at answers. Answers about one question per second. 

### Collaboration 
**Please**, If anybody is interested in maintaining this project, please send me an email or open up an issue on this repository. All help would be appreciated, since I don't have enough time to work on this.

Otherwise, if you have small fixes for bugs, making a simple PR request would be appreciated.

### Instructions

To use the bot, copy the code from [https://ecc521.github.io/gimkit-bot/bot.js](https://ecc521.github.io/gimkit-bot/bot.js) and paste it into the chrome developer tools console.
You should get two window alerts, agree to both of them.
To use the bot, click the S key to start it, and the E key to stop it.
The bot uses APIs in Chrome Desktop DevTools. Non-Chrome browsers, and mobile versions of Chrome are NOT supported. 

If you are unable to use the chrome developer console:
You can paste code into a bookmarklet to run the script. To make a bookmarklet for the bot, copy the code from the bookmarklet.js file, which you can find above, into a bookmark and save it as "Gimkit Bot" or whatever else you may wish. Then, when you are in the gimkit game you can click on the bookmark to run it. 

## How It Works
For future developers and those interested...

This bot runs a loop that answers questions, and buys upgrades. It starts off by answering questions until it has enough money to buy a upgrade ( which it knows by checking the balance elem ). When that happens - it goes to the store and buys the next thing it needs. All the information on upgrade cost is kept in the script. 

### Difficulties

GimKit is attempting to block this bot from functioning, by changing it's website design and imposing restrictions on the rate of answers. If you have information about, or fixes for such restrictions, please make a PR or open an issue. 

<hr>

Again, if anybody is interested in maintaining this project, please send me an email or open up an issue on this repository. All help would be appreciated, since I don't have enough time to work on this.

