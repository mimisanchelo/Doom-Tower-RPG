'use strict'

function notify() {
  let notification1 = document.querySelector('.not1')
  let notification2 = document.querySelector('.not2')

  notification1.classList.add('shown')
  setTimeout(function () {
    notification1.classList.remove('shown')
  }, 2000)

  notification2.classList.add('shown')
  setTimeout(function () {
    notification2.classList.remove('shown')
  }, 2000)
}

function questionMenu() {
  const questionTab = document.querySelector('.question__tab')
  const questionSign = document.querySelector('.question')

  questionSign.addEventListener('click', function () {
    questionTab.classList.toggle('showQuestionTab')
  })
}

function startGame() {
  const btnStartGame = document.querySelector('.btn__startGame')
  const banner = document.querySelector('.banner')
  const bannerInfo = document.querySelector('.banner__info')
  const bannerName = document.querySelector('.banner__name')
  const getInterface = document.querySelector('.interface')
  const getHeader = document.querySelector('.header')

  btnStartGame.addEventListener('click', function () {
    banner.classList.add('close')
    bannerInfo.classList.add('close-info')
    bannerName.remove()

    getInterface.classList.add('show-interface')
    getHeader.classList.add('show-interface')
  })
}
startGame()

function DOMisLoaded() {
  const playerImg = document.querySelector('.player-img')
  const bannerBottom = document.querySelector('.banner-bottom')
  const bannerHeader = document.querySelector('.banner__header')

  window.addEventListener('DOMContentLoaded', function () {
    playerImg.classList.add('show-player')
    bannerBottom.classList.add('show-bottom')
    bannerHeader.classList.add('show-header')
  })
}
DOMisLoaded()

function result() {
  const result = document.querySelector('.result')
  const resultMessage = document.querySelector('.result_message')
  const btnCounter = document.querySelector('.btn__counter')

  result.classList.remove('hidden')

  if (enemy.health <= 0) {
    resultMessage.innerHTML =
      '<h1>You Win!</h1><h3>Move to the next floor! Quickly!</h3><button class="btn__next btn" onclick="gameManager.staircase()"><img class="abilityImg" src="img/skills/stairs.svg" alt="">Next floor</button>'
  }
  if (player.health <= 0) {
    if (
      player.classType == 'Warrior' &&
      moves[moves.length - 1] == btnCounter
    ) {
      resultMessage.innerHTML =
        '<h1>You lose!</h1><h3>Enemy`s hit was stronger than you possible could blocked</h3><button class="btn__goback btn" onclick="gameManager.resetPlayer()"><img class="abilityImg" src="img/skills/player-next.svg" alt="" />Back to heroes</button>'
    } else {
      resultMessage.innerHTML =
        '<h1>You lose!</h1><button class="btn__goback btn" onclick="gameManager.resetPlayer()"><img class="abilityImg" src="img/skills/player-next.svg" alt="" />Back to heroes</button>'
    }
  }
}
