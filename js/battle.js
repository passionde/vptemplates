async function getBattleById() {
    let battle_id = window.location.href.split("battle_id=")[1];

    let response = await fetch("https://vpchallenge.tw1.su/api/battle/get-battle-info", {
        method: "POST",
        headers: {
            'accept': 'application/json',
            'init-data': "query_id=AAGCAL0_AAAAAIIAvT9m-88z&user=%7B%22id%22%3A1069351042%2C%22first_name%22%3A%22Yaroslav%22%2C%22last_name%22%3A%22%22%2C%22username%22%3A%22passionfde%22%2C%22language_code%22%3A%22ru%22%2C%22allows_write_to_pm%22%3Atrue%7D&auth_date=1690396687&hash=b44292a9c1e418084508345ac62d3bd5588c5a181212c75930932fe0f2ddd1bf",
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({battle_id: battle_id})
    })
    let json = await response.json();
    console.log(json, response)
    console.log(JSON.stringify({
        battle_id: battle_id
    }))
}
async function getInvitationById() {
    let invitation_id = window.location.href.split("invitation_id=")[1];
    
}