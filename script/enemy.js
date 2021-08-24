let enemy

function Enemy(
  enemyType,
  health,
  mana,
  strength,
  agility,
  intelligence,
  speed,
  defense
) {
  this.enemyType = enemyType
  this.health = health
  this.mana = mana

  this.strength = strength
  this.agility = agility
  this.intelligence = intelligence

  this.speed = speed
  this.defense = defense
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
