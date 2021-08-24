let gameManager = {
  setGameStart: function (classType) {
    this.resetPlayer(classType)
    this.setPreFight()
  },

  resetPlayer: function (classType) {
    switch (classType) {
      case 'Warrior':
        player = new Player('Warrior', 250, 0, 200, 10, 5, 92, 75)
        break
      case 'Druid':
        player = new Player('Druid', 225, 75, 100, 15, 100, 95, 50)
        break
      case 'Wizard':
        player = new Player('Wizard', 180, 200, 10, 30, 200, 93, 30)
        break
      case 'Bard':
        player = new Player('Bard', 185, 200, 15, 30, 195, 98, 30)
        break
    }
    let getInterface = document.querySelector('.interface')
    getInterface.innerHTML =
      "<img src='img/" +
      classType.toLowerCase() +
      ".jpg' class='img-avatar'><div><h3>" +
      classType +
      '</h3><p class="health-player">Health: ' +
      player.health +
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
    getHeader.innerHTML = '<p>Task: Find an enemy!</p>'
    getArena.style.visibility = 'visible'
    getAction.innerHTML =
      '<a href="#" class="btn__prefight" onclick="gameManager.setFight()">Search for enemy!</a> <a href="/" class="btn__goback" onclick="gameManager.setFight()">Back to heroes</a>'
  },

  setFight: function () {
    let getHeader = document.querySelector('.header')
    let getAction = document.querySelector('.actions')
    let getEnemy = document.querySelector('.enemy')

    // CREATE ENEMY

    let enemy00 = new Enemy('Goblin', 150, 0, 150, 25, 10, 90, 45)
    let enemy01 = new Enemy('Slime', 125, 0, 27, 150, 20, 85, 15)
    let enemy02 = new Enemy('Gator', 175, 0, 150, 10, 20, 85, 40)

    let chooseRandomEnemy = Math.floor(Math.random() * 3)
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
    }
    getHeader.innerHTML = '<p>Task: Defeat your enemy!</p>'

    let heroes = function () {
      if (player.classType == 'Bard') {
        getAction.innerHTML =
          '<a href="#" class="btn__attack" onclick="PlayerMoves.calcAttack()">Attack!</a> <a href="#" class="btn__heal" onclick="PlayerMoves.calcHeal()">Heal!</a>'
      } else {
        getAction.innerHTML =
          '<a href="#" class="btn__attack" onclick="PlayerMoves.calcAttack()">Attack!</a> <a href="#" class="btn__block" onclick="PlayerMoves.calcBlock()">Block!</a>'
      }
    }
    heroes(player.classType)

    getEnemy.innerHTML =
      "<img src='img/enemies/" +
      enemy.enemyType.toLowerCase() +
      ".jpg' class='img-avatar'><div><h3>" +
      enemy.enemyType +
      '</h3><p class="health-enemy">Health: ' +
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
  },
}
