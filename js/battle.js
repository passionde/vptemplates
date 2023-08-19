function checkQueryString() {
    if (window.location.href.indexOf("battle") >= 0) {
        getBattleById();
    } else if (window.location.href.indexOf("invitation") >= 0) {
        getInvitationById();
    }
}

async function getBattleById() {
    let battle_id = +window.location.href.split("battle=")[1];
    if (battle_id != NaN) {
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
        // console.log(json, response)
        if(response.ok) {
            battleThroughId(json)
        }
    }
}
async function getInvitationById() {
    let invitation_id = +window.location.href.split("invitation=")[1];
    console.log(invitation_id)
    if(invitation_id !== NaN) {
        let response = await fetch("https://vpchallenge.tw1.su/api/battle/get-invitation-info", {
            method: "POST",
            headers: {
                'accept': 'application/json',
                'init-data': "query_id=AAGCAL0_AAAAAIIAvT9m-88z&user=%7B%22id%22%3A1069351042%2C%22first_name%22%3A%22Yaroslav%22%2C%22last_name%22%3A%22%22%2C%22username%22%3A%22passionfde%22%2C%22language_code%22%3A%22ru%22%2C%22allows_write_to_pm%22%3Atrue%7D&auth_date=1690396687&hash=b44292a9c1e418084508345ac62d3bd5588c5a181212c75930932fe0f2ddd1bf",
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({invitation_id: invitation_id})
        })
        let json = await response.json();
        // console.log(json, response)
        if(response.ok) {
            battleThroughId(json)
        }
    }
}

function battleThroughId(json) {
    let cardGrid = document.querySelector(".card-grid");
    let cardLeft = document.createElement("div");
    let cardRight = document.createElement("div");
    let iframeLeft = document.createElement("iframe");
    let iframeRight = document.createElement("iframe");

    let nameLeft = document.createElement("div")
    let avatarLeft = document.createElement("img")
    let nameRight = document.createElement("div")
    let avatarRight = document.createElement("img")

    // let json = JSON.parse(localStorage.battle);
    let userVideoId = json.participant_1.video_id;
    let opponentVideoId = json.participant_2.video_id;

    nameLeft.innerHTML = json.participant_1.username_or_first_name;
    avatarLeft.setAttribute("src", json.participant_1.photo_url_160);
    avatarLeft.setAttribute('class', 'battle-avatar')
    avatarLeft.setAttribute('style', 'margin:1vh auto 1vh auto')
    nameRight.innerHTML = json.participant_2.username_or_first_name;
    avatarRight.setAttribute("src", json.participant_2.photo_url_160);
    avatarRight.setAttribute("class", "battle-avatar")
    avatarRight.setAttribute('style', 'margin:1vh auto 1vh auto')

    // console.log(json);

    cardLeft.setAttribute('class', 'card');
    cardRight.setAttribute('class', 'card')

    iframeLeft.setAttribute("src", "https://www.youtube.com/embed/" + userVideoId);
    iframeLeft.setAttribute('class', 'iframe');
    iframeLeft.setAttribute("allowfullscreen", "1");
    iframeRight.setAttribute("src", "https://www.youtube.com/embed/" + opponentVideoId);
    iframeRight.setAttribute('class', 'iframe');
    iframeRight.setAttribute("allowfullscreen", "1");

    cardLeft.appendChild(iframeLeft);
    cardLeft.appendChild(avatarLeft);
    cardLeft.appendChild(nameLeft);
    cardRight.appendChild(iframeRight);
    cardRight.appendChild(avatarRight);
    cardRight.appendChild(nameRight);
    cardGrid.appendChild(cardLeft);
    cardGrid.appendChild(cardRight);
}