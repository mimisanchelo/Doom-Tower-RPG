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
      case 'Priest':
        player = new Player(classType, 1, 185, 200, 15, 30, 195, 98, 40)
        break
    }
    let getInterface = document.querySelector('.interface')
    getInterface.innerHTML =
      "<img src='img/" +
      classType.toLowerCase() +
      ".jpg' class='img-avatar'><div  class='portfolio'><h3 class='hero__type'>" +
      classType +
      ' <span class="lvl">Level: </span><span class="actual-lvl">' +
      player.level +
      '</span></h3><p class=" health-player player-stat">Health:  ' +
      player.health +
      '/' +
      player.maxHP +
      '</p><p class="player-stat">Mana: ' +
      player.mana +
      '</p><p class="player-stat">Strength: ' +
      player.strength +
      '</p><p class="player-stat">Agility: ' +
      player.agility +
      '</p><p class="player-stat">Intelligence: ' +
      player.intelligence +
      '</p><p class="player-stat">Speed: ' +
      player.speed +
      '</p><p class="player-stat">Defense: ' +
      player.defense +
      '</p></div>'
  },

  setPreFight: function () {
    let getHeader = document.querySelector('.header')
    let getAction = document.querySelector('.actions')
    let getArena = document.querySelector('.arena')

    getHeader.innerHTML =
      '<p class="header__text">Doom Tower floor: <span class="floor">' +
      beatenEnemy.length +
      '</span></p><p class="header__title">Task: Find an enemy!</p>'
    getArena.style.visibility = 'visible'
    getAction.innerHTML =
      '<a href="#" class="btn__prefight btn" onclick="gameManager.setFight()">Search for enemy!</a> <a href="/" class="btn__goback btn" onclick="gameManager.resetPlayer()">Back to heroes</a>'
  },

  createEnemy: function () {
    let getEnemy = document.querySelector('.enemy')
    // CREATE ENEMY
    if (beatenEnemy.length != 20) {
      let enemy00 = new Enemy('Goblin', 1, 200, 0, 150, 25, 10, 90, 45)
      let enemy01 = new Enemy('Slime', 1, 100, 0, 27, 150, 20, 50, 15)
      let enemy02 = new Enemy('Doomspeaker', 1, 100, 0, 27, 150, 20, 50, 15)
      let enemy03 = new Enemy('3-Headed witch', 1, 100, 0, 27, 150, 20, 50, 15)
      let enemy04 = new Enemy('Basilisk', 1, 100, 0, 27, 150, 20, 50, 15)
      let enemy05 = new Enemy('Boar warrior', 1, 100, 0, 27, 150, 20, 50, 15)
      let enemy06 = new Enemy('Desert mummy', 1, 100, 0, 27, 150, 20, 50, 15)
      let enemy07 = new Enemy(
        'Dragonborn Henchman',
        1,
        120,
        0,
        27,
        150,
        20,
        50,
        15
      )
      let enemy08 = new Enemy('Enforcer', 1, 100, 0, 27, 150, 20, 50, 15)
      let enemy09 = new Enemy('Gator', 1, 100, 0, 27, 150, 20, 50, 15)
      let enemy10 = new Enemy('Pirate', 1, 100, 0, 27, 150, 20, 50, 15)
      let enemy11 = new Enemy('Raven mocker', 1, 100, 0, 27, 150, 20, 50, 15)
      let enemy12 = new Enemy('Skelet archer', 1, 100, 0, 27, 150, 20, 50, 15)
      let enemy13 = new Enemy('Skelet warrior', 1, 100, 0, 27, 150, 20, 50, 15)
      let enemy14 = new Enemy('Tendriculos', 1, 100, 0, 27, 150, 20, 50, 15)

      let chooseRandomEnemy = Math.floor(Math.random() * 15)
      let numbers = []

      switch (chooseRandomEnemy) {
        case 0:
          enemy = enemy00
          break
        case 1:
          enemy = enemy01
          break
        case 2:
          enemy = enemy02
          break
        case 3:
          enemy = enemy03
          break
        case 4:
          enemy = enemy04
          break
        case 5:
          enemy = enemy05
          break
        case 6:
          enemy = enemy06
          break
        case 7:
          enemy = enemy07
          break
        case 8:
          enemy = enemy08
          break
        case 9:
          enemy = enemy09
          break
        case 10:
          enemy = enemy10
          break
        case 11:
          enemy = enemy11
          break
        case 12:
          enemy = enemy12
          break
        case 13:
          enemy = enemy13
          break
        case 14:
          enemy = enemy14
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
        '</p><p class=>Mana: ' +
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
    } else if (beatenEnemy.length == 20) {
      finalBoss()
    }
  },

  setFight: function () {
    let getHeader = document.querySelector('.header')
    let getAction = document.querySelector('.actions')
    let getEnemy = document.querySelector('.enemy')

    getHeader.innerHTML =
      '<p class="header__text">Doom Tower floor: <span class="floor">' +
      beatenEnemy.length +
      '</span></p><p class="header__title">Task: Defeat your enemy!</p>'

    let heroes = function () {
      if (player.classType == 'Priest') {
        getAction.innerHTML =
          '<a href="#" class="btn__attack btn" onclick="PlayerMoves.calcAttack()">Attack!</a> <a href="#" class="btn__heal btn" onclick="PlayerMoves.calcHeal()">Heal!</a>'
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
      '<p class="header__text">Doom Tower floor: <span class="floor">' +
      beatenEnemy.length +
      '</span></p><p class="header__title">Task: Restore you power and clean the next floor of Doom Tower!</p>'
    getArena.style.visibility = 'hidden'
    getEnemy.style.visibility = 'hidden'
    getAction.innerHTML =
      '<a href="#" class="btn__lvl btn" onclick="gameManager.playerLvl()">Increase your stats</a>'

    let chosenPlayer = player

    getInterface.innerHTML =
      "<img src='img/" +
      player.classType.toLowerCase() +
      ".jpg' class='img-avatar'><div  class='portfolio'><h3 class='hero__type'>" +
      player.classType +
      ' <span class="lvl">Level: </span><span class="actual-lvl">' +
      chosenPlayer.level +
      '</span></h3><p class=" health-player player-stat">Health:  ' +
      chosenPlayer.health +
      '/' +
      chosenPlayer.maxHP +
      '<span class="input-span"><button class="decrease btn__input">&#8722</button><input class="number-input" id="hp" step="25" type="number" value="0" max="10"disabled><button class="increase btn__input">&#43</button></span></p><p class="player-stat">Mana: ' +
      chosenPlayer.mana +
      '<span class="input-span"><button class="decrease btn__input">&#8722</button><input class="number-input" id="mp" step="20" type="number" value="0" max="10" disabled><button class="increase btn__input">&#43</button></span></p><p class="player-stat">Strength: ' +
      chosenPlayer.strength +
      '<span class="input-span"><button class="decrease btn__input">&#8722</button><input class="number-input" id="str" step="5" type="number" value="0" max="10" disabled><button class="increase btn__input">&#43</button></span></p><p class="player-stat">Agility: ' +
      chosenPlayer.agility +
      '<span class="input-span"><button class="decrease btn__input">&#8722</button><input class="number-input" id="str" step="5" type="number" value="0" max="10" disabled><button class="increase btn__input">&#43</button></span></p><p class="player-stat">Intelligence: ' +
      chosenPlayer.intelligence +
      '<span class="input-span"><button class="decrease btn__input">&#8722</button><input class="number-input" id="str" step="5" type="number" value="0" max="10" disabled><button class="increase btn__input">&#43</button></span></p><p class="player-stat">Speed: ' +
      chosenPlayer.speed +
      '<span class="input-span"><button class="decrease btn__input">&#8722</button><input class="number-input" id="str" step="5" type="number" value="0" max="10" disabled><button class="increase btn__input">&#43</button></span></p><p class="player-stat">Defense: ' +
      chosenPlayer.defense +
      '<span class="input-span"><button class="decrease btn__input">&#8722</button><input class="number-input" id="str" step="5" type="number" value="0" max="10" disabled><button class="increase btn__input">&#43</button></span></p><p class="total-points">Available points: <input class="total" type="number" id="totalN" value="10" disabled></input></p> <div class="question-field"><i class="ri-question-line question"></i><div class="question__tab"><p class="statP">25 HP for 1 point</p><p class="statP">20 MP for 1 point</p><p class="statP">5 STR for 1 point</p><p class="statP">5 AGI for 1 point</p><p class="statP">5 INT for 1 point</p><p class="statP">1 SPD for 1 point</p><p class="statP">2 DEF for 1 point</p></div></div></div>'

    questionMenu()
    playerLvlUp()
  },

  playerLvl: function () {
    let getInterface = document.querySelector('.interface')
    let getAction = document.querySelector('.actions')
    const statsInput = document.querySelectorAll('.number-input')
    let chosenPlayer = player

    chosenPlayer.level += 1
    chosenPlayer.health = chosenPlayer.maxHP + statsInput[0].value * 25
    chosenPlayer.mana += statsInput[1].value * 20
    chosenPlayer.strength += statsInput[2].value * 5
    chosenPlayer.agility += statsInput[3].value * 5
    chosenPlayer.intelligence += statsInput[4].value * 5
    chosenPlayer.speed += statsInput[5].value * 1
    chosenPlayer.defense += statsInput[6].value * 2.5
    chosenPlayer.maxHP += statsInput[0].value * 25
    console.log(statsInput)

    getInterface.innerHTML =
      "<img src='img/" +
      player.classType.toLowerCase() +
      ".jpg' class='img-avatar'><div class='portfolio'><h3 class='hero__type'>" +
      player.classType +
      ' <span class="lvl">Level: </span><span class="actual-lvl">' +
      chosenPlayer.level +
      '</span></h3><p class=" health-player player-stat">Health:  ' +
      chosenPlayer.health +
      '/' +
      chosenPlayer.maxHP +
      '</p><p class="player-stat">Mana: ' +
      chosenPlayer.mana +
      '</p><p class="player-stat">Strength: ' +
      chosenPlayer.strength +
      '</p><p class="player-stat">Agility: ' +
      chosenPlayer.agility +
      '</p><p class="player-stat">Intelligence: ' +
      chosenPlayer.intelligence +
      '</p><p class="player-stat">Speed: ' +
      chosenPlayer.speed +
      '</p><p class="player-stat">Defense: ' +
      chosenPlayer.defense +
      '</p>'
    getAction.innerHTML =
      '<a href="#" class="btn__prefight btn" id="prefight" onclick="gameManager.setFight()">Search for enemy!</a>'
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
