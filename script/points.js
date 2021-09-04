const playerLvlUp = function () {
  const btnDecrease = document.querySelectorAll('.decrease')
  const btnIncrease = document.querySelectorAll('.increase')

  for (let i = 0; i < btnIncrease.length; i++) {
    let btnIncr = btnIncrease[i]
    btnIncr.addEventListener('click', function (e) {
      let plusClicked = e.target
      let input = plusClicked.parentElement.children[1]
      let inputValue = input.value

      let newValue = parseInt(inputValue) + 1
      input.value = newValue

      if (input.value <= 20) {
        input.value
      } else {
        input.value = 20
      }
      totalPoints()
    })
  }
  for (let i = 0; i < btnDecrease.length; i++) {
    let btnDecr = btnDecrease[i]
    btnDecr.addEventListener('click', function (e) {
      let minusClicked = e.target
      let input = minusClicked.parentElement.children[1]
      let inputValue = input.value
      let newValue = parseInt(inputValue) - 1

      input.value = newValue

      if (input.value >= 0) {
        input.value
      } else {
        input.value = 0
      }
      totalPoints()
    })
  }
  availablePointsCheck()
  totalPoints()
}

let leftovers = [0]

const totalPoints = function () {
  const statsInput = document.querySelectorAll('.number-input')
  const btnIncrease = document.querySelectorAll('.increase')

  let total = 10 + Number(leftovers[leftovers.length - 1])

  for (let i = 0; i < statsInput.length; i++) {
    if (total > 0) {
      total -= parseInt(statsInput[i].value)
    } else if (total <= 0) {
      total = 0
    }
  }
  if (total > 0) {
    btnIncrease.forEach(function (btn) {
      btn.disabled = false
    })
  } else {
    btnIncrease.forEach(function (btn) {
      btn.disabled = true
    })
  }
  document.getElementById('totalN').value = total
}

let availablePointsCheck = function () {
  let stats = document.getElementById('totalN')
  const btnLvl = document.querySelector('.btn__lvl')
  btnLvl.addEventListener('click', function () {
    leftovers.push(stats.value)
  })
}
