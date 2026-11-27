document.querySelectorAll('.shakeyText').forEach(elem => {
    const text = elem.innerText
    elem.innerHTML = ''
    elem.style.display = 'flex'

    for(char of text) {
        const span = document.createElement('div')
        span.innerText = char
        span.classList.add('shakeyTextSpan')

        if(char === ' ') {
            span.style.width = '10px'
        }

        elem.append(span)
    }
})

setInterval(() => {
    document.querySelectorAll('.shakeyTextSpan').forEach(elem => {
        addStyles(elem, {
            translate: `${DeBread.randomNum(-2,2,5)}px ${DeBread.randomNum(-2,2,5)}px`,
            rotate: `${DeBread.randomNum(-2,2,5)}deg`
        })
    })
}, 500);

let selectedMenu = 'main'
function switchMenu(targetMenu) {
    const currentMenu = doge(`menu-${selectedMenu}`)
    const nextMenu = doge(`menu-${targetMenu}`)
    selectedMenu = targetMenu
    addStyles(currentMenu, {
        opacity: '0',
        pointerEvents: 'none'
    })
    setTimeout(() => {
        addStyles(nextMenu, {
            opacity: '1',
            pointerEvents: 'unset'
        })
    }, 500);
}