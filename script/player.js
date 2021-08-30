let player

function Player(
  classType,
  level,
  health,
  mana,
  strength,
  agility,
  intelligence,
  speed,
  defense
) {
  this.classType = classType
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

let playerAttack = function () {
  let calcPhysicalDmg
  let calcMageDmg

  // FULL STRENGTH
  if (player.classType == 'Warrior') {
    calcPhysicalDmg =
      Math.round(
        ((player.strength * player.defense) / 250 / (0.048 * enemy.defense)) *
          100
      ) / 100

    calcMageDmg = 0

    // gibrid
  } else if (player.classType == 'Druid') {
    calcPhysicalDmg =
      Math.round(
        ((player.strength * player.defense) / 250 / (0.048 * enemy.defense)) *
          100
      ) / 100
    calcMageDmg =
      Math.round(
        ((player.intelligence * player.mana) / 1000 / (0.048 * enemy.defense)) *
          100
      ) / 100

    // MANA BASE CHAMP
  } else if (player.classType == 'Wizard' || player.classType == 'Priest') {
    calcMageDmg =
      Math.round(
        ((player.intelligence * player.mana) / 1000 / (0.048 * enemy.defense)) *
          100
      ) / 100
    calcPhysicalDmg = 0
  }

  let offsetDmg = Math.floor(Math.random() * 5)
  let calcOutputDmg = offsetDmg + calcMageDmg + calcPhysicalDmg

  let attackValue = calcOutputDmg
  return attackValue
}

let PlayerMoves = {
  calcAttack: function () {
    let notification1 = document.querySelector('.not1')
    let notification2 = document.querySelector('.not2')
    notify()

    getPlayerSpeed = player.speed
    getEnemySpeed = enemy.speed
    let getAction = document.querySelector('.actions')

    // PLAYER ATTACK
    playerAttack()

    // ENEMY ATTACK
    enemyDmg()

    let getPlayerHealth = document.querySelector('.health-player')
    let getEnemyHealth = document.querySelector('.health-enemy')

    // ////////////////////////////////////////////////////////////////////////  FIGHT ROUND
    // HIT CHANCE

    //SPEED CONDIITON
    if (getPlayerSpeed >= getEnemySpeed) {
      let calcHitLand = Math.round(Math.random() * 100)
      let calcEnemyHitLand = Math.round(Math.random() * 100)

      let calcLifesteal
      let playerAttackValues = playerAttack()

      // IF Player`s HIT LANDED
      if (calcHitLand <= 89) {
        let totalDmg = playerAttackValues
        enemy.health = enemy.health - totalDmg

        // DRUID LIFESTEAL
        if (player.classType == 'Druid') {
          calcLifesteal = Math.round(playerAttackValues * 0.3 * 100) / 100

          if (player.health < player.maxHP) {
            player.health = player.health + calcLifesteal
            if (player.health >= player.maxHP) {
              player.health = player.maxHP
            }
          } else if (player.health >= player.maxHP) {
            player.health = player.maxHP
          }
          notification1.textContent =
            'You dealt ' +
            playerAttackValues +
            ' damage to the ' +
            enemy.enemyType +
            ' and restored ' +
            calcLifesteal +
            ' health'
        } else {
          notification1.textContent =
            'You dealt ' +
            playerAttackValues +
            ' damage to the ' +
            enemy.enemyType
        }
        // health condition
        if (enemy.health <= 0) {
          alert('You win! Move to the next floor! Quickly!')

          getEnemyHealth.innerHTML = 'Health: 0'
          getPlayerHealth.innerHTML =
            'Health: ' + Math.round(player.health * 100) / 100

          // btn
          getAction.innerHTML =
            '<a href="#" class="btn__next btn" onclick="gameManager.staircase()">Next floor!</a>'

          // score
          defeatedEnemies(enemy.enemyType)
        } else {
          getEnemyHealth.innerHTML =
            'Health: ' + Math.round(enemy.health * 100) / 100

          ///////////////////// ENEMY`S HIT CHANCE

          if (calcEnemyHitLand <= 89) {
            let enemyAttackValues = enemyDmg()

            let totalDmg = enemyAttackValues
            player.health = player.health - totalDmg

            notification2.textContent =
              enemy.enemyType +
              ' dealt ' +
              enemyAttackValues +
              ' damage to the ' +
              player.classType

            if (player.health <= 0) {
              alert('You lose!')
              getPlayerHealth.innerHTML = 'Health: 0'
              getEnemyHealth.innerHTML =
                'Health: ' + Math.round(enemy.health * 100) / 100

              // btn
              getAction.innerHTML =
                '<a href="/" class="btn__next btn" onclick="gameManager.resetPlayer()">Back to heroes!</a>'
            } else {
              getPlayerHealth.innerHTML =
                'Health: ' + Math.round(player.health * 100) / 100
            }
          } else {
            notification2.textContent = enemy.enemyType + ' missed'
          }
        }
      } else {
        notification1.textContent = 'You missed'

        // //////////////////////////ENEMY ATTACK
        let enemyAttackValues = enemyDmg()
        //

        if (calcEnemyHitLand < 89) {
          let totalDmg = enemyAttackValues
          player.health = player.health - totalDmg

          notification2.textContent =
            enemy.enemyType +
            ' dealt ' +
            enemyAttackValues +
            ' damage to the ' +
            player.classType

          if (player.health <= 0) {
            alert('You lose!')
            getPlayerHealth.innerHTML = 'Health: 0'
            getEnemyHealth.innerHTML =
              'Health: ' + Math.round(enemy.health * 100) / 100

            // btn
            getAction.innerHTML =
              '<a href="/" class="btn__next btn"  onclick="gameManager.resetPlayer()">Back to heroes!</a>'
          } else {
            getPlayerHealth.innerHTML =
              'Health: ' + Math.round(player.health * 100) / 100
          }
        } else {
          notification2.textContent = enemy.enemyType + ' missed'
        }
      }

      /////////////////////////////////////////////////////////////////////////////////

      // // HIT CHANCE

      //SPEED CONDIITON
    } else if (getPlayerSpeed < getEnemySpeed) {
      let calcHitLand = Math.round(Math.random() * 100)
      let calcEnemyHitLand = Math.round(Math.random() * 100)

      let calcLifesteal
      let enemyEnemyValues = enemyDmg()

      // IF Player`s HIT LANDED
      if (calcEnemyHitLand < 89) {
        let totalDmg = enemyEnemyValues
        player.health = player.health - totalDmg

        notification2.textContent =
          enemy.enemyType +
          ' dealt ' +
          totalDmg +
          ' damage to the ' +
          player.classType

        if (player.health <= 0) {
          alert('You lose!')
          getPlayerHealth.innerHTML = 'Health: 0'
          getEnemyHealth.innerHTML =
            'Health: ' + Math.round(enemy.health * 100) / 100

          // BTN
          getAction.innerHTML =
            '<a href="/" class="btn__next btn" onclick="gameManager.resetPlayer()">Back to heroes!</a>'
        } else {
          getPlayerHealth.innerHTML =
            'Health: ' + Math.round(player.health * 100) / 100

          ///////////////////// Player`S HIT CHANCE

          if (calcHitLand <= 89) {
            let playerAttackValues = playerAttack()

            enemy.health = enemy.health - playerAttackValues

            // DRUID LIFESTEAL
            if (player.classType == 'Druid') {
              calcLifesteal = Math.round(playerAttackValues * 0.3 * 100) / 100

              if (player.health < player.maxHP) {
                player.health = player.health + calcLifesteal
                if (player.health >= player.maxHP) {
                  player.health = player.maxHP
                }
              } else if (player.health >= player.maxHP) {
                player.health = player.maxHP
              }

              notification1.textContent =
                'You dealt ' +
                playerAttackValues +
                ' damage to the ' +
                enemy.enemyType +
                ' and restored ' +
                calcLifesteal +
                ' health'
            } else {
              notification1.textContent =
                'You dealt ' +
                playerAttackValues +
                ' damage to the ' +
                enemy.enemyType
            }
            if (enemy.health <= 0) {
              alert('You win! Move to the next floor! Quickly!')
              getEnemyHealth.innerHTML = 'Health: 0'
              getPlayerHealth.innerHTML =
                'Health: ' + Math.round(player.health * 100) / 100

              // btn
              getAction.innerHTML =
                '<a href="#" class="btn__next btn" onclick="gameManager.staircase()">Next floor!</a>'

              // SCORE
              defeatedEnemies(enemy.enemyType)
            } else {
              getEnemyHealth.innerHTML =
                'Health: ' + Math.round(enemy.health * 100) / 100
            }
          } else {
            notification1.textContent = 'You missed!'
          }
        }
      } else {
        notification.textContent = 'Enemy missed'

        ///////////////////// Player`S HIT CHANCE

        let playerAttackValues = playerAttack()

        if (calcHitLand <= 89) {
          let totalDmg = playerAttackValues
          enemy.health = enemy.health - totalDmg

          // DRUID LIFESTEAL
          if (player.classType == 'Druid') {
            calcLifesteal = Math.round(playerAttackValues * 0.3 * 100) / 100

            if (player.health < player.maxHP) {
              player.health = player.health + calcLifesteal
              if (player.health >= player.maxHP) {
                player.health = player.maxHP
              }
            } else if (player.health >= player.maxHP) {
              player.health = player.maxHP
            }

            notification1.textContent =
              'You dealt ' +
              playerAttackValues +
              ' damage to the ' +
              enemy.enemyType +
              ' and restored ' +
              calcLifesteal +
              ' health'
          } else {
            notification1.textContent =
              'You dealt ' +
              playerAttackValues +
              ' damage to the ' +
              enemy.enemyType
          }
          if (enemy.health <= 0) {
            alert('You win! Move to the next floor! Quickly!')
            getEnemyHealth.innerHTML = 'Health: 0'
            getPlayerHealth.innerHTML =
              'Health: ' + Math.round(player.health * 100) / 100
            // btn
            getAction.innerHTML =
              '<a href="#" class="btn__next btn" onclick="gameManager.staircase()">Next floor!</a>'

            // score
            defeatedEnemies(enemy.enemyType)
          } else {
            getEnemyHealth.innerHTML =
              'Health: ' + Math.round(enemy.health * 100) / 100
          }
        } else {
          notification1.textContent = 'You missed!'
        }
      }
    }
  },

  /////////////////////////////////////////////////////////////////////////
  calcHeal: function () {
    let notification1 = document.querySelector('.not1')
    let notification2 = document.querySelector('.not2')
    notify()

    getPlayerSpeed = player.speed
    getEnemySpeed = enemy.speed
    let getAction = document.querySelector('.actions')

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

    // ROUND CONDITION

    if (getPlayerSpeed >= getEnemySpeed) {
      let enemyAttackValues = enemyDmg()
      let playerHealValues = playerHeal()

      let calcHealedHP = Math.round(
        ((player.intelligence * player.mana) / player.maxHP / 80) * 10
      )

      // HEALTH CONDITON

      if (player.health >= maxHeroHP) {
        if (calcHealedHP < enemyAttackValues) {
          player.health = maxHeroHP + playerHealValues
          calcHealedHP = Math.round(
            ((player.intelligence * player.mana) / player.maxHP / 80) * 10
          )
          getPlayerHealth.innerHTML =
            'Health: ' + Math.round(player.health * 100) / 100
          notification1.textContent =
            'Enemy dealt more dmg than you healed. You restored ' +
            playerHealValues
          notification2.textContent = 'Enemy dealt ' + enemyAttackValues
          if (player.health <= 0) {
            getPlayerHealth.innerHTML = 'Health: 0'
            getEnemyHealth.innerHTML =
              'Health: ' + Math.round(enemy.health * 100) / 100
            alert('You lose!')

            getAction.innerHTML =
              '<a href="/" class="btn__next btn" onclick="gameManager.resetPlayer()">Back to heroes!</a>'
          }
        } else if (calcHealedHP > enemyAttackValues) {
          player.health = maxHeroHP
          calcHealedHP = Math.round(
            ((player.intelligence * player.mana) / player.maxHP / 80) * 10
          )

          getPlayerHealth.innerHTML =
            'Health: ' + Math.round(player.health * 100) / 100
          notification2.textContent = 'Enemy dealt ' + enemyAttackValues
          notification1.textContent =
            'You restored ' +
            playerHealValues +
            'after enemy`s hit. You health is full.'
        }
      } else if (player.health < maxHeroHP) {
        if (calcHealedHP < enemyAttackValues) {
          player.health = player.health + playerHealValues
          calcHealedHP = Math.round(
            ((player.intelligence * player.mana) / player.maxHP / 80) * 10
          )

          getPlayerHealth.innerHTML =
            'Health: ' + Math.round(player.health * 100) / 100
          alert(
            'Enemy dealt more dmg than you healed. You restored ' +
              playerHealValues
          )
          alert('Enemy dealt ' + enemyAttackValues)
          if (player.health <= 0) {
            getPlayerHealth.innerHTML = 'Health: 0'
            getEnemyHealth.innerHTML =
              'Health: ' + Math.round(enemy.health * 100) / 100
            alert('You lose! ')

            getAction.innerHTML =
              '<a href="/" class="btn__next btn" onclick="gameManager.resetPlayer()">Back to heroes!</a>'
          }
        } else if (calcHealedHP > enemyAttackValues) {
          getPlayerHealth.innerHTML =
            'Health: ' + Math.round(player.health * 100) / 100
          calcHealedHP = Math.round(
            ((player.intelligence * player.mana) / player.maxHP / 80) * 10
          )
          alert('Enemy dealt ' + enemyAttackValues)
          alert('You restored ' + playerHealValues + 'after enemy`s hit.')
        }
      }
    } else if (getPlayerSpeed < getEnemySpeed) {
      let enemyAttackValues = enemyDmg()
      let playerHealValues = playerHeal()

      let calcHealedHP = Math.round(
        ((player.intelligence * player.mana) / player.maxHP / 80) * 10
      )

      // HEALTH CONDITON

      if (player.health >= maxHeroHP) {
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
          if (player.health <= 0) {
            getPlayerHealth.innerHTML = 'Health: 0'
            getEnemyHealth.innerHTML =
              'Health: ' + Math.round(enemy.health * 100) / 100()
            alert('You lose!')

            getAction.innerHTML =
              '<a href="/" class="btn__next btn" onclick="gameManager.resetPlayer()>Back to heroes!</a>'
          }
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
          if (player.health <= 0) {
            getPlayerHealth.innerHTML = 'Health: 0'
            getEnemyHealth.innerHTML =
              'Health: ' + Math.round(enemy.health * 100) / 100()
            alert('You lose! ')

            getAction.innerHTML =
              '<a href="/" class="btn__next btn"  onclick="gameManager.resetPlayer()">Back to heroes!</a>'
          }
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
  ///////////////////////////////////////////
  calcFerociousBite: function () {
    let notification1 = document.querySelector('.not1')
    let notification2 = document.querySelector('.not2')
    notify()

    getPlayerSpeed = player.speed
    getEnemySpeed = enemy.speed
    let getAction = document.querySelector('.actions')

    let playerBite = function () {
      let calcBite
      if (player.classType == 'Druid') {
        calcBite =
          Math.round(
            ((player.strength * player.defense) /
              75 /
              (0.048 * enemy.defense)) *
              100
          ) / 100

        return calcBite
      }
    }

    let getPlayerHealth = document.querySelector('.health-player')
    let getEnemyHealth = document.querySelector('.health-enemy')

    if (getPlayerSpeed >= getEnemySpeed) {
      let playerBiteValue = playerBite()

      // AWAITING FOR MULTIPLY HITs

      enemy.health = enemy.health - playerBiteValue
      if (enemy.health <= 0) {
        alert('You win! Move to the next floor! Quickly!')
        getEnemyHealth.innerHTML = 'Health: 0'
        getPlayerHealth.innerHTML =
          'Health: ' + Math.round(player.health * 100) / 100
        //btn
        getAction.innerHTML =
          '<a href="#" class="btn__next btn" onclick="gameManager.staircase()">Next floor!</a>'
        //score
        defeatedEnemies(enemy.enemyType)
      } else {
        getEnemyHealth.innerHTML =
          'Health: ' + Math.round(enemy.health * 100) / 100
        notification1.textContent =
          'You dealt ' + playerBiteValue + ' damage to the ' + enemy.enemyType

        // //////////////////////////ENEMY ATTACKS

        let enemyAttackValues = enemyDmg()

        let totalDmg = enemyAttackValues
        player.health = player.health - totalDmg

        notification2.textContent =
          enemy.enemyType +
          ' dealt ' +
          enemyAttackValues +
          ' damage to the ' +
          player.classType

        if (player.health <= 0) {
          alert('You lose!')
          getPlayerHealth.innerHTML = 'Health: 0'
          getEnemyHealth.innerHTML =
            'Health: ' + Math.round(enemy.health * 100) / 100
          getAction.innerHTML =
            '<a href="/" class="btn__next btn" onclick="gameManager.resetPlayer()">Back to heroes!</a>'
        } else {
          getPlayerHealth.innerHTML =
            'Health: ' + Math.round(player.health * 100) / 100
        }
      }
    } else if (getPlayerSpeed <= getEnemySpeed) {
      let enemyAttackValues = enemyDmg()

      let totalDmg = Math.round(enemyAttackValues * 100) / 100

      player.health = player.health - totalDmg

      notification2.textContent =
        enemy.enemyType +
        ' dealt ' +
        Math.round(enemyAttackValues * 100) / 100 +
        ' damage to the ' +
        player.classType

      if (player.health <= 0) {
        alert('You lose!')
        getPlayerHealth.innerHTML = 'Health: 0'
        getEnemyHealth.innerHTML =
          'Health: ' + Math.round(enemy.health * 100) / 100
        getAction.innerHTML =
          '<a href="/" class="btn__next btn" onclick="gameManager.resetPlayer()">Back to heroes!</a>'
      } else {
        getPlayerHealth.innerHTML =
          'Health: ' + Math.round(player.health * 100) / 100

        // //////////////////////////ENEMY ATTACKS

        let playerBiteValue = playerBite()
        // AWAITING FOR MULTIPLY HITs
        let totalDmg = Math.round(playerBiteValue * 100) / 100
        enemy.health = enemy.health - totalDmg

        if (enemy.health <= 0) {
          // NOTIFICATION
          alert('You win! Move to the next floor! Quickly!')

          // HEALTHS
          getEnemyHealth.innerHTML = 'Health: 0'
          getPlayerHealth.innerHTML =
            'Health: ' + Math.round(player.health * 100) / 100

          // BTN

          getAction.innerHTML =
            '<a href="#" class="btn__next btn" onclick="gameManager.staircase()">Next floor!</a>'
          // score
          defeatedEnemies(enemy.enemyType)
        } else {
          getEnemyHealth.innerHTML =
            'Health: ' + Math.round(enemy.health * 100) / 100

          notification1.textContent =
            'You dealt ' +
            Math.round(playerBiteValue * 100) / 100 +
            ' damage to the ' +
            enemy.enemyType
        }
      }
    }
  },

  /////////////////////////////////////
  calcThunderStruck: function () {
    let notification1 = document.querySelector('.not1')
    let notification2 = document.querySelector('.not2')
    notify()

    getPlayerSpeed = player.speed
    getEnemySpeed = enemy.speed
    let getAction = document.querySelector('.actions')

    let playerThunder = function () {
      let calcThunder
      if (player.classType == 'Wizard') {
        calcThunder =
          Math.round(
            ((player.intelligence * player.mana) /
              800 /
              (0.048 * enemy.defense)) *
              100
          ) / 100

        return calcThunder
      }
    }

    let getPlayerHealth = document.querySelector('.health-player')
    let getEnemyHealth = document.querySelector('.health-enemy')

    if (getPlayerSpeed >= getEnemySpeed) {
      let playerThunderValue = playerThunder()

      // DAMAGE
      enemy.health = enemy.health - playerThunderValue

      // HEALTH CONDITION

      if (enemy.health <= 0) {
        alert('You win! Move to the next floor! Quickly!')
        getEnemyHealth.innerHTML = 'Health: 0'
        getPlayerHealth.innerHTML =
          'Health: ' + Math.round(player.health * 100) / 100
        // btn
        getAction.innerHTML =
          '<a href="#" class="btn__next btn" onclick="gameManager.staircase()">Next floor!</a>'

        // score
        defeatedEnemies(enemy.enemyType)
      } else {
        getEnemyHealth.innerHTML =
          'Health: ' + Math.round(enemy.health * 100) / 100
        notification1.textContent =
          'You dealt ' +
          playerThunderValue +
          ' damage to the ' +
          enemy.enemyType

        // //////////////////////////ENEMY ATTACKS

        let enemyAttackValues = enemyDmg()
        // AWAITING FOR MULTIPLY HITs
        let totalDmg = enemyAttackValues
        player.health = player.health - totalDmg

        notification2.textContent =
          enemy.enemyType +
          ' dealt ' +
          enemyAttackValues +
          ' damage to the ' +
          player.classType

        if (player.health <= 0) {
          alert('You lose!')
          getPlayerHealth.innerHTML = 'Health: 0'
          getEnemyHealth.innerHTML =
            'Health: ' + Math.round(enemy.health * 100) / 100
          getAction.innerHTML =
            '<a href="/" class="btn__next btn" onclick="gameManager.resetPlayer()">Back to heroes!</a>'
        } else {
          getPlayerHealth.innerHTML =
            'Health: ' + Math.round(player.health * 100) / 100
        }
      }
    } else if (getPlayerSpeed <= getEnemySpeed) {
      let enemyAttackValues = enemyDmg()

      let totalDmg = enemyAttackValues

      player.health = player.health - totalDmg

      notification2.textContent =
        enemy.enemyType +
        ' dealt ' +
        Math.round(enemyAttackValues * 100) / 100 +
        ' damage to the ' +
        player.classType

      if (player.health <= 0) {
        alert('You lose!')
        getPlayerHealth.innerHTML = 'Health: 0'
        getEnemyHealth.innerHTML =
          'Health: ' + Math.round(enemy.health * 100) / 100
        getAction.innerHTML =
          '<a href="/" class="btn__next btn" onclick="gameManager.resetPlayer()">Back to heroes!</a>'
      } else {
        getPlayerHealth.innerHTML =
          'Health: ' + Math.round(player.health * 100) / 100

        // //////////////////////////ENEMY ATTACKS

        let playerThunderValue = playerThunder()
        // AWAITING FOR MULTIPLY HITs
        let totalDmg = Math.round(playerThunderValue * 100) / 100

        enemy.health = enemy.health - totalDmg

        if (enemy.health <= 0) {
          // NOTIFICATION
          alert('You win! Move to the next floor! Quickly!')

          // HEALTHS
          getEnemyHealth.innerHTML = 'Health: 0'
          getPlayerHealth.innerHTML =
            'Health: ' + Math.round(player.health * 100) / 100

          // BTN

          getAction.innerHTML =
            '<a href="#" class="btn__next btn" onclick="gameManager.staircase()">Next floor!</a>'
          // score
          defeatedEnemies(enemy.enemyType)
        } else {
          getEnemyHealth.innerHTML =
            'Health: ' + Math.round(enemy.health * 100) / 100

          notification1.textContent =
            'You dealt ' +
            Math.round(playerThunderValue * 100) / 100 +
            ' damage to the ' +
            enemy.enemyType
        }
      }
    }
  },

  ////////////////////////////////
  calcCounterAttack: function () {
    let notification1 = document.querySelector('.not1')
    let notification2 = document.querySelector('.not2')
    notify()
    // who attacks first?

    let getAction = document.querySelector('.actions')

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

    // ROUND CONDITION
    enemyDmg()
    playerAttack()

    let getPlayerHealth = document.querySelector('.health-player')
    let getEnemyHealth = document.querySelector('.health-enemy')

    let playerBlockValues = playerBlock()
    let playerAttackValue = playerAttack()

    let totalDmg = Math.floor(playerBlockValues * 100) / 100

    player.health = player.health - totalDmg
    enemy.health = enemy.health - playerAttackValue

    // NOTIFICATION WHEN BLOCK

    // HEALTH CONDITION
    if (player.health <= 0) {
      alert(
        'You lose! Enemy`s hit was stronger than you possible could blocked'
      )
      getPlayerHealth.innerHTML = 'Health: 0'
      getEnemyHealth.innerHTML =
        'Health: ' + Math.round(enemy.health * 100) / 100
      getAction.innerHTML =
        '<a href="/" class="btn__next btn" onclick="gameManager.resetPlayer()">Back to heroes!</a>'
    } else if (enemy.health <= 0) {
      alert('You Win!  Move to the next floor! Quickly!')
      getPlayerHealth.innerHTML =
        'Health: ' + Math.round(player.health * 100) / 100
      getEnemyHealth.innerHTML = 'Health: 0'
      // btn
      getAction.innerHTML =
        '<a href="#" class="btn__next btn" onclick="gameManager.staircase()">Next floor!</a>'
      // score
      defeatedEnemies(enemy.enemyType)
    } else {
      getPlayerHealth.innerHTML =
        'Health: ' + Math.round(player.health * 100) / 100
      getEnemyHealth.innerHTML =
        'Health: ' + Math.round(enemy.health * 100) / 100
      notification1.textContent =
        'You blocked ' +
        totalDmg +
        ' damage and then hit enemy back ' +
        playerAttackValue
    }
  },
}
