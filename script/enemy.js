let enemy

let beatenEnemy = ['enemy']
let defeatedEnemies = function (enemyType) {
  beatenEnemy.push(enemyType)
}

function Enemy(
  enemyType,
  level,
  health,
  mana,
  strength,
  agility,
  intelligence,
  speed,
  defense
) {
  this.enemyType = enemyType
  this.level = level
  this.health = health
  this.mana = mana

  this.strength = strength
  this.agility = agility
  this.intelligence = intelligence

  this.speed = speed
  this.defense = defense

  this.maxHP = health
}

const enemyDmg = function () {
  let calcPhysicalDmg
  let calcMageDmg
  let calcAgilityDmg

  // AGILITY
  if (enemy.agility >= 50) {
    calcPhysicalDmg = 0
    calcAgilityDmg =
      Math.round(
        ((enemy.agility * enemy.speed) / 250 / (0.048 * player.defense)) * 100
      ) / 100
    calcMageDmg = 0
  } // GIBRID
  else if (enemy.mana >= 35 && enemy.mana <= 150) {
    calcAgilityDmg = 0
    calcPhysicalDmg =
      Math.round(
        ((enemy.strength * enemy.defense) / 250 / (0.048 * player.defense)) *
          100
      ) / 100
    calcMageDmg =
      Math.round(
        ((enemy.intelligence * enemy.mana) / 1000 / (0.048 * player.defense)) *
          100
      ) / 100
  } // MAGE
  else if (enemy.mana >= 190) {
    calcMageDmg =
      Math.round(
        ((enemy.intelligence * enemy.mana) / 1000 / (0.048 * player.defense)) *
          100
      ) / 100
    calcPhysicalDmg = 0
    calcAgilityDmg = 0
  } //full STRENGTH
  else if (enemy.mana <= 30 && enemy.strength >= 50) {
    calcAgilityDmg = 0
    calcPhysicalDmg =
      Math.round(
        ((enemy.strength * enemy.defense) / 250 / (0.048 * player.defense)) *
          100
      ) / 100
    calcMageDmg = 0
  } else {
    return
  }

  let offsetDmg = Math.floor(Math.random() * Math.floor(5))
  let calcOutputDmg = offsetDmg + calcMageDmg + calcPhysicalDmg + calcAgilityDmg

  let attackValue = [calcOutputDmg]
  return attackValue
}

const finalBoss = function () {
  let getEnemy = document.querySelector('.enemy')

  let enemy00 = new Enemy('Gator', 1, 17500, 0, 150, 10, 20, 85, 40)

  let chooseRandomEnemy = Math.floor(Math.random() * 1)
  switch (chooseRandomEnemy) {
    case 0:
      enemy = enemy00
      break
  }

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
}
