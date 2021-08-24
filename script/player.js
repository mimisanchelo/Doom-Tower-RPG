let player

function Player(
  classType,
  health,
  mana,
  strength,
  agility,
  intelligence,
  speed,
  defense
) {
  this.classType = classType
  this.health = health
  this.mana = mana

  this.strength = strength
  this.agility = agility
  this.intelligence = intelligence

  this.speed = speed
  this.defense = defense

  this.maxHP = health
}

let PlayerMoves = {
  calcAttack: function () {
    // who attacks first?
    getPlayerSpeed = player.speed
    getEnemySpeed = enemy.speed

    // PLAYER ATTACK
    let playerAttack = function () {
      let calcPhysicalDmg
      let calcMageDmg

      if (player.mana <= 30) {
        calcPhysicalDmg =
          Math.round(
            ((player.strength * player.defense) /
              250 /
              (0.048 * enemy.defense)) *
              100
          ) / 100

        calcMageDmg = 0
      } else if (player.mana >= 35 && player.mana <= 150) {
        calcPhysicalDmg =
          Math.round(
            ((player.strength * player.defense) /
              250 /
              (0.048 * enemy.defense)) *
              100
          ) / 100
        calcMageDmg =
          Math.round(
            ((player.intelligence * player.mana) /
              1000 /
              (0.048 * enemy.defense)) *
              100
          ) / 100
      } else if (player.mana >= 190) {
        calcMageDmg =
          Math.round(
            ((player.intelligence * player.mana) /
              1000 /
              (0.048 * enemy.defense)) *
              100
          ) / 100
        calcPhysicalDmg = 0
      } else {
        return
      }
      let offsetDmg = Math.floor(Math.random() * 5)
      let calcOutputDmg = offsetDmg + calcMageDmg + calcPhysicalDmg

      let attackValue = calcOutputDmg
      return attackValue
    }

    // ENEMY ATTACK
    enemyDmg()

    let getPlayerHealth = document.querySelector('.health-player')
    let getEnemyHealth = document.querySelector('.health-enemy')

    // /////////////  FIGHT PROCESS
    if (getPlayerSpeed >= getEnemySpeed) {
      let playerAttackValues = playerAttack()

      // AWAITING FOR MULTIPLY HITs
      let totalDmg = playerAttackValues
      enemy.health = enemy.health - totalDmg

      alert(
        'You dealt ' + playerAttackValues + ' damage to the ' + enemy.enemyType
      )

      if (enemy.health <= 0) {
        alert('You win! Refresh browser to play again.')
        getEnemyHealth.innerHTML = 'Health: 0'
        getPlayerHealth.innerHTML =
          'Health: ' + Math.round(player.health * 100) / 100
      } else {
        getEnemyHealth.innerHTML =
          'Health: ' + Math.round(enemy.health * 100) / 100

        // //////////////////////////ENEMY ATTACKS

        let enemyAttackValues = enemyDmg()
        // AWAITING FOR MULTIPLY HITs
        let totalDmg = enemyAttackValues
        player.health = player.health - totalDmg

        alert(
          enemy.enemyType +
            ' dealt ' +
            enemyAttackValues +
            ' damage to the ' +
            player.classType
        )

        if (player.health <= 0) {
          alert('You lose! Refresh browser to play again.')
          getPlayerHealth.innerHTML = 'Health: 0'
          getEnemyHealth.innerHTML =
            'Health: ' + Math.round(enemy.health * 100) / 100
        } else {
          getPlayerHealth.innerHTML =
            'Health: ' + Math.round(player.health * 100) / 100
        }
      }
    } else if (getPlayerSpeed <= getEnemySpeed) {
      let enemyAttackValues = enemyAttack()

      // AWAITING FOR MULTIPLY HITs
      let totalDmg = enemyAttackValues
      player.health = player.health - totalDmg

      alert(
        enemy.enemyType +
          ' dealt ' +
          enemyAttackValues +
          ' damage to the ' +
          player.classType
      )

      if (player.health <= 0) {
        alert('You lose! Refresh browser to play again.')
        getPlayerHealth.innerHTML = 'Health: 0'
        getEnemyHealth.innerHTML =
          'Health: ' + Math.round(enemy.health * 100) / 100
      } else {
        getPlayerHealth.innerHTML =
          'Health: ' + Math.round(player.health * 100) / 100

        // //////////////////////////ENEMY ATTACKS

        let playerAttackValues = playerAttack()
        // AWAITING FOR MULTIPLY HITs
        let totalDmg = playerAttackValues
        enemy.health = enemy.health - totalDmg

        alert(
          'You dealt ' +
            enemyAttackValues +
            ' damage to the ' +
            player.classType
        )

        if (enemy.health <= 0) {
          alert('You win! Refresh browser to play again.')
          getEnemyHealth.innerHTML = 'Health: 0'
          getPlayerHealth.innerHTML =
            'Health: ' + Math.round(player.health * 100) / 100
        } else {
          getEnemyHealth.innerHTML =
            'Health: ' + Math.round(enemy.health * 100) / 100
        }
      }
    }
  },

  ////////////////////////////////////////////////////////////////////////////
  calcBlock: function () {
    // who attacks first?
    getPlayerSpeed = player.speed
    getEnemySpeed = enemy.speed
    enemyDmg()

    let playerBlock = function () {
      let calcBlockDmg
      let enemyAttackValues = enemyDmg()

      if (player.defense) {
        calcBlockDmg = (enemyAttackValues * 20) / 100
      } else {
        return
      }
      return calcBlockDmg
    }

    // ////////////////////////////////////////

    // FIGHT BLOCK

    let getPlayerHealth = document.querySelector('.health-player')
    let getEnemyHealth = document.querySelector('.health-enemy')

    if (getPlayerSpeed >= getEnemySpeed) {
      let playerBlockValues = playerBlock()

      let totalDmg = Math.floor(playerBlockValues * 100) / 100

      player.health = player.health - totalDmg

      // NOTIFICATION WHEN BLOCK

      alert('You blocked ' + totalDmg + ' damage')

      // HEALTH CONDITION
      if (player.health <= 0) {
        alert('You lose! Refresh browser to play again.')
        getPlayerHealth.innerHTML = 'Health: 0'
        getEnemyHealth.innerHTML =
          'Health: ' + Math.round(enemy.health * 100) / 100
      } else {
        getPlayerHealth.innerHTML =
          'Health: ' + Math.round(player.health * 100) / 100
      }
    } else if (getPlayerSpeed <= getEnemySpeed) {
      let playerBlockValues = playerBlock()

      let totalDmg = Math.floor(playerBlockValues * 100) / 100

      player.health = player.health - totalDmg

      // NOTIFICATION WHEN BLOCK

      alert('You blocked ' + totalDmg + ' damage')

      // HEALTH CONDITION
      if (player.health <= 0) {
        alert('You lose! Refresh browser to play again.')
        getPlayerHealth.innerHTML = 'Health: 0'
        getEnemyHealth.innerHTML =
          'Health: ' + Math.round(enemy.health * 100) / 100
      } else {
        getPlayerHealth.innerHTML =
          'Health: ' + Math.round(player.health * 100) / 100
      }
    }
  },

  /////////////////////////////////////////////////////////////////////////
  calcHeal: function () {
    getPlayerSpeed = player.speed
    getEnemySpeed = enemy.speed

    let maxHeroHP = player.maxHP

    let getPlayerHealth = document.querySelector('.health-player')
    let getEnemyHealth = document.querySelector('.health-enemy')

    let playerHeal = function () {
      let getEnemyDmg = enemyDmg()
      let calcHealedHP

      if (player.health < maxHeroHP) {
        calcHealedHP = Math.round(
          ((player.intelligence * player.mana) / player.maxHP / 80) * 10
        )
        player.health = player.health + calcHealedHP - getEnemyDmg

        if (player.health >= maxHeroHP) {
          player.health = maxHeroHP
        }
      } else if (player.health >= maxHeroHP) {
        if (calcHealedHP < getEnemyDmg) {
          calcHealedHP = Math.round(
            ((player.intelligence * player.mana) / player.maxHP / 80) * 10
          )
          player.health = maxHeroHP + calcHealedHP - getEnemyDmg
        } else {
          calcHealedHP = Math.round(
            ((player.intelligence * player.mana) / player.maxHP / 80) * 10
          )
          player.health = maxHeroHP
        }
      }

      let totalHealed = Math.floor((calcHealedHP - getEnemyDmg) * 100) / 100

      return totalHealed
    }

    // ROUND HEALING

    if (getPlayerSpeed >= getEnemySpeed) {
      let enemyAttackValues = enemyDmg()
      let playerHealValues = playerHeal()

      let calcHealedHP = Math.round(
        ((player.intelligence * player.mana) / player.maxHP / 80) * 10
      )

      // HEALTH CONDITON
      if (player.health <= 0) {
        alert('You lose! Refresh browser to play again.')
        getPlayerHealth.innerHTML = 'Health: 0'
        getEnemyHealth.innerHTML =
          'Health: ' + Math.round(enemy.health * 100) / 100
      } else if (player.health >= maxHeroHP) {
        if (calcHealedHP < enemyAttackValues) {
          calcHealedHP = Math.round(
            ((player.intelligence * player.mana) / player.maxHP / 80) * 10
          )
          player.health = maxHeroHP + playerHealValues
          getPlayerHealth.innerHTML =
            'Health: ' + Math.round(player.health * 100) / 100
          alert(
            'Enemy dealt more dmg than you healed. You restored ' +
              playerHealValues
          )
          alert('Enemy dealt ' + enemyAttackValues)
        } else if (calcHealedHP > enemyAttackValues) {
          calcHealedHP = Math.round(
            ((player.intelligence * player.mana) / player.maxHP / 80) * 10
          )
          player.health = maxHeroHP
          getPlayerHealth.innerHTML =
            'Health: ' + Math.round(player.health * 100) / 100
          alert('Enemy dealt ' + enemyAttackValues)
          alert(
            'You restored ' +
              playerHealValues +
              'after enemy`s hit. You health is full.'
          )
        }
      } else if (player.health < maxHeroHP) {
        if (calcHealedHP < enemyAttackValues) {
          calcHealedHP = Math.round(
            ((player.intelligence * player.mana) / player.maxHP / 80) * 10
          )
          player.health = player.health + playerHealValues
          getPlayerHealth.innerHTML =
            'Health: ' + Math.round(player.health * 100) / 100
          alert(
            'Enemy dealt more dmg than you healed. You restored ' +
              playerHealValues
          )
          alert('Enemy dealt ' + enemyAttackValues)
        } else if (calcHealedHP > enemyAttackValues) {
          calcHealedHP = Math.round(
            ((player.intelligence * player.mana) / player.maxHP / 80) * 10
          )
          getPlayerHealth.innerHTML =
            'Health: ' + Math.round(player.health * 100) / 100
          alert('Enemy dealt ' + enemyAttackValues)
          alert(
            'You restored ' +
              playerHealValues +
              'after enemy`s hit. You health is full.'
          )
        }
      }
    }
  },
}
