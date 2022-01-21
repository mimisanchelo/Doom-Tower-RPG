
let GameManager =  {
  setGameStart(classType) {
    this.resetPlayer(classType)
    this.setPreFight()
  },

  resetPlayer(classType) {
    switch (classType) {
      case 'Warrior':
        player = new Player(classType, 'Strength' , 1, 250, 0, 200, 10, 5, 92, 65)
        break
      case 'Druid':
        player = new Player(classType, 'Gibrid', 1, 225, 75, 100, 15, 100, 95, 50)
        break
      case 'Wizard':
        player = new Player(classType, 'Mage', 1, 190, 200, 10, 30, 200, 93, 40)
        break
      case 'Priest':
        player = new Player(classType, 'Mage', 1, 195, 200, 15, 30, 195, 98, 40)
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

  setPreFight() {
    let getHeader = document.querySelector('.header')
    let getAction = document.querySelector('.actions')
    let getArena = document.querySelector('.arena')

    getHeader.innerHTML =
      '<p class="header__text">Doom Tower floor: <span class="floor">' +
      beatenEnemy.length +
      '</span></p><p class="header__title">Task: Find an enemy!</p>'
    getArena.style.visibility = 'visible'
    getAction.innerHTML =
      '<button class="btn__prefight btn" onclick="GameManager.setFight()"><img class="abilityImg" src="img/skills/magnifier.svg" alt="">Search for enemy</button> <a class="btn__goback btn" href="/"><img class="abilityImg" src="img/skills/player-next.svg"alt=""onclick="GameManager.resetPlayer()"/>Leave the Tower</a>'
  },

  createEnemy() {
    let getEnemy = document.querySelector('.enemy')
    // CREATE ENEMY
    
    if (beatenEnemy.length <= 29) {
      let enemy00 = new Enemy('Goblin', 'Strength', 1, 200, 0, 150, 35, 5, 85, 35)
      let enemy01 = new Enemy('Slime' , 'Agility', 1, 175, 0, 25, 150, 20, 90, 30)
      let enemy02 = new Enemy('Doomspeaker' , 'Mage', 1, 150, 140, 26, 25, 155, 85, 27)
      let enemy03 = new Enemy('Witch' , 'Mage', 1, 150, 155, 5, 20, 150, 50, 27)
      let enemy04 = new Enemy('Basilisk' , 'Agility', 1, 175, 0, 27, 150, 20, 90, 35)
      let enemy05 = new Enemy('Boar warrior' , 'Strength', 1, 200, 0, 150, 30, 20, 78, 50)
      let enemy06 = new Enemy('Mummy' , 'Agility', 1, 150, 0, 30, 152, 0, 88, 30)
      let enemy07 = new Enemy('Henchman' , 'Strength', 1, 200, 0, 155, 27, 20, 85, 35)
      let enemy08 = new Enemy('Enforcer' , 'Strength', 1, 200, 0, 160, 27, 20, 89, 30)
      let enemy09 = new Enemy('Gator' , 'Strength', 1, 200, 0, 155, 28, 10, 80, 40)
      let enemy10 = new Enemy('Pirate' , 'Agility', 1, 175, 0, 35, 150, 12, 86, 38)
      let enemy11 = new Enemy('Raven mocker' , 'Agility', 1, 175, 0, 30, 155, 10, 91, 30)
      let enemy12 = new Enemy('Skelet archer' , 'Agility', 1, 175, 0, 20, 160, 0, 84, 27)
      let enemy13 = new Enemy('Skelet warrior' , 'Strength', 1, 200, 0, 160, 25, 0, 81, 42)
      let enemy14 = new Enemy('Tendriculos' , 'Strength', 1, 200, 0, 40, 150, 0, 87, 39)

      let chooseRandomEnemy = Math.floor(Math.random() * 2)
      
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

        if(player.level >= 2) {
          enemy.enemyLvl()
          enemy.enemyLvlUpdate()
        } 
    } else if (beatenEnemy.length <= 30) {
      finalBoss()
    } 
  },

  setFight() {
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
          '<button class="btn btn__attack player_btn" id="attack" onclick="PlayerAttack.calcAttack()"><img class="abilityImg" src="img/skills/healstaff.jpg" alt="">Attack</button> <button class="btn btn__counter player_btn" id="heal" onclick="PlayerHeal.calcHeal()"> <img class="abilityImg" src="img/skills/ability1P.jpg" alt="">Divine Embrace</button> <button class="btn btn__confusion player_btn" id="confusion" onclick="PlayerConfusion.calcConfusion()"> <img class="abilityImg" src="img/skills/ability2P.jpg" alt="">Confusion</button>'
      } else if (player.classType == 'Warrior') {
        getAction.innerHTML =
          '<button class="btn btn__attack player_btn" id="attack" onclick="PlayerAttack.calcAttack()"><img class="abilityImg" src="img/skills/attack.jpg" alt="">Attack</button> <button class="btn btn__counter player_btn"  id="counter" onclick="PlayerCounter.calcCounterAttack()"> <img class="abilityImg" src="img/skills/ability1W.jpg" alt="">Counter Attack</button> <button class="btn btn__surprise player_btn"  id="surprise" onclick="PlayerSurprise.calcSurpriseAttack()"> <img class="abilityImg" src="img/skills/ability2W.jpg" alt="">Surprise attack</button>'
      } else if (player.classType == 'Wizard') {
        getAction.innerHTML =
          '<button class="btn btn__attack player_btn" id="attack" onclick="PlayerAttack.calcAttack()"><img class="abilityImg" src="img/skills/staff.jpg" alt="">Attack</button> <button class="btn btn__thunder player_btn " id="thunder" onclick="PlayerThunder.calcThunderStruck()"> <img class="abilityImg" src="img/skills/ability1Wi.jpg" alt="">Thunder strike</button> <button class="btn btn__pillar player_btn"  id="pillar" onclick="PlayerPillar.calcFreezingPillar()"> <img class="abilityImg" src="img/skills/ability2Wi.jpg" alt="">Freezing pillar</button>'
      } else if (player.classType == 'Druid') {
        getAction.innerHTML =
          '<button class="btn btn__attack player_btn" id="attack" onclick="PlayerAttack.calcAttack()"><img class="abilityImg" src="img/skills/nails.jpg" alt="">Attack</button> <button class="btn btn__bite player_btn" id="bite" onclick="PlayerBite.calcFerociousBite()"> <img class="abilityImg" src="img/skills/ability1D.jpg" alt="">Ferocious Bite</button> <button class="btn btn__wrath player_btn"  id="wrath" onclick="PlayerWrath.calcWrathOfNature()"> <img class="abilityImg" src="img/skills/ability2D.jpg" alt="">Wrath of nature</button>'
      }
    }
    heroes(player.classType)
    this.createEnemy()
    
    //////////////
    let getArena = document.querySelector('.arena')
    getArena.style.visibility = 'visible'
    getEnemy.style.visibility = 'visible'
  },

  staircase() {
    let getHeader = document.querySelector('.header')
    let getAction = document.querySelector('.actions')
    let getArena = document.querySelector('.arena')
    let getEnemy = document.querySelector('.enemy')
    let getInterface = document.querySelector('.interface')
    const result = document.querySelector('.result')

    result.classList.add('hidden')

    getHeader.innerHTML =
      '<p class="header__text">Doom Tower floor: <span class="floor">' +
      beatenEnemy.length +
      '</span></p><p class="header__title">Task: Restore you power and clean the next floor of Doom Tower!</p>'
    getArena.style.visibility = 'hidden'
    getEnemy.style.visibility = 'hidden'
    getAction.innerHTML =
      '<button class="btn__lvl btn" onclick="GameManager.playerLvl()"><img class="abilityImg" src="img/skills/upgrade.svg" alt="">Increase level</button>'

    getInterface.innerHTML =
      "<img src='img/" +
      player.classType.toLowerCase() +
      ".jpg' class='img-avatar'><div  class='portfolio'><h3 class='hero__type'>" +
      player.classType +
      ' <span class="lvl">Level: </span><span class="actual-lvl">' +
      player.level +
      '</span></h3><p class=" health-player player-stat">Health:  ' +
      player.maxHP +
      '<span class="input-span"><button class="decrease btn__input">&#8722</button><input class="number-input" id="hp" step="25" type="number" value="0" disabled><button class="increase btn__input">&#43</button></span></p><p class="player-stat">Mana: ' +
      player.mana +
      '<span class="input-span"><button class="decrease btn__input">&#8722</button><input class="number-input" id="mp" step="20" type="number" value="0" disabled><button class="increase btn__input">&#43</button></span></p><p class="player-stat">Strength: ' +
      player.strength +
      '<span class="input-span"><button class="decrease btn__input">&#8722</button><input class="number-input" id="str" step="5" type="number" value="0" disabled><button class="increase btn__input">&#43</button></span></p><p class="player-stat">Agility: ' +
      player.agility +
      '<span class="input-span"><button class="decrease btn__input">&#8722</button><input class="number-input" id="str" step="5" type="number" value="0" disabled><button class="increase btn__input">&#43</button></span></p><p class="player-stat">Intelligence: ' +
      player.intelligence +
      '<span class="input-span"><button class="decrease btn__input">&#8722</button><input class="number-input" id="str" step="5" type="number" value="0" disabled><button class="increase btn__input">&#43</button></span></p><p class="player-stat">Speed: ' +
      player.speed +
      '<span class="input-span"><button class="decrease btn__input">&#8722</button><input class="number-input" id="str" step="1" type="number" value="0" disabled><button class="increase btn__input">&#43</button></span></p><p class="player-stat">Defense: ' +
      player.defense +
      `<span class="input-span"><button class="decrease btn__input">&#8722</button><input class="number-input" id="str" step="1.5" type="number" value="0" disabled><button class="increase btn__input">&#43</button></span></p><p class="total-points">Available points: <input class="total" type="number" id="totalN" disabled></input></p> <div class="question-field"><i class="ri-question-line question"></i><div class="question__tab"><p class="statP">${player.level > 14 ? 35 : 25} HP for 1 point</p><p class="statP">${player.level > 14 ? 30 : 20} MP for 1 point</p><p class="statP">${player.level > 14 ? 8 : 5} STR for 1 point</p><p class="statP">${player.level > 14 ? 8 : 5} AGI for 1 point</p><p class="statP">${player.level > 14 ? 8 : 5} INT for 1 point</p><p class="statP">${player.level > 14 ? 1.2 : 1} SPD for 1 point</p><p class="statP">${player.level > 14 ? 3 : 1} DEF for 1 point</p></div></div></div>`

    questionMenu()
    playerLvlUp()
  },

  playerLvl() {
    const statsInput = document.querySelectorAll('.number-input')
    let getInterface = document.querySelector('.interface')
    let getAction = document.querySelector('.actions')

    if(player.level <=14) {
      player.level += 1
      player.health = player.maxHP + statsInput[0].value * 25
      player.maxHP += statsInput[0].value * 25
      player.mana += statsInput[1].value * 20

      player.strength += statsInput[2].value * 5
      player.agility += statsInput[3].value * 5
      player.intelligence += statsInput[4].value * 5

      player.speed += statsInput[5].value * 1
      player.defense += statsInput[6].value * 2.5
    } else if(player.level >= 15) {
      player.level += 1
      player.health = player.maxHP + statsInput[0].value * 35
      player.maxHP += statsInput[0].value * 35
      player.mana += statsInput[1].value * 30

      player.strength += statsInput[2].value * 8
      player.agility += statsInput[3].value * 8
      player.intelligence += statsInput[4].value * 8
      
      player.speed += statsInput[5].value * 1.2
      player.defense += statsInput[6].value * 3
    }
    getInterface.innerHTML =
    "<img src='img/" +
    player.classType.toLowerCase() +
    ".jpg' class='img-avatar'><div class='portfolio'><h3 class='hero__type'>" +
    player.classType +
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
    '</p>'

  getAction.innerHTML =
    '<button class="btn__prefight btn" onclick="GameManager.setFight()"><img class="abilityImg" src="img/skills/magnifier.svg" alt="">Search for enemy</button>'
  }
}

