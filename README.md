# gimkit-bot
Cause total havoc on gimkit games by earning FAR too much money - because it's a bot - not you - answering the questions.

![too rich.png](https://ecc521.github.io/gimkit-bot/too%20rich.png "I'm way too rich")


## Some Info
Takes about 2 minutes to max out all upgrades, minus time wasted guessing at answers. Answers about one question per second. PRs that safely reduce pause times are welcomed, but I have limited time to maintain this project.
### Collaboration 
**Please**, If anybody is interested in maintaining this project, please send me an email or open up an issue on this repository. All help would be appreciated, since I don't have enough time to work on this.

### Instructions

Follow the instructions at https://ecc521.github.io/gimkit-bot/bot.js

## How It Works
For future developers and those interested...

This bot runs a loop that answers questions, and buys upgrades. It starts off by answering questions until it has enough money to buy a upgrade ( which it knows by checking the balance elem ). When that happens - it goes to the store and buys the next thing it needs. All the information on upgrade cost is kept in the script. 

### Obstacles

Gimkit has released a server-side filter that checks how the player answers questions. The reason its "unavoidable" and how it filters will not be mentioned here, but once a solution is found, please make a PR or contact me, ecc521, in some other way. 

<hr>

Again, if anybody is interested in maintaining this project, please send me an email or open up an issue on this repository. All help would be appreciated, since I don't have enough time to work on this.


