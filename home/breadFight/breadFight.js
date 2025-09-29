let breadFightActive = false

const battleMusic = new Audio()
battleMusic.src = '../media/breadFight/blackKnife.mp3'
battleMusic.volume = 0.05
battleMusic.loop = true

function startFight() {
    if(!breadFightActive) {
        breadFightActive  = true
        DeBread.playSound('../media/breadFight/tension.wav', 0.25, 1)
        setTimeout(() => {
            DeBread.playSound('../media/breadFight/tension.wav', 0.25, 1.1175) //Gotta get it perfect
    
            setTimeout(() => {
                DeBread.playSound('../media/breadFight/startFight.wav', 0.25)
                
                setTimeout(() => {
                    battleMusic.play()
                    doge('breadFightContainer').style.display = 'unset'
                    selectPlayer(0)
                }, 750);
            }, 500);
        }, 250);
    }
}

let currentDialogue = '????? appears.'

const bfSoul = {
    isActive: false,
    pos: [0,0],
    speed: 5,
    tp: 0,
    immune: false,
    intervals: {
        up: undefined,
        down: undefined,
        left: undefined,
        right: undefined
    },

    damage: function() {
        if(!bfSoul.immune) {
            DeBread.playSound('../../media/breadFight/audio/hurt.wav', 0.1)
            const possiblePlayers = []
            for(let i = 0; i < bfPlayers.length; i++) {
                if(bfPlayers[i].health > 0) {
                    possiblePlayers.push(i)
                }
            }
    
            damagePlayer(possiblePlayers[DeBread.randomNum(0,possiblePlayers.length-1)], DeBread.randomNum(10, 30))
    
            bfSoul.immune = true
            doge('bfSoul').style.opacity = '0.5'
            setTimeout(() => {
                bfSoul.immune = false
                doge('bfSoul').style.opacity = '1'
            }, 500);
        }
    }
}

const bfPlayers = [
    {
        name: 'DeBread',
        health: 150,
        maxHealth: 150,
        color: '#df7126',
        isAttacking: false,
        damageMultiplier: 1.25,
        defense: 1.75,
        isDefending: false,
        barPos: Infinity,
    },
    {
        name: 'Ashton',
        health: 125,
        maxHealth: 125,
        color: '#5fcde4',
        isAttacking: false,
        damageMultiplier: 1.5,
        defense: 2,
        isDefending: false,
        barPos: Infinity,
    },
    {
        name: 'Jaden',
        health: 90,
        maxHealth: 90,
        color: '#b20000',
        isAttacking: false,
        damageMultiplier: 1.1,
        defense: 1.25,
        isDefending: false,
        barPos: Infinity,
    },
]

for(let i = 0; i < bfPlayers.length; i++) {
    const player = bfPlayers[i]
    const img = document.createElement('img')
    img.src = `../../media/breadFight/players/${player.name}.png`
    img.id = 'player'+i
    doge('playFieldPlayers').append(img)
}

const bfEnemies = [
    {
        name: '???',
        health: 7000,
        maxHealth: 7000,
        id: 'fella',
        currentAttack: 0,
        attacks: [
            {
                time: 12500,
                fun: () => {
                    changeFellaMood('Point')
                    fellaTalk('ough')
                    setTimeout(() => {       
                        for(let i = 0; i < 10; i++) {
                            setTimeout(() => {     
                                for(let x = 0; x < 3; x++) {
                                    const fellaRect = doge('fella').getBoundingClientRect()
                                    const fireball = createHazard(true, '../../media/breadFight/fireball.png', [32,32])
                                    let fireballRect = fireball.getBoundingClientRect()
                                    let soulRect = doge('bfSoul').getBoundingClientRect()
                                    fireball.pos = [fellaRect.left, fellaRect.top + 80]
                                    fireball.easing = DeBread.randomNum(0.02, 0.03, 4)
                                    fireball.scale = 1

                                    fireball.angle = Math.atan2(
                                        soulRect.top - fireball.pos[1],
                                        soulRect.left - fireball.pos[0]
                                    ) * (0.9 + (x / 10))

                                    addStyles(fireball, {
                                        width: '12px',
                                        height: '12px',
                                        left: fireball.pos[0] + 'px',
                                        top: fireball.pos[1] + 'px'
                                    })
                                    
                                    fireball.interval = setInterval(() => {
                                        fireballRect = fireball.getBoundingClientRect()
                                        soulRect = doge('bfSoul').getBoundingClientRect()
    
                                        const targetAngle = Math.atan2(soulRect.top - fireballRect.top, soulRect.left - fireballRect.left)
                                        
                                        let diff = targetAngle - fireball.angle
                                        diff = Math.atan2(Math.sin(diff), Math.cos(diff))
    
                                        fireball.angle += diff * fireball.easing
                                        fireball.speed = Math.max(3, 15 - Math.sqrt(Math.pow(fireball.pos[0] - soulRect.left, 2) + Math.pow(fireball.pos[1] - soulRect.top, 2)) / 50)

                                        fireball.pos[0] += Math.cos(fireball.angle) * fireball.speed
                                        fireball.pos[1] += Math.sin(fireball.angle) * fireball.speed
    
                                        fireball.style.left = fireball.pos[0]+'px'
                                        fireball.style.top = fireball.pos[1]+'px'
                                        fireball.querySelector('img').style.rotate = fireball.angle + 'rad'

                                        fireball.easing += 0.0002
                                        fireball.scale -= 0.005
                                        fireball.style.scale = Math.min(fireball.scale + 0.5, 1)
                                        fireball.style.opacity = fireball.scale

                                        if(fireball.scale <= 0.1) {
                                            clearInterval(fireball.interval)
                                            fireball.remove()
                                        } else if(fireball.scale <= 0.25) {
                                            fireball.canCollide = false
                                        }
                                    }, 25);
                
                                    doge('breadFight').append(fireball)
                                    DeBread.shake(doge('fella'), 10, 10, 0, 250)
                                }
                                
                                if(i === 9) {
                                    setTimeout(() => {
                                        fellaMood = 'Idle'
                                    }, 250);
                                }
                            }, 1000 * i);
                        }                 
                    }, 1500);
                }
            },
            {
                time: 7500,
                fun: () => {
                    const text = document.createElement('span')
                    addStyles(text, {
                        fontStyle: 'italic',
                        color: 'grey'
                    })
                    text.innerText = 'Too tired to make more attacks rn.'
                    doge('playField').append(text)
                    setTimeout(() => {
                        text.remove()
                    }, 5000);
                }
            }
        ]
    }
]

let currentMenu = 0
let selectedPlayer
let currentPlayer = 0
let currentACTButton = 0
//0: ACT buttons
//1: Enemy select
//2: Menu


let lastGrazeDate = performance.now()
const bfInterval = setInterval(() => {
    if(breadFightActive) {
        doge('bfSoul').style.left = bfSoul.pos[0]+'px'
        doge('bfSoul').style.top = bfSoul.pos[1]+'px'

        doge('breadFight').querySelectorAll('.hazard').forEach(hazard => {
            if(hazard.canCollide && bfSoul.isActive) {
                if(isColliding(hazard, doge('bfSoul'))) {
                    bfSoul.damage()
                }

                if(isColliding(hazard, doge('bfGraze')) && performance.now() - lastGrazeDate >= 100 && !bfSoul.immune) {
                    DeBread.playSound('../../media/breadFight/audio/graze.wav', 0.1)
                    getTP(1)

                    lastGrazeDate = performance.now()

                    doge('bfGraze').style.animation = 'none'
                    requestAnimationFrame(() => {
                        doge('bfGraze').style.animation = 'graze 500ms ease-out 1 forwards'
                    })

                }
            }
        })
    }
}, 25);

const fellaSprites = {
    Idle: {
        frames: 6,
        loop: true,
    },
    Hurt: {
        frames: 1,
        loop: true,
    },
    Point: {
        frames: 3,
        loop: false,
    }
}

const shadowBase = document.createElement('img')
let currentFellaSprite = 0
let fellaMood = 'Idle'
const fellaInterval = setInterval(() => {
    if(breadFightActive) {
        const shadow = shadowBase.cloneNode()
        shadow.src = doge('fella').getAttribute('src')
        addStyles(shadow, {
            width: '384px',
            position: 'absolute',
            left: doge('fella').getBoundingClientRect().left + 'px',
            top: doge('fella').getBoundingClientRect().top + 'px',
            animation: 'shadow 2.5s linear 1 forwards'
        })
    
        currentFellaSprite++
        if(currentFellaSprite > fellaSprites[fellaMood].frames) {
            if(fellaSprites[fellaMood].loop) {
                currentFellaSprite = 1
            } else {
                currentFellaSprite--
            }
        }

        doge('fella').src = `../../media/breadFight/fella/fella${fellaMood}${currentFellaSprite}.png`

        doge('breadFightContainer').append(shadow)
        setTimeout(() => {
            shadow.remove()
        }, 5000);
    }
}, 250)

function changeFellaMood(mood) {
    fellaMood = mood
    currentFellaSprite = 0
}

document.addEventListener('keydown', ev => {
    if(breadFightActive) {
        const key = ev.key.toLowerCase()
        if(bfSoul.isActive) {
            if(['a','arrowleft'].includes(key) && bfSoul.intervals.left === undefined) {
                bfSoul.intervals.left = setInterval(() => {
                    bfSoul.pos[0] -= bfSoul.speed
        
                    if(bfSoul.pos[0] < 0) {
                        bfSoul.pos[0] = 0
                    }
                }, 25);
            }
            if(['d','arrowright'].includes(key) && bfSoul.intervals.right === undefined) {
                bfSoul.intervals.right = setInterval(() => {
                    bfSoul.pos[0] += bfSoul.speed
                    
                    if(bfSoul.pos[0] > doge('playField').offsetWidth - doge('bfSoul').offsetWidth) {
                        bfSoul.pos[0] = doge('playField').offsetWidth - doge('bfSoul').offsetWidth
                    }
                }, 25);
            }
            if(['w','arrowup'].includes(key) && bfSoul.intervals.up === undefined) {
                bfSoul.intervals.up = setInterval(() => {
                    bfSoul.pos[1] -= bfSoul.speed
        
                    if(bfSoul.pos[1] < 0) {
                        bfSoul.pos[1] = 0
                    }
                }, 25);
            }
            if(['s','arrowdown'].includes(key) && bfSoul.intervals.down === undefined) {
                bfSoul.intervals.down = setInterval(() => {
                    bfSoul.pos[1] += bfSoul.speed
        
                    if(bfSoul.pos[1] > doge('playField').offsetHeight - doge('bfSoul').offsetHeight) {
                        bfSoul.pos[1] = doge('playField').offsetHeight - doge('bfSoul').offsetHeight
                    }
                }, 25);
            }
        
            //Precise movement
            if(key === 'shift') {
                bfSoul.speed = 2.5
            }
        }
    
        //Menu stuff
    
        if(currentMenu === 0) {
            if(key === 'arrowright') {
                currentACTButton++
                if(currentACTButton > 4) {
                    currentACTButton = 0
                }
                DeBread.playSound('../../media/breadFight/audio/squeak.wav',0.1)
            }
            if(key === 'arrowleft') {
                currentACTButton--
                if(currentACTButton < 0) {
                    currentACTButton = 4
                }
                DeBread.playSound('../../media/breadFight/audio/squeak.wav',0.1)
            }
            
            for(let i = 0; i < 5; i++) {
                doge(`${selectedPlayer}Button${i}`).style.filter = 'none'
            }
            doge(`${selectedPlayer}Button${currentACTButton}`).style.filter = 'brightness(200%)'
    
            if(key === 'z') {
                DeBread.playSound('../../media/breadFight/audio/select.wav', 0.1)
                if(currentACTButton === 0) {
                    doge('statusMain').innerHTML = '<div style="display: flex; align-items: center; gap: 10px;"><img src="../../media/breadFight/soul.png" width=24>?????</div>'
                    currentMenu++
                }
    
                if(currentACTButton === 4) {
                    if(currentPlayer === Object.keys(bfPlayers).length - 1) {
                        startAttacks()
                    }
                    bfPlayers[currentPlayer].isAttacking = false
                    bfPlayers[currentPlayer].isDefending = true
                    getTP(25)
                    currentPlayer++
                    currentMenu = 0
                    selectPlayer(currentPlayer)   
                    doge('statusMain').innerText = currentDialogue            
                }
                return
            }
    
            if(key === 'x') {
                if(currentPlayer !== 0) {
                    currentPlayer--
                    selectPlayer(currentPlayer)
                }
            }
        }
    
        if(currentMenu === 1 && currentACTButton === 0) {
            if(key === 'z') {
                DeBread.playSound('../../media/breadFight/audio/select.wav', 0.1)
                if(currentPlayer === Object.keys(bfPlayers).length - 1) {
                    bfPlayers[currentPlayer].isAttacking = true
                    startAttacks()
                } else {
                    bfPlayers[currentPlayer].isAttacking = true
                    currentPlayer++
                    currentMenu = 0
                    selectPlayer(currentPlayer)
                    doge('statusMain').innerText = currentDialogue
                    return
                }
            }
    
            if(key === 'x') {
                currentMenu = 0
                bfPlayers[currentPlayer].isAttacking = false
                doge('statusMain').innerText = currentDialogue        
            }
    
            return
        }
    
        if(currentMenu === 2) {
            if(key === 'z') {
                let shorterBar = {
                    player: 0,
                    length: Math.abs(bfPlayers[0].barPos),
                    realLength: bfPlayers[0].barPos,
                }
    
                for(const key in bfPlayers) {
                    if(bfPlayers[key].barPos < shorterBar.length) {
                        shorterBar.player = key
                        shorterBar.length = Math.abs(bfPlayers[key].barPos)
                        shorterBar.realLength = bfPlayers[key].barPos
                    }
                }
    
                clearInterval(doge(`${shorterBar.player}Bar`).interval)
                bfPlayers[shorterBar.player].isAttacking = false
    
                DeBread.playSound('../../media/breadFight/audio/swing.wav', 0.1)

                DeBread.shake(doge(`player${shorterBar.player}`), 25, 5, 0, 250)

                let damage = Math.max(50 - shorterBar.length / 2,0)

                const accuracy = {
                    color:'',
                    text:'',
                    weight: 500,
                }

                setTimeout(() => {        
                    if(shorterBar.length === 0) damage *= 1.5
                    damage *= bfPlayers[shorterBar.player].damageMultiplier
                    damage *= DeBread.randomNum(0.9,1.1,3)
                    bfEnemies[0].health -= damage
                    
                    const enemyBounds = doge(bfEnemies[0].id).getBoundingClientRect()
                    
                    if(damage > 0) {
                        const damageNum = document.createElement('span')
                        addStyles(damageNum, {
                            position: 'absolute',
                            left: doge(enemyBounds.left) + 'px',
                            top: doge(enemyBounds.top + (shorterBar.player * 25)) + 'px',
                            zIndex: 2,
                            color: bfPlayers[shorterBar.player].color,
                            animation: 'attackNum 5s ease-out 1 forwards'
                        })
                        damageNum.innerText = DeBread.round(damage)
                        doge('breadFightContainer').append(damageNum)
                        damageNum.style.left = DeBread.randomNum(enemyBounds.left, enemyBounds.left + doge(bfEnemies[0].id).offsetWidth - damageNum.offsetWidth)+'px'
                        damageNum.style.top = DeBread.randomNum(enemyBounds.top, enemyBounds.bottom - 20)+'px'


                        DeBread.playSound('../../media/breadFight/audio/damage.wav', 0.1)
                        DeBread.shake(doge(bfEnemies[0].id), damage / 5, damage / 5, 0, 250)
                        fellaMood = 'Hurt' 
                        doge('fella').src = '../../media/breadFight/fella/fellaHurt1.png'

                        setTimeout(() => {
                            if(fellaMood === 'Hurt') {
                                fellaMood = 'Idle'
                            } 
                        }, 1000);
                    }
                }, 500);
                
                if(damage === 0) {
                    accuracy.text = 'Missed'
                    accuracy.color = 'grey'
                } else if(shorterBar.length === 0) {
                    accuracy.text = 'Perfect!'
                    accuracy.color = 'aqua'
                    accuracy.weight = '900'
                } else if(shorterBar.length <= 10) {
                    accuracy.text = 'Great!'
                    accuracy.color = 'lime'
                    accuracy.weight = '700'
                } else if(shorterBar.length <= 25) {
                    accuracy.text = 'Good'
                    accuracy.color = 'lime'
                } else {
                    accuracy.text = 'OK'
                    accuracy.color = 'yellow'
                }
    
                const accText = document.createElement('span')
                addStyles(accText, {
                    position: 'absolute',
                    left: '25px',
                    top: '10px',
                    zIndex: 2,
                    fontSize: '20px',
                    color: accuracy.color,
                    fontWeight: '500',
                    animation: 'barAcc 2.5s ease-out 1 forwards'
                })
                accText.innerText = accuracy.text
    
                const effect0 = document.createElement('div')
                addStyles(effect0, {
                    position: 'absolute',
                    left: shorterBar.realLength+'px',
                    top: '0',
                    height: '100%',
                    width: 0,
                    opacity: 0.5,
                    backgroundColor: accuracy.color,
                    animation: 'barEffect0 1s ease-out 1 forwards'
                })
    
                doge(`${shorterBar.player}AttackBox`).append(effect0)

                doge(`${shorterBar.player}AttackBox`).append(accText)

                doge(`${shorterBar.player}AttackBox`).style.animation = 'attackBarHit 500ms ease-out 1 forwards'
    
                doge(`${shorterBar.player}Bar`).style.animation = 'barHit 500ms ease-out 1 forwards'
                if(shorterBar.length === 0) {
                    doge(`${shorterBar.player}Bar`).style.backgroundColor = 'aqua'
                    getTP(10)
                    DeBread.playSound('../../media/breadFight/audio/bell.wav', 0.1)
                }
    
                bfPlayers[shorterBar.player].barPos = Infinity
    
                let attacksDone = true
                for(let i = 0; i < bfPlayers.length; i++) {
                    if(bfPlayers[i].isAttacking) {
                        attacksDone = false
                    }
                }
    
                if(attacksDone) {
                    setTimeout(() => {
                        startEnemyAttacks()
                        doge('playField').style.rotate = '0deg'
                        doge('playField').style.scale = '1'
                    }, 2500);

                }
            }
        }
    }
})

document.addEventListener('keyup', ev => {
    if(breadFightActive) {
        const key = ev.key.toLowerCase()
        if(bfSoul.isActive) {
            if(['a','arrowleft'].includes(key)) {
                clearInterval(bfSoul.intervals.left)
                bfSoul.intervals.left = undefined
            }
            if(['d','arrowright'].includes(key)) {
                clearInterval(bfSoul.intervals.right)
                bfSoul.intervals.right = undefined
            }
            if(['w','arrowup'].includes(key)) {
                clearInterval(bfSoul.intervals.up)
                bfSoul.intervals.up = undefined
            }
            if(['s','arrowdown'].includes(key)) {
                clearInterval(bfSoul.intervals.down)
                bfSoul.intervals.down = undefined
            }
        
            if(key === 'shift') {
                bfSoul.speed = 5
            }
        }
    }
})

for(const key in bfPlayers) {
    const div = document.createElement('div')
    div.classList.add('player')
    div.setAttribute('id',`playerCard${key}`)
    doge('players').append(div)
    div.style.setProperty('box-shadow',`0px -4px 0px ${bfPlayers[key].color}`)
    
    div.innerHTML = `
    <div class="playerCard">
        <div style="display: flex; align-items: center; gap: 8px;">
            <img src="../media/breadFight/players/${bfPlayers[key].name}Icon.png" height="64">
            <div>
                <div>${bfPlayers[key].name}</div>
                <div style="display: flex; align-items: center; gap: 5px; font-size: 20px;">
                    <div class="playerHealth" id="${key}Health">
                        <span class="playerHealthText" id="${key}HealthText">${bfPlayers[key].health}/${bfPlayers[key].maxHealth}</span>
                        <div class="innerPlayerHealth" id="${key}HealthBar"></div>
                    </div>
                    <span>HP</span>
                </div>
            </div>
        </div>
    </div>
    <div class="playerButtons">
        <div class="playerButton" id="${key}Button0" style="background-image: url(../../media/breadFight/icons/fight.png);"></div>
        <div class="playerButton" id="${key}Button1" style="background-image: url(../../media/breadFight/icons/act.png); opacity: 0.5;"></div>
        <div class="playerButton" id="${key}Button2" style="background-image: url(../../media/breadFight/icons/item.png); opacity: 0.5;"></div>
        <div class="playerButton" id="${key}Button3" style="background-image: url(../../media/breadFight/icons/mercy.png); opacity: 0.5;"></div>
        <div class="playerButton" id="${key}Button4" style="background-image: url(../../media/breadFight/icons/defend.png);"></div>
    </div>
    `
}

const emptyPlayer = document.createElement('div')
emptyPlayer.classList.add('player')
addStyles(emptyPlayer, {
    width: 'calc(100% - 700px)',
    boxShadow: '0px -4px 0px #332033'
})
doge('players').append(emptyPlayer)


function selectPlayer(player) {
    currentACTButton = 0
    for(key in bfPlayers) {
        const playerElem = doge(`playerCard${key}`)
        playerElem.style.height = '64px'
        playerElem.style.translate = '0px 0px'
        playerElem.style.boxShadow = `0px -4px 0px ${bfPlayers[key].color}`
        for(let i = 0; i < 5; i++) {
            doge(`${key}Button${i}`).style.filter = 'none'
        }
    }

    const playerElem = doge(`playerCard${player}`)
    playerElem.style.height = '128px'
    playerElem.style.translate = '0px -64px'
    playerElem.style.boxShadow = `0px 0px 0px 4px inset ${bfPlayers[player].color}`
    doge(`${player}Button0`).style.filter = 'brightness(200%)'
    selectedPlayer = player

} 
selectPlayer(0)

function startAttacks() {
    currentMenu = 2

    doge('statusMain').innerHTML = ''
    let possiblePositions = []
    for(let i = 150; i < 600; i += 50) {
        possiblePositions.push(i)
    }

    for(const key in bfPlayers) {
        const player = bfPlayers[key]
        doge(`playerCard${key}`).style.height = '64px'
        doge(`playerCard${key}`).style.translate = '0px 0px'
        doge(`playerCard${key}`).style.boxShadow = `0px -4px 0px ${player.color}`

        if(player.isAttacking) {
            const div = document.createElement('div')
            div.classList.add('attackBarContainer')
            div.setAttribute('id',`${key}AttackBarContainer`)
            const randomPositionIndex = DeBread.randomNum(0, possiblePositions.length-1)
            const randomPosition = possiblePositions[randomPositionIndex]
            player.barPos = randomPosition
            possiblePositions.splice(randomPositionIndex,1)

            div.innerHTML = `
                <img src="../../media/breadFight/players/${bfPlayers[key].name}Icon.png" width=64>
                <div class="attackBox" style="outline: 2px solid ${player.color};" id="${key}AttackBox">
                    <div class="attackGoal" style="outline: 4px solid ${player.color};"></div>
                    <div class="attackBar" id="${key}Bar" style="left: ${player.barPos}px">
                </div>
            `
            doge('statusMain').append(div)

            doge(`${key}Bar`).interval = setInterval(() => {
                player.barPos -= 10
                doge(`${key}Bar`).style.left = player.barPos+'px'

                if(player.barPos <= -100) {
                    clearInterval(doge(`${key}Bar`).interval)
                    doge(`${key}Bar`).remove()
                    bfPlayers[key].isAttacking = false
                    DeBread.shake(doge(`${key}AttackBox`), 25, 5, 0, 250)
                }
            }, 25);
        }
    }
}

function startEnemyAttacks() {
    bfSoul.isActive = true
    doge('statusMain').innerHTML = ''
    doge('status').style.height = '64px'
    doge('playArea').style.height = 'calc(100% - 64px)'
    // doge('backgroundContainer').style.height = 'calc(100% - 64px)'
    doge('playFieldContainer').style.height = 'calc(100% - 64px)'

    setTimeout(() => {
        bfEnemies[0].attacks[bfEnemies[0].currentAttack].fun()

        setTimeout(() => {
            doge('statusMain').innerText = currentDialogue
            doge('status').style.height = '325px'
            doge('playArea').style.height = 'calc(100% - 325px)'

            doge('playField').style.scale = '0'
            doge('playField').style.rotate = '180deg'

            currentMenu = 0
            bfSoul.isActive = false
            selectPlayer(0)
            currentPlayer = 0

            for(const key in bfSoul.intervals) {
                clearInterval(bfSoul.intervals[key])
            }

            if(bfEnemies[0].health < 7000) {
                currentDialogue = 'Something doesn\'t feel right...'
            }
            doge('statusMain').innerText = currentDialogue

            // bfEnemies[0].currentAttack++

        }, bfEnemies[0].attacks[0].time);
    }, 1500);
}

function getTP(amount) {
    bfSoul.tp += amount
    if(bfSoul.tp > 100) {
        bfSoul.tp = 100
    }

    doge('innerTPBar').style.height = 100 - bfSoul.tp + '%'

    doge('TPCounter').innerText = bfSoul.tp
}

function damagePlayer(player, amount) {
    const elem = doge(`player${player}`)
    DeBread.shake(elem, 25, 5, 0, 250)

    bfPlayers[player].health -= amount / bfPlayers[player].defense

    if(bfPlayers[player].health <= 0) {
        bfPlayers[player].health = -999
        doge(`${player}HealthText`).style.color = 'black'
    }

    doge(`${player}HealthText`).innerText = `${DeBread.round(bfPlayers[player].health)}/${DeBread.round(bfPlayers[player].maxHealth)}`
    doge(`${player}HealthBar`).style.width = `${Math.max(bfPlayers[player].health / bfPlayers[player].maxHealth,0) * 100}%`
    DeBread.shake(doge(`${player}Health`),25,5,0,250)

    let gameOver = true
    for(key in bfPlayers) {
        if(bfPlayers[key].health > 0) {
            gameOver = false
        }
    }

    if(gameOver) {
        console.log('you lost')
    }
}

function createHazard(unbreakable = false, texture, textureSize) {
    const hazard = document.createElement('div')
    hazard.classList.add('hazard')
    hazard.breakable = unbreakable
    hazard.canCollide = true
    addStyles(hazard, {
        backgroundColor: 'white',
        position: 'absolute',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 2,
        // outline: '1px solid red',
    })

    if(texture) {
        hazard.style.backgroundColor = 'transparent'
        const elem = document.createElement('img')
        elem.src = texture

        addStyles(elem, {
            width: textureSize[0]+'px',
            height: textureSize[1]+'px'
        })

        hazard.append(elem)
    }

    return hazard
}

function fellaTalk(text) {
    if(doge('fellaTextbox')) {
        doge('fellaTextbox').remove()
    }

    const textbox = document.createElement('div')
    textbox.innerText = text
    textbox.id = 'fellaTextbox'
    addStyles(textbox, {
        position: 'absolute',
        top: doge('fella').getBoundingClientRect().top + 'px',
        left: doge('fella').getBoundingClientRect().left + 'px',
        backgroundColor: 'white',
        color: 'black',
        padding: '5px',
        fontSize: '15px',
        width: '100px',
        minHeight: '50px',
        fontFamily: '"JetBrains Mono", monospace',
        fontWeight: '700',
    })

    setTimeout(() => {
        textbox.remove()
    }, 5000);

    doge('breadFight').append(textbox)
}