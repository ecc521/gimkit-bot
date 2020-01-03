# Powerups

Information on powerups, straight from the server...

```js
[
  {
    "name": "Trick Or Treat",
    "displayName": "Naughty or Nice?",
    "description": "60% chance your balance will increase by 20%. 40% chance your balance will decrease by 10%.",
    "icon": "fas fa-lights-holiday",
    "color": {
      "background": "#d32f2f",
      "text": "#4caf50"
    },
    "baseCost": 25,
    "percentageCost": 0.07,
    "customTag": "Holiday Special"
  },
  {
    "name": "Special Music Sound",
    "displayName": "Jingle Bells",
    "description": "It's the most wonderful time of the year",
    "icon": "fas fa-music",
    "color": {
      "background": "#e65100",
      "text": "white"
    },
    "baseCost": 50,
    "percentageCost": 0.3,
    "customTag": "Holiday Special",
    "disabled": [
      "preview",
      "assignment",
      "musicOff"
    ]
  },
  {
    "name": "5 Percent Bot",
    "displayName": "Snowstorm",
    "description": "It's snowing money! Your balance will automatically increase by 5% every 20 seconds!",
    "icon": "fas fa-cloud-snow",
    "color": {
      "background": "#263238",
      "text": "#eeeeee"
    },
    "baseCost": 320,
    "percentageCost": 0.22,
    "customTag": "Holiday Special",
    "disabled": [
      "assignment"
    ]
  },
  {
    "name": "Icer",
    "displayName": "Icer",
    "description": "Freeze other #s! They won't be able to answer questions or visit the shop for 15 seconds!",
    "icon": "fas fa-snowflake",
    "color": {
      "background": "#495057",
      "text": "white"
    },
    "baseCost": 20,
    "percentageCost": 0.08,
    "disabled": [
      "preview",
      "cleanOnly",
      "assignment"
    ]
  },
  {
    "name": "Deflector",
    "description": "Deflects all harmful powerups for 2 minutes",
    "icon": "fas fa-exchange",
    "color": {
      "background": "#aa00c7",
      "text": "white"
    },
    "baseCost": 55,
    "percentageCost": 0.21,
    "customTag": "",
    "disabled": [
      "preview",
      "assignment",
      "cleanOnly"
    ]
  },
  {
    "name": "repurchasePowerups",
    "displayName": "Rebooter",
    "description": "Reuse all your powerups a second time",
    "icon": "fas fa-power-off",
    "customTag": "",
    "color": {
      "background": "#009688",
      "text": "white"
    },
    "baseCost": 1000,
    "percentageCost": 0.3
  },
  {
    "name": "Giving",
    "displayName": "Gift",
    "description": "Increase another #'s balance by 25%",
    "icon": "fas fa-gifts",
    "color": {
      "background": "#691b99",
      "text": "white"
    },
    "baseCost": 200,
    "percentageCost": 0.26,
    "disabled": [
      "preview",
      "assignment"
    ]
  },
  {
    "name": "Subtractor",
    "description": "Remove 20% of a #'s earnings",
    "icon": "fas fa-minus-circle",
    "color": {
      "background": "#FF5964",
      "text": "white"
    },
    "baseCost": 150,
    "percentageCost": 0.2,
    "disabled": [
      "assignment",
      "cleanOnly",
      "preview"
    ]
  },
  {
    "name": "Reducer",
    "description": "Reduce a #'s new earnings by 50% for 60 seconds",
    "icon": "fas fa-hand-point-down",
    "color": {
      "background": "#822626",
      "text": "white"
    },
    "baseCost": 130,
    "percentageCost": 0.17,
    "disabled": [
      "assignment",
      "cleanOnly",
      "preview"
    ]
  },
  {
    "name": "Discounter",
    "description": "All shop upgrades are 25% off for 5 minutes",
    "icon": "fas fa-dollar-sign",
    "color": {
      "background": "#5C097C",
      "text": "white"
    },
    "baseCost": 250,
    "percentageCost": 0.16
  },
  {
    "name": "Mini Bonus",
    "description": "Earnings are multiplied by 2x for a single question",
    "icon": "fas fa-award",
    "color": {
      "background": "#032C00",
      "text": "white"
    },
    "baseCost": 20,
    "percentageCost": 0.03
  },
  {
    "name": "Mega Bonus",
    "description": "Earnings are multiplied by 5x for a single question",
    "icon": "fas fa-medal",
    "color": {
      "background": "#054F00",
      "text": "white"
    },
    "baseCost": 50,
    "percentageCost": 0.06
  }
]
```

- Source, FloppyT
