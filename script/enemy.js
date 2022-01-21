let enemy

let beatenEnemy = ['']
let defeatedEnemies = function (enemyType) {
  beatenEnemy.push(enemyType)
}

class Enemy {
  constructor (enemyType,mainStat,level,health,mana,strength,agility,intelligence,speed,defense) {
  this.enemyType = enemyType
  this.mainStat = mainStat
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
enemyLvl() {
  if (enemy.level <= 10) {
      enemy.level = beatenEnemy.length
      enemy.maxHP = enemy.health + enemy.health * beatenEnemy.length * 0.10
      enemy.health = enemy.maxHP
      enemy.mana += enemy.mana * beatenEnemy.length * 0.2
      if(enemy.mainStat == 'Strength') {
        enemy.strength += enemy.strength * (beatenEnemy.length * 0.10)
        enemy.agility += enemy.agility * (beatenEnemy.length * 0.05)
        enemy.intelligence += enemy.intelligence * (beatenEnemy.length * 0.02)
      } else if(enemy.mainStat == 'Agility') {
        enemy.strength += enemy.strength * (beatenEnemy.length * 0.05)
        enemy.agility += enemy.agility * (beatenEnemy.length * 0.10)
        enemy.intelligence += enemy.intelligence * (beatenEnemy.length * 0.02)
      } else {
        enemy.strength += enemy.strength * (beatenEnemy.length * 0.05)
        enemy.agility += enemy.agility * (beatenEnemy.length * 0.02)
        enemy.intelligence += enemy.intelligence * (beatenEnemy.length * 0.10)
      }
      enemy.speed = enemy.speed + beatenEnemy.length
      enemy.defense = enemy.defense + beatenEnemy.length * 2.5
    
    } else if (enemy.level <= 20) {
      enemy.level = beatenEnemy.length
      enemy.maxHP = enemy.health + enemy.health * beatenEnemy.length * 0.14
      enemy.health = enemy.maxHP
      enemy.mana = enemy.mana * beatenEnemy.length * 0.5

      if(enemy.mainStat == 'Strength') {
        enemy.strength += enemy.strength * (beatenEnemy.length * 0.14)
        enemy.agility += enemy.agility * (beatenEnemy.length * 0.07)
        enemy.intelligence += enemy.intelligence * (beatenEnemy.length * 0.04)
      } else if(enemy.mainStat == 'Agility') {
        enemy.strength += enemy.strength * (beatenEnemy.length * 0.07)
        enemy.agility += enemy.agility * (beatenEnemy.length * 0.14)
        enemy.intelligence += enemy.intelligence * (beatenEnemy.length * 0.04)
      } else {
        enemy.strength += enemy.strength * (beatenEnemy.length * 0.07)
        enemy.agility += enemy.agility * (beatenEnemy.length * 0.04)
        enemy.intelligence += enemy.intelligence * (beatenEnemy.length * 0.14)
      }

      enemy.speed = enemy.speed + beatenEnemy.length + 0.2
      enemy.defense += enemy.defense * beatenEnemy.length * 2.85
    } else if (enemy.lvl >= 21) {
      enemy.level = beatenEnemy.length
      enemy.maxHP = enemy.health + enemy.health * beatenEnemy.length * 0.18
      enemy.health = enemy.maxHP
      enemy.mana = enemy.mana * beatenEnemy.length * 0.8

      if(enemy.mainStat == 'Strength') {
        enemy.strength += enemy.strength * (beatenEnemy.length * 0.18)
        enemy.agility += enemy.agility * (beatenEnemy.length * 0.09)
        enemy.intelligence += enemy.intelligence * (beatenEnemy.length * 0.06)
      } else if(enemy.mainStat == 'Agility') {
        enemy.strength += enemy.strength * (beatenEnemy.length * 0.09)
        enemy.agility += enemy.agility * (beatenEnemy.length * 0.18)
        enemy.intelligence += enemy.intelligence * (beatenEnemy.length * 0.06)
      } else {
        enemy.strength += enemy.strength * (beatenEnemy.length * 0.09)
        enemy.agility += enemy.agility * (beatenEnemy.length * 0.06)
        enemy.intelligence += enemy.intelligence * (beatenEnemy.length * 0.18)
      }

      enemy.speed = enemy.speed + beatenEnemy.length + 0.4
      enemy.defense += enemy.defense * beatenEnemy.length * 3.15
  }
}
 enemyLvlUpdate() {
  const getEnemy = document.querySelector('.enemy')

  getEnemy.innerHTML =
        "<img src='img/" +
        enemy.enemyType.toLowerCase() +
        ".jpg' class='img-avatar'><div><h3>" +
        enemy.enemyType +
        ' <span class="lvl">Level: </span><span class="actual-lvl">' +
        enemy.level +
        '</span></h3><p class="health-enemy enemy-stat">Health: ' +
        Math.round(enemy.maxHP * 100)/ 100 +
        '</p><p class="enemy-stat">Mana: ' +
        Math.round(enemy.mana * 100)/ 100 +
        '</p><p class="enemy-stat">Strength: ' +
        Math.round(enemy.strength * 100)/ 100 +
        '</p><p class="enemy-stat">Agility: ' +
        Math.round(enemy.agility * 100)/ 100 +
        '</p><p class="enemy-stat">Intelligence: ' +
        Math.round(enemy.intelligence * 100)/ 100 +
        '</p><p class="enemy-stat">Speed: ' +
        Math.round(enemy.speed * 100)/ 100 +
        '</p><p class="enemy-stat">Defense: ' +
        Math.round(enemy.defense * 100)/ 100 +
        '</p></div>'
 }
}

const enemyDmg = function () {
  let calcPhysicalDmg
  let calcMageDmg
  let calcAgilityDmg

  // AGILITY
  if (enemy.mainStat == 'Agility') {
    calcPhysicalDmg = 0
    calcAgilityDmg =
      Math.round(
        ((enemy.agility * enemy.speed) / 250 / (0.048 * player.defense)) * 100
      ) / 100
    calcMageDmg = 0
  }
  // MAGE
  else if (enemy.mainStat == 'Mage') {
    calcMageDmg =
      Math.round(
        ((enemy.intelligence * enemy.mana) / 1000 / (0.048 * player.defense)) *
          100
      ) / 100
    calcPhysicalDmg = 0
    calcAgilityDmg = 0
  } 
  //STRENGTH
  else if (enemy.mainStat == 'Strength') {
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

  let attackValue = [calcOutputDmg.toFixed(2)]
  return attackValue
}

class EnemyBoss extends Enemy {
  constructor (enemyType,mainStat,level,health,mana,strength,agility,intelligence,speed,defense,boss) {
    super(enemyType,mainStat,level,health,mana,strength,agility,intelligence,speed,defense)
    this.boss = boss
}}

const finalBoss = function () {
  const getEnemy = document.querySelector('.enemy')

  let boss00 = new EnemyBoss('Mirror man','Agility', 1, 4300, 1400, 15, 15, 550, 95, 70, 'Boss')
  let boss01 = new EnemyBoss('Shark', 'Strength', 1, 4500, 0, 550, 10, 20, 85, 80, 'Boss')

  let chooseRandomBoss = Math.floor(Math.random() * 1) +1
  switch (chooseRandomBoss) {
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
  resultBoss()
}


