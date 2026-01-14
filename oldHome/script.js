function expandProjects() {
    if(doge('extendedProjects').style.display === 'flex') {
        doge('extendedProjects').style.display = 'none'
        doge('projectShowMore').innerText = 'Show more...'
    } else {
        doge('extendedProjects').style.display = 'flex'
        doge('projectShowMore').innerText = 'Show less...'
    }
}

const splashTexts = [
    'Now bug free! (almost)',
    'Mobile compatible!',
    '7th rewrite!',
    '500 if statements',
    'Coming soon!',
    'Fox crossing',
    'Raccoons around...',
    'Probably listening to Toby Fox',
    'Oh the Missouri',
    'breab',
    'Trust the process',
    '$20 a year!',
    'Empl*yed...',
    'Fucked up looking dog',
    'Lets groove tonight 🎶',
    'Check out <a href="https://plinkel.neocities.org" target="_blank">plinkel.neocities.org</a>!',
    'Join the mc server 😭'
]

doge('splash').innerHTML = splashTexts[DeBread.randomNum(0, splashTexts.length - 1)]
doge('splash').onclick = () => {doge('splash').innerHTML = splashTexts[DeBread.randomNum(0, splashTexts.length - 1)]}
//Guy click
const guyTexts = [
    'Hi',
    'Wowie!',
    'Imagine if there was a secret game here...',
    'Join my Minecraft server!',
    'I\'ve made this website like 8 times now. 💀',
    'Those dots are called <mono>guyPoints</mono> in the code btw.',
    'Check this out <br><img src="../media/buddy.png" width=100>',
    'You should try out ULTRAKILL, its pretty good',
    'Imma be a one-man cheeseburger apocalypse',
    'Something big is coming...',
    `<span style="font-family: Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif; font-size: 1.25em; color: rgb(254, 151, 1); text-shadow: 1px 0 0 #813300,0 1px 0 #c14d00,2px 1px .35px #813300,1px 2px .35px #c14d00,3px 2px .35px #813300,2px 3px .35px #c14d00,4px 3px .35px #813300,3px 4px .35px #c14d00,5px 4px .35px #813300,4px 5px .35px #c14d00,6px 5px .35px #813300,5px 6px .35px #c14d00,7px 6px .35px #813300,6px 7px .35px #c14d00;">Send me a drawing.</span>`,
    `<div style="display: flex; align-items: center;">Man its kinda <img src="../media/warm.gif" class="shake" width=137></div>`,
    'Why are these textboxes so buggy???',
    'I\'m good at programming just trust',
    'Throw rocks at homeless people',
    `<img src="../media/server.gif" width=250>`,
    'I need my big lolipop',
    'I love playing with my choo choo train',
    'I gotta go to bed'
] //Add time-of-day welcome, like 'Good morning!'
 
/* Guy stuff */

doge('guyCounter').innerText = data.guyPoints

const textboxBase = document.createElement('div')
textboxBase.id = 'guyTextBox'
doge('guy').onclick = () => {
    createGuyPoint(cursor)
    guyTalk(guyTexts[DeBread.randomNum(0,guyTexts.length-1)])
}

function guyTalk(text, animate = false) {
    if(doge('guyTextBox')) {
        doge('guyTextBox').remove()
    }

    const textbox = textboxBase.cloneNode()
    textbox.innerHTML = text

    doge('relativeGuyContainer').append(textbox)
    textbox.style.left = -textbox.offsetWidth + 'px'

    textbox.timeout = setTimeout(() => {
        textbox.remove()
    }, 3000);

    if(animate) {
        doge('guy').style.scale = '1.2 0.9'
        doge('guy').style.translate = '0 10px'

        setTimeout(() => {
            doge('guy').style.scale = ''
            doge('guy').style.translate = ''
        }, 50);
    }
}

let wipClicks = 0
let WIPdialogue = [
    'Hey that isnt out yet.',
    'Hey that isnt out yet.',
    'Hey that isnt out yet.',
    'Dude did you hear me.',
    'Maybe if you click on it again it will come out.',
    'WRONG',
    '...',
    '...',
    '...',
    'Alright fuck you in particular.',
    'No more WIPs for you.'
]
function tryWIP() {
    wipClicks++
    guyTalk(WIPdialogue[Math.min(wipClicks-1,WIPdialogue.length-1)],true)

    if(wipClicks >= WIPdialogue.length) {
        document.querySelectorAll('[wip="true"]').forEach(elem => {
            elem.remove()
            console.log(elem)
        })
    }
}

const particleBase = document.createElement('div')
particleBase.classList.add('guyPointParticle')
setInterval(() => {
    const counterCenter = [
        doge('guyCounter').getBoundingClientRect().left + doge('guyCounter').offsetWidth / 2,
        doge('guyCounter').getBoundingClientRect().top + doge('guyCounter').offsetHeight / 2
    ]
    document.querySelectorAll('.guyPoint').forEach(point => {
        point.pos[0] += Math.cos(point.angle) * Math.min(point.speed, 100)
        point.pos[1] += Math.sin(point.angle) * Math.min(point.speed, 100)

        point.updatePos()
        
        if(point.speed < 0.25 || point.towardsNum) {
            point.towardsNum = true
            point.angle = Math.atan2(counterCenter[1] - point.pos[1], counterCenter[0] - point.pos[0])
            point.speed *= 1.25
        } else {            
            point.speed /= 1.25
        }
        const distance = Math.sqrt(Math.pow(counterCenter[0]-point.pos[0],2) + Math.pow(counterCenter[1]-point.pos[1],2))
        if(distance < 25 || point.speed > distance * 5) {
            point.remove()
            data.guyPoints++
            doge('guyCounter').innerText = data.guyPoints
        }

        // Wayyyy to laggy
        // setTimeout(() => {            
        //     const particle = particleBase.cloneNode()
        //     particle.style.left = point.pos[0]+'px'
        //     particle.style.top = point.pos[1]+'px'
        //     particle.style.rotate = DeBread.randomNum(0,90)+'deg'
        //     particle.style.setProperty('--randomX',DeBread.randomNum(-5,5)+'px')
        //     particle.style.setProperty('--randomY',DeBread.randomNum(-5,5)+'px')
        //     particle.style.setProperty('--randomRotate',DeBread.randomNum(0,90)+'px')
        //     document.body.append(particle)
    
        //     setTimeout(() => {
        //         particle.remove()
        //     }, 250);
        // }, 50);
    })
}, 50);

const guyPointBase = document.createElement('div')
guyPointBase.classList.add('guyPoint')
function createGuyPoint(pos, amount = 1) {
    for(let i = 0; i < amount; i++) {
        const guyPoint = guyPointBase.cloneNode()
        guyPoint.pos = [pos[0], pos[1]]
    
        guyPoint.style.left = guyPoint.pos[0]+'px'
        guyPoint.style.top = guyPoint.pos[1]+'px'
    
        document.body.append(guyPoint)
        
        guyPoint.angle = DeBread.randomNum(0, 360, 5) * Math.PI / 180
        guyPoint.speed = DeBread.randomNum(5,20,5)
        guyPoint.towardsNum = false
    
        guyPoint.updatePos = () => {
            guyPoint.style.left = guyPoint.pos[0]+'px'
            guyPoint.style.top = guyPoint.pos[1]+'px'
        }
    }
}

document.body.querySelectorAll('span[fillDate="true"]').forEach(elem => {
    elem.innerText = `${getTimeSince(elem.getAttribute('day'), elem.getAttribute('month'), elem.getAttribute('year'))} ago`
})

//Define amount of drawings from each author
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

//Create an array of drawing data
let unrandomizedDrawings = []
for(const author in featuredDrawings) {
    for(let i = 0; i < featuredDrawings[author]; i++) {
        unrandomizedDrawings.push({
            author: author,
            src: `${author}/${i}.png`
        })
    }
}

//Shuffle the array
function shuffleArray(array) {
    for(let i = array.length - 1; i > 0; i--) {
        const randomIndex = DeBread.randomNum(0, i); //THIS ACTUALLY NEEDS A SEMICOLON????????
        [array[i], array[randomIndex]] = [array[randomIndex], array[i]]
    }
    return array
}
let shuffledDrawings = shuffleArray(unrandomizedDrawings)

//Create the elements
for(drawing in shuffledDrawings) {
    const div = document.createElement('div')
    div.classList.add('featuredDrawing')
    div.innerHTML = `
        <img src="../media/featuredDrawings/${shuffledDrawings[drawing].src}" onclick="openImage('../media/featuredDrawings/${shuffledDrawings[drawing].src}')" style="cursor: pointer;">
        <span>Drawn by ${shuffledDrawings[drawing].author}</span>
    `
    doge('featuredDrawingsContainer').append(div)
}