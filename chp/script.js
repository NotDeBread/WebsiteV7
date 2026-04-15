if(data.achievementsGot.includes('aRealOne')) {
    doge('achButton').innerText = 'Achievement claimed'
    doge('achButton').style.opacity = '0.5'
    doge('achButton').style.pointerEvents = 'none'
}

function getRealAchievement() {
    getAchievement('aRealOne')
    doge('achButton').innerText = 'Achievement claimed'
    doge('achButton').style.opacity = '0.5'
    doge('achButton').style.pointerEvents = 'none'

    saveData()
}