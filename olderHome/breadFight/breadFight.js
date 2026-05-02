let breadFightActive = false

const battleMusic = new Audio()
battleMusic.src = '../media/breadFight/blackKnife.mp3'
battleMusic.volume = 0.05
battleMusic.loop = true

function startFight() {
    if(!breadFightActive) {
        document.body.style.overflow = 'hidden'
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
    mode: 0,
    pos: [0,0],
    vel: [0,0],
    speed: 5,
    tp: 0,
    immune: false,
    intervals: {
        up: undefined,
        down: undefined,
        left: undefined,
        right: undefined
    },

    inventory: [
        {
            name: 'Large lollipop',
            desc: 'Heals 100HP',
            inUse: false,
            fun: player => {
                healPlayer(player, 100)  
            },
        },
        {
            name: 'Large lollipop',
            desc: 'Heals 100HP',
            inUse: false,
            fun: player => {
                healPlayer(player, 100)  
            },
        }
    ],

    damage: function(damage) {
        if(!bfSoul.immune) {
            DeBread.playSound('../../media/breadFight/audio/hurt.wav', 0.1)
            const possiblePlayers = []
            for(let i = 0; i < bfPlayers.length; i++) {
                if(bfPlayers[i].health > 0) {
                    possiblePlayers.push(i)
                }
            }
    
            damagePlayer(possiblePlayers[DeBread.randomNum(0,possiblePlayers.length-1)], damage)
    
            bfSoul.immune = true
            doge('bfSoul').style.opacity = '0.5'
            setTimeout(() => {
                bfSoul.immune = false
                doge('bfSoul').style.opacity = '1'
            }, 500);
        }
    }
}

function changePlayFieldSize(size) {
    addStyles(doge('playField'), {
        width: size[0]+'px',
        height: size[1]+'px'
    })
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
    // {
    //     name: '?????',
    //     health: 7000,
    //     maxHealth: 7000,
    //     color: '#4a2f75ff',
    //     isAttacking: false,
    //     damageMultiplier: 10,
    //     defense: 0.5,
    //     isDefending: false,
    //     barPos: Infinity,
    // },
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
            // {
            //     time: 15000,
            //     fun: () => {
            //         const hazard = createHazard()
            //         addStyles(hazard, {
            //             width: '10px',
            //             height: '10px'
            //         })
            //         doge('playField').append(hazard)
            //     }
            // },
            {
                time: 15000,
                fun: () => {
                    changeFellaMood('Spawn')
                    changePlayFieldSize([350,250])

                    setTimeout(() => {                        
                        const goober = createHazard(50, true)
                        addStyles(goober, {
                            width: '32px',
                            height: '32px',
                            top: '109px',
                            right: '10px',
                            backgroundImage: `url(../../media/breadFight/goober${DeBread.randomNum(0,2)}.png)`,
                            backgroundSize: '32px',
                            backgroundColor: 'transparent',
                        })
                        doge('playField').append(goober)

                        const gooberGun = createHazard(30, true)
                        addStyles(gooberGun, {
                            width: '16px',
                            height: '8px',
                            backgroundColor: 'transparent',
                            backgroundImage: 'url(../../media/breadFight/gooberGun.png)',
                            right: '60px',
                            backgroundSize: '16px',
                            top: '121px'
                        })
                        doge('playField').append(gooberGun)

                        const gooberEffect = document.createElement('div')
                        addStyles(gooberEffect, {
                            position: 'fixed',
                            width: '48px',
                            height: '48px',
                            top: '101px',
                            right: '10px',
                            backgroundColor: 'white',
                            zIndex: '2',
                            animation: 'gooberHazard 500ms ease-out 1 forwards'
                        })

                        setTimeout(() => {
                            changeFellaMood('Idle')
                            gooberEffect.remove()

                            let angle
                            let gunRect = gooberGun.getBoundingClientRect()
                            gooberGun.interval = setInterval(() => {
                                const soulRect = doge('bfSoul').getBoundingClientRect()
                                angle = Math.atan2(soulRect.top - gunRect.top, soulRect.left - gunRect.left)
                                gooberGun.style.rotate = angle+'rad'
                            }, 250);

                            for(let i = 1; i < 30; i++) {
                                const bullet = createHazard(20, undefined, '../../media/breadFight/gooberBullet.png', [8,4])
                                setTimeout(() => {
                                    const bulletAngle = angle
                                    bullet.pos = [gunRect.left,gunRect.top]
                                    bullet.scale = 1
                                    
                                    bullet.interval = setInterval(() => {
                                        bullet.pos[0] += Math.cos(bulletAngle)*5
                                        bullet.pos[1] += Math.sin(bulletAngle)*5
                                        bullet.scale += 0.1

                                        addStyles(bullet, {
                                            left: bullet.pos[0]+'px',
                                            top: bullet.pos[1]+'px',
                                            width: '4px',
                                            height: '4px',
                                            scale: bullet.scale
                                        })

                                        bullet.querySelector('img').style.rotate = bulletAngle + 'rad'

                                        doge('breadFight').append(bullet)

                                        if(bullet.pos[0] <= doge('playField').getBoundingClientRect().left || bullet.pos[1] < doge('playField').getBoundingClientRect().top || bullet.pos[1] > doge('playField').getBoundingClientRect().bottom - bullet.offsetHeight) {
                                            const explosion = createHazard(50, true)
                                            addStyles(explosion, {
                                                left: bullet.pos[0]+'px',
                                                top: bullet.pos[1]+'px',
                                                width: '15px',
                                                height: '15px',
                                                animation: 'bulletExplosion 1000ms ease-out 1 forwards'
                                            })
                                            doge('breadFight').append(explosion)

                                            setTimeout(() => {
                                                explosion.canCollide = false
                                            }, 500);

                                            setTimeout(() => {
                                                explosion.remove()
                                            }, 1000);

                                            clearInterval(bullet.interval)
                                            bullet.remove()
                                        }
                                    }, 25);
                                }, 300 * i)
                            }
                        }, 1000);
                        doge('playField').append(gooberEffect)

                        setTimeout(() => {
                            goober.remove()
                            gooberGun.remove()
                        }, 15000);
                    }, 1000);
                }
            },
            {
                time: 12500,
                fun: () => {
                    changeFellaMood('Point')
                    fellaTalk('bla bla bla something ultrakill')
                    setTimeout(() => {       
                        for(let i = 0; i < 10; i++) {
                            setTimeout(() => {     
                                for(let x = 0; x < 5; x++) {
                                    const fellaRect = doge('fella').getBoundingClientRect()
                                    const fireball = createHazard(35, true, '../../media/breadFight/fireball.png', [32,32])
                                    let fireballRect = fireball.getBoundingClientRect()
                                    let soulRect = doge('bfSoul').getBoundingClientRect()
                                    fireball.pos = [fellaRect.left, fellaRect.top + 80]
                                    fireball.easing = DeBread.randomNum(0.02, 0.03, 4)
                                    fireball.scale = 1

                                    fireball.angle = Math.atan2(
                                        soulRect.top - fireball.pos[1],
                                        soulRect.left - fireball.pos[0]
                                    ) * (0.9 + (x / 10) * DeBread.randomNum(0.5,2,3))

                                    addStyles(fireball, {
                                        width: '12px',
                                        height: '12px',
                                        left: fireball.pos[0] + 'px',
                                        top: fireball.pos[1] + 'px'
                                    })
                                    
                                    fireball.interval = setInterval(() => {
                                        fireballRect = fireball.getBoundingClientRect()
                                        soulRect = doge('bfSoul').getBoundingClientRect()
    
                                        const targetAngle = Math.atan2(soulRect.top * DeBread.randomNum(0.75,1.25) - fireballRect.top, soulRect.left * DeBread.randomNum(0.75,1.25) - fireballRect.left)
                                        
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
                time: 12500,
                fun: () => {
                    doge('playField').style.overflow = 'hidden'
                    for(let i = 0; i < 15; i++) {
                        setTimeout(() => {                            
                            const line = createHazard(100, true)
                            line.canCollide = false
                            let randomOffset = DeBread.randomNum(-100,100)
                            let rotation = DeBread.randomNum(0,1)
                            addStyles(line, {
                                width: '25px',
                                height: '250px',
                                opacity: '0.25',
                                left: 125-12.5 * rotation + 'px',
                                top: '0',
                                rotate: 90*rotation+'deg',
                                animation: 'line ease-out 500ms 1 forwards'
                            })

                            if(rotation === 1) {
                                line.style.top = randomOffset + 'px'
                            }
                            if(rotation === 0) {
                                line.style.left = 125-12.5 + randomOffset + 'px'
                            }        
                            
                            let updates = 0
                            line.interval = setInterval(() => {                            
                                if(rotation === 1) {
                                    line.style.top = (Math.sin(updates / 10) * 25) + randomOffset + 'px'
                                }
                                if(rotation === 0) {
                                    line.style.left = (125-12.5 + Math.sin(updates / 10) * 25) + randomOffset + 'px'
                                }
                                updates++
                            }, 25);
        
                            doge('playField').append(line)
        
                            setTimeout(() => {
                                addStyles(line, {
                                    opacity: 1,
                                    animation: 'linePulse ease-out 500ms 1 forwards'
                                })
                                clearInterval(line.interval)
                                line.canCollide = true
                                DeBread.shake(doge('fella'),10,5,0,250)

                                setTimeout(() => {
                                    line.style.animation = 'lineOut ease-in 500ms 1 forwards'
                                }, 500);
                                setTimeout(() => {
                                    line.remove()
                                }, 1000);
                            }, 1000);
                        }, i * DeBread.randomNum(500, 750));
                    }
                }
            },
            {
                time: 15000,
                fun: () => {
                    bfSoul.mode = 1
                    DeBread.playSound('../../media/breadFight/audio/bell.wav', 0.1)
                    doge('bfSoul').style.filter = 'hue-rotate(200deg)'
                    doge('playField').style.overflow = 'unset'

                    setTimeout(() => {
                        changePlayFieldSize([24,250])

                        setTimeout(() => {
                            for(let i = 1; i < 5; i++) {
                                setTimeout(() => {                                    
                                    const spike = createHazard(25,true)
                                    spike.pos = 300
                                    addStyles(spike, {
                                        width: '24px',
                                        height: '24px',
                                        left: spike.pos+'px',
                                        bottom: '0px',
                                        animation: 'spikeIn 500ms ease-out 1 forwards'
                                    })
                                    spike.interval = setInterval(() => {
                                        spike.pos -= 5
                                        spike.style.left = spike.pos+'px'
    
                                        if(spike.pos <= -100) {
                                            spike.style.animation = 'spikeOut 500ms ease-out 1 forwards'
                                            clearInterval(spike.interval)
                                        }
                                    }, 25);
        
                                    doge('playField').append(spike)
                                }, 1000*i);

                                setTimeout(() => {
                                    const orb = document.createElement('div')
                                    orb.pos = 300
                                    orb.classList.add('orb')
                                    addStyles(orb, {
                                        position: 'absolute',
                                        left: orb.pos + 'px',
                                        bottom: '50px',
                                        width: '24px',
                                        height: '24px',
                                        backgroundColor: 'yellow',
                                    })
                                    doge('playField').append(orb)

                                    orb.interval = setInterval(() => {
                                        orb.pos -= 5
                                        orb.style.left = orb.pos+'px'
                                    }, 25);
                                }, 5000);
                            }
                        }, 1000);
                    }, 1000);
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
                    bfEnemies[0].currentAttack = 0
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
        if(bfSoul.pos[0] > doge('playField').offsetWidth - doge('bfSoul').offsetWidth) {
            bfSoul.pos[0] = doge('playField').offsetWidth - doge('bfSoul').offsetWidth
        }

        if(bfSoul.pos[1] < 0) {
            bfSoul.pos[1] = 0
        }

        doge('bfSoul').style.left = bfSoul.pos[0]+'px'
        doge('bfSoul').style.top = bfSoul.pos[1]+'px'

        doge('breadFight').querySelectorAll('.hazard').forEach(hazard => {
            if(hazard.canCollide && bfSoul.isActive) {
                if(isColliding(hazard, doge('bfSoul'))) {
                    bfSoul.damage(hazard.damage)
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

        if(bfSoul.mode === 1) {
            bfSoul.vel[1]++
            if(bfSoul.pos[1] + bfSoul.vel[1] >= doge('playField').offsetHeight - doge('bfSoul').offsetHeight) {
                bfSoul.pos[1] = doge('playField').offsetHeight - doge('bfSoul').offsetHeight
                bfSoul.vel[1] = 0
            }

            bfSoul.pos[1] += bfSoul.vel[1]
        }
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
    },
    Spawn: {
        frames: 2,
        loop: false
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

        doge('bfDebug').innerText = `
        Attack: ${bfEnemies[0].currentAttack}
        Mood: ${fellaMood}${currentFellaSprite}
        Health: ${bfEnemies[0].health}
        `
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
            if(bfSoul.mode === 0) {
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
            } else if(bfSoul.mode === 1) { //GD
                let isCollidingWithOrb = false
                doge('playField').querySelectorAll('.orb').forEach(orb => {
                    if(isColliding(orb, doge('bfSoul'))) {
                        isCollidingWithOrb = true
                    }
                })

                if(['w','arrowup'].includes(key) && bfSoul.pos[1] >= doge('playField').offsetHeight - doge('bfSoul').offsetHeight || isCollidingWithOrb) {
                    bfSoul.vel[1] = -12
                }
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

                if(currentACTButton === 2) {
                    doge('statuus')
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
    
        if(currentMenu === 1) {
            if(currentACTButton === 0) {
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
                            color: bfPlayers[shorterBar.player].color,
                            animation: 'attackNum 2s linear 1 forwards'
                        })
                        damageNum.innerText = DeBread.round(damage)
                        doge('attackNumContainer').append(damageNum)
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

        //Debug stuff
        if(key === 'm') {
            bfEnemies[0].currentAttack++
        }
        if(key === 'n') {
            bfEnemies[0].currentAttack--
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
        <div class="playerButton" id="${key}Button2" style="background-image: url(../../media/breadFight/icons/item.png);"></div>
        <div class="playerButton" id="${key}Button3" style="background-image: url(../../media/breadFight/icons/mercy.png); opacity: 0.5;"></div>
        <div class="playerButton" id="${key}Button4" style="background-image: url(../../media/breadFight/icons/defend.png);"></div>
    </div>
    `
}

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
    bfSoul.pos = [
        doge('playField').offsetWidth / 2 - doge('bfSoul').offsetWidth / 2,
        doge('playField').offsetHeight / 2 - doge('bfSoul').offsetHeight / 2
    ]

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
            changePlayFieldSize([250,250])

            for(const key in bfSoul.intervals) {
                clearInterval(bfSoul.intervals[key])
            }

            if(bfEnemies[0].health < 7000) {
                currentDialogue = 'Something doesn\'t feel right...'
            }
            doge('statusMain').innerText = currentDialogue

            bfEnemies[0].currentAttack++

            doge('attackNumContainer').innerHTML = ''

        }, bfEnemies[0].attacks[bfEnemies[0].currentAttack].time);
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
        doge('breadFightContainer').style.filter = 'brightness(0)'
        bfSoul.immune = true
        bfSoul.isActive = false
        const soulRect = doge('bfSoul').getBoundingClientRect()
        battleMusic.pause()
        
        const soul = document.createElement('img')
        soul.src = '../../media/breadFight/soulBreak0.png'
        addStyles(soul, {
            width: '48px',
            height: '24px',
            position: 'fixed',
            left: soulRect.left - 12+'px',
            top: soulRect.top+'px',
            zIndex: '5',
            imageRendering: 'pixelated'
        })
        
        setTimeout(() => {
            soul.src = '../../media/breadFight/soulBreak1.png'
            DeBread.playSound('../../media/breadFight/audio/break1.wav',0.1)

            setTimeout(() => {
                soul.remove()
                DeBread.playSound('../../media/breadFight/audio/break2.wav',0.1)
                for(let i = 0; i < 10; i++) {
                    const soulShard = document.createElement('img')
                    soulShard.src = `../../media/breadFight/soulShard${DeBread.randomNum(0,2)}.png`

                    soulShard.vel = [DeBread.randomNum(-10, 10,5), DeBread.randomNum(-5,-15,5)]
                    soulShard.pos = [
                        DeBread.randomNum(soulRect.left, soulRect.right - 8),
                        DeBread.randomNum(soulRect.top, soulRect.bottom - 8)
                    ]

                    addStyles(soulShard, {
                        position: 'fixed',
                        left: soulShard.pos[0]+'px',
                        top: soulShard.pos[1]+'px',
                        width: '8px',
                        height: '8px',
                        zIndex: '5',
                        imageRendering: 'pixelated'
                    })
                    
                    setInterval(() => {
                        soulShard.pos[0] += soulShard.vel[0]
                        soulShard.pos[1] += soulShard.vel[1]

                        soulShard.vel[1] += 0.5
                        soulShard.vel[0] /= 1.01

                        addStyles(soulShard, {
                            left: soulShard.pos[0]+'px',
                            top: soulShard.pos[1]+'px'
                        })
                    }, 25)
                    document.body.append(soulShard)
                }
            }, 1500);
        }, 750);
        document.body.append(soul)
    }
}

function healPlayer(player, amount) {
    bfPlayers[player].health = Math.min(bfPlayers[player].health + amount, bfPlayers[player].maxHealth)

    doge(`${player}HealthText`).innerText = `${DeBread.round(bfPlayers[player].health)}/${DeBread.round(bfPlayers[player].maxHealth)}`
    doge(`${player}HealthBar`).style.width = `${Math.max(bfPlayers[player].health / bfPlayers[player].maxHealth,0) * 100}%`
}

function createHazard(damage, unbreakable = false, texture, textureSize) {
    const hazard = document.createElement('div')
    hazard.classList.add('hazard')
    hazard.breakable = unbreakable
    hazard.canCollide = true
    hazard.damage = damage
    addStyles(hazard, {
        backgroundColor: 'white',
        position: 'fixed',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 2,
        // outline: '1px solid red'
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
        position: 'fixed',
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