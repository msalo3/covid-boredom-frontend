const load = () => {
  var gameSetup = new GameSetup()
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
}

class GameSetup {
  constructor(players = []) {
    this.players = players
  }

  addPlayer(newName) {
    if (this.players.length === 4) {
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
      var para = document.createElement("p");
      var node = document.createTextNode(name);
      para.appendChild(node);

      var button = document.createElement('button');
      button.innerHTML = 'Remove Player'

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
    this.round = 1
    this.turnsPerRound = players.length
    this.turnCount = 0
    this.deck = this.fillRegularDeck()
    this.deck.shuffle()
    this.busOrder = this.BUS_ORDER
    this.busIndex = 0
    this.busIsClickable = true
    this.busCardsToMove = []
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

        takeBtn.remove()
        busPromptArea.innerHTML = ""
        this.busCardsToMove = [...this.busCardsToMove.slice(1, this.busCardsToMove.length)]
        this.handleBusCards()
        return false;
      });
    } else {
      this.drawBusCardHeader(true, busPromptArea, data)

      var promptForm = document.createElement("form");
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

        var br = document.createElement("br");

        promptForm.appendChild(radio)
        promptForm.appendChild(label)
        promptForm.appendChild(br)
      }

      var btn = document.createElement('button');
      btn.innerHTML = 'Submit'

      promptForm.appendChild(btn);
      btn.addEventListener("click", (e) => {
        if (e.preventDefault) e.preventDefault();

        var radios = document.getElementsByName("players");
        for (let j = 0; j < radios.length; j++) {
          if (radios[j].checked) {
            data.owner.removeCardsFromHand([card])
            const newOwner = this.players.find((p) => p.name === radios[j].value)
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

  showGameOver() {
    const busArea = document.getElementById('bus-area')
    busArea.innerHTML = ''

    const gameOverArea = document.getElementById('game-over-area')
    gameOverArea.setAttribute('style', 'display: block;')
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
    document.getElementById("prompt-area").innerHTML = ""
    document.getElementById("card-area").innerHTML = ""
    document.getElementById("drinks-area").innerHTML = ""
    run(game)
  });
}

function poker(game) {
  for (let i = 0; i < game.players.length; i++) {
    const player = game.players[i];
    const card = game.deck.deal(1)
    player.addCardsTohand(card)
  }
  showPlayersAndHands(game)
  const text = "Poker Winner(s) give 5 drinks"
  showDrinks(null, null, game, text)
}

function bus(game) {
  const busArea = document.getElementById('bus-area')
  busArea.setAttribute('style', 'display: block;')

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

    var br = document.createElement("br");

    promptForm.appendChild(radio)
    promptForm.appendChild(label)
    promptForm.appendChild(br)
  }

  var btn = document.createElement('button');
  btn.innerHTML = 'Submit'

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

    count = count < 4 ? count + 1 : 1
    const player = game.players[i];
    var row = document.createElement("div");

    var nameData = document.createElement("h3");
    var name = document.createTextNode(player.name);
    nameData.appendChild(name);

    var cardData = document.createElement("div");

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
  const outsideCorrect = userVal === "Outside" && !(sortedHand[0].value < card.value && sortedHand[1].value > card.value)

  return insideCorrect || outsideCorrect
}

function gotSuitRight(userVal, cardsDealt, game) {
  const card = cardsDealt[0];
  return userVal === card.suit
}