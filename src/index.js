const cards = [
  { name: 'aquaman', img: 'aquaman.jpg' },
  { name: 'batman', img: 'batman.jpg' },
  { name: 'captain america', img: 'captain-america.jpg' },
  { name: 'fantastic four', img: 'fantastic-four.jpg' },
  { name: 'flash', img: 'flash.jpg' },
  { name: 'green arrow', img: 'green-arrow.jpg' },
  { name: 'green lantern', img: 'green-lantern.jpg' },
  { name: 'ironman', img: 'ironman.jpg' },
  { name: 'spiderman', img: 'spiderman.jpg' },
  { name: 'superman', img: 'superman.jpg' },
  { name: 'the avengers', img: 'the-avengers.jpg' },
  { name: 'thor', img: 'thor.jpg' },
  { name: 'aquaman', img: 'aquaman.jpg' },
  { name: 'batman', img: 'batman.jpg' },
  { name: 'captain america', img: 'captain-america.jpg' },
  { name: 'fantastic four', img: 'fantastic-four.jpg' },
  { name: 'flash', img: 'flash.jpg' },
  { name: 'green arrow', img: 'green-arrow.jpg' },
  { name: 'green lantern', img: 'green-lantern.jpg' },
  { name: 'ironman', img: 'ironman.jpg' },
  { name: 'spiderman', img: 'spiderman.jpg' },
  { name: 'superman', img: 'superman.jpg' },
  { name: 'the avengers', img: 'the-avengers.jpg' },
  { name: 'thor', img: 'thor.jpg' },
]

const memoryGame = new MemoryGame(cards)
const restartBtn = document.createElement('button')
restartBtn.textContent = 'Restart Game'
document.querySelector('#memory-board').appendChild(restartBtn)

window.addEventListener('load', event => {
  let html = ''

  memoryGame.cards.forEach(pic => {
    html += `
      <div class="card" data-card-name="${pic.name}">
        <div class="back" name="${pic.img}"></div>
        <div class="front" style="background: url(img/${pic.img}) no-repeat"></div>
      </div>
   `
  })

  // Add all the divs to the HTML
  document.querySelector('#memory-board').innerHTML = html
  function attachCardClickListeners() {
    // Bind the click event of each element to a function
    document.querySelectorAll('.card').forEach(card => {
      card.addEventListener('click', () => {
        console.log(`Card clicked: ${card}`)
        if (memoryGame.pickedCards.length < 2) {
          memoryGame.pickedCards.push(card)
          card.classList.add('turned')
          //memoryGame.pairsClicked++
        }
        setTimeout(() => {
          if (memoryGame.pickedCards.length === 2) {
            const isPair = memoryGame.checkIfPair(
              memoryGame.pickedCards[0].getAttribute('data-card-name'),
              memoryGame.pickedCards[1].getAttribute('data-card-name')
            )
            document.querySelector('#pairs-clicked').innerHTML = memoryGame.pairsClicked
            if (isPair) {
              memoryGame.pickedCards.shift()
              memoryGame.pickedCards.shift()
              //memoryGame.pairsGuessed++ alredy in pairsClicked on memory.js...if i use this line  will increment 2*
              document.querySelector('#pairs-guessed').innerHTML = memoryGame.pairsGuessed
            } else {
              memoryGame.pickedCards.forEach(card => {
                card.setAttribute('class', 'card')
                memoryGame.pickedCards = []
              })
            }
          }
          const didYouWin = memoryGame.checkIfFinished()
          console.log('did you win ', didYouWin)
          if (didYouWin) {
            document.querySelector('#memory-board').innerHTML = ''
            let h1 = document.createElement('h1')

            h1.style.color = 'pink'
            h1.innerHTML = 'YOU WON!!!'
            document.querySelector('#memory-board').appendChild(h1)
            document.querySelector('#memory-board').appendChild(restartBtn)
          }
        }, 1500)
      })
    })
  }
  function resetGame() {
    memoryGame.reset()
    document.querySelector('#pairs-clicked').innerHTML = '0'
    document.querySelector('#pairs-guessed').innerHTML = '0'
    document.querySelector('#memory-board').appendChild(restartBtn)
    attachCardClickListeners()
  }
  restartBtn.addEventListener('click', resetGame)
  resetGame()
  document.querySelector('#memory-board').appendChild(restartBtn)
})
