let player

const Player = function(classType,mainStat,level,health,mana,strength,agility,intelligence,speed,defense) {
  this.classType = classType
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

// PLAYER BASIC ATTACK
let playerAttack = function () {
  let calcPhysicalDmg
  let calcMageDmg

  // FULL STRENGTH
  if (player.mainStat == 'Strength') {
    calcPhysicalDmg =
      Math.round(
        ((player.strength * player.defense) / 250 / (0.048 * enemy.defense)) *
          100
      ) / 100

    calcMageDmg = 0

    // gibrid
  } else if (player.mainStat == 'Gibrid') {
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
  } else if (player.mainStat == 'Mage') {
    calcMageDmg =
      Math.round(
        ((player.intelligence * player.mana) / 1000 / (0.048 * enemy.defense)) *
          100
      ) / 100
    calcPhysicalDmg = 0
  }

  let offsetDmg = Math.floor(Math.random() * 7) + 1
  let calcOutputDmg = offsetDmg + calcMageDmg + calcPhysicalDmg

  let attackValue = calcOutputDmg
  return attackValue
}

// ////////////////////////////////////PLAYER`s MOVES
let moves = []

//clear an array of moves
let newFloor = function () {
  while (moves.length > 0) {
    moves.shift()
  }
}

// ///////////////////////////////////PLAYER`s ABILITIES
let PlayerAttack = {
  ability: 'attack',
  cooldown: false,

  calcAttack: function () {
    // notifications
    let notification1 = document.querySelector('.not1')
    let notification2 = document.querySelector('.not2')
    notify()

    // cooldowns
    moves.push(this.ability)
    cooldownCounter1()
    cooldownCounter2()

    ////
    let getPlayerSpeed = player.speed
    let getEnemySpeed = enemy.speed

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
      let calcHitLand = Math.round(Math.random() * 100) + 1
      let calcEnemyHitLand = Math.round(Math.random() * 100) + 1

      
      let playerAttackValues = playerAttack()

      // IF Player`s HIT LANDED
      if (calcHitLand <= 89) {
        enemy.health = enemy.health - playerAttackValues

        // DRUID LIFESTEAL
        if (player.classType == 'Druid') {
          let calcLifesteal = Math.round(playerAttackValues * 0.3 * 100) / 100

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
        if(enemy.boss && enemy.health <= 0) {
          bossHealthCondition()
        }
         else if (enemy.health <= 0) {
          enemyHealthCondition()
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
                playerHealthCondition()
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

        if (calcEnemyHitLand < 89) {
          let totalDmg = enemyDmg()
          player.health = player.health - totalDmg

          notification2.textContent =
            enemy.enemyType +
            ' dealt ' +
            totalDmg +
            ' damage to the ' +
            player.classType

          if (player.health <= 0) {
            playerHealthCondition()
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
          playerHealthCondition()
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
              enemyHealthCondition()
            } else {
              getEnemyHealth.innerHTML =
                'Health: ' + Math.round(enemy.health * 100) / 100
            }
          } else {
            notification1.textContent = 'You missed!'
          }
        }
      } else {
        notification2.textContent = 'Enemy missed'

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
            enemyHealthCondition()
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
}

let PlayerHeal = {
  ability: 'ability1P',
  cooldown: false,
  multiplier: 13,
  calcHeal: function () {
    // notifications
    let notification1 = document.querySelector('.not1')
    let notification2 = document.querySelector('.not2')
    notify()

    // cooldowns
    moves.push(this.ability)
    cooldownCounterAbility1()
    cooldownCounter2()

    ////
    getPlayerSpeed = player.speed
    getEnemySpeed = enemy.speed

    let maxHeroHP = player.maxHP

    let getPlayerHealth = document.querySelector('.health-player')

    let playerHeal = function () {
      let getEnemyDmg = enemyDmg()
      let calcHealedHP

      if (player.health < maxHeroHP) {
        calcHealedHP = Math.round(
          ((player.intelligence * player.mana) / player.maxHP / 75) * this.multiplier
        )
        player.health = player.health + calcHealedHP - getEnemyDmg

        if (player.health >= maxHeroHP) {
          player.health = maxHeroHP
        }
      } else if (player.health >= maxHeroHP) {
        if (calcHealedHP < getEnemyDmg) {
          calcHealedHP = Math.round(
            ((player.intelligence * player.mana) / player.maxHP / 75) * this.multiplier
          )
          player.health = maxHeroHP + calcHealedHP - getEnemyDmg
        } else {
          calcHealedHP = Math.round(
            ((player.intelligence * player.mana) / player.maxHP / 75) * this.multiplier
          )
          player.health = maxHeroHP
        }
      }

      let totalHealed = Math.floor((calcHealedHP - getEnemyDmg) * 100) / 100

      return totalHealed.toFixed(2)
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
            playerHealthCondition()
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
          notification1.textContent =
            'Enemy dealt more dmg than you healed. You restored ' +
            playerHealValues

          notification2.textContent = 'Enemy dealt ' + enemyAttackValues
          if (player.health <= 0) {
            playerHealthCondition()
          }
        } else if (calcHealedHP > enemyAttackValues) {
          getPlayerHealth.innerHTML =
            'Health: ' + Math.round(player.health * 100) / 100
          calcHealedHP = Math.round(
            ((player.intelligence * player.mana) / player.maxHP / 80) * 10
          )
          notification2.textContent = 'Enemy dealt ' + enemyAttackValues
          notification1.textContent =
            'You restored ' + playerHealValues + 'after enemy`s hit.'
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
          notification1.textContent =
            'Enemy dealt more dmg than you healed. You restored ' +
            playerHealValues

          notification2.textContent = 'Enemy dealt ' + enemyAttackValues
          if (player.health <= 0) {
            playerHealthCondition()
          }
        } else if (calcHealedHP > enemyAttackValues) {
          calcHealedHP = Math.round(
            ((player.intelligence * player.mana) / player.maxHP / 80) * 10
          )
          player.health = maxHeroHP
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
          calcHealedHP = Math.round(
            ((player.intelligence * player.mana) / player.maxHP / 80) * 10
          )
          player.health = player.health + playerHealValues
          getPlayerHealth.innerHTML =
            'Health: ' + Math.round(player.health * 100) / 100
          notification1.textContent =
            'Enemy dealt more dmg than you healed. You restored ' +
            playerHealValues

          notification2.textContent = 'Enemy dealt ' + enemyAttackValues
          if (player.health <= 0) {
            playerHealthCondition()
          }
        } else if (calcHealedHP > enemyAttackValues) {
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
      }
    }
  },
}

let PlayerBite = {
  ability: 'ability1D',
  cooldown: false,
  calcFerociousBite: function () {
    // notifications
    let notification1 = document.querySelector('.not1')
    let notification2 = document.querySelector('.not2')
    notify()

    // cooldowns
    moves.push(this.ability)
    cooldownCounterAbility1()
    cooldownCounter2()

    ////
    getPlayerSpeed = player.speed
    getEnemySpeed = enemy.speed

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

      enemy.health = enemy.health - playerBiteValue
      if(enemy.boss && enemy.health <= 0) {
        bossHealthCondition()
      }
       else if (enemy.health <= 0) {
        enemyHealthCondition()
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
          playerHealthCondition()
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
        playerHealthCondition()
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
          result()

          // HEALTHS
          getEnemyHealth.innerHTML = 'Health: 0'
          getPlayerHealth.innerHTML =
            'Health: ' + Math.round(player.health * 100) / 100

          // score
          newFloor()
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
}

let PlayerThunder = {
  ability: 'ability1Wi',
  cooldown: false,
  calcThunderStruck: function () {
    // notifications
    let notification1 = document.querySelector('.not1')
    let notification2 = document.querySelector('.not2')
    notify()
    // cooldowns
    moves.push(this.ability)
    cooldownCounterAbility1()
    cooldownCounter2()

    ////
    getPlayerSpeed = player.speed
    getEnemySpeed = enemy.speed

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

      if(enemy.boss && enemy.health <= 0) {
        bossHealthCondition()
      } else if (enemy.health <= 0) {
        enemyHealthCondition()
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
          playerHealthCondition()
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
        playerHealthCondition()
      } else {
        getPlayerHealth.innerHTML =
          'Health: ' + Math.round(player.health * 100) / 100

        // //////////////////////////ENEMY ATTACKS

        let playerThunderValue = playerThunder()
        // AWAITING FOR MULTIPLY HITs
        let totalDmg = Math.round(playerThunderValue * 100) / 100

        enemy.health = enemy.health - totalDmg

        if (enemy.health <= 0) {
          enemyHealthCondition()
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
}

let PlayerCounter = {
  ability: 'ability1W',
  cooldown: false,

  calcCounterAttack: function () {
    // notifications
    let notification1 = document.querySelector('.not1')
    let notification2 = document.querySelector('.not2')
    notify()
    // cooldowns
    moves.push(this.ability)
    cooldownCounterAbility1()
    cooldownCounter2()

    // who attacks first?

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
    let playerBlockValues = playerBlock()
    let playerAttackValue = playerAttack()

    let totalDmg = Math.floor(playerBlockValues * 100) / 100

    player.health = player.health - totalDmg
    enemy.health = enemy.health - playerAttackValue

    // NOTIFICATION WHEN BLOCK

    // HEALTH CONDITION
    if(enemy.boss && enemy.health <= 0) {
      enemyHealthCondition()
    } else if (player.health <= 0) {
      playerHealthCondition()
    } else if (enemy.health <= 0) {
      enemyHealthCondition()
    } else {
      bothHealthCondition()

      // NOTIFICATIONS
      notification1.textContent =
        'You blocked ' +
        totalDmg +
        ' damage and then hit enemy back ' +
        playerAttackValue
      notification2.textContent =
        enemy.enemyType +
        ' hit ' +
        player.classType +
        ' in the shield. Damage reduced'
    }
  },
}

// SPELL #2

let PlayerSurprise = {
  ability: 'ability2W',
  cooldown: false,

  calcSurpriseAttack: function () {
    // notifications
    let notification1 = document.querySelector('.not1')
    let notification2 = document.querySelector('.not2')
    notify()

    // cooldowns

    moves.push(this.ability)
    cooldownCounterAbility2()
    cooldownCounter1()

    let playerSurprise = function () {
      if (player.strength) {
        let calcSurpriseDmg
        calcSurpriseDmg =
          Math.round(
            ((player.strength * player.defense) /
              250 /
              (0.048 * enemy.defense)) *
              100
          ) / 100
        return calcSurpriseDmg
      }
    }

    // ROUND CONDITION
    playerSurprise()
    let playerSurpriseValue = playerSurprise()
    let totalDmg = Math.floor(playerSurpriseValue * 100) / 100
    enemy.health = enemy.health - totalDmg

    // NOTIFICATION WHEN BLOCK

    // HEALTH CONDITION

    if(enemy.boss && enemy.health <= 0) {
      bossHealthCondition()
    } else if (enemy.health <= 0) {
      enemyHealthCondition()
    } else {
      bothHealthCondition()

      // NOTIFICATIONS
      notification1.textContent =
        'You stunned enemy and dealt ' +
        totalDmg +
        ' damage to ' +
        enemy.enemyType
      notification2.textContent = enemy.enemyType + ' got stunned'
    }
  },
}
let PlayerWrath = {
  ability: 'ability2D',
  cooldown: false,

  calcWrathOfNature: function () {
    // notifications
    let notification1 = document.querySelector('.not1')
    let notification2 = document.querySelector('.not2')
    notify()

    // cooldowns
    moves.push(this.ability)
    cooldownCounterAbility2()
    cooldownCounter1()

    //CALC SPELL
    let playerWrath = function () {
      let calcWrath
      if (player.intelligence) {
        calcWrath =
          Math.round(
            ((player.intelligence * player.mana) /
              700 /
              (0.048 * enemy.defense)) *
              100
          ) / 100

        return calcWrath
      }
    }

    // ROUND CONDITION
    playerWrath()
    let playerWrathValue = playerWrath()
    let totalDmg = Math.floor(playerWrathValue * 100) / 100
    enemy.health = enemy.health - totalDmg

    // NOTIFICATION WHEN BLOCK

    // HEALTH CONDITION
    if(enemy.boss && enemy.health <= 0) {
      bossHealthCondition()
    }
     else if (enemy.health <= 0) {
      enemyHealthCondition()
    } else {
      bothHealthCondition()

      // NOTIFICATIONS
      notification1.textContent =
        'You stunned enemy and dealt ' +
        totalDmg +
        ' damage to ' +
        enemy.enemyType
      notification2.textContent = enemy.enemyType + ' got stunned'
    }
  },
}
let PlayerPillar = {
  ability: 'ability2Wi',
  cooldown: false,

  calcFreezingPillar: function () {
    // notifications
    let notification1 = document.querySelector('.not1')
    let notification2 = document.querySelector('.not2')
    notify()

    // cooldowns
    moves.push(this.ability)
    cooldownCounterAbility2()
    cooldownCounter1()

    // CALC SPELL
    let playerPillar = function () {
      let calcFreezingPillar
      if (player.intelligence) {
        calcFreezingPillar =
          Math.round(
            ((player.intelligence * player.mana) /
              800 /
              (0.048 * enemy.defense)) *
              100
          ) / 100

        return calcFreezingPillar
      }
    }

    // ROUND CONDITION
    playerPillar()
    let playerPillarValue = playerPillar()
    let totalDmg = Math.floor(playerPillarValue * 100) / 100
    enemy.health = enemy.health - totalDmg

    // NOTIFICATION WHEN BLOCK

    // HEALTH CONDITION
    if(enemy.boss && enemy.health <= 0) {
      bossHealthCondition()
    } else if (enemy.health <= 0) {
      enemyHealthCondition()
    } else {
      bothHealthCondition()
      // NOTIFICATIONS
      notification1.textContent =
        'You stunned enemy and dealt ' +
        totalDmg +
        ' damage to ' +
        enemy.enemyType
      notification2.textContent = enemy.enemyType + ' got stunned'
    }
  },
}
let PlayerConfusion = {
  ability: 'ability2P',
  cooldown: false,

  calcConfusion: function () {
    // notifications
    let notification1 = document.querySelector('.not1')
    let notification2 = document.querySelector('.not2')
    notify()

    // cooldowns

    moves.push(this.ability)
    cooldownCounterAbility2()
    cooldownCounter1()

    // calcSPELL
    let playerConfusion = function () {
      let calcConfusion
      if (player.intelligence) {
        calcConfusion =
          Math.round(
            ((player.intelligence * player.mana) /
              800 /
              (0.048 * enemy.defense)) *
              100
          ) / 100

        return calcConfusion
      }
    }

    // ROUND CONDITION
    playerConfusion()

    let playerConfusionValue = playerConfusion()
    let totalDmg = Math.floor(playerConfusionValue * 100) / 100
    enemy.health = enemy.health - totalDmg

    // NOTIFICATION WHEN BLOCK

    // HEALTH CONDITION
   if(enemy.boss && enemy.health <= 0) {
    BossHealthCondition()
    } else  if (enemy.health <= 0) {
      enemyHealthCondition()
    } else {
      bothHealthCondition()
      // NOTIFICATIONS
      notification1.textContent =
        'You stunned enemy and dealt ' +
        totalDmg +
        ' damage to ' +
        enemy.enemyType
      notification2.textContent = enemy.enemyType + ' got stunned'
    }
  },
}
/// HEALTH CONDITION
function enemyHealthCondition() {
  let getPlayerHealth = document.querySelector('.health-player')
  let getEnemyHealth = document.querySelector('.health-enemy')
  // notification
  result()

  //health result
  getPlayerHealth.innerHTML =
    'Health: ' + Math.round(player.health * 100) / 100
  getEnemyHealth.innerHTML = 'Health: 0'

  // score
  newFloor()
  defeatedEnemies(enemy.enemyType)
}

function playerHealthCondition() {
  let getPlayerHealth = document.querySelector('.health-player')
  let getEnemyHealth = document.querySelector('.health-enemy')
  //notification
  result()
  //health result
  getPlayerHealth.innerHTML = 'Health: 0'
  getEnemyHealth.innerHTML =
    'Health: ' + Math.round(enemy.health * 100) / 100
}

function bothHealthCondition() {
  let getPlayerHealth = document.querySelector('.health-player')
  let getEnemyHealth = document.querySelector('.health-enemy')

  //HEALTH CONDITION
  getPlayerHealth.innerHTML = 'Health: ' + Math.round(player.health * 100) / 100
  getEnemyHealth.innerHTML = 'Health: ' + Math.round(enemy.health * 100) / 100
}

function bossHealthCondition() {
  let getPlayerHealth = document.querySelector('.health-player')
  let getEnemyHealth = document.querySelector('.health-enemy')
  // notification
    resultBoss()

  // health result
  getPlayerHealth.innerHTML = 'Health: ' + Math.round(player.health * 100) / 100
  getEnemyHealth.innerHTML = 'Health: 0'
}

// /////////////////COOLDOWN OF ABILITIES
//  ////////////////////ABILITY #1
// unblock ability
let cooldownCounter1 = function () {
  let btns = document.querySelectorAll('.player_btn')
  let abilitySrc = getAbilitySRC1()
  let abilityName = getAbilityName1()

  if (moves[moves.length - 2] == abilitySrc) {
    btns[1].disabled = true
    btns[1].innerHTML =
      '<img class="abilityImg" src="img/skills/' +
      abilitySrc +
      '.jpg" alt="">Cooldown [1]'
  }

  if (moves[moves.length - 3] == abilitySrc) {
    btns[1].disabled = false
    btns[1].innerHTML =
      '<img class="abilityImg" src="img/skills/' +
      abilitySrc +
      '.jpg" alt="">' +
      abilityName
  }
}

// block ability
let cooldownCounterAbility1 = function () {
  let btns = document.querySelectorAll('.player_btn')
  let abilitySrc = getAbilitySRC1()

  btns[1].disabled = true
  btns[1].innerHTML =
    '<img class="abilityImg" src="img/skills/' +
    abilitySrc +
    '.jpg" alt="">Cooldown [2]'
}

// ADDITIONAL STUFF
let getAbilitySRC1 = function () {
  const abilities = document.querySelectorAll('.abilityImg')

  let srcImg = abilities[1].src
  let word = srcImg.slice(srcImg.lastIndexOf('a'), srcImg.lastIndexOf('.'))

  return word
}

let getAbilityName1 = function () {
  if (player.classType == 'Warrior') {
    return 'Counter Attack'
  } else if (player.classType == 'Druid') {
    return 'Ferocious Bite'
  } else if (player.classType == 'Wizard') {
    return 'Thunder strike'
  } else if (player.classType == 'Priest') {
    return 'Divine Embrace'
  }
}

// /////////////////////////  ABILITY #2
// unblock ability
let cooldownCounter2 = function () {
  let btns = document.querySelectorAll('.player_btn')
  let abilitySrc = getAbilitySRC2()
  let abilityName = getAbilityName2()

  if (moves[moves.length - 2] == abilitySrc) {
    btns[2].disabled = true
    btns[2].innerHTML =
      '<img class="abilityImg" src="img/skills/' +
      abilitySrc +
      '.jpg" alt="">Cooldown [2]'
  } else if (moves[moves.length - 3] == abilitySrc) {
    btns[2].disabled = true
    btns[2].innerHTML =
      '<img class="abilityImg" src="img/skills/' +
      abilitySrc +
      '.jpg" alt="">Cooldown [1]'
  }
  if (moves[moves.length - 4] == abilitySrc) {
    btns[2].disabled = false
    btns[2].innerHTML =
      '<img class="abilityImg" src="img/skills/' +
      abilitySrc +
      '.jpg" alt="">' +
      abilityName
  }
}

// block ability
let cooldownCounterAbility2 = function () {
  let btns = document.querySelectorAll('.player_btn')
  let abilitySrc = getAbilitySRC2()

  btns[2].disabled = true
  btns[2].innerHTML =
    '<img class="abilityImg" src="img/skills/' +
    abilitySrc +
    '.jpg" alt="">Cooldown [3]'
}

// ADDITIONAL STUFF
let getAbilitySRC2 = function () {
  const abilities = document.querySelectorAll('.abilityImg')

  let srcImg = abilities[2].src
  let word = srcImg.slice(srcImg.lastIndexOf('a'), srcImg.lastIndexOf('.'))

  return word
}

let getAbilityName2 = function () {
  if (player.classType == 'Warrior') {
    return 'Surprise attack'
  } else if (player.classType == 'Druid') {
    return 'Wrath of nature'
  } else if (player.classType == 'Wizard') {
    return 'Freezing pillar'
  } else if (player.classType == 'Priest') {
    return 'Confusiong'
  }
}
