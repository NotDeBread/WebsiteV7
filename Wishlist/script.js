const items = {
    AIO: {
        name: 'NZXT 360 RGB',
        price: 279,
        hearts: 4,
        discount: '-13% OFF',
        description: 'A computer component that uses liquid to cool the CPU, also including a customizable screen.',
        specs: [
            ['Size','360mm']
        ],
        links: [
            {
                name: 'Amazon',
                link: 'https://a.co/d/fsh6rqY'
            }
        ]
    },
    SSD: {
        name: 'SSD',
        price: 269,
        hearts: 3,
        description: 'A computer component, specifically designed for my Framework laptop, that holds storage.',
        specs: [
            ['Capacity','2TB']
        ],
        links: [
            {
                name: 'Framework',
                link: 'https://frame.work/products/wd_black-sn770m-nvme?v=FRANTAWD0B'
            }
        ]
    },
    monitor: {
        name: 'ASUS TUF Gaming 27” 1440P HDR Monitor',
        price: 196.99,
        discount: '21% OFF',
        hearts: 4,
        description: 'A high quality and fast gaming monitor.',
        specs: [
            ['Refresh rate','180Hz']
        ],
        links: [
            {
                name: 'Amazon',
                link: 'https://a.co/d/5XhV8ks'
            }
        ]
    },
    RuinSeekerHoodie: {
        name: 'Ruin Seeker Hoodie',
        price: 69,
        hearts: 5,
        description: 'A hoodie with designs based on one of my favorite games.',
        specs: [
            ['Size','Large']
        ],
        links: [
            {
                name: 'Fangamer',
                link: 'https://www.fangamer.com/products/tunic-hoodie-ruin-seeker'
            }
        ]
    },
    rgbController: {
        name: 'NZXT RGB & Fan Controller',
        price: 34.99,
        hearts: 2,
        description: 'A PC component that allows for fans to communicate with eachother and allows them to have RGB.',
        specs: [],
        links: [
            {
                name: 'NZXT',
                link: 'https://nzxt.com/products/rgb-and-fan-controller'
            }
        ]
    },
    hat: {
        name: 'Runic Hat',
        price: 24,
        hearts: 3,
        description: 'A hat showcasing a character from TUNIC.',
        tags: ['Fashion'],
        specs: [],
        links: [
            {
                name: 'Fangamer',
                link: 'https://www.fangamer.com/collections/tunic/products/tunic-game-hat'
            }
        ]
    },
    AnnoyingDogPin: {
        name: 'Annoying Dog Pin',
        price: 12,
        hearts: 3,
        description: 'A pin of a dog featured in UNDERTALE and DELTARUNE.',
        links: [
            {
                name: 'Fangamer',
                link: 'https://www.fangamer.com/products/undertale-annoying-dog-lapel-pin?_pos=1&_psq=annoying+dog&_ss=e&_v=1.0'
            }
        ]
    },
}

for(const key in items) {
    const item = items[key]
    const div = document.createElement('div')
    div.classList.add('item')
    div.style.backgroundImage = `url(items/${key}.png)`
    div.innerHTML = `
    <div class="itemInfo">
        <span class="itemName">${item.name}</span><br>
        <span>${item.description}</span>
        <div class="itemHearts">
            <span>${item.hearts}/5</span>
            <span>❤️</span>
        </div>
        <div class="itemPrice" style="background-color: hsl(${150 - item.price / 1.25}, 100%, 65%);">$${item.price}</div>
        <div class="itemDiscount">${item.discount}</div>
    </div>
    `

    if(!item.discount) {
        div.getElementsByClassName('itemDiscount')[0].remove()
    }

    doge('innerItemContainer').append(div)

    div.onclick = () => {openItem(item, key)}
}

function openItem(item, key) {
    doge('itemPopupContainer').style.display = 'flex'
    doge('itemPopupName').innerText = item.name
    doge('itemPopupDescription').innerText = item.description
    doge('itemPopupHearts').innerText = `${item.hearts}/5 ❤️`
    doge('itemPopupImg').style.backgroundImage = `url(items/${key}.png)`
    doge('itemPopupPrice').innerText = `$${item.price}`
    doge('itemPopupPrice').style.backgroundColor = `hsl(${150 - item.price / 1.25}, 100%, 65%)`

    doge('itemPopupSpecContainer').innerHTML = ''
    for(const key in item.specs) {
        spec = item.specs[key]

        const span = document.createElement('span')
        span.innerHTML = `<strong>${spec[0]}:</strong> ${spec[1]}`

        doge('itemPopupSpecContainer').append(span)
    }

    for(const key in item.links) {
        const link = item.links[key]

        const button = document.createElement('button')
        button.innerText = `${link.name}`

        button.onclick = () => {
            gotoPage(link.link, true)
        }

        doge('itemPopupButtons').innerHTML = ''
        doge('itemPopupButtons').append(button)
    }
}