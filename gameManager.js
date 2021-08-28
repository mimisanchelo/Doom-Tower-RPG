let gameManager = {
  setGameStart: function (classType) {
    this.resetPlayer(classType)
    this.setPreFight()
  },

  resetPlayer: function (classType) {
    switch (classType) {
      case 'Warrior':
        player = new Player(classType, 1, 250, 0, 200, 10, 5, 92, 65)
        break
      case 'Druid':
        player = new Player(classType, 1, 225, 75, 100, 15, 100, 95, 50)
        break
      case 'Wizard':
        player = new Player(classType, 1, 180, 200, 10, 30, 200, 93, 40)
        break
      case 'Bard':
        player = new Player(classType, 1, 185, 200, 15, 30, 195, 98, 40)
        break
    }
    let getInterface = document.querySelector('.interface')
    getInterface.innerHTML =
      "<img src='img/" +
      classType.toLowerCase() +
      ".jpg' class='img-avatar'><div  class='portfolio'><h3>" +
      classType +
      ' <span class="lvl">Level: </span><span class="actual-lvl">' +
      player.level +
      '</span></h3><p class="health-player">Health: ' +
      player.health +
      '/' +
      player.maxHP +
      '</p><p>Mana: ' +
      player.mana +
      '</p><p>Strength: ' +
      player.strength +
      '</p><p>Agility: ' +
      player.agility +
      '</p><p>Intelligence: ' +
      player.intelligence +
      '</p><p>Speed: ' +
      player.speed +
      '</p><p>Defense: ' +
      player.defense +
      '</p></div>'
  },

  setPreFight: function () {
    let getHeader = document.querySelector('.header')
    let getAction = document.querySelector('.actions')
    let getArena = document.querySelector('.arena')

    getHeader.innerHTML =
      '<p>Task: Find an enemy!</p><p>Doom Tower floor: <span class="floor">' +
      beatenEnemy.length +
      '</span></p>'
    getArena.style.visibility = 'visible'
    getAction.innerHTML =
      '<a href="#" class="btn__prefight" onclick="gameManager.setFight()">Search for enemy!</a> <a href="/" class="btn__goback" onclick="gameManager.resetPlayer()">Back to heroes</a>'
  },

  createEnemy: function () {
    let getEnemy = document.querySelector('.enemy')
    // CREATE ENEMY
    if (beatenEnemy.length != 3) {
      let enemy00 = new Enemy('Goblin', 1, 2, 0, 150, 25, 10, 90, 45)
      let enemy01 = new Enemy('Slime', 1, 12, 0, 27, 150, 20, 50, 15)

      let chooseRandomEnemy = Math.floor(Math.random() * 2)
      let numbers = []

      switch (chooseRandomEnemy) {
        case 0:
          enemy = enemy00
          break
        case 1:
          enemy = enemy01
          break
      }
      numbers.push(chooseRandomEnemy)

      getEnemy.innerHTML =
        "<img src='img/enemies/" +
        enemy.enemyType.toLowerCase() +
        ".jpg' class='img-avatar'><div><h3>" +
        enemy.enemyType +
        ' <span class="lvl">Level: </span><span class="actual-lvl">' +
        enemy.level +
        '</span></h3><p class="health-enemy">Health: ' +
        enemy.health +
        '</p><p>Mana: ' +
        enemy.mana +
        '</p><p>Strength: ' +
        enemy.strength +
        '</p><p>Agility: ' +
        enemy.agility +
        '</p><p>Intelligence: ' +
        enemy.intelligence +
        '</p><p>Speed: ' +
        enemy.speed +
        '</p><p>Defense: ' +
        enemy.defense +
        '</p></div>'
      enemyLvl()
    } else if (beatenEnemy.length == 3) {
      finalBoss()
    }
  },

  setFight: function () {
    let getHeader = document.querySelector('.header')
    let getAction = document.querySelector('.actions')
    let getEnemy = document.querySelector('.enemy')

    getHeader.innerHTML =
      '<p>Task: Defeat your enemy!</p><p>Doom Tower floor: <span class="floor">' +
      beatenEnemy.length +
      '</span></p>'

    let heroes = function () {
      if (player.classType == 'Bard') {
        getAction.innerHTML =
          '<a href="#" class="btn__attack" onclick="PlayerMoves.calcAttack()">Attack!</a> <a href="#" class="btn__heal btn" onclick="PlayerMoves.calcHeal()">Heal!</a>'
      } else if (player.classType == 'Warrior') {
        getAction.innerHTML =
          '<a href="#" class="btn__attack btn" onclick="PlayerMoves.calcAttack()">Attack!</a> <a href="#" class="btn__counter btn" onclick="PlayerMoves.calcCounterAttack()">Counter-Attack!</a>'
      } else if (player.classType == 'Wizard') {
        getAction.innerHTML =
          '<a href="#" class="btn__attack btn" onclick="PlayerMoves.calcAttack()">Attack!</a> <a href="#" class="btn__thunder btn" onclick="PlayerMoves.calcThunderStruck()">Thunder struck!</a>'
      } else if (player.classType == 'Druid') {
        getAction.innerHTML =
          '<a href="#" class="btn__attack btn" onclick="PlayerMoves.calcAttack()">Attack!</a> <a href="#" class="btn__bite btn" onclick="PlayerMoves.calcFerociousBite()">Ferocious bite!</a>'
      }
    }
    heroes(player.classType)
    this.createEnemy()
    enemyLvl()

    //////////////
    let getArena = document.querySelector('.arena')
    getArena.style.visibility = 'visible'
    getEnemy.style.visibility = 'visible'
  },

  staircase: function () {
    let getHeader = document.querySelector('.header')
    let getAction = document.querySelector('.actions')
    let getArena = document.querySelector('.arena')
    let getEnemy = document.querySelector('.enemy')
    let getInterface = document.querySelector('.interface')
    getHeader.innerHTML =
      '<p>Task: Restore you power and clean the next floor of Doom Tower!</p> <p>Doom Tower floor: <span class="floor">' +
      beatenEnemy.length +
      '</span></p>'
    getArena.style.visibility = 'hidden'
    getEnemy.style.visibility = 'hidden'
    getAction.innerHTML =
      '<a href="#" class="btn__lvl" onclick="gameManager.playerLvl()">Increase your stats</a>  <a href="#" class="btn__prefight" onclick="gameManager.setFight()">Search for enemy!</a>'

    getInterface.innerHTML =
      "<img src='img/" +
      player.classType.toLowerCase() +
      ".jpg' class='img-avatar'><div class='portfolio'><h3>" +
      player.classType +
      ' <span class="lvl">Level: </span><span class="actual-lvl">' +
      player.level +
      '</span></h3><p class="health-player">Health: ' +
      player.maxHP +
      '<span class="input-span"><button class="decrease btn__input">&#8722</button><input class="number-input" id="hp" step="25" type="number" value="0"><button class="increase btn__input">&#43</button></span></p> <p>Mana: ' +
      player.mana +
      '<span class="input-span"><button class="decrease btn__input">&#8722</button><input class="number-input" id="mp" step="20" type="number" value="0"><button class="increase btn__input">&#43</button></span></p><p>Strength: ' +
      player.strength +
      '<span class="input-span"><button class="decrease btn__input">&#8722</button><input class="number-input" step="5" type="number" value="0"><button class="increase btn__input">&#43</button></span></p><p>Agility: ' +
      player.agility +
      '<span class="input-span"><button class="decrease btn__input">&#8722</button><input class="number-input" step="5" type="number" value="0"><button class="increase btn__input">&#43</button></span></p><p>Intelligence: ' +
      player.intelligence +
      '<span class="input-span"><button class="decrease btn__input">&#8722</button><input class="number-input" step="5" type="number" value="0"><button class="increase btn__input">&#43</button></span></p><p>Speed: ' +
      player.speed +
      '<span class="input-span"><button class="decrease btn__input">&#8722</button><input class="number-input" step="1" type="number" value="0"><button class="increase btn__input">&#43</button></span></p><p>Defense: ' +
      player.defense +
      '<span class="input-span"><button class="decrease btn__input">&#8722</button><input class="number-input" step="2" type="number" value="0"><button class="increase btn__input">&#43</button></span></p> <p class="total-points">Available points: <span class="pointsLvl">10</span></p> <div class="question-field"><i class="ri-question-line question"></i><div class="question__tab"><p class="statP">25 HP for 1 point</p><p class="statP">20 MP for 1 point</p><p class="statP">5 STR for 1 point</p><p class="statP">5 AGI for 1 point</p><p class="statP">5 INT for 1 point</p><p class="statP">1 SPD for 1 point</p><p class="statP">2 DEF for 1 point</p></div></div></div>'

    playerLvlUp()
    questionMenu()
  },

  playerLvl: function () {
    let chosenPlayer = player
    if (chosenPlayer.classType == 'Warrior') {
      chosenPlayer.level += 1
      chosenPlayer.health = chosenPlayer.maxHP * 1.1
      chosenPlayer.mana *= 1
      chosenPlayer.strength *= 1.12
      chosenPlayer.agility *= 1.02
      chosenPlayer.intelligence *= 1.01
      chosenPlayer.speed += 0.5
      chosenPlayer.defense *= 1.08
      chosenPlayer.maxHP *= 1.1
    } else if (chosenPlayer.classType == 'Druid') {
      chosenPlayer.level += 1
      chosenPlayer.health = chosenPlayer.maxHP * 1.09
      chosenPlayer.mana *= 1.05
      chosenPlayer.strength *= 1.1
      chosenPlayer.agility *= 1.02
      chosenPlayer.intelligence *= 1.08
      chosenPlayer.speed += 0.9
      chosenPlayer.defense *= 1.06
      chosenPlayer.maxHP *= 1.1
    } else if (chosenPlayer.classType == 'Wizard') {
      chosenPlayer.level += 1
      chosenPlayer.health = chosenPlayer.maxHP * 1.05
      chosenPlayer.mana *= 1.1
      chosenPlayer.strength *= 1.02
      chosenPlayer.agility *= 1.02
      chosenPlayer.intelligence *= 1.15
      chosenPlayer.speed += 0.8
      chosenPlayer.defense *= 1.05
      chosenPlayer.maxHP *= 1.05
    } else if (chosenPlayer.classType == 'Bard') {
      chosenPlayer.level += 1
      chosenPlayer.health = chosenPlayer.maxHP * 1.08
      chosenPlayer.mana *= 1.1
      chosenPlayer.strength *= 1.04
      chosenPlayer.agility *= 1.02
      chosenPlayer.intelligence *= 1.12
      chosenPlayer.speed += 0.8
      chosenPlayer.defense *= 1.05
      chosenPlayer.maxHP *= 1.08
    }

    let getInterface = document.querySelector('.interface')
    let getAction = document.querySelector('.actions')

    getInterface.innerHTML =
      "<img src='img/" +
      player.classType.toLowerCase() +
      ".jpg' class='img-avatar'><div class='portfolio'><h3>" +
      player.classType +
      ' <span class="lvl">Level: </span><span class="actual-lvl">' +
      chosenPlayer.level +
      '</span></h3><p class="health-player">Health: ' +
      Math.round(chosenPlayer.health * 100) / 100 +
      '</p><p>Mana: ' +
      Math.round(chosenPlayer.mana * 100) / 100 +
      '</p><p>Strength: ' +
      Math.round(chosenPlayer.strength * 100) / 100 +
      '</p><p>Agility: ' +
      Math.round(chosenPlayer.agility * 100) / 100 +
      '</p><p>Intelligence: ' +
      Math.round(chosenPlayer.intelligence * 100) / 100 +
      '</p><p>Speed: ' +
      Math.round(chosenPlayer.speed * 100) / 100 +
      '</p><p>Defense: ' +
      Math.round(chosenPlayer.defense * 100) / 100 +
      '</p></div>'
    getAction.innerHTML =
      '<a href="#" class="btn__prefight" onclick="gameManager.setFight()">Search for enemy!</a>'
  },
}
const enemyLvl = function () {
  let getEnemy = document.querySelector('.enemy')

  let type = enemy.enemyType

  enemy.enemyType = enemy.enemyType
  enemy.level = beatenEnemy.length
  enemy.health = enemy.maxHP

  if (type == 'Gator' || type == 'Goblin') {
    enemy.strength = enemy.strength * 1.05
    enemy.defense = enemy.defense * 1.06
  } else {
    enemy.strength = enemy.strength * 1.02
    enemy.defense = enemy.defense * 1.06
  }
  if (type == 'Slime') {
    enemy.agility = enemy.agility * 1.05
    enemy.speed = enemy.speed + 1
  } else {
    enemy.agility = enemy.agility * 1.02
    enemy.speed = enemy.speed + 0.5
  }
  if (type == 'Dragon') {
    enemy.intelligence = enemy.intelligence * 1.05
    enemy.mana = enemy.mana * 1.05
  } else {
    enemy.intelligence = enemy.intelligence * 1.02
    enemy.mana = enemy.mana * 1
  }
  enemy.maxHP = enemy.health * beatenEnemy.length * 1.3

  getEnemy.innerHTML =
    "<img src='img/enemies/" +
    enemy.enemyType.toLowerCase() +
    ".jpg' class='img-avatar'><div><h3>" +
    enemy.enemyType +
    ' <span class="lvl">Level: </span><span class="actual-lvl">' +
    enemy.level +
    '</span></h3><p class="health-enemy">Health: ' +
    Math.round(enemy.health * 100) / 100 +
    '</p><p>Mana: ' +
    Math.round(enemy.mana * 100) / 100 +
    '</p><p>Strength: ' +
    Math.round(enemy.strength * 100) / 100 +
    '</p><p>Agility: ' +
    Math.round(enemy.agility * 100) / 100 +
    '</p><p>Intelligence: ' +
    Math.round(enemy.intelligence * 100) / 100 +
    '</p><p>Speed: ' +
    Math.round(enemy.speed * 100) / 100 +
    '</p><p>Defense: ' +
    Math.round(enemy.defense * 100) / 100 +
    '</p></div>'
}

const playerLvlUp = function () {
  const btnDecrease = document.querySelector('.decrease')
  const btnIncrease = document.querySelector('.increase')
  const statsInput = document.querySelectorAll('.number-input')
  console.log(statsInput)
  // btnDecrease.addEventListener('click', function () {
  //   statsInput[0].value = parseInt(statsInput.value) - 25
  // })

  btnIncrease.addEventListener('click', function () {
    if (statsInput.id === 'hp') {
      statsInput[0].value = parseInt(statsInput.value) + 25
      console.log('click')
    } else if (statsInput.id === 'mp') {
      statsInput[1].value = parseInt(statsInput.value) + 20
      console.log('click')
    }
  })
}
