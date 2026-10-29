const Home = {
    Gameplay: {
        Mechanics: {
            Shop: {},
            Money_Bonuses: {},
            Pickups: {}
        },
        Characters: {
            Bread: {},
            Fella: {},
            Plonk: {},
            Ashton: {},
            Tammy: {},
            Lorna_Walker: {},
            'Luke_&_Mary': {},
            Tana: {},
            Nyan: {},
            Jaden: {},
            Peep: {},
            Slip: {},
            Sasha: {},
            The_Horse: {},
            car: {},
            Isaac: {},
            jasp: {},
            erix: {},
            Walf: {},
            Jake: {},
            Lore: {},
            Crow: {},
            Krazy: {},
            Bean: {},
            Phoenix: {},
            Quantum: {},
            Dottr: {},
            John: {},
            udev: {},
            Douglass: {},
            Wasp: {},
            Wolff: {},
            Chip: {},
            Hana: {},
            Skywalkr: {},
            Meringue : {},
            Glorp: {},
            Tico: {},
            Friend: {},
            The_Tutorialist: {},
        },
        Weapons: {
            Gun: {},
            Sniper: {}
        },
        Items: {
            Reinforced_Gloves: {},
            Bandage: {},
            Hard_Hat: {},
            Running_Shoes: {},
            Rock: {},
            Precision_Goggles: {},
            Chalk: {},
            Hand_Wrap: {},
            Mushroom: {},
            Heavy_Ammo: {},
            Magnetic_Ammo: {},
            Electric_Ammo: {},
            Ghost_Ammo: {},
            Incendiary_Ammo: {},
            Golden_Ammo: {},
            Radioactive_Ammo: {},
            Shrapnel: {},
            Cluster_Ammo: {},
            Raccoon_Tail: {},
            Used_Needle: {},
            error: {}
        },
        Power_Items: {
            Apple: {}
        },
        Elixirs: {
            Strength_Elixir: {}
        },
        Bosses: {
            The_Tutorialist0Boss: {}
        },
        Minibosses: {
            Sasha0Boss: {},
            Chip0Boss: {}
        },
        Enemies: {
            Goon: {},
            Chud_Chip: {},
            Tutorialist_Servant: {}
        },
        Achievements: {},
        Stats: {}
    },
    Modding: {
        Modded_Enemies: {},
        Modded_Characters: {},
        Modded_Weapons: {},
        Modded_Items: {},
    },
    History: {}
}

let indexList = []

function createNavButton(obj, key, parent) {
    const hasChildren = Object.keys(obj).length > 0

    const button = document.createElement('div')
    button.opened = false
    button.classList.add('explorerItem')
    button.innerHTML = `
        <div class="explorerItemButtons">
            ${hasChildren ? '<button class="explorerItemArrow">►</button>' : ''}
            <a href="#${key.replaceAll('0','')}">
                <button>${key.replaceAll('_',' ').split('0')[0]}</button>
            </a>
        </div>
        ${hasChildren ? '<div class="explorerItemChildren"></div>' : ''}
    `
    
    parent.append(button)
    indexList.push({url: key.replaceAll('0','')})

    if(hasChildren) {
        const arrow = button.querySelector('.explorerItemArrow')
        const children = button.querySelector('.explorerItemChildren')
        arrow.onclick = () => {
            if(button.opened) {
                children.style.display = 'none'
                arrow.style.rotate = '0deg'
            } else {
                children.style.display = 'unset'
                arrow.style.rotate = '90deg'
            }

            button.opened = !button.opened
        }
    }

    for(const kay of Object.keys(obj)) {
        createNavButton(obj[kay], kay, button.querySelector('.explorerItemChildren'))
    }
} createNavButton(Home,'Home',doge('explorer'))

function updateHash() {
    const hash = window.location.hash.substring(1) || 'Home'
    loadPage(hash)
} updateHash()
window.addEventListener('hashchange', updateHash)

async function loadPage(page) {
    doge('body').innerText = 'Loading...'
    const response = await fetch(`articles/${page}.html`);
    const html = await response.text()

    if(response.ok) {
        doge('body').innerHTML = html
        updateCustomElements()
    } else {
        doge('body').innerText = 'This page has not been made yet!'
    }

}

function search() {
    doge('searchContainer').querySelectorAll('a').forEach(button => {button.remove()})

    const input = doge('searchBar').value.toLowerCase()
    let i = 0
    for(obj of indexList) {
        if(i < 25) {
            if(obj.url.replaceAll('_',' ').toLowerCase().includes(input)) {    
                const button = document.createElement('a')
                button.innerText = obj.url.replaceAll('_',' ')
                button.href = `#${obj.url}`
    
                doge('searchContainer').append(button)
                i++
            }
        } else {
            break
        }

    }
} doge('searchBar').addEventListener('input',search)
doge('searchBar').onchange = () => {
    doge('searchContainer').querySelectorAll('a')[0]?.click()
    doge('searchContainer').querySelectorAll('a').forEach(button => {button.remove()})
    doge('searchBar').value = ''
}

doge('searchBar').onblur = () => {doge('searchContainer').querySelectorAll('a').forEach(button => {button.remove()})}

const characterUnlocks = {
    fella: '<a href="#Achievements"><img src="../../games/GooberShooter2/graphics/achievements/rebrand.png">The rebrand is real</a>',
    peep: '<a href="#Achievements"><img src="../../games/GooberShooter2/graphics/achievements/whoops.png">Oops</a>',
    the_horse: '<a href="#Achievements"><img src="../../games/GooberShooter2/graphics/achievements/optimization.png">Optimization at its finest</a>',
    sasha: '<a href="#Achievements"><img src="../../games/GooberShooter2/graphics/achievements/Speed_Demon.png">Speed Demon</a>',
    isaac: '<a href="#Achievements"><img src="../../games/GooberShooter2/graphics/achievements/Reroll_Addict.png">Reroll Addict</a>',
    friend: '<a href="#Achievements"><img src="../../games/GooberShooter2/graphics/achievements/The_Egg.png">The Egg</a>',
    tutorialist: '<a href="#Achievements"><img src="../../games/GooberShooter2/graphics/achievements/The_End.png">The End</a>',
    ashton: '<a href="#Achievements"><img src="../../games/GooberShooter2/graphics/achievements/Found_Me.png">You found me</a>',
    tammy: '<a href="#Achievements"><img src="../../games/GooberShooter2/graphics/achievements/Big_Teeth.png">Big Teeth</a>',
    lorna: '<a href="#Achievements"><img src="../../games/GooberShooter2/graphics/achievements/Law_Enforcement.png">Law Enforcement</a>',
    luke: '<a href="#Achievements"><img src="../../games/GooberShooter2/graphics/achievements/Divorce.png">Divorce</a>',
    tana: '<a href="#Achievements"><img src="../../games/GooberShooter2/graphics/achievements/Unc.png">Unc still got it</a>',
    jake: '<a href="#Achievements"><img src="../../games/GooberShooter2/graphics/achievements/The_Feast.png">The Feast</a>',
    nyan: '<a href="#Achievements"><img src="../../games/GooberShooter2/graphics/achievements/GSOrigins.png">Goober Shooter: Origins</a>',
    glorp: '<a href="#Achievements"><img src="../../games/GooberShooter2/graphics/achievements/SkillsUSA.png">SkillsUSA</a>',
    tico: '<a href="#Achievements"><img src="../../games/GooberShooter2/graphics/achievements/SkillsUSA.png">SkillsUSA</a>',
}

function updateCustomElements() {
    //Character card
    doge('body').querySelectorAll('gsCharacter').forEach(elem => {
        const characterKey = elem.getAttribute('character')
        const character = characters[characterKey]
        elem.style.imageRendering = 'pixelated'
        elem.innerHTML = `
            <div style="text-align: center; margin-bottom: 10px;">
                <span style="font-size: 1.25em; font-weight: 700;" id="characterName">${character.name}</span>
                <span>${character.desc ?? ''}</span>
            </div>
            <img src="../../games/GooberShooter2/graphics/characters/${characterKey}Portrait.png" width="72" id="characterPortrait">
            <div id="characterTags" style="display: flex; gap: 5px; margin-top: 5px; flex-wrap: wrap; justify-content: center;"></div>
            ${character.skins ? `
                <span>Available Skins:</span>
                <div id="characterSkins" style="display: flex; gap: 5px;"></div>    
            ` : ''}
        `

        for(const skin of character.skins ?? []) {
            const img = document.createElement('img')
            img.src = `../../games/GooberShooter2/graphics/characters/${skin.src}Portrait.png`
            img.width = 38
            
            img.onmouseenter = () => {
                elem.querySelector('#characterName').innerText = character.name + ` (${skin.name})`
                elem.querySelector('#characterPortrait').src = `../../games/GooberShooter2/graphics/characters/${skin.src}Portrait.png`
            }
            
            img.onmouseleave = () => {
                elem.querySelector('#characterName').innerText = character.name
                elem.querySelector('#characterPortrait').src = `../../games/GooberShooter2/graphics/characters/${characterKey}Portrait.png`
            }

            elem.querySelector('#characterSkins').append(img)
        }

        for(const tag of character.tagList) {
            const div = document.createElement('div')
            div.classList.add('characterTag')
            div.innerHTML = tag.text

            addStyles(div, {
                background: tag.col,
            })

            doge('characterTags').append(div)
        }
    })

    //Character list
    doge('body').querySelectorAll('.characterTable').forEach(elem => {
        for(const index in Object.keys(characters)) {
            const key = Object.keys(characters)[index]
            const character = characters[key]

            const row = document.createElement('tr')
            row.innerHTML = `
                <td style="font-weight: 700;">
                    <img src="../../games/GooberShooter2/graphics/characters/${key}Portrait.png" width="38" style="image-rendering: pixelated; vertical-align: middle; margin-right: 5px;">
                    <a href="#${character.name.replaceAll(' ','_')}">${character.name}</a>
                </td>
                <td>
                    ${character.desc ?? '<em style="color: grey;">No description</em>'}
                </td>
                <td>
                    <img src="../../games/GooberShooter2/graphics/weapons/${character.weapon.name.replaceAll(' ','_')}.png" style="image-rendering: pixelated; vertical-align: middle; margin-right: 5px;">
                    ${character.weapon.name}
                </td>
                <td style="max-width: 250px;">
                    ${characterUnlocks[key] ?? 'N/A'}
                </td>
            `

            elem.append(row)
        }
    })

    doge('body').querySelectorAll('.itemTable').forEach(elem => {
        for(rarity in upgrades) {
            for(key in upgrades[rarity]) {
                const item = upgrades[rarity][key]
                const row = document.createElement('tr')
                row.innerHTML = `
                    <td>
                        <img src="/games/GooberShooter2/graphics/upgrades/${key}.${item.animatedTexture ? 'gif':'png'}" style="image-rendering: pixelated; display: flex; align-self: middle;" width="32">
                    </td>
                    <td>
                        <a href="#${typeof item.name === 'function' ? 'error' : item.name.replaceAll(' ','_')}">${typeof item.name === 'function' ? '<em>Changing name</em>':item.name}</a>
                    </td>
                    <td>
                        <span>${typeof item.desc === 'function' ? '<em>Changing description</em>':item.desc}</span>
                    </td>
                    <td>
                        <div class="itemTag" style="background: ${rarities[rarity].color};">${rarities[rarity].name}</div>
                    </td>
                `
                elem.append(row)
            }
        }
    })

    //Item card
    doge('body').querySelectorAll('gsItem').forEach(elem => {
        const rarity = parseInt(elem.getAttribute('rarity'))
        const key = elem.getAttribute('item')
        const upgrade = upgrades[rarity][key]
        elem.innerHTML = `
            <div style="text-align: center; margin-bottom: 10px;">
                <span class="${typeof upgrade.name === 'function' ? 'shufflingName': ''}" style="font-size: 1.25em; font-weight: 700;">${typeof upgrade.name === 'function' ? upgrade.name() : upgrade.name}</span>
                <div class="itemTag" style="background: ${rarities[rarity].color};">${rarities[rarity].name}</div>
            </div>
            <img src="/games/GooberShooter2/graphics/upgrades/${key}.${upgrade.animatedTexture ? 'gif':'png'}" width="64" style="image-rendering: pixelated; margin-bottom: 10px;">
            <div style="padding: 5px; background-color: var(--bg); width: calc(100% - 10px);">
                ${typeof upgrade.desc === 'function' ? 'Applies the effect of 2-5 random, non-mythic items.' : upgrade.desc}
            </div>
            <table style="margin: 10px 0px 0px 0px;">
                <tr>
                    <td>Price mult</td>
                    <td>${upgrade.priceMult ?? 1}</td>
                </tr>
            </table>
        `
    })

    //Out of date warning
    doge('body').querySelectorAll('oodWarning').forEach(elem => {
        elem.innerHTML = `
            <em style="font-size: 25px; font-weight: 900;">!</em>
            <span>This article is incomplete and may contain outdated information!</span>
        `

        addStyles(elem, {
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            border: '1px solid yellow',
            padding: '5px'
        })
    })
}

setInterval(() => {
    doge('body').querySelectorAll('.shufflingName').forEach(elem => {
        elem.innerText = upgrades[6].error.name().slice(0,20)
    })
}, 500);