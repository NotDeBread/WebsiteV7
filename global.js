const currentDate = new Date

const defaultData = {
    firstTime: true,
    guyPoints: 0,
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
    console.log('Save deleted.')
}

//Loading screen stuff
let loadingFinished = false
let loadingSkipped = false
function finishLoading() {
    loadingFinished = true
    const randomRot = DeBread.randomNum(0,360)
    const screen = doge('loadingScreen')
    const emblem = doge('loadingEmblem')

    screen.style.rotate = randomRot + 'deg'
    
    screen.style.width = '0vmax'
    screen.style.height = '0vmax'
    setTimeout(() => {
        emblem.style.scale = 0
        setTimeout(() => {
            doge('loadingEmblemContainer').style.pointerEvents = 'none'
            document.body.style.overflow = 'unset'

            if(doge('guy')) {
                doge('guy').style.scale = '1.2 0.9'
                doge('guy').style.translate = '0 10px' 
                setTimeout(() => {                    
                    doge('guy').style.scale = ''
                    doge('guy').style.translate = ''

                    const month = currentDate.getMonth() + 1
                    const day = currentDate.getDate()

                    const textbox = textboxBase.cloneNode()
                    if(loadingSkipped) {
                        textbox.innerHTML = 'My bad, the loading screen bugged out for some reason.'
                    } else if(day === 25 && month === 12) {
                        const chistmasTexts = [
                            'Merry Christmas!',
                            'Get jolly!',
                            'Oh so jolly!',
                            'Ho ho ho!'
                        ]
                        textbox.innerHTML = chistmasTexts[DeBread.randomNum(0,chistmasTexts.length-1)]
                    } else if(day === 8 && month === 8) {
                        textbox.innerHTML = 'Birthday time'
                    } else if(data.firstTime) {
                        textbox.innerHTML = 'Welcome!'
                    } else {
                        textbox.innerHTML = 'Welcome back!'
                    }

                    data.firstTime = false
                    saveData()
                    
                    doge('relativeGuyContainer').append(textbox)
                    textbox.style.left = -textbox.offsetWidth + 'px'

                    textbox.timeout = setTimeout(() => {
                        textbox.remove()
                    }, 4000);
                }, 100);
            }
        }, 750);
    }, 500);
    setTimeout(() => {
        doge('loadingScreenContainer').style.pointerEvents = 'none'
    }, 1250);
} 
if(!['/',''].includes(window.location.pathname)) {
    finishLoading()
}

setTimeout(() => {
    if(!loadingFinished) {
        finishLoading()
        loadingSkipped = true
        console.warn('Seems like it took too long to load. Hiding loading screen anyways.')
    }
}, 2000);

if(currentDate.getMonth()+1 >= 11 || currentDate.getMonth()+1 <= 2) {
    if(doge('guy')) {
        doge('guy').src = '../media/guyWinter.png'
    }
    document.body.style.setProperty('--accent','rgb(144, 233, 255)')
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

function openImage(src, caption) {
    imageContainer.innerHTML = ''
    imageContainer.style.display = 'flex'
    imageContainer.style.pointerEvents = 'unset'

    const image = document.createElement('img')
    addStyles(image, {
        outline: '1px solid white',
        backgroundColor: 'rgb(0,0,0,0.5)',
        maxWidth: '90dvw',
        maxHeight: '75dvh'
    })
    image.src = src
    imageContainer.append(image)

    if(caption) {
        const span = document.createElement('span')
        span.innerText = caption
        imageContainer.append(span)
    }

    const imageContainerClose = document.createElement('button')
    imageContainerClose.innerText = 'X'
    imageContainerClose.classList.add('imageContainerClose')
    imageContainer.append(imageContainerClose)
    imageContainer.onclick = closeImage
}

function closeImage() {
    imageContainer.style.display = 'none'
    imageContainer.style.pointerEvents = 'none'
}

document.addEventListener('keydown', ev => {
    if(ev.key === 'Escape') closeImage()
})

function getTimeSince(day, month, year) {
    const givenDate = new Date(year, month - 1, day)

    const diffMs = currentDate - givenDate
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))

    const years = Math.floor(diffDays / 365)
    const months = Math.floor((diffDays % 365) / 30)
    const days = diffDays % 30

    if (years > 0) return `${years} year${years > 1 ? "s" : ""}`
    if (months > 0) return `${months} month${months > 1 ? "s" : ""}`
    return `${days} day${days > 1 ? "s" : ""}`
}