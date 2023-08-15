const pages = {
    battle: `<body onload="battle()">
    <div>
        <div class="blue-gradiented-text" style="font-size:3vh;margin: 4vh 0 4vh 4vw;">
            <i class="asd"></i>
        </div>

        <div class="card-grid">
        </div>
    </div>
</body>`,
    challenge:  `<body onload="getTags()">
    <ul class="categories">
        <li class="category-inactive">#random</li>
        <li class="category-inactive">#vocal</li>
        <li class="category-inactive">#sport</li>
        <li class="category-inactive">#dance</li>
        <li class="category-inactive">#beatbox</li>
    </ul>
</body>`,
    menu:   `<body onload="getUserInfo()">
    <div class="about">
        <img src="" class="avatar">
        <div class="wrapper">
            <div class="name"></div>
            <div class="rating"></div>
        </div>
    </div>

    <div class="coins"></div>

    <div class="button" onclick="redirect('vp')">
        <div class="challenge-text">VP</div>
    </div>

    <div class="button" onclick="redirect('challenge')">
        <div class="challenge-text">Бросить вызов</div>
    </div>

    <div class="button" onclick="redirect('profile')">
        <div class="challenge-text">Профиль</div>
    </div>

    <div class="button" onclick="redirect('shop')">
        <div class="challenge-text">Магазин</div>
    </div>
    
</body>`,
    myvideos:   `<body>
    <div style="margin-top:7vh;font-size:4vh;">
        Выберите видео &nbsp;<div class="blue-gradiented-text"><i class="asd"></i></div>
    </div>

    <div class="videos">
    </div>

    <div class="challenge" onclick="appointBattle()"><div class="challenge-text">Бросить вызов</div></div>
</body>`,
    profile: `<body onload="getUserInfo(); getUserAllVideos()">
    <div class="about">
        <div class="rating"  style="font-size:1.7em;
                                    margin:auto;
                                    text-align: center;"></div>
        <img src="" class="avatar">
        <div class="coins"   style="font-size:1.7em;
                                    margin:auto;
                                    text-align: center;"></div>
    </div>

    <div class="name" align="center"></div>

    <div style="display:flex;flex-direction:row">
        <div class="add-clip" align="center" onclick="redirect('yt');">
            <p class="add-clip-text">Добавить видео</p>
        </div>

        <div class="challenge" style="margin:auto; height:37px; width:39vw" onclick="videoDeletion()">
            <div class="challenge-text">Удалить видео</div>
        </div>
    </div>
    <div class="videos">        
    </div>
</body>`,
    shop:   `<body>
    <div style="margin: 40vh auto 0 auto; font-size: 3vh;" align="center"><i>Скоро здесь что-нибудь появится...</i></div>
</body>`,
    vp: `<body onload="getCurrentBattlesByTag(); getTags()">
    <div class="tags">
    </div>

    <div class="battles">
    </div>
</body>`,
    yt: `<body style="height:100vh">

    <div class="yt-connect" align="center">

        <div style="margin: 3vh 0 2.5vh 0;">Ссылка на ваше видео YouTube Shorts</div>

        <input type="url" placeholder="https://www.youtube.com/shorts/SHORTSID" class="youtube-input"/>

        <div class="buttons-horizontal">
            <div class="cancel" onclick="redirect('menu')">Отмена</div>
            <div class="submit" onclick="addNewVideo(getUrl())"><div class="submit-text">ОК</div></div>
        </div>

    </div>
</body>>`
}

function redirect(url) {
    let html = document.querySelector('html');
    let body = document.querySelector('body');
    let head = document.querySelector('head');

    let script = document.createElement('script');
    let newBody = document.createElement('body');
    let bodyContent = document.createElement('div');

    body.remove()

    switch(url) {
        case 'battle':
            bodyContent.innerHTML = pages.battle;

            newBody.appendChild(bodyContent)
            html.appendChild(newBody)

            battle();
            break;
        case 'challenge':
            bodyContent.innerHTML = pages.challenge;

            script.setAttribute("src", "../js/infinite-scroll.js")
            script.toggleAttribute("defer")

            head.appendChild(script)
            newBody.appendChild(bodyContent)
            html.appendChild(newBody)

            InfiniteScrollGetTags();
            break;
        case 'menu':
            bodyContent.innerHTML = pages.menu;

            newBody.appendChild(bodyContent)
            html.appendChild(newBody)

            getUserInfo();
            break;
        case 'myvideos':
            bodyContent.innerHTML = pages.myvideos;

            newBody.appendChild(bodyContent)
            html.appendChild(newBody)

            setcategory();
            getUserVideosByTag(localStorage.getItem("category"));
            break;
        case 'profile':
            bodyContent.innerHTML = pages.profile;

            newBody.appendChild(bodyContent)
            html.appendChild(newBody)

            getUserInfo();
            getUserAllVideos();
            break;
        case 'shop':
            bodyContent.innerHTML = pages.shop;

            newBody.appendChild(bodyContent)
            html.appendChild(newBody)
            break;
        case 'vp':
            bodyContent.innerHTML = pages.vp;

            newBody.appendChild(bodyContent)
            html.appendChild(newBody)

            getCurrentBattlesByTag();
            getTags();
            break;
        case 'yt':
            bodyContent.innerHTML = pages.yt;

            newBody.appendChild(bodyContent)
            html.appendChild(newBody)
            break;
    }

    html.setAttribute("class", "")

    newBody.appendChild(bodyContent)
    html.appendChild(newBody)
}
// function redirect(url) {
//     window.location.href = url + ".html"
// }
async function getUserVideosByTag(tag) {
    let response = await fetch('https://vpchallenge.tw1.su/api/video/get-user-videos-by-tag', {
        method: 'POST',
        headers: {
          'accept': 'application/json',
          'init-data': 'query_id=AAGCAL0_AAAAAIIAvT9m-88z&user=%7B%22id%22%3A1069351042%2C%22first_name%22%3A%22Yaroslav%22%2C%22last_name%22%3A%22%22%2C%22username%22%3A%22passionfde%22%2C%22language_code%22%3A%22ru%22%2C%22allows_write_to_pm%22%3Atrue%7D&auth_date=1690396687&hash=b44292a9c1e418084508345ac62d3bd5588c5a181212c75930932fe0f2ddd1bf',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          "tag": tag.replace("#", "")
        })
      })
    let json = await response.json();

    let videos = document.querySelector(".videos");
    let video_row;

    for (let i = 0; i < json.items.length; i++) {
        let profileIframe = document.createElement("div");
        let video = document.createElement("img");

        video.setAttribute("src", json.items[i].thumbnails[3]);
        video.setAttribute("class", "profileIframe-img-img");
        video.setAttribute("id", json.items[i].video_id)
        profileIframe.setAttribute("class", "profileIframe");
        profileIframe.setAttribute("onclick", `mark(this, '${json.items[i].video_id}')`)

        if (i % 3 == 0) {
            video_row = document.createElement("div");
            video_row.setAttribute("class", "video-row");
            videos.appendChild(video_row);
        }

        profileIframe.appendChild(video);
        videos.append(profileIframe)
        video_row.appendChild(profileIframe);
    };
    if (json.items.length == 0) {
        const message = document.createElement("i");
        message.innerHTML = "Здесь будут ваши видео..."

        videos.appendChild(message)
    }
}

async function getUserInfo() {
    let response = await fetch("https://vpchallenge.tw1.su/api/user/get-user-info", {
        method: 'POST',
        headers: {
        'Accept': 'application/json',
        'Init-data': "query_id=AAGCAL0_AAAAAIIAvT9m-88z&user=%7B%22id%22%3A1069351042%2C%22first_name%22%3A%22Yaroslav%22%2C%22last_name%22%3A%22%22%2C%22username%22%3A%22passionfde%22%2C%22language_code%22%3A%22ru%22%2C%22allows_write_to_pm%22%3Atrue%7D&auth_date=1690396687&hash=b44292a9c1e418084508345ac62d3bd5588c5a181212c75930932fe0f2ddd1bf",
        "Content-Type": "applitcation/json"
        },
        body : null
    });
    let json = await response.json();

    let name = document.querySelector(".name");
    let coins = document.querySelector(".coins");
    let rating = document.querySelector(".rating");
    let avatar = document.querySelector(".avatar");

    avatar.setAttribute("src", json.photo_url_160)

    name.innerHTML = json.username_or_first_name;
    coins.innerHTML = json.vp_coins + " VPCoins";
    rating.innerHTML = "Рейтинг: " + json.rating;

};

async function getUserAllVideos() {
    let response = await fetch("https://vpchallenge.tw1.su/api/video/get-user-all-videos", {
        method: 'POST',
        headers: {
        'Accept': 'application/json',
        'Init-data': "query_id=AAGCAL0_AAAAAIIAvT9m-88z&user=%7B%22id%22%3A1069351042%2C%22first_name%22%3A%22Yaroslav%22%2C%22last_name%22%3A%22%22%2C%22username%22%3A%22passionfde%22%2C%22language_code%22%3A%22ru%22%2C%22allows_write_to_pm%22%3Atrue%7D&auth_date=1690396687&hash=b44292a9c1e418084508345ac62d3bd5588c5a181212c75930932fe0f2ddd1bf",
        "Content-Type": "applitcation/json"
        },
        body : null
    });
    let json = await response.json();

    let videos = document.querySelector(".videos");
    let video_row;

    for (let i = 0; i < json.items.length; i++) {
        let profileIframe = document.createElement("div");
        let video = document.createElement("img");
        let bin = document.createElement("img");

        bin.setAttribute("src", "../img/bin.png");
        bin.setAttribute("class", "bin")
        bin.setAttribute("id", json.items[i].video_id)
        bin.setAttribute("onclick", `notify('deletevideo', this.id)`)
        video.setAttribute("src", json.items[i].thumbnails[3]);
        video.setAttribute("class", "profileIframe-img");
        profileIframe.setAttribute("id", json.items[i].video_id)
        profileIframe.setAttribute("class", "profileIframe");

        if (i % 3 == 0) {
            video_row = document.createElement("div");
            video_row.setAttribute("class", "video-row");
            videos.appendChild(video_row);
        }

        // profileIframe.append(bin);
        profileIframe.appendChild(video);
        videos.append(profileIframe)
        video_row.appendChild(profileIframe);
    };
};
async function addNewVideo(url) {
    let response = await fetch('https://vpchallenge.tw1.su/api/video/add-new-video', {
        method: 'POST',
        headers: {
          'accept': 'application/json',
          'init-data': 'query_id=AAGCAL0_AAAAAIIAvT9m-88z&user=%7B%22id%22%3A1069351042%2C%22first_name%22%3A%22Yaroslav%22%2C%22last_name%22%3A%22%22%2C%22username%22%3A%22passionfde%22%2C%22language_code%22%3A%22ru%22%2C%22allows_write_to_pm%22%3Atrue%7D&auth_date=1690396687&hash=b44292a9c1e418084508345ac62d3bd5588c5a181212c75930932fe0f2ddd1bf',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          "video_url": url
        })
      })
      let json = await response.json()
      if (response.ok) {
        notify("clipaddition");
      } else if (json.detail.error_code == 1) {
        notify("WrongURL")
      } else if (json.detail.error_code == 2) {
        notify("VideoWasNotFound")
      } else if (json.detail.error_code == 3) {
        notify("MissingARequiredAppTag")
      } else if (json.detail.error_code == 4) {
        notify("ThisClipHasAlreadyBeenAdded")
      } else if (json.detail.error_code == 5) {
        notify("VideoBelongsToAnotherPerson")
      } else if (json.detail.error_code == 6) {
        notify("VideoHasBeenRestored")
      }
      console.log(json)
};

async function deleteVideo(videoId) {
    let response = await fetch('https://vpchallenge.tw1.su/api/video/del-video', {
        method: 'POST',
        headers: {
          'accept': 'application/json',
          'init-data': 'query_id=AAGCAL0_AAAAAIIAvT9m-88z&user=%7B%22id%22%3A1069351042%2C%22first_name%22%3A%22Yaroslav%22%2C%22last_name%22%3A%22%22%2C%22username%22%3A%22passionfde%22%2C%22language_code%22%3A%22ru%22%2C%22allows_write_to_pm%22%3Atrue%7D&auth_date=1690396687&hash=b44292a9c1e418084508345ac62d3bd5588c5a181212c75930932fe0f2ddd1bf',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          "video_id": videoId
        })
      });
    let json = await response.json();
      if (response.ok) {
        redirect('profile')
      } else if (json.detail.error_code == 2) {
        notify("DeletionClipWasNotFound")
      } else if (json.detail.error_code == 5) {
        notify("DeletionVideoBelongsToAnotherPerson")
      }
}

async function appointBattle() {
    let Tag = localStorage.getItem("category").replace("#", "");
    let UserVideoId = document.querySelector(".marked").id;
    const randomOpponent = {
        url:'https://vpchallenge.tw1.su/api/battle/assign-random-opponent',
        headers:{
            'accept': 'application/json',
            'init-data': 'query_id=AAGCAL0_AAAAAIIAvT9m-88z&user=%7B%22id%22%3A1069351042%2C%22first_name%22%3A%22Yaroslav%22%2C%22last_name%22%3A%22%22%2C%22username%22%3A%22passionfde%22%2C%22language_code%22%3A%22ru%22%2C%22allows_write_to_pm%22%3Atrue%7D&auth_date=1690396687&hash=b44292a9c1e418084508345ac62d3bd5588c5a181212c75930932fe0f2ddd1bf',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
        tag: Tag
        })
    };

    const responseOpponent = await fetch(randomOpponent.url, {
        method: 'POST',
        headers: randomOpponent.headers,
        body: randomOpponent.body
    });
    
    const data = await responseOpponent.json();
    const opponentVideoId = data.video_id;
    console.log(data, opponentVideoId);

    const battleAppoinment = {
        url:'https://vpchallenge.tw1.su/api/battle/appoint-battle',
        headers:{
            'accept': 'application/json',
            'init-data': 'query_id=AAGCAL0_AAAAAIIAvT9m-88z&user=%7B%22id%22%3A1069351042%2C%22first_name%22%3A%22Yaroslav%22%2C%22last_name%22%3A%22%22%2C%22username%22%3A%22passionfde%22%2C%22language_code%22%3A%22ru%22%2C%22allows_write_to_pm%22%3Atrue%7D&auth_date=1690396687&hash=b44292a9c1e418084508345ac62d3bd5588c5a181212c75930932fe0f2ddd1bf',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            user_video_id: UserVideoId,
            opponent_video_id: opponentVideoId
          })
    };

    const responseBattle = await fetch(battleAppoinment.url, {
        method: 'POST',
        headers: battleAppoinment.headers,
        body: battleAppoinment.body
    });

    const dataBattle = await responseBattle.json();
    console.log(dataBattle);

    if (responseBattle.ok) {
        notify("opponentfound");
    } else if (responseBattle.detail.error_code == 1) {
        notify("UserVideoWasNotFound");
    } else if (responseBattle.detail.error_code == 2) {
        notify("OpponentVideoWasNotFound");
    } else if (responseBattle.detail.error_code == 3) {
        notify("AccessDenied");
    } else if (responseBattle.detail.error_code == 4) {
        notify("ThisVideoAlreadyAtBattle");
    } else if (responseBattle.detail.error_code == 5) {
        notify("DifferentTags");
    }
}

async function getCurrentBattlesByTag() {
    let counter = 1;
    const tag = document.querySelector(".tag-active").innerHTML.replace("#", "");
    const url = 'https://vpchallenge.tw1.su/api/battle/get-current-battles-by-tag';
    const headers = {
        'accept': 'application/json',
        'init-data': 'query_id=AAGCAL0_AAAAAIIAvT9m-88z&user=%7B%22id%22%3A1069351042%2C%22first_name%22%3A%22Yaroslav%22%2C%22last_name%22%3A%22%22%2C%22username%22%3A%22passionfde%22%2C%22language_code%22%3A%22ru%22%2C%22allows_write_to_pm%22%3Atrue%7D&auth_date=1690396687&hash=b44292a9c1e418084508345ac62d3bd5588c5a181212c75930932fe0f2ddd1bf',
        'Content-Type': 'application/json'
      };
    const body = JSON.stringify({
        page: counter,
        tag: tag
    });
    let response = await fetch(url, {
        method: 'POST',
        headers: headers,
        body: body
      });
    let json = await response.json();
    json = {
        "items": [
          {
            "battle_id": 2,
            "date_start": "2023-08-13T15:30:21.937Z",
            "date_end": "2023-08-13T15:30:21.937Z",
            "participant_1": {
              "video_id": "8zJ94rVCoUU",
              "likes_start": 300,
              "user_id": 529515769,
              "photo_url_160": "https://vpchallenge.tw1.su/img/1069351042.jpg",
              "username_or_first_name": "passionde",
              "url": "tg://user?id=1069351042"
            },
            "participant_2": {
              "video_id": "8zJ94rVCoUU",
              "likes_start": 300,
              "user_id": 529515769,
              "photo_url_160": "https://vpchallenge.tw1.su/img/1069351042.jpg",
              "username_or_first_name": "passionde",
              "url": "tg://user?id=1069351042"
            }
          }
        ]
      }
    let battles = document.querySelector(".battles");
    battles.remove();
    drawBattles(json)
}

function drawBattles(json) {
    let body = document.querySelector("body");
    let battles = document.createElement("div");

    battles.setAttribute("class", "battles")

    for(let i = 0; i < 5; i++) {
        let battle = document.createElement("div");

        let battleLeft = document.createElement("div");
        let battleLeftName = document.createElement("div");
        let battleLeftScore = document.createElement("div")
        let battleLeftAvatar = document.createElement("img")
        let battleLeftAbout = document.createElement("div")

        let battleRight = document.createElement("div");
        let battleRightName = document.createElement("div");
        let battleRightScore = document.createElement("div")
        let battleRightAvatar = document.createElement("img")
        let battleRightAbout = document.createElement("div")

        let vs = document.createElement("div")

        battle.setAttribute("class", "battle");

        battleLeft.setAttribute("class", "battle-left");
        battleLeftAbout.setAttribute("class", "battle-about");
        battleLeftAvatar.setAttribute("class", "battle-left battle-avatar");
        battleLeftName.setAttribute("class", "battle-name");
        battleLeftScore.setAttribute("class", "battle-score");

        vs.setAttribute("class", "vs");
        vs.setAttribute("align", "center");

        battleRight.setAttribute("class", "battle-right");
        battleRightAbout.setAttribute("class", "battle-about");
        battleRightAvatar.setAttribute("class", "battle-right battle-avatar");
        battleRightName.setAttribute("class", "battle-name");
        battleRightScore.setAttribute("class", "battle-score");

        battleLeftScore.innerHTML = json.items[0].participant_1.likes_start;
        battleLeftName.innerHTML = json.items[0].participant_1.username_or_first_name;
        battleLeftAvatar.setAttribute("src", json.items[0].participant_1.photo_url_160)

        vs.innerHTML = "VS";

        battleRightScore.innerHTML = json.items[0].participant_2.likes_start;
        battleRightName.innerHTML = json.items[0].participant_2.username_or_first_name;
        battleRightAvatar.setAttribute("src", json.items[0].participant_2.photo_url_160)

        battle.setAttribute("onclick", "redirect('battle')")

        battleLeftAbout.appendChild(battleLeftAvatar);
        battleLeftAbout.appendChild(battleLeftName);
        battleLeft.appendChild(battleLeftAbout);
        battleLeft.appendChild(battleLeftScore);
        battle.appendChild(battleLeft)

        battle.appendChild(vs)

        battleRightAbout.appendChild(battleRightAvatar);
        battleRightAbout.appendChild(battleRightName);
        battleRight.appendChild(battleRightAbout);
        battleRight.appendChild(battleRightScore);
        battle.appendChild(battleRight)
        battles.appendChild(battle);
    }
    body.appendChild(battles)
    localStorage.setItem("battle", JSON.stringify(json));
    localStorage.setItem("ActiveTag", document.querySelector(".tag-active").innerHTML)
    console.log(json);
}

async function getTags() {
    let response= await fetch("https://vpchallenge.tw1.su/api/tags/get-tags", {
        method: 'POST',
        headers: {
        'Accept': 'application/json',
        'Init-data': "query_id=AAGCAL0_AAAAAIIAvT9m-88z&user=%7B%22id%22%3A1069351042%2C%22first_name%22%3A%22Yaroslav%22%2C%22last_name%22%3A%22%22%2C%22username%22%3A%22passionfde%22%2C%22language_code%22%3A%22ru%22%2C%22allows_write_to_pm%22%3Atrue%7D&auth_date=1690396687&hash=b44292a9c1e418084508345ac62d3bd5588c5a181212c75930932fe0f2ddd1bf",
        "Content-Type": "applitcation/json"
        },
        body : null
    });
    let json = await response.json();

    let tags = document.querySelector(".tags");

    for(let i = 0; i < json.tags_names.length; i++) {
        let tag = document.createElement("div");
        if (i == 0) {
            tag.setAttribute("class", "tag-active");
        } else {
            tag.setAttribute("class", "tag-inactive")
        }
        tag.setAttribute("id", json.tags_names[i])
        tag.innerHTML = "#" + json.tags_names[i]
        tag.setAttribute("onclick", `MakeActive('${json.tags_names[i]}', getCurrentBattlesByTag())`)
        tags.appendChild(tag);
    }
}

function MakeActive(Tag) {
    var ActiveTag = document.querySelector(".tag-active")
    var MakeActive = document.querySelector("#" + Tag);

    ActiveTag.classList.remove("tag-active")
    ActiveTag.classList.add("tag-inactive")
    MakeActive.classList.add("tag-active")
};

function notify(Type, video="") {
    var html = document.querySelector("html");
    html.classList.add("overlay");

    const body = document.querySelector("body");
    const notification = document.createElement("div");
    const notificationHeader = document.createElement("div");
    const notificationText = document.createElement("div");
    const notificationButton = document.createElement("div");
    const notificationButtonText = document.createElement("div");
    const notificationCancelButton = document.createElement("div");
    const notificationCancelButtonText = document.createElement("div");

    switch(Type) {
        case "clipaddition":
            notificationHeader.innerHTML = "Ваш клип успешно загружен";
            notificationText.innerHTML = "Не забудьте бросить вызов другим талантливым пользователям";
            notificationButtonText.innerHTML = "Отлично";
            notificationButton.setAttribute("onclick", "redirect('profile')");
            break;
        case "opponentfound":
            notificationHeader.innerHTML = "Ваш соперник найден";
            notificationText.innerHTML = "Не забывайте следить за голосованием и пусть удача преследует Вас!";
            notificationButtonText.innerHTML = "Продолжить";
            notificationButton.setAttribute("onclick", "redirect('battle')");
            break;
        case "deletevideo":
            notificationHeader.innerHTML = "Удалить видео?";
            notificationCancelButtonText.innerHTML = "Нет"
            notificationButtonText.innerHTML = "Да";
            notificationCancelButton.setAttribute("class", "notification-cancel-button")
            notificationCancelButton.setAttribute("onclick", "redirect(`profile`)")
            notificationButton.setAttribute("onclick", `deleteVideo(${video})`);
            break
        case "WrongURL":
            notificationHeader.innerHTML = "Неверный формат ссылки на видео Youtube Shorts";
            notificationText.innerHTML = "Проверьте правильность введённой ссылки на ваше видео";
            notificationButtonText.innerHTML = "Продолжить";
            notificationButton.setAttribute("onclick", "redirect('yt')");
            break
        case "VideoWasNotFound":
            notificationHeader.innerHTML = "Видео не найдено";
            notificationText.innerHTML = "Проверьте правильность введённой ссылки на ваше видео";
            notificationButtonText.innerHTML = "Продолжить";
            notificationButton.setAttribute("onclick", "redirect('yt')");
            break
        case "MissingARequiredAppTag":
            notificationHeader.innerHTML = "У видео отсутствует обязательный тег приложения";
            notificationText.innerHTML = "Убедитесь, что у Вашего видео присутствует обязательный тег";
            notificationButtonText.innerHTML = "Продолжить";
            notificationButton.setAttribute("onclick", "redirect('yt')");
            break
        case "ThisClipHasAlreadyBeenAdded":
            notificationHeader.innerHTML = "Это видео YouTube Shorts уже было добавлено";
            notificationText.innerHTML = "Попробуйте загрузить другое видео YouTube Shorts";
            notificationButtonText.innerHTML = "Продолжить";
            notificationButton.setAttribute("onclick", "redirect('yt')");
            break;
        case "VideoBelongsToAnotherPerson":
            notificationHeader.innerHTML = "Видео принадлежит другому пользователю";
            notificationButtonText.innerHTML = "Продолжить";
            notificationButton.setAttribute("onclick", "redirect('yt')");
            break
        case "VideoHasBeenRestored":
            notificationHeader.innerHTML = "Видео было восстановлено";
            notificationText.innerHTML = "Видео, которое было ранее удалено, вновь есть в Вашем профиле";
            notificationButtonText.innerHTML = "Продолжить";
            notificationButton.setAttribute("onclick", "redirect('yt')");
            break
        case "DeletionClipWasNotFound":
            notificationHeader.innerHTML = "Видео не найдено";
            notificationButtonText.innerHTML = "Продолжить";
            notificationButton.setAttribute("onclick", "redirect('yt')");
            break;
        case "DeletionVideoBelongsToAnotherPerson":
            notificationHeader.innerHTML = "Видео принадлежит другому пользователю";
            notificationButtonText.innerHTML = "Продолжить";
            notificationButton.setAttribute("onclick", "redirect('yt')");
            break;
        case "UserVideoWasNotFound":
            notificationHeader.innerHTML = "Видео пользователя не найдено";
            notificationButtonText.innerHTML = "Продолжить";
            notificationButton.setAttribute("onclick", "redirect('myvideos')");
            break;
        case "OpponentVideoWasNotFound":
            notificationHeader.innerHTML = "Видео противника не найдено";
            notificationButtonText.innerHTML = "Продолжить";
            notificationButton.setAttribute("onclick", "redirect('myvideos')");
            break;
        case "AccessDenied":
            notificationHeader.innerHTML = "Отказано в доступе";
            notificationText.innerHTML = "Видео принадлежит другому пользователю";
            notificationButtonText.innerHTML = "Продолжить";
            notificationButton.setAttribute("onclick", "redirect('myvideos')");
            break;
        case "ThisVideoAlreadyAtBattle":
            notificationHeader.innerHTML = "Данному видео уже был брошен вызов";
            notificationText.innerHTML = "Попробуйте выбрать другое видео";
            notificationButtonText.innerHTML = "Продолжить";
            notificationButton.setAttribute("onclick", "redirect('myvideos')");
            break;
        case "DifferentTags":
            notificationHeader.innerHTML = "Теги у видео различаются";
            notificationButtonText.innerHTML = "Продолжить";
            notificationButton.setAttribute("onclick", "redirect('myvideos')");
            break;
        case "opponentWasNotFound":
            notificationHeader.innerHTML = "Противник не найден";
            notificationButtonText.innerHTML = "Продолжить";
            notificationButton.setAttribute("onclick", "redirect('myvideos')");
            break;
    };

    notification.setAttribute("class", "notification");
    notificationHeader.setAttribute("class", "notification-header");
    notificationText.setAttribute("class", "notification-text");
    notificationButton.setAttribute("class", "notification-button");
    notificationButtonText.setAttribute("class", "notification-button-text");
    notificationButtonText.setAttribute("align", "center");
    notificationCancelButtonText.setAttribute("class", "notification-button-text");
    notificationCancelButtonText.setAttribute("align", "center");

    body.appendChild(notification);
    notification.appendChild(notificationHeader);
    notification.appendChild(notificationText);
    notification.appendChild(notificationButton);
    notification.appendChild(notificationCancelButton);
    notificationButton.appendChild(notificationButtonText);
    notificationCancelButton.appendChild(notificationCancelButtonText);
};

function getUrl() {
    return document.querySelector("input").value
};

function sendcategory(cat) {
    localStorage.setItem("category", cat)
};

function setcategory() {
    let asd = document.querySelector(".asd")
    asd.innerHTML = localStorage.getItem("category");
};

function getcategory() {
    return localStorage.getItem("category")
};

function battle() {
    let cardGrid = document.querySelector(".card-grid");
    let tag = document.querySelector(".asd");
    let cardLeft = document.createElement("div");
    let cardRight = document.createElement("div");
    let iframeLeft = document.createElement("iframe");
    let iframeRight = document.createElement("iframe");

    let nameLeft = document.createElement("div")
    let avatarLeft = document.createElement("img")
    let scoreLeft = document.createElement("div")
    let nameRight = document.createElement("div")
    let avatarRight = document.createElement("img")
    let scoreRight = document.createElement("div")

    let json = JSON.parse(localStorage.battle);
    let userVideoId = json.items[0].participant_1.video_id;
    let opponentVideoId = json.items[0].participant_2.video_id;

    nameLeft.innerHTML = json.items[0].participant_1.username_or_first_name;
    avatarLeft.setAttribute("src", json.items[0].participant_1.photo_url_160);
    avatarLeft.setAttribute('class', 'battle-avatar')
    avatarLeft.setAttribute('style', 'margin:1vh auto 1vh auto')
    scoreLeft.innerHTML = json.items[0].participant_1.likes_start;
    nameRight.innerHTML = json.items[0].participant_2.username_or_first_name;
    avatarRight.setAttribute("src", json.items[0].participant_2.photo_url_160);
    avatarRight.setAttribute("class", "battle-avatar")
    avatarRight.setAttribute('style', 'margin:1vh auto 1vh auto')
    scoreRight.innerHTML = json.items[0].participant_2.likes_start;

    tag.innerHTML = localStorage.getItem("ActiveTag");

    console.log(json);

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
    cardLeft.appendChild(scoreLeft);
    cardRight.appendChild(iframeRight);
    cardRight.appendChild(avatarRight);
    cardRight.appendChild(nameRight);
    cardRight.appendChild(scoreRight);
    cardGrid.appendChild(cardLeft);
    cardGrid.appendChild(cardRight);
}



// Объявление массива категорий, можно дополнять
async function InfiniteScrollGetTags() {
    // Чтение нужного родителя
    let listOfElements = document.querySelector(".categories");

    let response= await fetch("https://vpchallenge.tw1.su/api/tags/get-tags", {
        method: 'POST',
        headers: {
        'Accept': 'application/json',
        'Init-data': "query_id=AAGCAL0_AAAAAIIAvT9m-88z&user=%7B%22id%22%3A1069351042%2C%22first_name%22%3A%22Yaroslav%22%2C%22last_name%22%3A%22%22%2C%22username%22%3A%22passionfde%22%2C%22language_code%22%3A%22ru%22%2C%22allows_write_to_pm%22%3Atrue%7D&auth_date=1690396687&hash=b44292a9c1e418084508345ac62d3bd5588c5a181212c75930932fe0f2ddd1bf",
        "Content-Type": "applitcation/json"
        },
        body : null
    });
    let json = await response.json();
    let tags = [];
    for(let i = 0; i < json.tags_names.length; i++) {
        tags.push("#" + json.tags_names[i])
    }
    let categories = tags;

    // Счётчик загруженных категорий
    let counter = 0; 

    // Функция загрузки и удаления новых категорий
    let loadmore = function() {

        // Читает элементы с нужными классами
        let eles = document.getElementsByClassName("category-inactive");
        let eles_active = document.getElementsByClassName("category-active");

        // Создаёт новый элемент
        let item = document.createElement("li");

        // Присваивает новому элементу нужный тэг и класс
        item.innerText = categories[0]; 
        item.className = "category-inactive"

        // Добавляет и удаляет элементы из списка категорий для бесконечного цикла
        categories.push(categories[0]);
        categories.splice(0, 1);

        // Добавление нового элемента в HTMLCollection (отображение в самом HTML-документе)
        listOfElements.appendChild(item);

        // Удаление элемента из HTML-документа
        if (counter > 0) {
            listOfElements.removeChild(eles[0]);
        }

        // Присваивание эленту по середине активного класса. Проверка на counter == 0 проводится, чтобы при загрузке страницы активным 
        // был элемент именно по середине, а не нижний. По возможности избавиться от проверки
        if(counter == 0) {
            eles[2].className = "category-active";
        }
        else {
            eles[1].className = "category-active"
        };

        // Присваивание более давнему активному элементу класс неактивного, чтобы не было сразу 2 активных элемента
        // 2 активных элемента ломают весь бесконечный скролл из-за того, что eles читает только неактивные
        if(eles_active.length > 1) {
            eles_active[0].className = "category-inactive";
            eles_active[0].setAttribute("onclick", "");
        }

        // Добавление активности выбранной категории 
        eles_active[0].setAttribute("onclick", "sendcategory(this.innerHTML); redirect(`myvideos`)")

        // Обновление счётчика категорий
        counter++;
    };

    // Детект скролла
    listOfElements.addEventListener('scroll', function() {
        if (listOfElements.scrollTop + listOfElements.clientHeight >= listOfElements.scrollHeight - 10) {
        loadmore();
        }
    });

    // Добавление новой категории при загрузке страницы, чтобы активировался весь скролл
    loadmore();



    // При слишком быстром скролле, активным может быть элемент не по середине, а более верхний. Встречается редко
};

function mark(video, videoId) {
  let marked_videos = document.querySelectorAll('.marked');
  if (marked_videos.length > 0) {
    marked_videos[0].remove()
  }
  let mark = document.createElement("img");
  mark.setAttribute("src", "../img/checkmark.png");
  mark.setAttribute("class", "marked")
  mark.setAttribute("id", videoId)
  video.appendChild(mark);
}
let c = 0;
function videoDeletion() {
    const videos = document.querySelectorAll(".profileIframe");
    const divs = document.querySelectorAll("div");
    const videosInsertion = document.querySelector(".videos")
    const marked = document.querySelector(".marked")

    for(let i = 0; i < videos.length; i++) {
        videos[i].setAttribute("onclick", "mark(this, this.id)");
    }

    insertion = "<div style='text-align:center' class='manual'><i>Отметьте видео (одно), подлежащее удалению, а затем снова нажмите удалить на кнопку удаления<i></div>"

    videosInsertion.insertAdjacentHTML("beforebegin", insertion)

    for(let i = 0; i < divs.length; i++) {
        if(divs[i].classList == "manual") {
            divs[i].remove()
        }
    }
    console.log(marked);
    if(marked.length != 0) {
        deleteVideo(marked.id)
    }
}