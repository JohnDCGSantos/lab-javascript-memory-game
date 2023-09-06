class MemoryGame {
  constructor(cards) {
    this.cards = cards
    this.pickedCards = []
    this.pairsClicked = 0
    this.pairsGuessed = 0
    this.shuffleCards()
  }

  shuffleCards() {
    if (!this.cards) {
      return undefined
    }
    for (let i = this.cards.length - 1; i > 0; i--) {
      const randomIndex = Math.floor(Math.random() * (i + 1))
      ;[this.cards[i], this.cards[randomIndex]] = [this.cards[randomIndex], this.cards[i]]
    }
  }

  checkIfPair(card1, card2) {
    this.pairsClicked++

    if (card1 === card2) {
      this.pairsGuessed++
      return true
    } else {
      return false
    }
  }

  checkIfFinished() {
    if (this.pairsGuessed === this.cards.length / 2) {
      console.log(this.pairsGuessed, this.cards.length / 2)
      return true
    } else {
      return false
    }
  }

  reset() {
    this.pickedCards = []
    this.pairsClicked = 0
    this.pairsGuessed = 0
    this.shuffleCards()
    this.render()
  }

  render() {
    let html = ''
    this.cards.forEach(pic => {
      html += `
        <div class="card" data-card-name="${pic.name}">
          <div class="back" name="${pic.img}"></div>
          <div class="front" style="background: url(img/${pic.img}) no-repeat"></div>
        </div>
      `
    })
    document.querySelector('#memory-board').innerHTML = html
  }
}
