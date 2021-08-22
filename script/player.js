let player

function Player(
  classType,
  health,
  mana,
  strength,
  agility,
  intelligence,
  speed,
  resistance,
  defense
) {
  this.classType = classType
  this.health = health
  this.mana = mana
  this.strength = strength
  this.agility = agility
  this.intelligence = intelligence
  this.speed = speed
  this.resistance = resistance
  this.defense = defense
}

let PlayerMoves = {
  calcAttack: function () {
    // who attacks first?
    getPlayerSpeed = player.speed
    getEnemySpeed = enemy.speed

    // PLAYERaTTACK
    let playerAttack = function () {
      let calcPhysicalDmg
      let calcMageDmg

      if (player.mana <= 30) {
        calcPhysicalDmg = (player.strength * player.defense) / 500
        calcMageDmg = 0
      } else if (player.mana >= 35 && player.mana <= 150) {
        calcPhysicalDmg = (player.strength * player.defense) / 500
        calcMageDmg = (player.intelligence * player.mana) / 1000
      } else if (player.mana >= 190) {
        calcMageDmg = (player.intelligence * player.mana) / 1000
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
    let enemyAttack = function () {
      let calcPhysicalDmg
      let calcMageDmg

      if (enemy.mana <= 30) {
        calcPhysicalDmg = (enemy.strength * enemy.defense) / 500
        calcmageDmg = 0
      } else if (enemy.mana >= 35 && enemy.mana <= 150) {
        calcPhysicalDmg = (enemy.strength * enemy.defense) / 500
        calcMageDmg = (enemy.intelligence * enemy.mana) / 1000
      } else if (enemy.mana >= 190) {
        calcMageDmg = (enemy.intelligence * enemy.mana) / 1000
        calcPhysicalDmg = 0
      } else {
        return
      }
      let offsetDmg = Math.floor(Math.random() * 5)
      let calcOutputDmg = offsetDmg + calcMageDmg + calcPhysicalDmg

      let attackValue = [calcOutputDmg]
      return attackValue
    }

    let getPlayerHealth = document.querySelector('.health-player')
    let getEnemyHealth = document.querySelector('.health-enemy')

    // /////////////initiate attack!
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
        getPlayerHealth.innerHTML = 'Health: ' + player.health
      } else {
        getEnemyHealth.innerHTML = 'Health: ' + enemy.health

        // //////////////////////////ENEMY ATTACKS

        let enemyAttackValues = enemyAttack()
        // AWAITING FOR MULTIPLY HITs
        let totalDmg = enemyAttackValues
        player.health = player.health - totalDmg

        alert(
          enemy.enemyType +
            'dealt ' +
            enemyAttackValues +
            ' damage to the ' +
            player.classType
        )

        if (player.health <= 0) {
          alert('You lose! Refresh browser to play again.')
          getPlayerHealth.innerHTML = 'Health: 0'
          getEnemyHealth.innerHTML = 'Health: ' + enemy.health
        } else {
          getPlayerHealth.innerHTML = 'Health: ' + player.health
        }
      }
    } else if (getPlayerSpeed <= getEnemySpeed) {
      let enemyAttackValues = enemyAttack()

      // AWAITING FOR MULTIPLY HITs
      let totalDmg = enemyAttackValues
      player.health = player.health - totalDmg

      alert(
        'You dealt ' + enemyAttackValues + ' damage to the ' + player.classType
      )

      if (player.health <= 0) {
        alert('You lose! Refresh browser to play again.')
        getPlayerHealth.innerHTML = 'Health: 0'
        getEnemyHealth.innerHTML = 'Health: ' + enemy.health
      } else {
        getPlayerHealth.innerHTML = 'Health: ' + player.health

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
          getPlayerHealth.innerHTML = 'Health: ' + player.health
        } else {
          getEnemyHealth.innerHTML = 'Health: ' + enemy.health
        }
      }
    }
  },
}
