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

  let type = enemy.enemyType

  // AGILITY
  if (
    type == 'Slime' ||
    type == 'Basilisk' ||
    type == 'Mummy' ||
    type == 'Skelet archer' ||
    type == 'Pirate' ||
    type == 'Raven mocker'
  ) {
    calcPhysicalDmg = 0
    calcAgilityDmg =
      Math.round(
        ((enemy.agility * enemy.speed) / 250 / (0.048 * player.defense)) * 100
      ) / 100
    calcMageDmg = 0
  }
  // MAGE
  else if (type == 'Witch' || type == 'Doomspeaker') {
    calcMageDmg =
      Math.round(
        ((enemy.intelligence * enemy.mana) / 1000 / (0.048 * player.defense)) *
          100
      ) / 100
    calcPhysicalDmg = 0
    calcAgilityDmg = 0
  } //full STRENGTH
  else if (
    type == 'Gator' ||
    type == 'Goblin' ||
    type == 'Tendriculos' ||
    type == 'Enforcer' ||
    type == 'Boar warrior' ||
    type == 'Henchman' ||
    type == 'Skelet warrior'
  ) {
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
  alert('Careful! You have reached the Final boss! Good luck!')
  let getEnemy = document.querySelector('.enemy')

  let boss00 = new Enemy('Mirror man', 1, 4200, 1400, 15, 15, 500, 95, 45)
  let boss01 = new Enemy('Shark', 1, 4300, 0, 500, 10, 20, 85, 55)

  let chooseRandomEnemy = Math.floor(Math.random() * 2)
  switch (chooseRandomEnemy) {
    case 0:
      enemy = boss00
      break
    case 1:
      enemy = boss01
      break
  }

  getEnemy.innerHTML =
    "<img src='img/" +
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
