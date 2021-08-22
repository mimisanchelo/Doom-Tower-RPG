let gameManager = {
  setGameStart: function (classType) {
    this.resetPlayer(classType)
    this.setPreFight()
  },

  resetPlayer: function (classType) {
    switch (classType) {
      case 'Warrior':
        player = new Player('Warrior', 250, 0, 200, 10, 5, 92, 50, 75)
        break
      case 'Druid':
        player = new Player('Druid', 225, 75, 100, 15, 100, 95, 75, 50)
        break
      case 'Wizard':
        player = new Player('Wizard', 180, 200, 10, 30, 200, 93, 75, 25)
        break
      case 'Bard':
        player = new Player('Bard', 185, 200, 15, 30, 195, 98, 85, 15)
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
      '</p><p>Resistance: ' +
      player.resistance +
      '</p><p>Defense: ' +
      player.defense +
      '</p></div>'
  },

  setPreFight: function () {
    let getHeader = document.querySelector('.header')
    let getAction = document.querySelector('.actions')
    let getArena = document.querySelector('.arena')
    getHeader.innerHTML = '<p>Task: Find an enemy!</p>'
    getAction.innerHTML =
      '<a href="#" class="btn__prefight" onclick="gameManager.setFight()">Search for enemy!</a>'
    getArena.style.visibility = 'visible'
  },

  setFight: function () {
    let getHeader = document.querySelector('.header')
    let getAction = document.querySelector('.actions')
    let getEnemy = document.querySelector('.enemy')

    // CREATE ENEMY

    let enemy00 = new Enemy('Goblin', 100, 0, 100, 50, 0, 85, 15, 35)
    let enemy01 = new Enemy('Slime', 100, 0, 30, 100, 20, 85, 35, 15)
    let enemy02 = new Enemy('Gator', 100, 0, 30, 100, 20, 85, 35, 15)

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

    getAction.innerHTML =
      '<a href="#" class="btn__attack" onclick="PlayerMoves.calcAttack()">Attack!</a> <a href="#" class="btn__block" onclick="PlayerMoves.calcBlock()">Block!</a>'

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
      '</p><p>Resistance: ' +
      enemy.resistance +
      '</p><p>Defense: ' +
      enemy.defense +
      '</p></div>'
  },
}
