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
      '<button class="btn__prefight btn" onclick="gameManager.setFight()"><img class="abilityImg" src="img/skills/magnifier.svg" alt="">Search for enemy</button> <button class="btn__goback btn" onclick="gameManager.resetPlayer()"><img class="abilityImg" src="img/skills/player-next.svg" alt="">Back to heroes</button>'
  },

  createEnemy: function () {
    let getEnemy = document.querySelector('.enemy')
    // CREATE ENEMY
    if (beatenEnemy.length !== 30) {
      let enemy00 = new Enemy('Goblin', 1, 200, 0, 150, 35, 5, 85, 35)
      let enemy01 = new Enemy('Slime', 1, 175, 0, 25, 150, 20, 90, 30)
      let enemy02 = new Enemy('Doomspeaker', 1, 150, 130, 26, 150, 20, 85, 25)
      let enemy03 = new Enemy('Witch', 1, 150, 160, 5, 20, 150, 50, 25)
      let enemy04 = new Enemy('Basilisk', 1, 175, 0, 27, 150, 20, 90, 35)
      let enemy05 = new Enemy('Boar warrior', 1, 200, 0, 150, 30, 20, 78, 50)
      let enemy06 = new Enemy('Mummy', 1, 150, 0, 30, 152, 0, 88, 30)
      let enemy07 = new Enemy('Henchman', 1, 200, 0, 155, 27, 20, 85, 35)
      let enemy08 = new Enemy('Enforcer', 1, 200, 0, 160, 27, 20, 89, 30)
      let enemy09 = new Enemy('Gator', 1, 200, 0, 28, 155, 10, 80, 40)
      let enemy10 = new Enemy('Pirate', 1, 200, 0, 35, 150, 12, 87, 35)
      let enemy11 = new Enemy('Raven mocker', 1, 175, 0, 30, 155, 10, 91, 30)
      let enemy12 = new Enemy('Skelet archer', 1, 175, 0, 20, 160, 0, 84, 25)
      let enemy13 = new Enemy('Skelet warrior', 1, 200, 0, 160, 25, 0, 81, 42)
      let enemy14 = new Enemy('Tendriculos', 1, 200, 0, 40, 150, 0, 87, 39)

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
        "<img src='img/" +
        enemy.enemyType.toLowerCase() +
        ".jpg' class='img-avatar'><div><h3>" +
        enemy.enemyType +
        ' <span class="lvl">Level: </span><span class="actual-lvl">' +
        enemy.level +
        '</span></h3><p class="health-enemy enemy-stat">Health: ' +
        enemy.health +
        '</p><p class="enemy-stat">Mana: ' +
        enemy.mana +
        '</p><p class="enemy-stat">Strength: ' +
        enemy.strength +
        '</p><p class="enemy-stat">Agility: ' +
        enemy.agility +
        '</p><p class="enemy-stat">Intelligence: ' +
        enemy.intelligence +
        '</p><p class="enemy-stat">Speed: ' +
        enemy.speed +
        '</p><p class="enemy-stat">Defense: ' +
        enemy.defense +
        '</p></div>'

      enemyLvl()
    } else if (beatenEnemy.length == 31) {
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
          '<button class="btn btn__attack player_btn" id="attack" onclick="PlayerAttack.calcAttack()"><img class="abilityImg" src="img/skills/healstaff.jpg" alt="">Attack</button> <button class="btn btn__counter player_btn" id="heal" onclick="PlayerHeal.calcHeal()"> <img class="abilityImg" src="img/skills/ability1P.jpg" alt="">Healing</button> <button class="btn btn__confusion player_btn" id="confusion" onclick="PlayerHeal."> <img class="abilityImg" src="img/skills/confusion.jpg" alt="">Confusion</button>'
      } else if (player.classType == 'Warrior') {
        getAction.innerHTML =
          '<button class="btn btn__attack player_btn" id="attack" onclick="PlayerAttack.calcAttack()"><img class="abilityImg" src="img/skills/attack.jpg" alt="">Attack</button> <button class="btn btn__counter player_btn"  id="counter" onclick="PlayerCounter.calcCounterAttack()"> <img class="abilityImg" src="img/skills/ability1W.jpg" alt="">Counter Attack</button> <button class="btn btn__surprise player_btn"  id="surprise" onclick="PlayerSurprise.calcSurpriseAttack()"> <img class="abilityImg" src="img/skills/ability2W.jpg" alt="">Surprise attack</button>'
      } else if (player.classType == 'Wizard') {
        getAction.innerHTML =
          '<button class="btn btn__attack player_btn" id="attack" onclick="PlayerAttack.calcAttack()"><img class="abilityImg" src="img/skills/staff.jpg" alt="">Attack</button> <button class="btn btn__thunder player_btn " id="thunder" onclick="PlayerThunder.calcThunderStruck()"> <img class="abilityImg" src="img/skills/ability1Wi.jpg" alt="">Thunder strike</button> <button class="btn btn__pillar player_btn"  id="counter" onclick="PlayerCounter"> <img class="abilityImg" src="img/skills/ability2Wi.jpg" alt="">Freezing pillar</button>'
      } else if (player.classType == 'Druid') {
        getAction.innerHTML =
          '<button class="btn btn__attack player_btn" id="attack" onclick="PlayerAttack.calcAttack()"><img class="abilityImg" src="img/skills/nails.jpg" alt="">Attack</button> <button class="btn btn__bite player_btn" id="bite" onclick="PlayerBite.calcFerociousBite()"> <img class="abilityImg" src="img/skills/ability1D.jpg" alt="">Ferocious Bite</button> <button class="btn btn__wrath player_btn"  id="counter" onclick="PlayerCounter"> <img class="abilityImg" src="img/skills/ability2D.jpg" alt="">Wrath of nature</button>'
      }
    }
    heroes(player.classType)
    this.createEnemy()

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
      '<button class="btn__lvl btn" onclick="gameManager.playerLvl()"><img class="abilityImg" src="img/skills/upgrade.svg" alt="">Increase level</button>'

    let chosenPlayer = player

    getInterface.innerHTML =
      "<img src='img/" +
      player.classType.toLowerCase() +
      ".jpg' class='img-avatar'><div  class='portfolio'><h3 class='hero__type'>" +
      player.classType +
      ' <span class="lvl">Level: </span><span class="actual-lvl">' +
      chosenPlayer.level +
      '</span></h3><p class=" health-player player-stat">Health:  ' +
      chosenPlayer.maxHP +
      '<span class="input-span"><button class="decrease btn__input">&#8722</button><input class="number-input" id="hp" step="25" type="number" value="0" disabled><button class="increase btn__input">&#43</button></span></p><p class="player-stat">Mana: ' +
      chosenPlayer.mana +
      '<span class="input-span"><button class="decrease btn__input">&#8722</button><input class="number-input" id="mp" step="20" type="number" value="0" disabled><button class="increase btn__input">&#43</button></span></p><p class="player-stat">Strength: ' +
      chosenPlayer.strength +
      '<span class="input-span"><button class="decrease btn__input">&#8722</button><input class="number-input" id="str" step="5" type="number" value="0" disabled><button class="increase btn__input">&#43</button></span></p><p class="player-stat">Agility: ' +
      chosenPlayer.agility +
      '<span class="input-span"><button class="decrease btn__input">&#8722</button><input class="number-input" id="str" step="5" type="number" value="0" disabled><button class="increase btn__input">&#43</button></span></p><p class="player-stat">Intelligence: ' +
      chosenPlayer.intelligence +
      '<span class="input-span"><button class="decrease btn__input">&#8722</button><input class="number-input" id="str" step="5" type="number" value="0" disabled><button class="increase btn__input">&#43</button></span></p><p class="player-stat">Speed: ' +
      chosenPlayer.speed +
      '<span class="input-span"><button class="decrease btn__input">&#8722</button><input class="number-input" id="str" step="1" type="number" value="0" disabled><button class="increase btn__input">&#43</button></span></p><p class="player-stat">Defense: ' +
      chosenPlayer.defense +
      '<span class="input-span"><button class="decrease btn__input">&#8722</button><input class="number-input" id="str" step="1.5" type="number" value="0" disabled><button class="increase btn__input">&#43</button></span></p><p class="total-points">Available points: <input class="total" type="number" id="totalN" disabled></input></p> <div class="question-field"><i class="ri-question-line question"></i><div class="question__tab"><p class="statP">25 HP for 1 point</p><p class="statP">20 MP for 1 point</p><p class="statP">5 STR for 1 point</p><p class="statP">5 AGI for 1 point</p><p class="statP">5 INT for 1 point</p><p class="statP">1 SPD for 1 point</p><p class="statP">2 DEF for 1 point</p></div></div></div>'

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

    getInterface.innerHTML =
      "<img src='img/" +
      player.classType.toLowerCase() +
      ".jpg' class='img-avatar'><div class='portfolio'><h3 class='hero__type'>" +
      player.classType +
      ' <span class="lvl">Level: </span><span class="actual-lvl">' +
      chosenPlayer.level +
      '</span></h3><p class=" health-player player-stat">Health:  ' +
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
      '<button class="btn__prefight btn" onclick="gameManager.setFight()"><img class="abilityImg" src="img/skills/magnifier.svg" alt="">Search for enemy</button>'
  },
}
let enemyLvl = function () {
  let getEnemy = document.querySelector('.enemy')

  let type = enemy.enemyType
  let enemy1 = enemy

  enemy.level += 1
  enemy.health = enemy.maxHP

  if (
    type == 'Gator' ||
    type == 'Goblin' ||
    type == 'Tendriculos' ||
    type == 'Enforcer' ||
    type == 'Boar warrior' ||
    type == 'Henchman' ||
    type == 'Skelet warrior'
  ) {
    enemy1.maxHP = enemy1.maxHP + 100

    enemy1.strength = enemy.strength + 15
    enemy1.agility = enemy.agility + 5
    enemy1.intelligence = enemy.intelligence + 5
    enemy1.speed = enemy.speed + 0.5
    enemy1.defense = enemy.defense + 4
    // if (beatenEnemy.length >= 15) {
    //   enemy.maxHP = enemy.maxHP + 100
    //   enemy.mana = enemy.mana
    //   enemy.strength = enemy.strength + 20
    //   enemy.agility = enemy.agility + 7
    //   enemy.intelligence = enemy.intelligence + 10
    //   enemy.speed = enemy.speed + 1
    //   enemy.defense = enemy.defense + 4
    //   enemy.health = enemy.maxHP
    // }
  } else if (
    type == 'Slime' ||
    type == 'Basilisk' ||
    type == 'Mummy' ||
    type == 'Skelet archer' ||
    type == 'Pirate' ||
    type == 'Raven mocker'
  ) {
    enemy1.maxHP = enemy.maxHP + 75

    enemy1.strength = enemy.strength + 10
    enemy1.agility = enemy.agility + 15
    enemy1.intelligence = enemy.intelligence + 5
    enemy1.defense = enemy.defense + 3
    enemy1.speed = enemy.speed + 1

    // if (beatenEnemy.length >= 15 {
    //   enemy.maxHP = enemy.maxHP + 100
    //   enemy.mana = enemy.mana
    //   enemy.strength = enemy.strength + 12
    //   enemy.agility = enemy.agility + 20
    //   enemy.intelligence = enemy.intelligence + 10
    //   enemy.speed = enemy.speed + 1.5
    //   enemy.defense = enemy.defense + 4
    //   enemy.health = enemy.maxHP
    // }
  } else if (type == 'Witch' || type == 'Doomspeaker') {
    enemy1.maxHP += enemy.maxHP + 75
    enemy1.mana += enemy.mana + 40
    enemy1.strength += enemy.strength + 10
    enemy1.agility += enemy.agility + 5
    enemy1.intelligence += enemy.intelligence + 15
    enemy1.speed += enemy.speed + 1
    enemy1.defense += enemy.defense + 3

    // if (beatenEnemy.length >= 15) {
    //   enemy.maxHP = enemy.maxHP + 100
    //   enemy.mana = enemy.mana + 60
    //   enemy.strength = enemy.strength + 12
    //   enemy.agility = enemy.agility + 7
    //   enemy.intelligence = enemy.intelligence + 20
    //   enemy.speed = enemy.speed + 1
    //   enemy.defense = enemy.defense + 4
    //   enemy.health = enemy.maxHP
    // }
  }

  getEnemy.innerHTML =
    "<img src='img/" +
    enemy1.enemyType.toLowerCase() +
    ".jpg' class='img-avatar'><div><h3>" +
    enemy1.enemyType +
    ' <span class="lvl">Level: </span><span class="actual-lvl">' +
    enemy1.level +
    '</span></h3><p class="health-enemy">Health: ' +
    Math.round(enemy1.health * 100) / 100 +
    '</p><p>Mana: ' +
    Math.round(enemy1.mana * 100) / 100 +
    '</p><p>Strength: ' +
    Math.round(enemy1.strength * 100) / 100 +
    '</p><p>Agility: ' +
    Math.round(enemy1.agility * 100) / 100 +
    '</p><p>Intelligence: ' +
    Math.round(enemy1.intelligence * 100) / 100 +
    '</p><p>Speed: ' +
    Math.round(enemy1.speed * 100) / 100 +
    '</p><p>Defense: ' +
    Math.round(enemy1.defense * 100) / 100 +
    '</p></div>'
}
