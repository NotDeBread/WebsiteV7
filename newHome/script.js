function convertToVec4(rgb) {
    const output = []
    for(value in rgb) {
        output.push(DeBread.round(rgb[value]/255,3))
    }

    return output
}

const months = ['JAN','FEB','MAR','APR','MAY','JUN','JUL','AUG','SEP','OCT','NOV','DEC']
const days = ['SUN','MON','TUE','WED','THU','FRI','SAT']

function updateDate() {
    const now = new Date()

    doge('dateDay').innerText = days[now.getDay()]
    doge('dateDate').innerText = now.getDate()
    doge('dateMonth').innerText = months[now.getMonth()]

    const date = {
        months: now.getMonth(),
        days: now.getDate(),
        hours: now.getHours(),
        minutes: now.getMinutes(),
        seconds: now.getSeconds(),
    }

    const dayProgress = (
        date.hours + 
        (date.minutes / 60) + 
        (date.seconds / 3600)) / 24

    doge('dateDayPercent').innerText = DeBread.round(dayProgress * 100,2) + '%'
    doge('dateDayBar').style.width = dayProgress * 100 + '%'

    function getMonthLength(year, month) {
        return new Date(year, month + 1, 0).getDate()
    }  

    const monthLength = getMonthLength(now.getFullYear(), date.months)
    const monthProgress = (date.days - 1 + dayProgress) / monthLength
    doge('dateMonthPercent').innerText = DeBread.round(monthProgress * 100,2) + '%'
    doge('dateMonthBar').style.width = monthProgress * 100 + '%'

    const startOfYear = new Date(now.getFullYear(), 0, 1)
    const endOfYear = new Date(now.getFullYear(), 11, 31)

    const dayOfYear = (now - startOfYear) / 86400000
    const yearLength = (endOfYear - startOfYear) / 86400000

    const yearProgress = dayOfYear / yearLength
    
    doge('dateYearPercent').innerText = DeBread.round(yearProgress * 100,2) + '%'
    doge('dateYearBar').style.width = yearProgress * 100 + '%'

    if(dayProgress <= 0.5) {
        getAchievement('afterhours')
    }
} setInterval(updateDate, 1000)

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
    
    for(let i = 0; i < 7; i++) {
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
    doge('fella').src = '../media/fellaChristmase.png'
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
    Cherry: 1,
    Dottr: 3,
    Erix: 1,
    HallowArtis: 1,
    Millards: 2,
    Nex: 1,
    Plonk: 5,
    Skact: 1,
    terminallysynth: 1,
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
  {artist:"Baxter",num: 0},
  {artist:"terminallysynth",num: 0},
  {artist:"Plonk",num: 0},
  {artist:"Millards",num: 1},
  {artist:"Plonk",num: 1},
  {artist:"Erix",num: 0},
  {artist:"TrueSkywalkr",num: 0},
  {artist:"Millards",num: 0},
  {artist:"Plonk",num: 4},
  {artist:"HallowArtis",num: 0},
  {artist:"Unknown",num: 0},
  {artist:"Dottr",num: 2},
  {artist:"Unknown",num: 1},
  {artist:"Dottr",num: 0},
  {artist:"Nex",num: 0},
  {artist:"Angelos",num: 0},
  {artist:"Plonk",num: 2},
  {artist:"Plonk",num: 3},
  {artist:"Dottr",num: 1},
  {artist:"Skact",num: 0},
  {artist:"Cherry",num: 0}
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
    'Join my Minecraft server!',
    'I\'ve made this website like 8 times now. 💀',
    'Check this out <br><img src="../media/buddy.png" width=100>',
    'Imma be a one-man cheeseburger apocalypse',
    `<span style="font-family: Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif; font-size: 1.25em; color: rgb(254, 151, 1); text-shadow: 1px 0 0 #813300,0 1px 0 #c14d00,2px 1px .35px #813300,1px 2px .35px #c14d00,3px 2px .35px #813300,2px 3px .35px #c14d00,4px 3px .35px #813300,3px 4px .35px #c14d00,5px 4px .35px #813300,4px 5px .35px #c14d00,6px 5px .35px #813300,5px 6px .35px #c14d00,7px 6px .35px #813300,6px 7px .35px #c14d00;">Send me a drawing.</span>`,
    `<div style="display: flex; align-items: center;">Man its kinda <img src="../media/warm.gif" class="shake" width=137></div>`,
    'I\'m good at programming just trust',
    'Throw rocks at homeless people',
    `<img src="../media/server.gif" width=250>`,
    'I need my big lolipop',
    'I love playing with my choo choo train',
    'I gotta go to bed',
    `I\'m ${globalDate.getFullYear() - 2007} years old and I've already wasted my entire life`,
    'I hate my stupid job'
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

function fellaTalk(text) {
    doge('fellaTextboxBody').innerHTML = text
}

setTimeout(() => {
    if(globalDate.getMonth() === 11) {
        if(globalDate.getDate() === 8) {
            fellaClick('Birthday time :))', true)
        } else if(globalDate.getDate() === 25) {
            fellaClick('Merry Christmas!!', true)
        } else {
            fellaClick('Ah! so jolly!', true)
        }
    }
}, 1000);

const rain = {
    weight: 5,
    wind: 5,
    speed: 40,
}

const rainParticleBase = document.createElement('div')
rainParticleBase.classList.add('rainParticle')
addStyles(rainParticleBase, {
    width: '10px',
    height: '2px',
    backgroundColor: 'white',
    position: 'absolute',
    opacity: '0.25',
    transition: 'top linear 100ms, left linear 100ms, rotate ease-in-out 250ms'
})
setInterval(() => {
    const rainParticle = rainParticleBase.cloneNode()
    const randomAxis = DeBread.randomNum(0,1)
    rainParticle.pos = [DeBread.randomNum(0,window.innerWidth) * randomAxis - 10, DeBread.randomNum(0,window.innerHeight) * (1-randomAxis) - 10]
    rainParticle.targetPos = [rainParticle.pos[0] + rain.wind, rainParticle.pos[1] + rain.weight]
    rainParticle.speedMult = DeBread.randomNum(0.75,1.25,5)

    rainParticle.angle = Math.atan2(
        rainParticle.targetPos[1] - rainParticle.pos[1],
        rainParticle.targetPos[0] - rainParticle.pos[0],
    )

    addStyles(rainParticle, {
        left: rainParticle.pos[0]+'px',
        top: rainParticle.pos[1]+'px',
        rotate: rainParticle.angle + 'rad'
    })

    doge('rainContainer').append(rainParticle)
}, 25)

setInterval(() => {
    doge('rainContainer').querySelectorAll('.rainParticle').forEach(particle => {
        particle.pos[0] += Math.cos(particle.angle) * rain.speed * particle.speedMult
        particle.pos[1] += Math.sin(particle.angle) * rain.speed * particle.speedMult
        particle.targetPos = [particle.pos[0] + rain.wind, particle.pos[1] + rain.weight]
        particle.angle = Math.atan2(
            particle.targetPos[1] - particle.pos[1],
            particle.targetPos[0] - particle.pos[0],
        )

        addStyles(particle, {
            left: particle.pos[0]+'px',
            top: particle.pos[1]+'px',
            rotate: particle.angle + 'rad'
        })

        if(particle.pos[0] >= window.innerWidth + 100 || particle.pos[1] >= window.innerHeight + 100) {
            particle.remove()
        }
    })
}, 100)

//Preset rain particles
for(let i = 0; i < 100; i++) {
    const rainParticle = rainParticleBase.cloneNode()
    rainParticle.pos = [DeBread.randomNum(0,window.innerWidth),DeBread.randomNum(0,window.innerHeight)]
    rainParticle.targetPos = [rainParticle.pos[0] + rain.wind, rainParticle.pos[1] + rain.weight]
    rainParticle.speedMult = DeBread.randomNum(0.9,1.1,5)

    rainParticle.angle = Math.atan2(
        rainParticle.targetPos[1] - rainParticle.pos[1],
        rainParticle.targetPos[0] - rainParticle.pos[0],
    )

    addStyles(rainParticle, {
        left: rainParticle.pos[0]+'px',
        top: rainParticle.pos[1]+'px',
        rotate: rainParticle.angle + 'rad'
    })

    doge('rainContainer').append(rainParticle)
}

function renderAchievements() {
    doge('innerAchievementsContainer').innerHTML = ''
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
        }

        doge('innerAchievementsContainer').append(card)
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
    },
    TV_WORLD: {
        name: 'TV WORLD',
        artist: 'Toby Fox',
    }
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

    doge('musicPlayerAlbum').src = `../media/music/${track}/cover.png`
    doge('musicPlayerTitle').innerText = tracks[track].name
    doge('musicPlayerArtist').innerText = tracks[track].artist
}

function openTrack(track) {
    const audio = doge('musicPlayerAudio')
    audio.src = `../media/music/${track}/audio.mp3`
    audio.volume = 0.25
    currentTrack = track
    audio.pause()

    doge('musicPlayerAlbum').src = `../media/music/${track}/cover.png`
    doge('musicPlayerTitle').innerText = tracks[track].name
    doge('musicPlayerArtist').innerText = tracks[track].artist
} openTrack('carnation')

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

const exampleAudio = new Audio()

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