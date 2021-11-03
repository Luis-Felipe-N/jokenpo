const btns = document.querySelectorAll('[data-id]')
const pointElement = document.querySelector('[data-js="point"]')
const fisrtStep = document.querySelector('[data-js="fisrtStep"]')
const secondStep = document.querySelector('[data-js="secondStep"]')
const containerBtnComputer  = document.querySelector('[data-js="containerBtnComputer"]')
const containerBtnUser  = document.querySelector('[data-js="containerBtnUser"]')
const containerToBackHome = document.querySelector('[data-js="toBackHome"]')
const message = document.querySelector('[data-js="message"]')
const btnPlayAgain = document.querySelector('[data-js="btnPlayAgain"]')

const options = [ 'paper', 'scissors', 'rock' ]
let point = 0

function toggleShowOptionsToBack() {
    containerToBackHome.classList.toggle('show')
}

function createNewButton( tagName, className, option ) {
    const element = document.createElement(tagName)
    element.classList.add( className )

    const img = document.createElement('img')
    img.src = `/images/icon-${options[option]}.svg`

    element.appendChild(img)
    return element
}

function appendButtonUser(option) {
    const buttonUser = createNewButton('button', `btn${options[option]}`, option) 
    containerBtnUser.replaceChildren(buttonUser)
}

function appendButtonComputer(option) {
    const buttonComputer = createNewButton('button', `btn${options[option]}`, option) 
    console.log(buttonComputer)
    containerBtnComputer.replaceChildren(buttonComputer)
}

function showWhoWin( userOptions, computerOptions, userWon ) {
    fisrtStep.classList.remove('show')
    secondStep.classList.add('show')

    appendButtonUser(userOptions)
    setTimeout(() => {
        appendButtonComputer(computerOptions)

        console.log(userWon)
        if ( userWon === 'empate' ) {
            message.innerHTML = 'Deu empate'
            toggleShowOptionsToBack()
            return 
        }

        if ( userWon ) {
            message.innerHTML = 'Você ganhou'
            btnPlayAgain.classList.remove('lose')
            point++
        } else {
            message.innerHTML = 'Você perdeu'
            btnPlayAgain.classList.add('lose')
            point--
        }

        updatePoint()

        toggleShowOptionsToBack()
    }, 500);

    
}

function updatePoint() {
    pointElement.innerHTML = point
}

function verifyWhoWin( userOptions, computerOptions ) {

    if ( userOptions === 0 ) { // papel
        if ( computerOptions === 0 ) {
            return 'empate'
        } else if ( computerOptions === 1 ) {
            return false
        } else {
            return true
        }
    } 
    
    if ( userOptions === 1 ) { // tesoura 
        if ( computerOptions === 0 ) {
            return true
        } else if ( computerOptions === 1 ) {
            return 'empate'
        } else {
            return false
        }
    } else { // pedra
        if ( computerOptions === 0 ) {
            return false
        } else if ( computerOptions === 1 ) {
            return true
        } else {
            return 'empate'
        }
    }
}

const getUserOptions = ( button ) => Number(button.getAttribute('data-id'))

function handleClick () {
    const userOptions = getUserOptions( this )
    const computerOptions = Math.floor( Math.random() * 3 )

    const userWon = verifyWhoWin( userOptions, computerOptions )
    showWhoWin( userOptions, computerOptions, userWon )
}

btns.forEach( btn => {
    btn.addEventListener('click', handleClick)
})

btnPlayAgain.addEventListener('click', () => {
    fisrtStep.classList.add('show')
    secondStep.classList.remove('show')
    toggleShowOptionsToBack()
    containerBtnComputer.innerHTML = ''
})