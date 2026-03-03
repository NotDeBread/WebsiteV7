const globalDate = new Date

const defaultData = {
    //Old data
    firstTime: true,
    guyPoints: 0,

    fellaClicks: 0,
    achievementsGot: [],
}
const data = JSON.parse(localStorage.getItem("DeBreadsSpace")) ?? defaultData

setInterval(saveData, 5000);

//Save updater, by RedJive2
function fillInto(a, b) {    
    if (typeof a !== 'object' || typeof b !== 'object') {
        throw new Error("a and b must be object, but got " + String(a) + " and " + String(b) + " (merge)")
    }
 
    for (const k in b) {
        if (typeof b[k] === 'object' && k in a) {
            fillInto(a[k], b[k])
        } else if (!(k in a)) {
            a[k] = b[k]
        }
    }
} fillInto(data, defaultData)

function saveData() {
    localStorage.setItem("DeBreadsSpace", JSON.stringify(data))
}

function deleteData() {
    localStorage.removeItem("DeBreadsSpace", JSON.stringify(data))
    window.location.reload()
    console.log('Save deleted.')
}

if(doge('loadingScreenContainer')) {
    let dots = 4
    let loadingInterval = setInterval(() => {
        dots--
        if(dots < 1) dots = 4
        
        doge('loadingText').innerText = 'Loading'.padEnd(dots+6,'.')

        doge('loadingImg').style.rotate = (((dots % 2) - 4) * 2 + 7) * 5 + 'deg'

        if(document.readyState === 'complete') {
            clearInterval(loadingInterval)
            doge('loadingText').innerText = 'Done!'
            doge('loadingImg').src = '../media/realJump.png'
            doge('loadingImg').style.rotate = '0deg'

            setTimeout(() => {
                doge('loadingScreenContainer').style.opacity = '0'
                setTimeout(() => {
                    doge('loadingScreenContainer').style.display = 'none'
                }, 250);
            }, 500);
        }
    }, 500);

}

function gotoPage(page, absoluteURL) {
    const screen = doge('loadingScreen')
    const emblem = doge('loadingEmblem')
    
    const randomRot = DeBread.randomNum(0,360)
    screen.style.rotate = randomRot + 'deg'

    screen.style.width = '100vmax'
    screen.style.height = '100vmax'

    doge('loadingEmblemContainer').style.pointerEvents = 'all'
    doge('loadingScreenContainer').style.pointerEvents = 'all'
    document.body.style.overflow = 'hidden'

    doge('crtOverlay').style.opacity = 0.1

    emblem.style.transition = 'scale cubic-bezier(.25,1.25,.5,1) 750ms'
    setTimeout(() => {
        emblem.style.scale = 1
    }, 250);

    setTimeout(() => {
        if(absoluteURL) {
            window.location.href = page
        } else {
            window.open(`../${page}`, '_self')
        }
    }, 1250);
}

document.querySelectorAll('wavey').forEach(elem => {
    const text = elem.innerText
    elem.innerHTML = ''

    const charElemBase = document.createElement('div')
    let iterations = 0
    for(const char in text) {
        const charElem = charElemBase.cloneNode()
        charElem.innerText = text[char]
        charElem.style.animation = `wavey 3s ease-in-out -${iterations*100}ms infinite forwards`

        if(text[char] === ' ') {
            charElem.style.width = '10px'
        }

        elem.append(charElem)

        iterations++
    }
})

document.querySelectorAll('imgCarrossel').forEach(elem => {
    let imgProgress = 0
    let imgs = elem.getAttribute('imgCount') - 1

    //Init
    const prevButton = document.createElement('button')
    prevButton.classList.add('imgCarrosselButton')
    prevButton.innerText = '<'
    prevButton.onclick = () => {
        if(imgProgress - 1 < 0) {
            imgProgress = imgs
        } else {
            imgProgress--
        }
        updateImg()
    }
    elem.append(prevButton)

    const img = document.createElement('img')
    elem.append(img)

    const nextButton = document.createElement('button')
    nextButton.classList.add('imgCarrosselButton')
    nextButton.innerText = '>'
    nextButton.onclick = () => {
        if(imgProgress + 1 > imgs) {
            imgProgress = 0
        } else {
            imgProgress++
        }
        updateImg()
    }
    elem.append(nextButton)

    function updateImg() {
        img.src = `${elem.getAttribute('folderPath')}/${imgProgress}.png`
        img.onclick = () => {
            openImage(`${elem.getAttribute('folderPath')}/${imgProgress}.png`)
        }
    } updateImg()
})

setInterval(() => {
    document.querySelectorAll('.shake').forEach(elem => {
        elem.style.translate = `${DeBread.randomNum(-1,1,5)}px ${DeBread.randomNum(-1,1,5)}px`
    })
}, 10);

const imageContainer = document.createElement('div')
addStyles(imageContainer, {
    position: 'fixed',
    left: '0',
    top: '0',
    width: '100dvw',
    height: '100dvh',
    display: 'none',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    gap: '10px',
    pointerEvents: 'none',
    zIndex: '7',
    backgroundColor: 'rgb(0,0,0,0.25)',
    backdropFilter: 'blur(5px)'
})

document.body.append(imageContainer)

function openImage(title, desc, url) {
    doge('imageViewContainer').style.display = 'flex'
    doge('imageViewTitle').innerText = title
    doge('imageViewDesc').innerText = desc
    doge('imageViewImg').src = url
}

function tooltip(pos, html, center) {
    const tooltip = doge('tooltip')
    tooltip.style.display = 'unset'
    if(center) {
        tooltip.style.translate = '-50% 0'
    } else {
        tooltip.style.translate = 'unset'
    }

    tooltip.innerHTML = html
    addStyles(tooltip, {
        left: pos[0]+'px',
        top: pos[1]+'px'
    })
}

function closeImage() {
    doge('imageViewContainer').style.display = 'none'
}

// function openImage(src, caption) {
//     imageContainer.innerHTML = ''
//     imageContainer.style.display = 'flex'
//     imageContainer.style.pointerEvents = 'unset'

//     const image = document.createElement('img')
//     addStyles(image, {
//         outline: '1px solid white',
//         backgroundColor: 'rgb(0,0,0,0.5)',
//         maxWidth: '90dvw',
//         maxHeight: '75dvh'
//     })
//     image.src = src
//     imageContainer.append(image)

//     if(caption) {
//         const span = document.createElement('span')
//         span.innerText = caption
//         imageContainer.append(span)
//     }

//     const imageContainerClose = document.createElement('button')
//     imageContainerClose.innerText = 'X'
//     imageContainerClose.classList.add('imageContainerClose')
//     imageContainer.append(imageContainerClose)
//     imageContainer.onclick = closeImage
// }

// function closeImage() {
//     imageContainer.style.display = 'none'
//     imageContainer.style.pointerEvents = 'none'
// }

document.addEventListener('keydown', ev => {
    if(ev.key === 'Escape') closeImage()
})

function getTimeSince(day, month, year) {
    const givenDate = new Date(year, month - 1, day)

    const diffMs = globalDate - givenDate
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))

    const years = Math.floor(diffDays / 365)
    const months = Math.floor((diffDays % 365) / 30)
    const days = diffDays % 30

    if (years > 0) return `${years} year${years > 1 ? "s" : ""}`
    if (months > 0) return `${months} month${months > 1 ? "s" : ""}`
    return `${days} day${days > 1 ? "s" : ""}`
}

const achievements = {
    welcome: {
        name: 'Welcome!',
        desc: 'Visit for the first time.'
    },
    afterhours: {
        name: 'Afterhours',
        desc: 'Visit late at night.'
    },
    raccoon: {
        name: 'Raccoon Enthusiast',
        desc: 'Click on the fella 100 times.'
    },
    chud: {
        name: 'My stupid chud dog',
        desc: 'Visit the chud page.'
    },
    fanart: {
        name: 'Quite beautiful isn\'t it',
        desc: 'View the fan art of the day.'
    },
    whoops: {
        name: 'Whoops!',
        desc: 'Encounter a 404 error.'
    },
    beginnings: {
        name: 'Where it all began',
        desc: 'Visit the Eddie site.'
    },
    og: {
        name: 'OG',
        desc: 'Visit before the v7 update.'
    },
    look: {
        name: 'Look at what you did.',
        desc: 'wow...'
    },
    volleyball: {
        name: 'Volleyball',
        desc: 'Juggle the racc.'
    },
    hearingProblems: {
        name: 'Hearing problems',
        desc: 'Set the volume to max while a track is playing.'
    },
    holiday: {
        name: 'Don\'t you have anything better to do?',
        desc: 'Visit during a holiday.'
    }
}

function getAchievement(ach) {
    if(!data.achievementsGot.includes(ach)) {
        const achievement = document.createElement('div')
        achievement.classList.add('achievement')
        achievement.innerHTML = `
            <img src="../media/icons/achievement.png">
            <div class="achivementInfo">
                <span>${achievements[ach].name}</span>
                <span>${achievements[ach].desc}</span>
            </div>
        `

        doge('achievementNotiContainer').append(achievement)
        data.achievementsGot.push(ach)
        saveData()

        setTimeout(() => {
            achievement.style.opacity = '0'
            setTimeout(() => {
                achievement.remove()
            }, 1000);
        }, 5000);
    }
}

if(
    (globalDate.getMonth() === 11 && globalDate.getDate() === 25) ||
    (globalDate.getMonth() === 9 && globalDate.getDate() === 31)
) {
    getAchievement('holiday')
}

if(data.guyPoints) {
    getAchievement('og')
}

getAchievement('welcome')