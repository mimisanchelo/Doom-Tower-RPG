'use strict'

function notify() {
  let notification1 = document.querySelector('.not1')
  let notification2 = document.querySelector('.not2')

  notification1.classList.add('shown')
  setTimeout(function () {
    notification1.classList.remove('shown')
  }, 1500)

  notification2.classList.add('shown')
  setTimeout(function () {
    notification2.classList.remove('shown')
  }, 1500)
}

function questionMenu() {
  const questionTab = document.querySelector('.question__tab')
  const questionSign = document.querySelector('.question')

  questionSign.addEventListener('click', function () {
    questionTab.classList.toggle('showQuestionTab')
  })
}
