const artworks = [
    {
        title: 'Fella Figura Model',
        desc: 'A custom Minecraft playermodel scripted in Lua, Modeled in Blockbench, and powered by <a href="https://modrinth.com/mod/figura" target="_blank">Figura</a>.',
        date: 'In Progress',
        imgs: [
            {
                url: 'fellaFigura0.png',
            },
            {
                url: 'fellaFigura1.png',
                desc: 'Business outfit (no glasses)'
            },
            {
                url: 'fellaFigura2.png',
                desc: 'Steampunk outfit'
            },
            {
                url: 'fellaFigura3.png',
                desc: 'Tropical outfit (no glasses)'
            },
            {
                url: 'fellaFigura4.png',
                desc: 'Winter outfit (no glasses)'
            },
            {
                url: 'fellaFiguraActionWheel.png',
                desc: 'Action Wheel'
            }
        ],
        tags: ['3D Model','Pixel Art'],
        buttons: [
            {
                text: 'Download Model',
                onclick: () => {downloadFile('Fella.zip','/gallery/downloads/Fella.zip')}
            },
        ]
    },
    {
        title: 'Ashton Figura Model',
        desc: 'A custom Minecraft playermodel for a friend. Scripted in Lua, Modeled in Blockbench, and powered by <a href="https://modrinth.com/mod/figura" target="_blank">Figura</a>.',
        date: '7/27/2026',
        imgs: [
            {
                url: 'ashtonFigura0.png'
            },
            {
                url: 'ashtonFigura1.png',
                desc: 'Old development screenshot'
            },
            {
                url: 'ashtonFigura2.png',
                desc: 'Old development screenshot'
            }
        ],
        tags: ['3D Model','Pixel Art'],
        buttons: [
            {
                text: 'Download Model',
                onclick: () => {downloadFile('Ashton.zip','/gallery/downloads/Ashton.zip')}
            }
        ]
    },
    {
        title: 'The Big One',
        desc: 'A large pixel art canvas I made back in 2024.',
        date: '3/25/2024',
        imgs: [
            {
                url: 'theBigOne.png',
                desc: 'Whole canvas',
                pixelated: true,
            },
            {
                url: 'theBigOne-Tree.png',
                desc: 'Tree - 3-15-24',
                pixelated: true,
            },
            {
                url: 'theBigOne-Guy.png',
                desc: 'Guy - 3-15-24',
                pixelated: true,
            },
            {
                url: 'theBigOne-Donut.png',
                desc: 'Donut - 3-16-24',
                pixelated: true,
            },
            {
                url: 'theBigOne-HelloBro.png',
                desc: 'Hello Bro - 3-16-24',
                pixelated: true,
            },
            {
                url: 'theBigOne-Monolith.png',
                desc: 'Monolith - 3-16-24',
                pixelated: true,
            },
            {
                url: 'theBigOne-Clouds.png',
                desc: 'Clouds - 3-25-24',
                pixelated: true,
            }
        ],
        tags: ['Pixel Art'],
        buttons: []
    },
    {
        title: 'The Fella™ Studies',
        desc: 'Trying to figure out how to draw the guy.',
        date: '9/16/2026',
        imgs: [
            {
                url: 'fellaStudies.jpg',
            },
        ],
        tags: ['Traditional Art'],
        buttons: []
    },
    {
        title: 'The Gang',
        desc: 'Portraits of several friends.<br>From left to right: Lore, Mango, Dottr, Jake, Fella, Plinkel, Jaden',
        date: '2/8/2026',
        imgs: [
            {
                url: 'the-gang.png',
            },
        ],
        tags: ['Digital Art'],
        buttons: []
    },
    {
        title: 'Thomas 96x Bust',
        desc: 'Artfight attack for <a href="https://artfight.net/~Sheepso101" target="_blank">@Sheepso101</a>. My first Artfight attack ever.',
        date: '6/10/2026',
        imgs: [
            {
                url: 'thomas.png',
                pixelated: true,
            },
        ],
        tags: ['Artfight','Pixel Art'],
    },
    {
        title: 'Ludwig',
        desc: 'Artfight attack for <a href="https://artfight.net/~Ludwigthedragon" target="_blank">@Ludwigthedragon</a>.',
        date: '6/10/2026',
        imgs: [
            {
                url: 'ludwig.png',
                pixelated: true,
            },
        ],
        tags: ['Artfight','Pixel Art'],
    },
    {
        title: 'Sirik',
        desc: 'Artfight attack for <a href="https://artfight.net/~snakenotonaplane" target="_blank">@snakenotonaplane</a>.',
        date: '6/11/2026',
        imgs: [
            {
                url: 'sirik.png',
                pixelated: true,
            },
        ],
        tags: ['Artfight','Pixel Art'],
    },
    {
        title: 'Freak',
        desc: 'Artfight attack for <a href="https://artfight.net/~wickedbvnes" target="_blank">@wickedbvnes</a>.',
        date: '6/15/2026',
        imgs: [
            {
                url: 'freak.png',
                pixelated: true,
            },
        ],
        tags: ['Artfight','Pixel Art'],
    },
    {
        title: 'Wabble Bushie (little guy)',
        desc: 'Artfight attack for <a href="https://artfight.net/~LucentiaX" target="_blank">@LucentiaX</a>.',
        date: '6/15/2026',
        imgs: [
            {
                url: 'wabbleBushie.png',
                pixelated: true,
            },
        ],
        tags: ['Artfight','Pixel Art'],
    },
    {
        title: 'Dottr smoking a fat one',
        desc: 'Dottr smoking a comically large blunt',
        date: '5/7/2026',
        imgs: [
            {
                url: 'dottr_blunt.png'
            }
        ],
        tags: ['Digital Art','Shitpost'],
    },
    {
        title: 'Fella Chris',
        desc: 'oh my gad #chrisingit',
        date: '1/16/2026',
        imgs: [
            {
                url: 'fella-chris.png'
            }
        ],
        tags: ['Digital Art','Shitpost'],
    },
    {
        title: 'People with green eyes:',
        desc: '',
        date: '9/9/2026',
        imgs: [
            {
                url: 'green_eyes.png'
            }
        ],
        tags: ['Digital Art','Shitpost'],
    },
    {
        title: 'Clueless',
        desc: 'How im feeling',
        date: '7/3/2026',
        imgs: [
            {
                url: 'clueless.png'
            }
        ],
        tags: ['Digital Art','Shitpost'],
    },
    {
        title: 'TUNIC Fella',
        desc: 'Fella drawn as the guy from TUNIC',
        date: '5/26/2026',
        imgs: [
            {
                url: 'tunic.png'
            }
        ],
        tags: ['Digital Art'],
    },
    {
        title: 'Goober Shooter 2 Portraits',
        desc: 'All Goober Shooter 2 Character portraits drawn by me.',
        date: '???',
        imgs: [
            {
                url: 'goobers-all.png'
            },
            {
                url: 'goober-bread.png',
                desc: 'Bread',
                pixelated: true,
            },
            {
                url: 'goober-fella.png',
                desc: 'Fella',
                pixelated: true,
            },
            {
                url: 'goober-nyan.png',
                desc: 'Nyan',
                pixelated: true,
            },
            {
                url: 'goober-peep.png',
                desc: 'Peep',
                pixelated: true,
            },
            {
                url: 'goober-slip.png',
                desc: 'Slip',
                pixelated: true,
            },
            {
                url: 'goober-sasha.png',
                desc: 'Sasha',
                pixelated: true,
            },
            {
                url: 'goober-isaac.png',
                desc: 'Isaac',
                pixelated: true,
            },
            {
                url: 'goober-erix.png',
                desc: 'erix',
                pixelated: true,
            },
            {
                url: 'goober-jake.png',
                desc: 'Jake',
                pixelated: true,
            },
            {
                url: 'goober-lore.png',
                desc: 'Lore',
                pixelated: true,
            },
            {
                url: 'goober-crow.png',
                desc: 'Crow',
                pixelated: true,
            },
            {
                url: 'goober-crazy.png',
                desc: 'Crazy',
                pixelated: true,
            },
            {
                url: 'goober-bean.png',
                desc: 'Bean',
                pixelated: true,
            },
            {
                url: 'goober-phoenix.png',
                desc: 'Phoenix',
                pixelated: true,
            },
            {
                url: 'goober-quantum.png',
                desc: 'Quantum',
                pixelated: true,
            },
            {
                url: 'goober-dottr.png',
                desc: 'Dottr',
                pixelated: true,
            },
            {
                url: 'goober-skunk.png',
                desc: 'Skunk (john)',
                pixelated: true,
            },
            {
                url: 'goober-udev.png',
                desc: 'udev',
                pixelated: true,
            },
            {
                url: 'goober-wolff.png',
                desc: 'Wolff (Henry)',
                pixelated: true,
            },
            {
                url: 'goober-chip.png',
                desc: 'Chip',
                pixelated: true,
            },
            {
                url: 'goober-hana.png',
                desc: 'Hana',
                pixelated: true,
            },
            {
                url: 'goober-skywalkr.png',
                desc: 'Skywalkr',
                pixelated: true,
            },
            {
                url: 'goober-meringue.png',
                desc: 'Meringue',
                pixelated: true,
            },
            {
                url: 'goober-glorp.png',
                desc: 'Glorp',
                pixelated: true,
            },
            {
                url: 'goober-tico.png',
                desc: 'Tico',
                pixelated: true,
            },
            {
                url: 'goober-friend.png',
                desc: 'FRIEND',
                pixelated: true,
            },
            {
                url: 'goober-tutorialist.png',
                desc: 'Tutorialist',
                pixelated: true,
            },
        ],
        tags: ['Pixel Art'],
    },
    {
        title: 'Canvas Doodles',
        desc: 'All of the random doodles scattered across my canvas.',
        date: '???',
        imgs: [
            {
                url: 'canvasdoodle0.png',
                desc: 'Some creature i guess',
            },
            {
                url: 'canvasdoodle1.png',
                desc: 'This is who youre making fun of btw...',
            },
            {
                url: 'canvasdoodle2.png',
                desc: 'Dick? Balls?',
            },
            {
                url: 'canvasdoodle3.png',
                desc: 'Don\'t look at him',
            },
            {
                url: 'canvasdoodle4.png',
                desc: 'Snake',
            },
            {
                url: 'canvasdoodle5.png',
                desc: 'Lil\' toed - A collaboration with JAG',
            },
            {
                url: 'canvasdoodle6.png',
                desc: 'A collection of fellas',
            },
            {
                url: 'canvasdoodle7.png',
                desc: 'fucked up creature',
            },
            {
                url: 'canvasdoodle8.png',
                desc: 'Mango, some dog, and a guy',
            },
            {
                url: 'canvasdoodle9.png',
                desc: 'i dont even know man',
            },
            {
                url: 'canvasdoodle10.png',
                desc: 'another fucked up dog',
            },
            {
                url: 'canvasdoodle11.png',
                desc: 'dont look at me with that smug ass face',
            },
            {
                url: 'canvasdoodle12.png',
                desc: 'overwhelming agreement',
            },
        ],
        tags: ['Digital Art']
    }
]

let renderingMode = 0
function renderArtworks() {
    const filter = doge('gallerySearch').value.toLowerCase()
    const mode = renderingMode
    doge('artworksContainer').innerHTML = ''
    for(const artwork of artworks) {
        if(mode === 0) {
            const card = document.createElement('div')
            card.classList.add('artworkCard')
            card.innerHTML = `
                <div class="artworkThumbnail" style="background-image: url(images/${artwork.imgs[0].url})"></div>
                <div class="artworkTags"></div>
                <div class="artworkTitle">
                    <strong>${artwork.title}</strong>
                    <em>${artwork.date}</em>
                </div>
                <div class="artworkTag" style="position: absolute; top: 10px; right: 10px; display: flex; align-items: center; gap: 5px;"><img src="/media/icons/image.png">${artwork.imgs.length}</div>
                <span class="artworkDesc">${artwork.desc}</span>
            `

            for(tag of artwork.tags) {
                const div = document.createElement('div')
                div.classList.add('artworkTag')
                div.innerText = tag

                card.querySelector('.artworkTags').append(div)
            }

            if(artwork.title.toLowerCase().includes(filter)) {
                doge('artworksContainer').append(card)
            }
            card.onclick = () => {openGalleryView(artwork)}
        } else if(mode === 1) {
            const listItem = document.createElement('div')
            listItem.classList.add('artworkListItem')
            listItem.innerHTML = `
                <div style="max-width: calc(100% - 105px)">
                    <strong>${artwork.title}</strong> <em>${artwork.date}</em><br>
                    <span class="artworkDesc">${artwork.desc}</span>
                    <div class="artworkTags"></div>
                </div>
                <div class="artworkThumbnail" style="background-image: url(images/${artwork.imgs[0].url})"></div>
            `

            for(tag of artwork.tags) {
                const div = document.createElement('div')
                div.classList.add('artworkTag')
                div.innerText = tag

                listItem.querySelector('.artworkTags').append(div)
            }

            if(artwork.title.toLowerCase().includes(filter)) {
                doge('artworksContainer').append(listItem)
            }
            listItem.onclick = () => {openGalleryView(artwork)}
        }
    }
} renderArtworks()

doge('gallerySearch').onkeyup = () => {
    console.log('wow')
    renderArtworks()
}

function openGalleryView(data) {
    let currentImgIndex = 0
    doge('galleryViewContainer').style.display = 'flex'

    doge('galleryViewTitle').innerText = data.title
    doge('galleryViewDate').innerText = data.date
    doge('galleryViewDesc').innerHTML = data.desc

    doge('galleryViewLinks').innerHTML = ''
    if(data.buttons) {
        for(buttonData of data.buttons) {
            const button = document.createElement('button')
            button.innerText = buttonData.text
            button.onclick = buttonData.onclick
    
            doge('galleryViewLinks').append(button)
        }
    }

    if(data.imgs.length > 1) {
        doge('galleryViewCarousel').style.display = 'flex'
        doge('galleryViewCarousel').innerHTML = ''
        for(const img in data.imgs) {
            const button = document.createElement('div')
            button.classList.add('galleryViewCarouselItem')
            button.style.backgroundImage = `url(images/${data.imgs[img].url})`
            doge('galleryViewCarousel').append(button)
            
            button.onclick = () => {updateMainImg(img)}
        }
        
        doge('gvNext').style.display = 'unset'
        doge('gvBack').style.display = 'unset'
        doge('gvNext').onclick = () => {updateMainImg(currentImgIndex > data.imgs.length - 2 ? 0 : currentImgIndex + 1)}
        doge('gvBack').onclick = () => {updateMainImg(currentImgIndex > 0 ? currentImgIndex - 1 : data.imgs.length - 1)}
    } else {
        doge('galleryViewCarousel').style.display = 'none'
        doge('gvNext').style.display = 'none'
        doge('gvBack').style.display = 'none'
    }

    function updateMainImg(imgIndex) {
        doge('galleryViewMainImg').style.backgroundImage = `url(images/${data.imgs[imgIndex].url})`
        doge('galleryViewMainImg').style.imageRendering = data.imgs[imgIndex].pixelated ? 'pixelated' : 'initial' 

        if(data.imgs[imgIndex].desc) {
            doge('galleryViewMainImgLabel').innerText = data.imgs[imgIndex].desc ?? ''
            doge('galleryViewMainImgLabel').style.display = 'flex'
        } else {
            doge('galleryViewMainImgLabel').style.display = 'none'
        }

        doge('galleryViewCarousel').children[imgIndex].scrollIntoView()

        currentImgIndex = Number(imgIndex)
    } updateMainImg(0)}

function closeGalleryView() {
    doge('galleryViewContainer').style.display = 'none'
}