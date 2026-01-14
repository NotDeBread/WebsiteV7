const splashTexts = [
    'Heavy is coming, run.',
    'Cookie?',
    'Stuffed pumpkin...',
    '500 Water wheels',
    'Fat babby',
    'Harold',
    'Trashcan',
    'Willem howard taft',
    'Blow bubbles!',
    'Court is never again in session',
    'Simple Jim',
    'We support gun violence',
    'Walmart update soon™',
    'Dottr, you still owe 50,000 emeralds in legal fees',
    'You should get on the server more often',
    "Better than sex",
    "Gam Gam loves you",
    "Better than ever!",
    "NO MORE MODS",
    "Optimized! (probably)",
    "\"Lightly modded\"",
    'My fat chud dog.',
    'Fuck my chud life',
    'Also try Goober Shooter!',
    'funi!'
]

function updateServerCountdown() {
    const milliseconds = 1768348800000 + 86400000 - Date.now()
    const days = Math.floor(milliseconds / 86400000)
    const hours = Math.floor((milliseconds % 86400000) / 3600000)
    const minutes = Math.floor(((milliseconds % 86400000) % 3600000) / 60000)
    const seconds = Math.floor((((milliseconds % 86400000) % 3600000) % 60000) / 1000)

    if(milliseconds > 0) {
        doge('serverCountdown').innerText = `${days.toString().padStart(2,0)}:${hours.toString().padStart(2,0)}:${minutes.toString().padStart(2,0)}:${seconds.toString().padStart(2,0)}`
    } else {
        doge('serverCountdown').innerText = 'LIVE'
    }
} setInterval(updateServerCountdown, 500)

doge('splash').innerText = splashTexts[DeBread.randomNum(0,splashTexts.length-1)]
doge('splash').onclick = () => {
    doge('splash').innerText = splashTexts[DeBread.randomNum(0,splashTexts.length-1)]
}

doge('crtOverlay').style.opacity = 0

function refreshServerInfo() {
    let memberList = ''
    fetch('https://api.mcsrvstat.us/2/debread.space')
    .then(res => res.json())
    .then(data => {
        mcServerData = data
        if(data.online) {
            doge('memberCount').innerText = data.players.online + '/25 Online'
            doge('statusDot').style.backgroundColor = 'lime'
            doge('statusLabel').innerText = 'Online'
            doge('statusInfo').innerHTML = ''
            
            for(const key in data.players.list) {
                memberList += data.players.list[key]+'<br>'
            }

            if(memberList.length > 0) {
                doge('memberList').innerHTML = memberList
                doge('memberList').style.color = 'white'
            } else {
                doge('memberList').innerText = 'Nobody is online :('
                doge('memberList').style.color = 'grey'
            }

        } else {
            doge('statusDot').style.backgroundColor = 'red'
            doge('statusLabel').innerText = 'Server down'
            doge('statusInfo').innerHTML = 'Server is down, for more information, visit the <a>Discord Server</a>'
        }
    })
} refreshServerInfo()
setInterval(refreshServerInfo, 5000);