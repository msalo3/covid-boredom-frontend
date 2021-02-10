const ROUND_START = 1
const PLAYER_LIMIT = 6
const load = () => {
  // const p = [new Player('marc'), new Player('victoria'), new Player('j')]
  const p = []
  var gameSetup = new GameSetup(p)
  gameSetup.showPlayers()
  var game;

  const processForm = (e) => {
    if (e.preventDefault) e.preventDefault();

    var nameInput = document.getElementById("name")
    gameSetup.addPlayer(nameInput.value)
    nameInput.value = ""

    return false;
  }

  const readyGame = () => {
    var playerArea = document.getElementById("game-setup-container")
    var gameArea = document.getElementById("game-container")

    playerArea.style.display = "none"
    gameArea.style.display = "block"
    game = new Game(gameSetup.players)
    run(game)
  }

  // const replay = () => {
  //   var playerArea = document.getElementById("game-setup-container")
  //   var gameArea = document.getElementById("game-container")

  //   playerArea.style.display = "none"
  //   gameArea.style.display = "block"

  //   const samePlayers = game.players.map((p) => p.reset())
  //   const newGame = new Game(samePlayers)
  //   run(newGame)
  // }

  const form = document.getElementById('name-form')
  if (form.attachEvent) {
    form.attachEvent("submit", processForm);
  } else {
    form.addEventListener("submit", processForm);
  }

  const startGameBtn = document.getElementById('start-game-btn')
  if (startGameBtn.attachEvent) {
    startGameBtn.attachEvent("click", readyGame);
  } else {
    startGameBtn.addEventListener("click", readyGame);
  }

  // const replayBtn = document.getElementById('replay')
  // if (replayBtn.attachEvent) {
  //   replayBtn.attachEvent("click", replay);
  // } else {
  //   replayBtn.addEventListener("click", replay);
  // }
}

window.onload = load;


class Card {
  constructor(suit, rank, value) {
    this.suit = suit;
    this.rank = rank;
    this.value = value;
    this.color = (suit === "Spades" || suit === "Clubs") ? 'Black' : 'Red'
  }
}

class Deck {
  constructor(cards = []) {
    this.cards = cards
    this.shuffled = false
    this.dealt = []
  }

  shuffle() {
    this.cards = shuffle(this.cards)
    this.shuffled = true
  }

  deal(num) {
    const cardsToReturn = []
    for (let i = 0; i < num; i++) {
      const card = this.cards.shift();
      this.dealt.push(card)
      cardsToReturn.push(card)
    }
    return cardsToReturn
  }

  humanReadableRank(rank) {
    if (rank === 'a') return 'Ace'
    if (rank === 'j') return 'Jack'
    if (rank === 'q') return 'Queen'
    if (rank === 'k') return 'King'
    return rank
  }
}

class Player {
  constructor(name) {
    this.name = name
    this.hand = []
    this.drinksGiven = 0
    this.drinksTaken = 0
  }

  takeDrink(num = 1) {
    this.drinksTaken += num
  }

  giveDrink(num = 1) {
    this.drinksGiven += num
  }

  addCardsTohand(cards) {
    for (let i = 0; i < cards.length; i++) {
      this.hand.push(cards[i])
    }
  }

  removeCardsFromHand(cards) {
    const cardsRemoved = []
    for (let i = 0; i < cards.length; i++) {
      const idx = this.hand.findIndex((c) => c.suit === cards[i].suit && c.value === cards[i].value)
      cardsRemoved.push(this.hand[idx])
      this.hand = [...this.hand.slice(0, idx), ...this.hand.slice(idx + 1)]
    }
    return cardsRemoved
  }

  reset() {
    this.hand = []
    this.drinksGiven = 0
    this.drinksTaken = 0
    return this
  }
}

class GameSetup {
  constructor(players = []) {
    this.players = players
  }

  addPlayer(newName) {
    if (this.players.length === PLAYER_LIMIT) {
      const max = document.getElementById('max')
      const color = max.style.color === 'red' ? 'orange' : 'red'
      max.setAttribute('style', 'color: ' + color + ';')
      return;
    }
    if (newName === "") return
    const isExistingPlayer = this.players.find((p) => p.name === newName);
    if (isExistingPlayer !== undefined) return;

    const player = new Player(newName)
    this.players.push(player)
    this.showPlayers()
  }

  removePlayer(name) {
    const playerIdx = this.players.findIndex((p) => p.name === name);
    if (playerIdx === -1) return;

    this.players = [...this.players.slice(0, playerIdx), ...this.players.slice(playerIdx + 1)]

    const max = document.getElementById('max')
    max.setAttribute('style', 'color: black;')
    this.showPlayers()
  }

  showPlayers() {
    var playersNode = document.getElementById("players");
    playersNode.innerHTML = ""

    for (let i = 0; i < this.players.length; i++) {
      const name = this.players[i].name;
      var div = document.createElement("div");
      div.classList.add('player-name-row')
      var para = document.createElement("p");
      para.classList.add('name')
      var node = document.createTextNode(name);
      para.appendChild(node);

      var button = document.createElement('button');
      button.innerHTML = 'Remove Player'
      button.classList.add("remove-player-btn")

      div.appendChild(para);
      div.appendChild(button);
      button.addEventListener("click", () => this.removePlayer(name));
      playersNode.appendChild(div);
    }
    if (this.players.length > 1) {
      document.getElementById("start-game").style.display = 'block'
    } else {
      document.getElementById("start-game").style.display = 'none'
    }
  }
}

class Game {
  ROUND_DATA = [
    {
      number: 1,
      title: "Red or Black",
      options: ["Red", "Black"],
      numCardsToDeal: 1,
      logicFn: gotRedOrBlackRight
    },
    {
      number: 2,
      title: "Higher or Lower",
      options: ["Higher", "Lower", "Same"],
      numCardsToDeal: 1,
      logicFn: gotHigherOrLowerRight
    },
    {
      number: 3,
      title: "Inside or Outside",
      options: ["Inside", "Outside"],
      numCardsToDeal: 1,
      logicFn: gotInsideOutsideRight
    },
    {
      number: 4,
      title: "Guess the Suit",
      options: ["Spades", "Clubs", "Hearts", "Diamonds"],
      numCardsToDeal: 1,
      logicFn: gotSuitRight
    },
    {
      number: 5,
      title: "Best Poker Hand",
      numCardsToDeal: 3
    },
    {
      number: 6,
      title: "Give and Take",
      numCardsToDeal: 8
    }
  ]

  BUS_ORDER = ["give-1", "take-1", "give-2", "take-2", "give-3", "take-3", "give-4", "take-4", "give-5", "take-5"]
  constructor(players) {
    this.players = players
    this.round = ROUND_START
    this.turnsPerRound = players.length
    this.turnCount = 0
    this.deck = this.fillRegularDeck()
    this.deck.shuffle()
    this.busOrder = this.BUS_ORDER
    this.busIndex = 0
    this.busIsClickable = true
    this.busCardsToMove = []
    this.drinksGivenHistory = []
    this.drinksTakenHistory = []
    this.drinkCounter = this.setupDrinkCounter(players)
  }

  setupDrinkCounter(players) {
    var counterObj = {
      totalAdded: 0,
      totalNeeded: 0
    }
    for (let i = 0; i < players.length; i++) {
      const player = players[i];
      counterObj[player.name] = 0
    }
    return counterObj
  }

  fillRegularDeck() {
    const cards = []
    const suits = ["Spades", "Clubs", "Hearts", "Diamonds"]
    for (let i = 1; i < 14; i++) {
      for (let j = 0; j < 4; j++) {
        const suit = suits[j]
        let rank = i;
        if (i === 1) rank = 'a'
        if (i === 11) rank = 'j'
        if (i === 12) rank = 'q'
        if (i === 13) rank = 'k'
        const card = new Card(suit, rank, i)
        cards.push(card)
      }
    }
    return new Deck(cards)
  }

  updateTotalNeeded(amt) {
    this.drinkCounter.totalNeeded = amt
  }

  addToDrinkCount(playerName, cb) {
    if (this.drinkCounter.totalNeeded === this.drinkCounter.totalAdded) return;

    this.drinkCounter[playerName] += 1
    this.drinkCounter.totalAdded += 1
    cb(this.drinkCounter[playerName])
  }

  removeFromDrinkCount(playerName, cb) {
    if (this.drinkCounter.totalAdded === 0) return;
    if (this.drinkCounter[playerName] === 0) return;

    this.drinkCounter[playerName] -= 1
    this.drinkCounter.totalAdded -= 1
    cb(this.drinkCounter[playerName])
  }

  currentDrinkCount(playerName) {
    return this.drinkCounter[playerName];
  }

  finalizeDrinks(ownerName) {
    console.log('Game', this)
    if (this.drinkCounter.totalNeeded !== this.drinkCounter.totalAdded) return false;

    const owner = this.players.find((p) => p.name === ownerName)
    for (let i = 0; i < this.players.length; i++) {
      if (this.players[i].name === ownerName) continue

      const player = this.players[i];
      const name = player.name;
      var drinkCount = this.drinkCounter[player.name]
      while (drinkCount > 0) {
        player.takeDrink()
        this.drinksTakenHistory.push({
          takenBy: name,
          givenBy: ownerName,
          round: this.round
        })

        owner.giveDrink()
        this.drinksGivenHistory.push({
          takenBy: name,
          givenBy: ownerName,
          round: this.round
        })

        drinkCount--
      }
      this.drinkCounter[player.name] = 0
    }
    this.drinkCounter.totalNeeded = 0
    this.drinkCounter.totalAdded = 0

    return true
  }

  finalizeBusDrinks(taker, owner = null) {
    const amt = parseInt(this.busOrder[this.busIndex - 1].substring(5, 6))
    if (owner) {
      for (let i = 0; i < amt; i++) {
        taker.takeDrink()
        this.drinksTakenHistory.push({
          takenBy: taker.name,
          givenBy: owner.name,
          round: this.round
        })

        owner.giveDrink()
        this.drinksGivenHistory.push({
          takenBy: taker.name,
          givenBy: owner.name,
          round: this.round
        })
      }
    } else {
      taker.takeDrink()
      this.drinksTakenHistory.push({
        takenBy: taker.name,
        givenBy: 'game',
        round: this.round
      })
    }
    return true
  }

  addToBusCards(card, owner) {
    const data = {
      card: card,
      owner: owner
    }
    this.busCardsToMove.push(data)
  }

  handleBusCards() {
    if (!this.busCardsToMove[0]) {
      if (this.busIndex === this.busOrder.length) {
        this.showGameOver()
        return;
      }
      this.busIsClickable = true;
      return;
    }

    const data = this.busCardsToMove[0]
    const ownerName = data.owner.name
    const card = data.card

    const busPromptArea = document.getElementById('bus-prompt-area')
    busPromptArea.innerHTML = ""

    if (this.busOrder[this.busIndex - 1].substring(0, 4) === "take") {
      this.drawBusCardHeader(false, busPromptArea, data)

      var takeBtn = document.createElement('button');
      takeBtn.innerHTML = 'OK'

      busPromptArea.appendChild(takeBtn);
      takeBtn.addEventListener("click", (e) => {
        if (e.preventDefault) e.preventDefault();

        this.finalizeBusDrinks(data.owner)
        takeBtn.remove()
        busPromptArea.innerHTML = ""
        this.busCardsToMove = [...this.busCardsToMove.slice(1, this.busCardsToMove.length)]
        this.handleBusCards()
        return false;
      });
    } else {
      this.drawBusCardHeader(true, busPromptArea, data)

      var promptForm = document.createElement("form");
      var wrapperDiv = document.createElement("div");
      wrapperDiv.classList.add('radio-toolbar')
      for (let i = 0; i < this.players.length; i++) {
        const playerName = this.players[i].name
        if (playerName === ownerName) continue;

        var radio = document.createElement("input");
        radio.type = "radio"
        radio.id = playerName;
        radio.value = playerName;
        radio.name = "players"

        var label = document.createElement("label");
        label.htmlFor = playerName;
        var labelText = document.createTextNode(playerName);
        label.appendChild(labelText)

        wrapperDiv.appendChild(radio)
        wrapperDiv.appendChild(label)
      }
      promptForm.appendChild(wrapperDiv)

      var btn = document.createElement('button');
      btn.classList.add('submit-button')
      var btnSpan = document.createElement('span')
      btnSpan.innerHTML = 'Submit'
      btn.appendChild(btnSpan)

      promptForm.appendChild(btn);
      btn.addEventListener("click", (e) => {
        if (e.preventDefault) e.preventDefault();

        var radios = document.getElementsByName("players");
        for (let j = 0; j < radios.length; j++) {
          if (radios[j].checked) {
            data.owner.removeCardsFromHand([card])
            const newOwner = this.players.find((p) => p.name === radios[j].value)
            this.finalizeBusDrinks(newOwner, data.owner)
            newOwner.addCardsTohand([card])
            btn.remove()
            busPromptArea.innerHTML = ""
            showPlayersAndHands(this)
            this.busCardsToMove = [...this.busCardsToMove.slice(1, this.busCardsToMove.length)]
            this.handleBusCards()
            break;
          }
        }
        return false;
      });
      busPromptArea.appendChild(promptForm)
    }
  }

  drawBusCardHeader(isGive, area, data) {
    const ownerName = data.owner.name
    const card = data.card
    const rank = this.deck.humanReadableRank(card.rank)
    const drinkAmt = this.busOrder[this.busIndex - 1].substring(5, 6)
    const rankOfSuit = rank + " of " + card.suit

    let text = ownerName + ", "


    if (isGive) {
      text += "who gets to drink " + drinkAmt + "? (they also get your " + rankOfSuit + ")"
    } else {
      text += "drink " + drinkAmt + " for your " + rankOfSuit
    }

    const header = document.createElement("h3")
    const headerText = document.createTextNode(text)
    header.appendChild(headerText)
    area.appendChild(header)
  }

  showPokerDrinks(playerNames, idx = 0) {
    var drinkArea = document.getElementById("drinks-area")
    drinkArea.innerHTML = ""

    if (!playerNames[idx]) {
      // No more players to handle, move on to next round
      document.getElementById("prompt-area").innerHTML = ""
      document.getElementById("card-area").innerHTML = ""
      document.getElementById("drinks-area").innerHTML = ""
      run(this)
      return
    }

    var name = playerNames[idx]
    var text = name + " give 5 drinks"
    const drinkHeader = document.createElement("h3")
    const drinkText = document.createTextNode(text)
    drinkHeader.appendChild(drinkText)
    drinkArea.appendChild(drinkHeader)

    this.updateTotalNeeded(5)

    var colDiv = document.createElement("div");
    colDiv.classList.add('math-col')

    for (let i = 0; i < this.players.length; i++) {
      const playerName = this.players[i].name
      if (name === playerName) continue;

      var wrapperDiv = document.createElement("div");
      wrapperDiv.classList.add('math-row')

      var txtHolder = document.createElement("h4");
      txtHolder.setAttribute('id', playerName)
      var playerDrinkTxt = document.createTextNode(playerName + " takes " + this.currentDrinkCount(playerName));
      txtHolder.appendChild(playerDrinkTxt)

      var addBtn = document.createElement("button");
      addBtn.classList.add('math-button')
      var addBtnSpan = document.createElement('span')
      addBtnSpan.innerHTML = '+'
      addBtn.appendChild(addBtnSpan)
      addBtn.addEventListener("click", (e) => {
        if (e.preventDefault) e.preventDefault();
        this.addToDrinkCount(playerName, function (newNum) {
          var txtHolder = document.getElementById(playerName)
          const newText = playerName + " takes " + newNum

          txtHolder.innerText = newText
        })
        return false
      });

      var removeBtn = document.createElement("button");
      removeBtn.classList.add('math-button')
      var removeBtnSpan = document.createElement('span')
      removeBtnSpan.innerHTML = '-'
      removeBtn.appendChild(removeBtnSpan)
      removeBtn.addEventListener("click", (e) => {
        if (e.preventDefault) e.preventDefault();
        this.removeFromDrinkCount(playerName, (newNum) => {
          var txtHolder = document.getElementById(playerName)
          txtHolder.innerText = playerName + " takes " + newNum
        })
        return false;
      });

      wrapperDiv.appendChild(addBtn)
      wrapperDiv.appendChild(removeBtn)
      wrapperDiv.appendChild(txtHolder)
      colDiv.appendChild(wrapperDiv)
    }
    drinkArea.appendChild(colDiv)

    var submitBtn = document.createElement('button');
    submitBtn.innerHTML = 'Submit'

    drinkArea.appendChild(submitBtn);
    submitBtn.addEventListener("click", () => {
      const shouldContinue = this.finalizeDrinks(name)
      if (shouldContinue) {
        document.getElementById("prompt-area").innerHTML = ""
        document.getElementById("card-area").innerHTML = ""
        document.getElementById("drinks-area").innerHTML = ""
        this.showPokerDrinks(playerNames, idx + 1)
      }
    });
  }

  showGameOver() {
    const busArea = document.getElementById('bus-area')
    busArea.innerHTML = ''
    busArea.setAttribute("style", "height: 0px;")
    const tableArea = document.getElementById('header-container')
    tableArea.innerHTML = ''

    const gameOverArea = document.getElementById('game-over-area')
    gameOverArea.setAttribute('style', 'display: block; height: 40vh')

    const pRow = document.getElementById('player-row')
    pRow.setAttribute('style', 'height: 42vh')

    const extraStats = showStatistics(this)
    for (let i = 0; i < extraStats.length; i++) {
      gameOverArea.prepend(extraStats[i])
    }
  }

  generateStats(name) {
    const givenStats = this.findStreakAndTotal(name, this.drinksGivenHistory, 'givenBy')
    const takenStats = this.findStreakAndTotal(name, this.drinksTakenHistory, 'takenBy')
    const gameGivenStats = this.findPlayerSpecificGivenStats()
    const playerSpecificStats = this.findPlayerSpecificGivenStats(name)
    // TODO: Loop over each player and generate stats based on this.findPlayerSpecificGivenStats()
    return (
      {
        name: name,
        totalGiven: givenStats.total,
        totalTaken: takenStats.total,
        givenStreak: givenStats.maxStreak,
        takenStreak: takenStats.maxStreak,
        gameGivenStats: gameGivenStats,
        playerSpecificStats: playerSpecificStats
      }
    )
  }

  findStreakAndTotal(val, arr, key) {
    var streakCounter = 0;
    var maxStreak = 0
    var total = 0;
    for (let i = 0; i < arr.length; i++) {
      const match = arr[i][key] === val
      if (match) {
        streakCounter++
        total++
      } else {
        streakCounter = 0
      }

      if (streakCounter > maxStreak) maxStreak = streakCounter
    }
    return ({ maxStreak, total })
  }

  findPlayerSpecificGivenStats(giverName = "game") {
    // Should look kinda like this:
    // { marc: 10, marcStreak: 0, marcStreakMax: 3, victoria: 5, victoriaStreak: 1, victoriaStreakMax: 1}
    // marc === total drinks the giver/game gave the player
    // marcStreak is just a tracker and can be ignored
    // marcStreakMax === longest streak of drinks the giver/game gave the player

    const givenByGamePerPlayer = {}

    for (let j = 0; j < this.players.length; j++) {
      let name = this.players[j].name
      givenByGamePerPlayer[name] = 0

      const nameStreak = name + "Streak"
      givenByGamePerPlayer[nameStreak] = 0

      const nameStreakMax = nameStreak + "Max"
      givenByGamePerPlayer[nameStreakMax] = 0
    }
    for (let i = 0; i < this.drinksTakenHistory.length; i++) {
      const el = this.drinksTakenHistory[i];
      if (el.givenBy !== giverName) continue

      const takenByName = el.takenBy
      givenByGamePerPlayer[takenByName]++

      for (let k = 0; k < this.players.length; k++) {
        if (this.players[k].name === giverName) continue;

        const name = this.players[k].name;
        const nameStreak = name + "Streak"
        const nameStreakMax = nameStreak + "Max"

        if (name === takenByName) {
          givenByGamePerPlayer[nameStreak]++
        } else {
          givenByGamePerPlayer[nameStreak] = 0
        }
        if (givenByGamePerPlayer[nameStreak] > givenByGamePerPlayer[nameStreakMax]) givenByGamePerPlayer[nameStreakMax] = givenByGamePerPlayer[nameStreak]
      }
    }
    return givenByGamePerPlayer;
  }
}

function run(game) {
  // Handle Round and Turn Calculation
  if (game.round <= 4) {
    game.turnCount += 1
    if (game.turnCount > game.turnsPerRound) {
      game.round += 1
      game.turnCount = 1
    }
  } else {
    game.round += 1
    game.turnCount = 1
  }


  // ********  DEV ONLY  ******** //
  if (game.round === 7) {
    game.drinksGivenHistory = [
      {
        "takenBy": "victoria",
        "givenBy": "marc",
        "round": 1
      },
      {
        "takenBy": "victoria",
        "givenBy": "game",
        "round": 1
      },
      {
        "takenBy": "j",
        "givenBy": "game",
        "round": 1
      },
      {
        "takenBy": "marc",
        "givenBy": "game",
        "round": 2
      },
      {
        "takenBy": "marc",
        "givenBy": "game",
        "round": 2
      },
      {
        "takenBy": "victoria",
        "givenBy": "game",
        "round": 2
      },
      {
        "takenBy": "victoria",
        "givenBy": "game",
        "round": 2
      },
      {
        "takenBy": "j",
        "givenBy": "game",
        "round": 2
      },
      {
        "takenBy": "j",
        "givenBy": "game",
        "round": 2
      },
      {
        "takenBy": "victoria",
        "givenBy": "marc",
        "round": 3
      },
      {
        "takenBy": "victoria",
        "givenBy": "marc",
        "round": 3
      },
      {
        "takenBy": "j",
        "givenBy": "marc",
        "round": 3
      },
      {
        "takenBy": "victoria",
        "givenBy": "game",
        "round": 3
      },
      {
        "takenBy": "victoria",
        "givenBy": "game",
        "round": 3
      },
      {
        "takenBy": "victoria",
        "givenBy": "game",
        "round": 3
      },
      {
        "takenBy": "marc",
        "givenBy": "j",
        "round": 3
      },
      {
        "takenBy": "victoria",
        "givenBy": "j",
        "round": 3
      },
      {
        "takenBy": "victoria",
        "givenBy": "j",
        "round": 3
      },
      {
        "takenBy": "victoria",
        "givenBy": "marc",
        "round": 4
      },
      {
        "takenBy": "victoria",
        "givenBy": "marc",
        "round": 4
      },
      {
        "takenBy": "j",
        "givenBy": "marc",
        "round": 4
      },
      {
        "takenBy": "j",
        "givenBy": "marc",
        "round": 4
      },
      {
        "takenBy": "marc",
        "givenBy": "victoria",
        "round": 4
      },
      {
        "takenBy": "marc",
        "givenBy": "victoria",
        "round": 4
      },
      {
        "takenBy": "marc",
        "givenBy": "victoria",
        "round": 4
      },
      {
        "takenBy": "marc",
        "givenBy": "victoria",
        "round": 4
      },
      {
        "takenBy": "j",
        "givenBy": "game",
        "round": 4
      },
      {
        "takenBy": "j",
        "givenBy": "game",
        "round": 4
      },
      {
        "takenBy": "j",
        "givenBy": "game",
        "round": 4
      },
      {
        "takenBy": "j",
        "givenBy": "game",
        "round": 4
      },
      {
        "takenBy": "j",
        "givenBy": "marc",
        "round": 5
      },
      {
        "takenBy": "j",
        "givenBy": "marc",
        "round": 5
      },
      {
        "takenBy": "j",
        "givenBy": "marc",
        "round": 5
      },
      {
        "takenBy": "j",
        "givenBy": "marc",
        "round": 5
      },
      {
        "takenBy": "j",
        "givenBy": "marc",
        "round": 5
      },
      {
        "takenBy": "j",
        "givenBy": "victoria",
        "round": 5
      },
      {
        "takenBy": "j",
        "givenBy": "victoria",
        "round": 5
      },
      {
        "takenBy": "j",
        "givenBy": "victoria",
        "round": 5
      },
      {
        "takenBy": "j",
        "givenBy": "victoria",
        "round": 5
      },
      {
        "takenBy": "j",
        "givenBy": "victoria",
        "round": 5
      }
    ]
    game.drinksTakenHistory = game.drinksGivenHistory
    game.showGameOver()
    return
  }
  // ******** END DEV ONLY ******** //


  // Draw Players and Hands
  showPlayersAndHands(game)

  // Draw Title
  showRoundTitle(game)

  // Show prompts
  showPrompts(game)
}

function dealCards(userValue, game) {
  const numCardsToDeal = game.ROUND_DATA[game.round - 1].numCardsToDeal
  const cards = game.deck.deal(numCardsToDeal)
  const isCorrect = game.ROUND_DATA[game.round - 1].logicFn(userValue, cards, game)

  const currentPlayer = game.players[game.turnCount - 1]
  if (numCardsToDeal === 1) currentPlayer.addCardsTohand(cards)

  showCards(cards)
  showDrinks(isCorrect, currentPlayer, game)
}

function drawCard(card, cardArea, container = 'div') {
  const royalty = ["a", "k", "q", "j"]
  const cardDiv = document.createElement(container)
  let lowerSuit = card.suit.toLowerCase()
  lowerSuit = lowerSuit === "diamonds" ? "diams" : lowerSuit;
  let rank = card.rank
  const classNames = 'card rank-' + rank + " " + lowerSuit
  cardDiv.setAttribute('class', classNames)

  const numSpan = document.createElement("span")
  numSpan.setAttribute('class', 'rank')
  const rankText = royalty.includes(rank) ? rank.toUpperCase() : rank;
  const numText = document.createTextNode(rankText)
  numSpan.appendChild(numText)

  const suitSpan = document.createElement("span")
  suitSpan.setAttribute('class', 'suit')
  suitSpan.innerHTML = "&" + lowerSuit + ";"

  cardDiv.appendChild(numSpan)
  cardDiv.appendChild(suitSpan)
  cardArea.appendChild(cardDiv)
}

function showCards(cards) {
  var cardArea = document.getElementById("card-area")
  cardArea.innerHTML = ""

  for (let i = 0; i < cards.length; i++) {
    drawCard(cards[i], cardArea)
  }
}

function showDrinks(isCorrect, currentPlayer, game, txt = undefined) {
  let text = txt
  if (txt === undefined) {
    const roundInfo = game.ROUND_DATA[game.round - 1]
    const giveOrTake = isCorrect ? " give " : " take "
    const drinkPlural = roundInfo.number === 1 ? " drink" : " drinks"
    text = currentPlayer.name + giveOrTake + roundInfo.number + drinkPlural
  }
  const drinkAmt = game.ROUND_DATA[game.round - 1].number

  var drinkArea = document.getElementById("drinks-area")
  drinkArea.innerHTML = ""

  const drinkHeader = document.createElement("h3")
  const drinkText = document.createTextNode(text)
  drinkHeader.appendChild(drinkText)
  drinkArea.appendChild(drinkHeader)

  var btn = document.createElement('button');
  btn.innerHTML = 'Next Turn'

  drinkArea.appendChild(btn);
  btn.addEventListener("click", () => {
    const shouldContinue = game.finalizeDrinks(currentPlayer.name)
    if (shouldContinue) {
      document.getElementById("prompt-area").innerHTML = ""
      document.getElementById("card-area").innerHTML = ""
      document.getElementById("drinks-area").innerHTML = ""
      run(game)
    }
  });

  if (isCorrect) {
    handOutDrinks(game, currentPlayer, drinkAmt, drinkArea)
  } else {
    currentPlayer.takeDrink(drinkAmt)
    drinkArr = Array(drinkAmt).fill({
      takenBy: currentPlayer.name,
      givenBy: 'game',
      round: game.round
    })
    game.drinksTakenHistory = game.drinksTakenHistory.concat(drinkArr)
  }
}

function handOutDrinks(game, currentPlayer, drinkAmt, drinkArea) {
  game.updateTotalNeeded(drinkAmt)

  var colDiv = document.createElement("div");
  colDiv.classList.add('math-col')

  for (let i = 0; i < game.players.length; i++) {
    const playerName = game.players[i].name
    if (playerName === currentPlayer.name) continue;
    var wrapperDiv = document.createElement("div");
    wrapperDiv.classList.add('math-row')

    var txtHolder = document.createElement("h4");
    txtHolder.setAttribute('id', playerName)
    var playerDrinkTxt = document.createTextNode(playerName + " takes " + game.currentDrinkCount(playerName));
    txtHolder.appendChild(playerDrinkTxt)

    var addBtn = document.createElement("button");
    addBtn.classList.add('math-button')
    var addBtnSpan = document.createElement('span')
    addBtnSpan.innerHTML = '+'
    addBtn.appendChild(addBtnSpan)
    addBtn.addEventListener("click", (e) => {
      if (e.preventDefault) e.preventDefault();
      game.addToDrinkCount(playerName, function (newNum) {
        var txtHolder = document.getElementById(playerName)
        const newText = playerName + " takes " + newNum

        txtHolder.innerText = newText
      })
      return false
    });

    var removeBtn = document.createElement("button");
    removeBtn.classList.add('math-button')
    var removeBtnSpan = document.createElement('span')
    removeBtnSpan.innerHTML = '-'
    removeBtn.appendChild(removeBtnSpan)
    removeBtn.addEventListener("click", (e) => {
      if (e.preventDefault) e.preventDefault();
      game.removeFromDrinkCount(playerName, (newNum) => {
        var txtHolder = document.getElementById(playerName)
        txtHolder.innerText = playerName + " takes " + newNum
      })
      return false;
    });

    wrapperDiv.appendChild(addBtn)
    wrapperDiv.appendChild(removeBtn)
    wrapperDiv.appendChild(txtHolder)
    colDiv.appendChild(wrapperDiv)
  }
  drinkArea.appendChild(colDiv)
}

function poker(game) {
  for (let i = 0; i < game.players.length; i++) {
    const player = game.players[i];
    const card = game.deck.deal(1)
    player.addCardsTohand(card)
  }
  showPlayersAndHands(game)
  var drinkArea = document.getElementById("drinks-area")
  drinkArea.innerHTML = ""

  const drinkHeader = document.createElement("h3")
  const drinkText = document.createTextNode("Poker Winner(s) give 5 drinks")
  drinkHeader.appendChild(drinkText)
  drinkArea.appendChild(drinkHeader)

  var promptForm = document.createElement("form");
  const question = document.createElement("h4")
  const questionText = document.createTextNode("Who won?")
  question.appendChild(questionText)
  promptForm.appendChild(question)

  var wrapperDiv = document.createElement("div");
  wrapperDiv.classList.add('checkbox-toolbar')
  const names = []
  for (let i = 0; i < game.players.length; i++) {
    const playerName = game.players[i].name
    names.push(playerName)

    var checkbox = document.createElement("input");
    checkbox.type = "checkbox"
    checkbox.id = playerName;
    checkbox.value = playerName;
    checkbox.name = playerName

    var label = document.createElement("label");
    label.htmlFor = playerName;
    var labelText = document.createTextNode(playerName);
    label.appendChild(labelText)

    wrapperDiv.appendChild(checkbox)
    wrapperDiv.appendChild(label)
  }
  promptForm.appendChild(wrapperDiv)

  var btn = document.createElement('button');
  btn.classList.add('submit-button')
  var btnSpan = document.createElement('span')
  btnSpan.innerHTML = 'Submit'
  btn.appendChild(btnSpan)

  promptForm.appendChild(btn);
  var selectedNames = []
  btn.addEventListener("click", (e) => {
    if (e.preventDefault) e.preventDefault();

    var radios = []
    for (let i = 0; i < names.length; i++) {
      radios.push(document.getElementById(names[i]));
    }
    for (let j = 0; j < radios.length; j++) {
      if (radios[j].checked) {
        selectedNames.push(radios[j].value)
        btn.remove()
        game.showPokerDrinks(selectedNames)
      }
    }
    // Handle Selected Names
    return false;
  });
  drinkArea.appendChild(promptForm)
}

function bus(game) {
  const tableArea = document.getElementById('header-container')
  tableArea.innerHTML = ''

  const busArea = document.getElementById('bus-area')
  busArea.setAttribute('style', 'display: flex;')

  const divider = document.getElementById('divider')
  divider.setAttribute('style', 'display: block;')

  const busLeft = document.getElementById('bus-left')
  const busMidTop = document.getElementById('bus-mid-top')
  const busMidBottom = document.getElementById('bus-mid-bottom')
  const busRight = document.getElementById('bus-right')

  createCardBack(busLeft, game, 'take-5')
  let giveCount = 1
  let takeCount = 4
  for (let i = 1; i < 9; i++) {
    const isEven = i % 2 === 0
    let container = busMidTop
    let id = 'give-' + giveCount
    if (isEven) {
      container = busMidBottom
      id = 'take-' + takeCount
    }
    createCardBack(container, game, id)
    if (isEven) {
      giveCount++
      takeCount--
    }
  }
  createCardBack(busRight, game, 'give-5')
}

function createCardBack(container, game, id) {
  const div = document.createElement("div")
  div.setAttribute('id', id)
  const ast = document.createTextNode("*")
  div.appendChild(ast)
  div.classList.add("card", "back")
  container.appendChild(div)
  div.addEventListener("click", (e) => {
    if (e.preventDefault) e.preventDefault();
    cardClicked(div, game)
  })
}

function cardClicked(blankCard, game) {
  if (!blankCard.classList.contains('back')) return
  if (game.busOrder[game.busIndex] !== blankCard.id) return
  if (!game.busIsClickable) return

  game.busIndex++
  game.busIsClickable = false

  const card = game.deck.deal(1)[0]
  dealAndDrawBusCard(blankCard, card)

  checkPlayersHandsAndContinue(game, blankCard, card)
}

function dealAndDrawBusCard(blankCard, card) {
  const royalty = ["a", "k", "q", "j"]

  let suit = card.suit.toLowerCase()
  suit = suit === "diamonds" ? "diams" : suit;
  let rank = card.rank
  const rankText = royalty.includes(rank) ? rank.toUpperCase() : rank;

  removeAllChildNodes(blankCard)
  blankCard.className = ""
  blankCard.classList.add('card', 'rank-' + rank, suit)

  const numSpan = document.createElement("span")
  numSpan.setAttribute('class', 'rank')

  const numText = document.createTextNode(rankText)
  numSpan.appendChild(numText)

  const suitSpan = document.createElement("span")
  suitSpan.setAttribute('class', 'suit')
  suitSpan.innerHTML = "&" + suit + ";"

  blankCard.appendChild(numSpan)
  blankCard.appendChild(suitSpan)
}

function checkPlayersHandsAndContinue(game, blankCard, card) {
  // Check each player's hand for matching rank
  let shouldDealAnother = true;
  for (let i = 0; i < game.players.length; i++) {
    const player = game.players[i];
    const hand = player.hand;
    for (let h = 0; h < hand.length; h++) {
      const cardInHand = hand[h];
      if (cardInHand.rank === card.rank) {
        shouldDealAnother = false;
        game.addToBusCards(cardInHand, player)
      }
    }
  }

  if (shouldDealAnother) {
    // If none matching, show button to deal another card
    const busPromptArea = document.getElementById('bus-prompt-area')
    busPromptArea.innerHTML = ""

    const text = "No Matches. Click to deal another card."
    const header = document.createElement("h3")
    const headerText = document.createTextNode(text)
    header.appendChild(headerText)
    busPromptArea.appendChild(header)

    var dealBtn = document.createElement('button');
    dealBtn.innerHTML = 'Deal'

    busPromptArea.appendChild(dealBtn);
    dealBtn.addEventListener("click", (e) => {
      if (e.preventDefault) e.preventDefault();
      const newCard = game.deck.deal(1)[0]
      dealAndDrawBusCard(blankCard, newCard)
      checkPlayersHandsAndContinue(game, blankCard, newCard)
      return false;
    });
    return;
  }
  // For each matching, show prompt to move card then set vals to allow next card to be clicked
  game.handleBusCards()
}

function removeAllChildNodes(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}

function showPrompts(game) {
  const options = game.ROUND_DATA[game.round - 1].options
  const title = game.ROUND_DATA[game.round - 1].title
  if (options === undefined) {
    if (game.ROUND_DATA[game.round - 1].number === 5) poker(game)
    if (game.ROUND_DATA[game.round - 1].number === 6) bus(game)
    return
  };

  // Get element with id prompt-area
  var area = document.getElementById("prompt-area")
  area.innerHTML = ""

  // Add form
  var promptForm = document.createElement("form");
  var wrapperDiv = document.createElement("div");
  wrapperDiv.classList.add('radio-toolbar')
  for (let i = 0; i < options.length; i++) {
    var radio = document.createElement("input");
    radio.type = "radio"
    radio.id = options[i];
    radio.value = options[i];
    radio.name = title

    var label = document.createElement("label");
    label.htmlFor = options[i];
    var labelText = document.createTextNode(options[i]);
    label.appendChild(labelText)

    wrapperDiv.appendChild(radio)
    wrapperDiv.appendChild(label)
  }
  promptForm.appendChild(wrapperDiv)

  var btn = document.createElement('button');
  btn.classList.add('submit-button')
  var btnSpan = document.createElement('span')
  btnSpan.innerHTML = 'Submit'
  btn.appendChild(btnSpan)

  promptForm.appendChild(btn);
  btn.addEventListener("click", (e) => {
    if (e.preventDefault) e.preventDefault();

    var radios = document.getElementsByName(title);
    for (let j = 0; j < radios.length; j++) {
      if (radios[j].checked) {
        dealCards(radios[j].value, game)
        btn.remove()
        break;
      }
    }
    return false;
  });
  area.appendChild(promptForm)
}

function showRoundTitle(game) {
  // Set the Round Number
  document.getElementById("round-number").innerText = "Round " + game.round

  // Build the question/title with player name
  const name = game.players[game.turnCount - 1].name
  const title = game.ROUND_DATA[game.round - 1].title
  const number = game.ROUND_DATA[game.round - 1].number
  const text = number < 5 ? name + ", " + title : title
  document.getElementById("round-title").innerText = text
}

function showPlayersAndHands(game) {
  let count = 1
  for (let i = 0; i < game.players.length; i++) {
    var div = document.getElementById("player-div-" + count)
    div.innerHTML = ""

    count = count < PLAYER_LIMIT ? count + 1 : 1
    const player = game.players[i];
    var row = document.createElement("div");

    var nameData = document.createElement("h3");
    var name = document.createTextNode(player.name);
    nameData.appendChild(name);

    var cardData = document.createElement("div");
    cardData.setAttribute('class', 'player-hand')

    var ul = document.createElement("ul");
    ul.setAttribute('class', 'hand rotateHand')

    for (let j = 0; j < player.hand.length; j++) {
      const card = player.hand[j];
      const item = document.createElement('li')
      drawCard(card, item, "a")
      ul.appendChild(item)
    }
    cardData.appendChild(ul);

    row.appendChild(nameData)
    row.appendChild(cardData)

    div.appendChild(row)
  }
}

function showStatistics(game) {
  let count = 1
  let extraStats = []
  for (let i = 0; i < game.players.length; i++) {
    var div = document.getElementById("player-div-" + count)
    div.innerHTML = ""

    count = count < PLAYER_LIMIT ? count + 1 : 1
    const player = game.players[i];
    var row = document.createElement("div");

    var nameData = document.createElement("h3");
    var name = document.createTextNode(player.name);
    nameData.appendChild(name);

    var statsData = game.generateStats(player.name)
    console.log('Name: ' + player.name)
    console.log('statsData.gameGivenStats', statsData.gameGivenStats)
    console.log('statsData.playerSpecificStats', statsData.playerSpecificStats)
    var totalGivenData = document.createElement("p");
    var totalGiven = document.createTextNode(`Gave out: ${statsData.totalGiven}`);
    totalGivenData.appendChild(totalGiven)

    var totalTakenData = document.createElement("p");
    var totalTaken = document.createTextNode(`Took: ${statsData.totalTaken}`);
    totalTakenData.appendChild(totalTaken)

    var givenStreakData = document.createElement("p");
    var givenStreak = document.createTextNode(`Max Given Streak: ${statsData.givenStreak}`);
    givenStreakData.appendChild(givenStreak)

    var takenStreakData = document.createElement("p");
    var takenStreak = document.createTextNode(`Max Taken Streak: ${statsData.takenStreak}`);
    takenStreakData.appendChild(takenStreak)

    var gameGivenTotalData = document.createElement("p");
    var gameGivenTotal = document.createTextNode(`The Game gave you: ${statsData.gameGivenStats[player.name]}`);
    gameGivenTotalData.appendChild(gameGivenTotal)

    var gameGivenStreakData = document.createElement("p");
    var gameGivenStreak = document.createTextNode(`Max Game Given Streak: ${statsData.gameGivenStats[player.name + "StreakMax"]}`);
    gameGivenStreakData.appendChild(gameGivenStreak)

    row.appendChild(nameData)
    row.appendChild(totalGivenData)
    row.appendChild(totalTakenData)
    row.appendChild(givenStreakData)
    row.appendChild(takenStreakData)
    row.appendChild(gameGivenTotalData)
    row.appendChild(gameGivenStreakData)

    for (let k = 0; k < game.players.length; k++) {
      const name = game.players[k].name
      if (name === player.name) continue

      const data = statsData.playerSpecificStats

      var specTotal = document.createElement('p')
      var specTotalText = document.createTextNode(player.name + " gave " + name + " a total of " + data[name] + " with a max streak of " + data[name + "StreakMax"] + " in a row")
      specTotal.appendChild(specTotalText)
      extraStats.push(specTotal)
    }

    div.appendChild(row)
  }

  return extraStats;
}

function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

function gotRedOrBlackRight(userVal, cardsDealt, game) {
  if (userVal === cardsDealt[0].color) {
    return true
  }
  return false
}

function gotHigherOrLowerRight(userVal, cardsDealt, game) {
  const card = cardsDealt[0];
  const cardInHand = game.players[game.turnCount - 1].hand[0]
  const higherCorrect = userVal === "Higher" && cardInHand.value < card.value
  const lowerCorrect = userVal === "Lower" && cardInHand.value > card.value
  const sameCorrect = userVal === "Same" && cardInHand.value === card.value

  return higherCorrect || lowerCorrect || sameCorrect
}

function gotInsideOutsideRight(userVal, cardsDealt, game) {
  const card = cardsDealt[0];
  const hand = game.players[game.turnCount - 1].hand
  const sortedHand = hand[0].value < hand[1].value ? hand : [hand[1], hand[0]]

  const insideCorrect = userVal === "Inside" && sortedHand[0].value < card.value && sortedHand[1].value > card.value
  const outsideCorrect = userVal === "Outside" && !(sortedHand[0].value <= card.value && sortedHand[1].value >= card.value)

  return insideCorrect || outsideCorrect
}

function gotSuitRight(userVal, cardsDealt, game) {
  const card = cardsDealt[0];
  return userVal === card.suit
}