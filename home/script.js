function convertToVec4(rgb) {
    const output = []
    for(value in rgb) {
        output.push(DeBread.round(rgb[value]/255,3))
    }

    return output
}

// const months = ['JAN','FEB','MAR','APR','MAY','JUN','JUL','AUG','SEP','OCT','NOV','DEC']
// const days = ['SUN','MON','TUE','WED','THU','FRI','SAT']
// let newYearsTrigger = false

// function updateDate() {
//     const now = new Date()

//     doge('dateDay').innerText = days[now.getDay()]
//     doge('dateDate').innerText = now.getDate()
//     doge('dateMonth').innerText = months[now.getMonth()]

//     const date = {
//         months: now.getMonth(),
//         days: now.getDate(),
//         hours: now.getHours(),
//         minutes: now.getMinutes(),
//         seconds: now.getSeconds(),
//     }

//     const dayProgress = (
//         date.hours + 
//         (date.minutes / 60) + 
//         (date.seconds / 3600)) / 24

//     doge('dateDayPercent').innerText = DeBread.round(dayProgress * 100,2) + '%'
//     doge('dateDayBar').style.width = dayProgress * 100 + '%'

//     function getMonthLength(year, month) {
//         return new Date(year, month + 1, 0).getDate()
//     }  

//     const monthLength = getMonthLength(now.getFullYear(), date.months)
//     const monthProgress = (date.days - 1 + dayProgress) / monthLength
//     doge('dateMonthPercent').innerText = DeBread.round(monthProgress * 100,2) + '%'
//     doge('dateMonthBar').style.width = monthProgress * 100 + '%'

//     const startOfYear = new Date(now.getFullYear(), 0, 1)
//     const endOfYear = new Date(now.getFullYear(), 11, 31)

//     const dayOfYear = (now - startOfYear) / 86400000
//     const yearLength = (endOfYear - startOfYear) / 86400000

//     const yearProgress = dayOfYear / (yearLength + 1)
    
//     doge('dateYearPercent').innerText = DeBread.round(yearProgress * 100,2) + '%'
//     doge('dateYearBar').style.width = yearProgress * 100 + '%'

//     if(dayProgress <= 0.15) {
//         getAchievement('afterhours')
//     }

//     if(DeBread.round(yearProgress,3) === 0 && !newYearsTrigger) {
//         for(let i = 0; i < globalDate.getFullYear() - 2000; i++) {
//             setTimeout(() => {
//                 createConfetti()
//             }, i * 250);
//         }
//         fellaClick('Man you should be out celebrating right now, not sitting on my website 😭', true)
//         newYearsTrigger = true
//     }
// } setInterval(updateDate, 1000)

const confettiBase = document.createElement('div')
addStyles(confettiBase, {
    width: '10px',
    height: '5px',
    backgroundColor: 'red',
    position: 'absolute',
    transition: 'opacity ease-in-out 1s',
    animation: 'confettiSpin 3s ease-out 1 forwards'
})

function createConfetti() {
    const randomPos = [DeBread.randomNum(100, window.innerWidth - 100),DeBread.randomNum(100, window.innerHeight - 100)]
    
    for(let i = 0; i < 10; i++) {
        const confetti = confettiBase.cloneNode()
        confetti.classList.add('confetti')
        confetti.pos = [randomPos[0], randomPos[1]]
        confetti.speed = DeBread.randomNum(3,15)
        confetti.grav = 0
        confetti.angle = DeBread.randomNum(0,Math.PI*2,5)
        confetti.style.setProperty('--confettiSpin',DeBread.randomNum(-360*3,360*3)+'deg')
        
        addStyles(confetti, {
            backgroundColor: `hsl(${DeBread.randomNum(250,300)},100%,90%)`,
            left: confetti.pos[0]+'px',
            top: confetti.pos[1]+'px',
            rotate: confetti.angle + 'rad'
        })

        setTimeout(() => {
            confetti.style.opacity = '0'
            setTimeout(() => {
                confetti.remove()
            }, 1000);
        }, 2000);
    
        doge('confettiContainer').append(confetti)
    }
}

//Birthday
setTimeout(() => {
    const years = globalDate.getFullYear() - 2007
    if(globalDate.getMonth() === 11 && globalDate.getDate() === 8) {
        for(let i = 0; i < years; i++) {
            setTimeout(() => {
                createConfetti()
            }, (2000 / years) * i);
        }
    }
}, 1000);

if(globalDate.getMonth() === 11) {
    doge('fella').src = '../media/fellaChristmas.png'
}

setInterval(() => {
    doge('confettiContainer').querySelectorAll('.confetti').forEach(confetti => {
        confetti.pos[0] += Math.cos(confetti.angle) * confetti.speed
        confetti.pos[1] += (Math.sin(confetti.angle) * confetti.speed) + confetti.grav

        confetti.speed /= 1.05
        confetti.grav += 0.1

        addStyles(confetti, {
            left: confetti.pos[0]+'px',
            top: confetti.pos[1]+'px'
        })
    })
}, 25);

function scrollToElem(elem) {
    elem.scrollIntoView({behavior: 'smooth',block: 'center'})
    const previousOutline = elem.style.getPropertyValue('outline')

    setTimeout(() => {        
        elem.style.transition = 'outline ease-in-out 250ms'
        elem.style.outline = '5px solid var(--accent)'
        setTimeout(() => {
            elem.style.outline = previousOutline
        }, 1500);
    }, 250);
}

const featuredDrawings = {
    Angelos: 1,
    Baxter: 1,
    Case: 1,
    Cherry: 1,
    Chow: 2,
    Dottr: 5,
    Erix: 1,
    HallowArtis: 1,
    Millards: 2,
    Nex: 1,
    Ozzy: 2,
    Plonk: 5,
    Skact: 1,
    sevenxstarz: 2,
    TrueSkywalkr: 1,
    Unknown: 2,
}

function getRandomFAOTDList() {
    let list = []
    for(const artist in featuredDrawings) {
        for(let i = 0; i < featuredDrawings[artist]; i++) {
            list.push({artist: artist, num: i})
        }
    }
    
    for(let i = 0; i < list.length; i++) {
        let j = DeBread.randomNum(0,i);
        
        [list[i], list[j]] = [list[j], list[i]]
    }

    return list
}

const randomFeaturedDrawings = [
  {
    "artist": "Baxter",
    "num": 0
  },
  {
    "artist": "Angelos",
    "num": 0
  },
  {
    "artist": "Ozzy",
    "num": 0
  },
  {
    "artist": "HallowArtis",
    "num": 0
  },
  {
    "artist": "Plonk",
    "num": 3
  },
  {
    "artist": "Nex",
    "num": 0
  },
  {
    "artist": "sevenxstarz",
    "num": 0
  },
  {
    "artist": "Dottr",
    "num": 0
  },
  {
    "artist": "Cherry",
    "num": 0
  },
  {
    "artist": "Millards",
    "num": 1
  },
  {
    "artist": "chow",
    "num": 0
  },
  {
    "artist": "Plonk",
    "num": 1
  },
  {
    "artist": "chow",
    "num": 1
  },
  {
    "artist": "Dottr",
    "num": 1
  },
  {
    "artist": "Ozzy",
    "num": 1
  },
  {
    "artist": "TrueSkywalkr",
    "num": 0
  },
  {
    "artist": "Dottr",
    "num": 3
  },
  {
    "artist": "Unknown",
    "num": 1
  },
  {
    "artist": "sevenxstarz",
    "num": 1
  },
  {
    "artist": "Dottr",
    "num": 4
  },
  {
    "artist": "Dottr",
    "num": 2
  },
  {
    "artist": "Unknown",
    "num": 0
  },
  {
    "artist": "Case",
    "num": 0
  },
  {
    "artist": "Erix",
    "num": 0
  },
  {
    "artist": "Plonk",
    "num": 2
  },
  {
    "artist": "Skact",
    "num": 0
  },
  {
    "artist": "Millards",
    "num": 0
  },
  {
    "artist": "Plonk",
    "num": 0
  },
  {
    "artist": "Plonk",
    "num": 4
  }
]

function updateFAOTD() {
    const drawingIndex = (globalDate.getDate() - 1) % randomFeaturedDrawings.length
    // const drawingIndex = DeBread.randomNum(0,randomFeaturedDrawings.length-1)
    doge('faotdImg').src = `../media/featuredDrawings/${randomFeaturedDrawings[drawingIndex].artist}/${randomFeaturedDrawings[drawingIndex].num}.png`
    doge('faotdArtist').innerText = 'Drawn by: ' + randomFeaturedDrawings[drawingIndex].artist

    doge('faotdImg').onclick = () => {
        openImage(
            `${randomFeaturedDrawings[drawingIndex].artist}/${randomFeaturedDrawings[drawingIndex].num}.png`,
            'Drawn by: ' + randomFeaturedDrawings[drawingIndex].artist,
            `../media/featuredDrawings/${randomFeaturedDrawings[drawingIndex].artist}/${randomFeaturedDrawings[drawingIndex].num}.png`
        )

        getAchievement('fanart')
    }
} updateFAOTD()

const fellaTexts = [
    'Hi',
    'Imagine if there was a secret game here...',
    'I\'ve made this website like 8 times now.',
    'Check this out <br><img src="../media/buddy.png" width=100>',
    'Imma be a one-man cheeseburger apocalypse',
    `<span style="font-family: Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif; font-size: 1.25em; color: rgb(254, 151, 1); text-shadow: 1px 0 0 #813300,0 1px 0 #c14d00,2px 1px .35px #813300,1px 2px .35px #c14d00,3px 2px .35px #813300,2px 3px .35px #c14d00,4px 3px .35px #813300,3px 4px .35px #c14d00,5px 4px .35px #813300,4px 5px .35px #c14d00,6px 5px .35px #813300,5px 6px .35px #c14d00,7px 6px .35px #813300,6px 7px .35px #c14d00;">Send me a drawing.</span>`,
    'I\'m good at programming just trust',
    'Throw rocks at homeless people',
    'I need my big lolipop',
    'I love playing with my choo choo train',
    'I gotta go to bed',
    `I\'m ${globalDate.getFullYear() - 2008} years old and I've already wasted my entire life`,
    'Tombstone pizzas 🥹',
    `${globalDate.getFullYear()+1} will be my year trust`,
    'Clicking me like an 8 ball',
    'I\'d like to bring the fishing minigame back',
    '<img src="../media/peep.png">',
    'Fuck the orange man'
] 

let fellaTimesClicked = 0
function fellaClick(talk, giggle) {
    fellaTalk(talk ?? fellaTexts[DeBread.randomNum(0,fellaTexts.length-1)])
    data.fellaClicks++
    if(data.fellaClicks >= 100) {
        getAchievement('raccoon')
    }

    if(giggle) {
        doge('fella').style.scale = '1.05 0.95'
        doge('fella').style.translate = '0px 10px'
        setTimeout(() => {
            doge('fella').style.scale = ''
            doge('fella').style.translate = ''
        }, 50);
    }
}

let textboxTimeout
function fellaTalk(text) {
    clearInterval(textboxTimeout)
    doge('fellaTextbox').style.transition = 'none'
    doge('fellaTextbox').style.opacity = '1'
    doge('fellaTextboxBody').innerHTML = text

    textboxTimeout = setTimeout(() => {
    doge('fellaTextbox').style.transition = 'opacity ease-in-out 500ms'
        doge('fellaTextbox').style.opacity = '0'
    }, 5000);
}

setTimeout(() => {
    if(globalDate.getMonth() === 11) {
        if(globalDate.getDate() === 8) {
            fellaClick('Birthday time :))', true)
        } else if(globalDate.getDate() === 25) {
            fellaClick('Merry Christmas!!', true)
        } else {
            fellaClick(['Ah! so jolly!','Ho ho ho ! ‼️'][DeBread.randomNum(0,1)], true)
        }
    }
}, 1000);

function renderAchievements() {
    doge('innerAchievementsContainer').innerHTML = ''
    let achGot = 0
    for(const key in achievements) {
        const ach = achievements[key]

        const card = document.createElement('div')
        card.classList.add('achievementListItem')
        card.innerHTML = `
            <img src="../media/icons/achievement.png">
            <div class="achievementListItemInfo">
                <span>${ach.name}</span>
                <span>${ach.desc}</span>
            </div>
        `

        if(!data.achievementsGot.includes(key)) {
            card.style.filter = 'brightness(50%)'
            card.querySelector('.achievementListItemInfo span:nth-child(2)').innerHTML = '???'
        } else {
            achGot++
        }

        doge('innerAchievementsContainer').append(card)
    }

    doge('innerAchievementsBar').style.width = achGot / Object.keys(achievements).length * 100 + '%'
    doge('achievementsBarProgress').innerText = `${achGot} / ${Object.keys(achievements).length}`

    if(achGot === Object.keys(achievements).length) {
        doge('achievementsBarProgress').innerText = `you're did it`
    }

}

function openAchievements() {
    doge('achievementsContainer').style.display = 'flex'
    renderAchievements()
}

//MUSIC PLAYER
const tracks = {
    carnation: {
        name: 'carnation',
        artist: 'AAAA',
        hit: [187,220]
    },
    TV_WORLD: {
        name: 'TV WORLD',
        artist: 'Toby Fox',
        hit: [60,100]
    },
    Tutorial: {
        name: 'Tutorial',
        artist: 'Dorkus64',
        hit: [0,0]
    },
    The_End_of_All_Seasons: {
        name: 'The End of All Seasons',
        artist: 'mashall h',
        hit: [284,340]
    },
    Ocean_Glaze: {
        name: 'Ocean Glaze',
        artist: 'Lifeformed, Janice Kwan',
        hit: [110,150]
    },
    Walls_of_Denial: {
        name: 'Walls of Denial',
        artist: 'Ridiculon',
        hit: [127,261]
    },
    FINAL_BLENDERMAN_APPEARED: {
        name: 'FINAL BLENDERMAN APPEARED',
        artist: 'Camellia, RichaadEB',
        hit: [192, 245]
    },
    NUCLEAR_STAR: {
        name: 'NUCLEAR STAR',
        artist: 'Camellia',
        hit: [193, 253]
    },
    Sketches_of_Pain: {
        name: 'Sketches of Pain',
        artist: 'Ridiculon',
        hit: [141,290],
    },
    The_Shattering_Circle: {
        name: 'The Shattering Circle, or: A Charade of... ',
        artist: 'Heaven Pierce Her',
        hit: [83,105],
    },
    Ascension_to_Heaven: {
        name: 'Ascension to Heaven',
        artist: 'xi',
        hit: [83,126],
    },
    Box_in_a_Box: {
        name: 'Box in a Box',
        artist: 'Daniel Pemberton',
        hit: [180,265],
    },
    Time_Go_Fishing: {
        name: 'Time Go Fishing',
        artist: 'Daniel Pemberton',
        hit: [180,265],
    },
    Centrifuge: {
        name: 'Centrifuge',
        artist: 'Daniel Pemberton',
        hit: [27,85],
    },
    Dragon_Driftway: {
        name: 'Dragon Driftway',
        artist: 'Kenta Nagata',
        hit: [0,0],
    },
    // jaden: {
    //     name: 'jaden',
    //     artist: 'jaden',
    //     hit: [15,18]
    // },
    // please_do_not_listen_to_this_song: {
    //     name: 'please do not listen to this song',
    //     artist: 'AZALI',
    //     hit: [90, 135]
    // },
}

let musicProgress
let currentTrack
let musicPaused = true
let currentSong = 'carnation'
let isSeeking = false

function startTrack(track) {
    const audio = doge('musicPlayerAudio')
    audio.src = `../media/music/${track}/audio.mp3`
    
    audio.volume = 0.1
    audio.playbackRate = 0.5
    audio.preservesPitch = false
    currentTrack = track
    audio.play()

    updateTrackInfo(track)
}

function openTrack(track) {
    const audio = doge('musicPlayerAudio')
    audio.src = `../media/music/${track}/audio.mp3`
    audio.volume = 0.25
    currentTrack = track
    audio.pause()
    musicPaused = true
    doge('musicControllsPauseButtonImg').src = '../media/icons/play.png'

    updateTrackInfo(track)

    const data = tracks[track]
    doge('musicPlayerAudio').onloadedmetadata = () => {
        doge('musicControllsRangeHit').style.width = (data.hit[1]-data.hit[0]) / audio.duration * 100 + '%'
        doge('musicControllsRangeHit').style.left = data.hit[0] / audio.duration * 100 + '%'
    }

    updateTrackVolume(true)
    updateTrackSpeed(true)
} openTrack('carnation')

function updateTrackInfo(track) {
    doge('musicPlayerAlbum').src = `../media/music/${track}/cover.png`
    doge('musicPlayerAlbum').onclick = () => {
        openImage(tracks[track].name, `By: ${tracks[track].artist}`,`../media/music/${track}/cover.png`)
    }
    doge('musicPlayerTitle').innerText = tracks[track].name
    doge('musicPlayerArtist').innerText = tracks[track].artist
}

function toggleTrack() {
    const audio = doge('musicPlayerAudio')

    if(musicPaused) {
        audio.play()
        musicPaused = false
        doge('musicControllsPauseButtonImg').src = '../media/icons/pause.png'
    } else {
        audio.pause()
        musicPaused = true
        doge('musicControllsPauseButtonImg').src = '../media/icons/play.png'
    }
}

doge('musicPlayerAudio').preservesPitch = false
setInterval(() => {
    const audio = doge('musicPlayerAudio')

    doge('musicControllsRange').max = audio.duration * 10

    if(!isSeeking) {
        doge('musicControllsRange').value = audio.currentTime * 10
    }
    doge('musicCurrentTime').innerText = formatTime(DeBread.round(audio.currentTime))
    doge('musicDuration').innerText = formatTime(DeBread.round(audio.duration))
}, 100);

doge('musicControllsRange').addEventListener('change', ev => {
    const audio = doge('musicPlayerAudio')
    audio.currentTime = doge('musicControllsRange').value / 10
})

doge('musicControllsRange').addEventListener('mousedown', ev => {isSeeking = true})
doge('musicControllsRange').addEventListener('mouseup', ev => {isSeeking = false})
doge('musicControllsRange').addEventListener('wheel', ev => {
    const audio = doge('musicPlayerAudio')
    if(ev.deltaY < 0) { //up
        doge('musicControllsRange').value = parseInt(doge('musicControllsRange').value)+10
    } else { //down
        doge('musicControllsRange').value = parseInt(doge('musicControllsRange').value)-10
    }
    audio.currentTime = doge('musicControllsRange').value / 10
    ev.preventDefault()
})

let volumeUpdateInterval
doge('musicControllsVolume').addEventListener('mousedown', ev => {
    volumeUpdateInterval = setInterval(updateTrackVolume, 25)
})
doge('musicControllsVolume').addEventListener('mouseup', ev => {
    clearInterval(volumeUpdateInterval)
    setTimeout(() => {
        doge('tooltip').style.display = 'none'
    }, 1000);
})
doge('musicControllsVolume').addEventListener('change', updateTrackVolume)

function updateTrackVolume(hideTooltip) {
    const volume = doge('musicControllsVolume').value
    doge('musicPlayerAudio').volume = volume
    if(!hideTooltip) {
        updateTrackTooltip('Volume',doge('musicPlayerAudio').volume)
    }

    if(volume >= 0.5) {
        if(volume == 1) {
            DeBread.easeShake(doge('musicPlayerVolumeIcon'), 25, 2, 0.01)
            if(!doge('musicPlayerAudio').paused) {
                getAchievement('hearingProblems')
            }
        }
        doge('musicPlayerVolumeIcon').src = '../media/icons/volume2.png'
    } else if(volume > 0) {
        doge('musicPlayerVolumeIcon').src = '../media/icons/volume1.png'
    } else {
        doge('musicPlayerVolumeIcon').src = '../media/icons/volume0.png'
    }
}

let fellaSpeedTalk = false

let speedUpdateInterval
doge('musicControllsSpeed').addEventListener('mousedown', ev => {
    speedUpdateInterval = setInterval(updateTrackSpeed, 25);
})
doge('musicControllsSpeed').addEventListener('mouseup', ev => {
    clearInterval(speedUpdateInterval)
    setTimeout(() => {
        doge('tooltip').style.display = 'none'
    }, 1000);
})

doge('musicControllsSpeed').addEventListener('change', ev => {
    updateTrackSpeed()

    if(!fellaSpeedTalk) {
        fellaClick('Y\'know, it should be standard for music players to have a speed slider. It\'s pretty cool.', true)
        fellaSpeedTalk = true
    }
})

function updateTrackSpeed(hideTooltip) {
    doge('musicPlayerAudio').playbackRate = doge('musicControllsSpeed').value

    if(!hideTooltip) {
        updateTrackTooltip('Speed',doge('musicPlayerAudio').playbackRate)
    }
}

function updateTrackTooltip(label, value) {
    tooltip([doge('musicPlayerFooter').getBoundingClientRect().left,doge('musicPlayerFooter').getBoundingClientRect().top],`${label}: ${value}`, false)
}

function loadTracks() {
    doge('trackListContainer').innerHTML = ''
    for(const key in tracks) {
        const audio = new Audio(`../media/music/${key}/audio.mp3`)
        const listTrack = document.createElement('div')
        listTrack.classList.add('track')
    
        audio.onloadeddata = () => {
            listTrack.innerHTML = `
                <div style="display: flex; gap: 5px;">
                    <img src="../media/music/${key}/cover.png">
                    <div class="trackInfo">
                        <span>${tracks[key].name}</span>
                        <span>${tracks[key].artist}</span>
                    </div>
                </div>
                <span>${formatTime(DeBread.round(audio.duration))}</span>
            `
        
            doge('trackListContainer').append(listTrack)
            listTrack.onclick = () => {openTrack(key)}
        }
    }
}

doge('realRacc').offset = 10
function realClick() {
    getAchievement('look')
    
    const racc = doge('realRacc')
    clearInterval(racc.interval)

    racc.src = '../media/realJump.png'

    racc.vel =- 10
    racc.interval = setInterval(() => {
        racc.vel++
        racc.offset += racc.vel
        racc.style.translate = `0px ${racc.offset}px`

        if(racc.getBoundingClientRect().top >= window.innerHeight) {
            clearInterval(racc.interval)
            racc.style.pointerEvents = 'none'
            racc.style.opacity = '0'
        }

        if(racc.offset <= -140) {
            getAchievement('volleyball')
        }
    }, 25);
}

//Get mc server members
let mcServerData
let mcServerDataTooltip = 'fetching...'

function refreshServerInfo() {
    fetch('https://api.mcsrvstat.us/2/hub.debread.space')
    .then(res => res.json())
    .then(data => {
        mcServerData = data
        if(data.debug.error) {
            doge('onlineMemberCount').innerText = 'Error'
            doge('onlineMemberCircle').style.backgroundColor = 'red'
            mcServerDataTooltip = data.debug.error.query
        } else if(data.online) {
            doge('onlineMemberCount').innerText = data.players.online + ' Online'
            doge('onlineMemberCircle').style.backgroundColor = 'lime'

            mcServerDataTooltip = `${data.players.online}/${data.players.max} members online<br>`
            for(const key in data.players.list) {
                mcServerDataTooltip += '<br>'+data.players.list[key]
            }
        } else {
            doge('onlineMemberCount').innerText = 'Server down'
            doge('onlineMemberCircle').style.backgroundColor = 'red'
            mcServerDataTooltip = `Failed to connect to server.<br>(${data.debug.errors[0].message})`
        }
    })
    
    doge('serverMemberCount').onmouseenter = () => {
        const rect = doge('serverMemberCount').getBoundingClientRect()
        tooltip([rect.left + doge('serverMemberCount').offsetWidth / 2, rect.bottom + 10], mcServerDataTooltip, true)
    }

    doge('serverMemberCount').onmouseleave = () => {
        doge('tooltip').style.display = 'none'
    }
} refreshServerInfo()
setInterval(refreshServerInfo, 60000);

const randomImages = [
    [ //Common
        {name:'Plinkel',url:'blackdi.png'},
        {name:'ImJustJAG',url:'baby-pear.png'},
        {name:'ImJustJAG',url:'wrench.jpg'},
        {name:'ImJustJAG',url:'stick.jpg'},
        {name:'ImJustJAG',url:'babygoomba.jpg'},
        {name:'ImJustJAG',url:'car0.jpg'},
        {name:'ImJustJAG',url:'heavy.jpg'},
        {name:'Inferno',url:'catglass.jpg'},
        {name:'Inferno',url:'puter.jpg'},
        {name:'Inferno',url:'dogs.jpg'},
        {name:'Kino',url:'pickles.jpg'},
        {name:'Inferno',url:'sad.jpg'},
        {name:'Inferno',url:'baby.png'},
        {name:'Inferno',url:'bugs.jpg'},
        {name:'Inferno',url:'coke.png'},
        {name:'Inferno',url:'biden.jpg'},
        {name:'Inferno',url:'ball.png'},
    ],
    [ //Uncommon
        {name:'Inferno',url:'pigon.jpg'},
        {name:'ImJustJAG',url:'evilassskeleton.jpg'},
        {name:'Plinkel',url:'aycabron.png'},
        {name:'Plinkel',url:'speed.jpg'},
        {name:'Dottr',url:'minion.gif'},
        {name:'Dottr',url:'buge.png'},
        {name:'Inferno',url:'fungus.jpg'},
        {name:'Inferno',url:'onion.png'},
        {name:'Inferno',url:'slep.png'},
        {name:'Inferno',url:'gpu.jpg'},
        {name:'Inferno',url:'wd40.jpg'},
        {name:'Inferno',url:'whatsapp.jpg'},
        {name:'Inferno',url:'car2.jpg'},
        {name:'Inferno',url:'tom.jpg'},
        {name:'Inferno',url:'shrake.jpg'},
        {name:'Inferno',url:'tox.png'},
        {name:'Cata',url:'murr.jpg'},
    ],
    [ //Rare
        {name:'ImJustJAG',url:'horse.jpg'},
        {name:'Dottr',url:'dottreat.png'},
        {name:'B-Money',url:'mirror.png'},
        {name:'???',url:'the_orange.png'},
        {name:'firstgenerationipadmini',url:'car1.jpg'},
        {name:'shapoco',url:'the_port.jpg'},
        {name:'Inferno',url:'hamburger.png'},
        {name:'Inferno',url:'losing_it.jpg'},
        {name:'Inferno',url:'hiroshima.jpg'},
        {name:'Fella',url:'aura.jpg'},
        {name:'Inferno',url:'dripping_cock.jpg'},
        {name:'Inferno',url:'horseloaf.jpg'},
        {name:'Inferno',url:'dogblown.png'},
        {name:'Inferno',url:'the_wall.png'},
        {name:'Skywalkr',url:'him.png'},
    ],
    [ //Epic
        {name:'ImJustJAG',url:'thinking0.jpg'},
        {name:'Plinkel',url:'awesomegreenguy.png'},
        {name:'Dottr',url:'bran.png'},
        {name:'Inferno',url:'sex.jpg'},
        {name:'Fella',url:'bald.jpg'},
        {name:'Inferno',url:'dragon.jpg'},
        {name:'Inferno',url:'toilet.jpg'},
        {name:'Fella',url:'sphere.png'},
        {name:'Fella',url:'yeen.gif'},
        {name:'Inferno',url:'worm.png'},
    ],
    [ //Mythic
        {name:'Synth',url:'trol.jpg'},
        {name:'ImJustJAG',url:'creature.png'},
        {name:'???',url:'car.png'},
        {name:'doggo revolution',url:'wolves.jpg'},
        {name:'Aeon',url:'toby.jpg'},
        {name:'Fella',url:'yoshi.jpg'},
        {name:'Fella',url:'poppy.jpg'},
        {name:'Inferno',url:'chicken.jpg'},
    ]
]

let isRollingImage = false
function rollRandomImage() {
    if(isRollingImage) return
    isRollingImage = true

    doge('crank').style.backgroundPosition = '64px 0px'
    DeBread.shake(doge('randomImageBox'),20,2,2,1000)

    const rarities = [
        {name:'COMMON',color:'rgb(75, 75, 75)'},
        {name:'UNCOMMON',color:'rgb(66, 112, 62)'},
        {name:'RARE',color:'rgb(61, 123, 151)'},
        {name:'EPIC',color:'rgb(103, 61, 151)'},
        {name:'MYTHIC',color:'linear-gradient(to left, rgba(64, 155, 158, 1), rgba(134, 68, 172, 1))'}
    ]

    const rarityIndex = getWeightedChance([100,50,30,10,1])
    // const rarityIndex = DeBread.randomNum(0,4)
    // const rarityIndex = 0
    const randomList = randomImages[rarityIndex]
    const randomImage = randomList[DeBread.randomNum(0,randomList.length-1)]

    setTimeout(() => {
        doge('crank').style.backgroundPosition = '0px 0px'
        doge('randomImage').src = `../media/imageRoller/${randomImage.url}`
        doge('randomImageRarity').innerText = rarities[rarityIndex].name
        doge('randomImageRarity').style.background = rarities[rarityIndex].color
        doge('randomImageAuthor').innerText = `Submitted by: ${randomImage.name}`

        doge('randomImage').style.animation = 'none'
        requestAnimationFrame(() => {
            doge('randomImage').style.animation = 'randomImagePulse 500ms ease-out 1 forwards'
        })

        doge('randomImage').onclick = () => {
            openImage('Random Image!',`Submitted by: ${randomImage.name}`,`../media/imageRoller/${randomImage.url}`)
        }

        isRollingImage = false
    }, 1000);
} rollRandomImage()

// function updateServerCountdown() {
//     const milliseconds = 1768348800000 + 86400000 - Date.now()
//     const days = Math.floor(milliseconds / 86400000)
//     const hours = Math.floor((milliseconds % 86400000) / 3600000)
//     const minutes = Math.floor(((milliseconds % 86400000) % 3600000) / 60000)
//     const seconds = Math.floor((((milliseconds % 86400000) % 3600000) % 60000) / 1000)
//     doge('serverCountdown').innerText = `${days.toString().padStart(2,0)}:${hours.toString().padStart(2,0)}:${minutes.toString().padStart(2,0)}:${seconds.toString().padStart(2,0)}`

//     if(milliseconds > 0) {
//         doge('serverCountdown').innerText = `${days.toString().padStart(2,0)}:${hours.toString().padStart(2,0)}:${minutes.toString().padStart(2,0)}:${seconds.toString().padStart(2,0)}`
//     } else {
//         doge('serverCountdown').innerText = 'LIVE'
//     }

// } setInterval(updateServerCountdown, 500)
// doge('eventDot').style.animation = 'live 1s ease-out infinite forwards'