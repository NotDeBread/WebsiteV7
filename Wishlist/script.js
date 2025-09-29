const items = {
    SSD: {
        name: 'SSD',
        price: 269,
        hearts: 3,
        discount: 'wojdh',
        description: 'A computer component, specifically designed for my Framework laptop, that holds storage.',
        tags: ['Component'],
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
    RuinSeekerHoodie: {
        name: 'Ruin Seeker Hoodie',
        price: 69,
        hearts: 5,
        description: 'A hoodie with designs based on                             one of my favorite games.',
        tags: ['Fashion'],
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
    AnnoyingDogPin: {
        name: 'Annoying Dog Pin',
        price: 12,
        hearts: 3,
        description: 'A pin of a dog featured in UNDERTALE and DELTARUNE.',
        tags: ['Fashion'],
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

    doge('itemContainer').append(div)

    div.onclick = () => {openItem(item)}
}

function openItem(item) {
    doge('itemPopupContainer').style.display = 'flex'
    doge('itemPopupName').innerText = item.name
    doge('itemPopupDescription').innerText = item.description
    doge('itemPopupHearts').innerText = `${item.hearts}/5 ❤️`
    doge('itemPopupImg').style.backgroundImage = `url(items/${item.name.replaceAll(' ','')}.png)`
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