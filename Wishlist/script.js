const items = {
    // SSD: {
    //     name: 'SSD',
    //     price: 269,
    //     hearts: 3,
    //     description: 'A computer component, specifically designed for my Framework laptop, that holds storage.',
    //     specs: [
    //         ['Capacity','2TB']
    //     ],
    //     links: [
    //         {
    //             name: 'Framework',
    //             link: 'https://frame.work/products/wd_black-sn770m-nvme?v=FRANTAWD0B'
    //         }
    //     ]
    // },
    // RAM: {
    //     name: 'RAM (2x16GB)',
    //     price: 349.99,
    //     hearts: '-',
    //     description: 'A computer component that holds temporary storage. (Unfortunately the prices on these have skyrocketed due to AI)',
    //     specs: [],
    //     links: [
    //         {
    //             name: 'Amazon',
    //             link: 'https://a.co/d/hxsE4FO'
    //         }
    //     ],

    //     puter: true
    // },
    // AIO: {
    //     name: 'NZXT 240 RGB',
    //     price: 179.99,
    //     hearts: 4,
    //     description: 'A computer component that uses liquid to cool the CPU, also including a customizable screen.',
    //     specs: [
    //         ['Size','240mm'],
    //         ['Color','Black']
    //     ],
    //     links: [
    //         {
    //             name: 'Amazon',
    //             link: 'https://a.co/d/0fz3BjH'
    //         }
    //     ]
    // },
    quest: {
        name: 'Oculus Quest 3',
        price: 499.99,
        hearts: 5,
        description: 'A virtual reality headset',
        specs: [

        ],
        links: [
            {
                name: 'Meta',
                link: 'https://www.meta.com/quest/quest-3/'
            },
            {
                name: 'Amazon',
                link: 'https://a.co/d/iH1LW4R'
            }
        ]
    },
    monitor: {
        name: 'ASUS TUF Gaming 27” 1440P HDR Monitor',
        price: 248,
        hearts: 5,
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
        discount: 'SOLD OUT as of 12/20',
        description: 'A hoodie with designs based on one of my favorite games.',
        specs: [
            ['Size','Large']
        ],
        links: [
            {
                name: 'Fangamer (SOLD OUT)',
                link: 'https://www.fangamer.com/products/tunic-hoodie-ruin-seeker'
            },
        ]
    },
    bonzai: {
        name: 'Mini Bonsai Trees',
        price: 64.99,
        hearts: 5,
        description: 'A collection of Bonzai themed lego sets.',
        specs: [],
        links: [
            {
                name: 'Amazon',
                link: 'https://www.amazon.com/LEGO-Botanicals-Bonsai-Trees-Puzzle/dp/B0DRW8G3WK'
            },
        ]
    },
    bamboo: {
        name: 'Lucky Bamboo',
        price: 23.95,
        hearts: 3,
        discount: '-20% OFF',
        description: '',
        links: [
            {
                name: 'Amazon',
                link: 'https://a.co/d/45Mcf9k'
            },
        ]
    },
    case: {
        name: 'Phone Case',
        price: 14.99,
        hearts: 4,
        description: 'Slick, low profile phone case.',
        specs: [
            ['Model','iPhone 15']
        ],
        links: [
            {
                name: 'Amazon',
                link: 'https://a.co/d/i7M6eYK'
            },
        ]
    },
    cat: {
        name: 'Cat',
        price: 'Price Varies',
        hearts: 6,
        description: '',
        specs: [

        ],
        links: [
            {
                name: 'Petfinder',
                link: 'https://www.petfinder.com/search/cats-for-adoption/us/mo/saintjoseph/'
            }
        ],
        misc: true,
    },
    lego: {
        name: 'LEGO',
        price: 'Price Varies',
        hearts: 4,
        description: '',
        specs: [],
        links: [
            {
                name: 'LEGO',
                link: 'https://www.lego.com/en-us'
            }
        ],
        misc: true,
    },
    cards: {
        name: 'Pokémon Cards',
        price: 'Price Varies',
        hearts: 4,
        description: 'Collectable cards.',
        discount: 'Discounts at Walmart',
        specs: [
            ['Preferred set','Black Bolt']
        ],
        links: [
            {
                name: 'Pokémon Center (good luck)',
                link: 'https://www.pokemoncenter.com/category/trading-card-game?category=booster-packs'
            },
            {
                name: 'Walmart',
                link: 'https://www.walmart.com/search?q=Pokemon+TCG'
            }
        ],
        misc: true,
    },
    // rgbController: {
    //     name: 'NZXT RGB & Fan Controller',
    //     price: 34.99,
    //     hearts: 2,
    //     description: 'A PC component that allows for fans to communicate with eachother and allows them to have RGB.',
    //     specs: [],
    //     links: [
    //         {
    //             name: 'NZXT',
    //             link: 'https://nzxt.com/products/rgb-and-fan-controller'
    //         }
    //     ]
    // },
    // hat: {
    //     name: 'Runic Hat',
    //     price: 24,
    //     hearts: 3,
    //     description: 'A hat showcasing a character from TUNIC.',
    //     tags: ['Fashion'],
    //     specs: [],
    //     links: [
    //         {
    //             name: 'Fangamer',
    //             link: 'https://www.fangamer.com/collections/tunic/products/tunic-game-hat'
    //         }
    //     ]
    // },
    // AnnoyingDogPin: {
    //     name: 'Annoying Dog Pin',
    //     price: 12,
    //     hearts: 3,
    //     description: 'A pin of a dog featured in UNDERTALE and DELTARUNE.',
    //     links: [
    //         {
    //             name: 'Fangamer',
    //             link: 'https://www.fangamer.com/products/undertale-annoying-dog-lapel-pin?_pos=1&_psq=annoying+dog&_ss=e&_v=1.0'
    //         }
    //     ]
    // },
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
        <div class="itemPrice" style="background-color: hsl(${150 - item.price / 2}, 100%, 65%);">$${item.price}</div>
        <div class="itemDiscount">${item.discount}</div>
    </div>
    `

    if(!item.discount) {
        div.getElementsByClassName('itemDiscount')[0].remove()
    }

    if(item.puter) {
        doge('pcItemContainer').append(div)
    } else if(item.misc) {
        doge('miscItemContainer').append(div)
    } else {
        doge('mainItemContainer').append(div)
    }

    div.onclick = () => {openItem(item, key)}
}

function openItem(item, key) {
    doge('itemPopupContainer').style.display = 'flex'
    doge('itemPopupName').innerText = item.name
    doge('itemPopupDescription').innerText = item.description
    doge('itemPopupHearts').innerText = `${item.hearts}/5 ❤️`
    doge('itemPopupImg').style.backgroundImage = `url(items/${key}.png)`
    doge('itemPopupPrice').innerText = `$${item.price}`
    doge('itemPopupPrice').style.backgroundColor = `hsl(${150 - item.price / 2}, 100%, 65%)`

    doge('itemPopupSpecContainer').innerHTML = ''
    for(const key in item.specs) {
        spec = item.specs[key]

        const span = document.createElement('span')
        span.innerHTML = `<strong>${spec[0]}:</strong> ${spec[1]}`

        doge('itemPopupSpecContainer').append(span)
    }

    doge('itemPopupButtons').innerHTML = ''
    for(const key in item.links) {
        const link = item.links[key]

        const button = document.createElement('button')
        button.innerText = `${link.name}`

        button.onclick = () => {
            // gotoPage(link.link, true)
            window.open(link.link,'_self')
        }

        doge('itemPopupButtons').append(button)
    }
}