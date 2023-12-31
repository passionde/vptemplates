window.Telegram.WebApp.expand();

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
    menu:   `<body>
    <script>window.onload = hideBackButton</script>
    <div class="about">
        <img src="" class="avatar">
        <div class="wrapper">
            <div class="name"><div style="color:white">undefined</div></div>
            <div class="rating"><div style="color:white">undefined</div></div>
        </div>
    </div>

    <div class="coins"><div style="color:white">undefined</div></div>

    <div class="button" onclick="redirect('vp'); getCurrentBattlesByTag()">
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

    <div class="challenge" onclick="appointBattle(); notify('lookingForOpponent')"><div class="challenge-text">Бросить вызов</div></div>
</body>`,
    profile: `<body onload="getUserInfo(); getUserAllVideos()">
    <div class="about">
        <div class="rating"  style="font-size:1.7em;
                                    margin:auto;
                                    text-align: center;color:white;">undefined<br>Рейтинг</div>
        <img src="" class="avatar">
        <div class="coins"   style="font-size:1.7em;
                                    margin:auto;
                                    text-align: center;color:white;">undefined<br>VPCoins</div>
    </div>

    <div class="name" align="center" style="color:white;">undefined</div>

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
    <div style="margin: 40vh auto 0 auto; font-size: 3vh;" align="center"><i>Скоро здесь появится информация...</i></div>
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
</body>`
}

localStorage.currentPage = "menu"

function redirect(url) {
    let html = document.querySelector('html');
    let body = document.querySelector('body');
    let head = document.querySelector('head');

    let script = document.createElement('script');
    let newBody = document.createElement('body');
    let bodyContent = document.createElement('div');

    body.remove()

    localStorage.currentPage = url;

    switch(url) {
        case 'battle':
            bodyContent.innerHTML = pages.battle;

            newBody.appendChild(bodyContent)
            html.appendChild(newBody)

            battle();
            backButton();
            break;
        case 'challenge':
            bodyContent.innerHTML = pages.challenge;

            script.setAttribute("src", "../js/infinite-scroll.js")
            script.toggleAttribute("defer")

            head.appendChild(script)
            newBody.appendChild(bodyContent)
            html.appendChild(newBody)

            InfiniteScrollGetTags();
            backButton();
            break;
        case 'menu':
            bodyContent.innerHTML = pages.menu;

            newBody.appendChild(bodyContent)
            html.appendChild(newBody)

            backButton();
            getUserInfo();
            break;
        case 'myvideos':
            bodyContent.innerHTML = pages.myvideos;

            newBody.appendChild(bodyContent)
            html.appendChild(newBody)

            setcategory();
            getUserVideosByTag(localStorage.getItem("category"));
            backButton();
            break;
        case 'profile':
            bodyContent.innerHTML = pages.profile;

            newBody.appendChild(bodyContent)
            html.appendChild(newBody)


            getUserInfo();
            getUserAllVideos();
            backButton();
            break;
        case 'shop':
            bodyContent.innerHTML = pages.shop;

            newBody.appendChild(bodyContent)
            html.appendChild(newBody)
            backButton();
            break;
        case 'vp':
            bodyContent.innerHTML = pages.vp;

            newBody.appendChild(bodyContent)
            html.appendChild(newBody)

            setTimeout(handler, 1000)

            getTags();
            getCurrentBattlesByTag();
            backButton();
            break;
        case 'yt':
            bodyContent.innerHTML = pages.yt;

            newBody.appendChild(bodyContent)
            html.appendChild(newBody)
            backButton();
            break;
    }

    html.setAttribute("class", "")

    newBody.appendChild(bodyContent)
    html.appendChild(newBody)
}

async function getUserVideosByTag(tag) {
    let response = await fetch('https://vpchallenge.tw1.su/api/video/get-user-videos-by-tag', {
        method: 'POST',
        headers: {
          'accept': 'application/json',
          'init-data': window.Telegram.WebApp.initData,
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
        message.innerHTML = "Здесь будут Ваши видео..."

        videos.appendChild(message)
    }
}

async function getUserInfo() {
    let response = await fetch("https://vpchallenge.tw1.su/api/user/get-user-info", {
        method: 'POST',
        headers: {
        'Accept': 'application/json',
        'Init-data': window.Telegram.WebApp.initData,
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

    if (json.username_or_first_name) {
        if (json.username_or_first_name.length > 14) {
            name.innerHTML = json.username_or_first_name.splice(0, 14) + "...";
        } else {
            name.innerHTML = json.username_or_first_name
        };
    } else {
        name.innerHTML = json.username_or_first_name
    }
    if (localStorage.currentPage == "menu") {
        coins.innerHTML = json.vp_coins + " VPCoins";
        rating.innerHTML = "Рейтинг: " + json.rating;
    } else if (localStorage.currentPage == "profile") {
        coins.innerHTML = json.vp_coins + "<br>VPCoins";
        rating.innerHTML = json.rating + "<br>Рейтинг";
        coins.setAttribute("style", "font-size:1.2em;text-align:center;padding-top:2em;padding-left:1em;")
        rating.setAttribute("style", "font-size:1.2em;text-align:center;padding-top:2em;padding-right:1em;")
    };

};

async function getUserAllVideos() {
    let response = await fetch("https://vpchallenge.tw1.su/api/video/get-user-all-videos", {
        method: 'POST',
        headers: {
        'Accept': 'application/json',
        'Init-data': window.Telegram.WebApp.initData,
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
    if (json.items.length == 0) {
        const message = document.createElement("i");
        message.innerHTML = "Здесь будут Ваши видео..."

        videos.appendChild(message)
    }
};
async function addNewVideo(url) {
    let response = await fetch('https://vpchallenge.tw1.su/api/video/add-new-video', {
        method: 'POST',
        headers: {
          'accept': 'application/json',
          'init-data': window.Telegram.WebApp.initData,
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
};

async function deleteVideo(videoId) {
    let response = await fetch('https://vpchallenge.tw1.su/api/video/del-video', {
        method: 'POST',
        headers: {
          'accept': 'application/json',
          'init-data': window.Telegram.WebApp.initData,
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
            'init-data': window.Telegram.WebApp.initData,
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
    // console.log(data, opponentVideoId);

    const battleAppoinment = {
        url:'https://vpchallenge.tw1.su/api/battle/appoint-battle',
        headers:{
            'accept': 'application/json',
            'init-data': window.Telegram.WebApp.initData,
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
    // console.log(dataBattle);

    if (responseBattle.ok) {
        notify("opponentfound");
    } else if (dataBattle.detail.error_code == 1) {
        notify("UserVideoWasNotFound");
    } else if (dataBattle.detail.error_code == 2) {
        notify("OpponentVideoWasNotFound");
    } else if (dataBattle.detail.error_code == 3) {
        notify("AccessDenied");
    } else if (dataBattle.detail.error_code == 4) {
        notify("ThisVideoAlreadyAtBattle");
    } else if (dataBattle.detail.error_code == 5) {
        notify("DifferentTags");
    }
}
let pageCounter = 0;
localStorage.lastActivePage = ""

async function getCurrentBattlesByTag() {
    let tag;
    if(document.querySelector(".tag-active") == null) {
        tag = "random"
    } else {
        tag = document.querySelector(".tag-active").innerHTML.replace("#", "");
    }
    if (tag == localStorage.lastActivePage) {
        pageCounter++;
    } else if (localStorage.currentPage != "vp") {
        pageCounter = 0;
    } else {
        pageCounter = 0;
        localStorage.lastActivePage = tag;
    }

    const url = 'https://vpchallenge.tw1.su/api/battle/get-current-battles-by-tag';
    const headers = {
        'accept': 'application/json',
        'init-data': window.Telegram.WebApp.initData,
        'Content-Type': 'application/json'
      };
    const body = JSON.stringify({
        page: pageCounter,
        tag: tag
    });
    let response = await fetch(url, {
        method: 'POST',
        headers: headers,
        body: body
      });
    // console.log(pageCounter);
    let json = await response.json();
    let battles = document.querySelector(".battles");
    let loadMore = document.querySelector('.loadMore');
    
    if(loadMore != null) {
        loadMore.remove();
    }
    battles.remove();
    // console.log(json, tag)
    drawBattles(json)
}

function drawBattles(json) {
    let body = document.querySelector("body");
    let battles = document.createElement("div");

    battles.setAttribute("class", "battles")

    // if (json.items.length == 0) {
    //     let message = document.querySelector("div")
    //     message.innerHTML = "В данный момент нет идущих баттлов"
    //     body.appendChild(message)

    // }
    for(let i = 0; i < json.items.length; i++) {
        let battle = document.createElement("div");

        let battleLeft = document.createElement("div");
        let battleLeftName = document.createElement("div");
        let battleLeftAvatar = document.createElement("img")
        let battleLeftAbout = document.createElement("div")

        let battleRight = document.createElement("div");
        let battleRightName = document.createElement("div");
        let battleRightAvatar = document.createElement("img")
        let battleRightAbout = document.createElement("div")

        let vs = document.createElement("div")

        battle.setAttribute("class", "battle");

        battleLeft.setAttribute("class", "battle-left");
        battleLeftAbout.setAttribute("class", "battle-about");
        battleLeftAvatar.setAttribute("class", "battle-left battle-avatar");
        battleLeftName.setAttribute("class", "battle-name");

        vs.setAttribute("class", "vs");
        vs.setAttribute("align", "center");

        battleRight.setAttribute("class", "battle-right");
        battleRightAbout.setAttribute("class", "battle-about");
        battleRightAvatar.setAttribute("class", "battle-right battle-avatar");
        battleRightName.setAttribute("class", "battle-name");

        battleLeftName.innerHTML = json.items[0].participant_1.username_or_first_name;
        battleLeftAvatar.setAttribute("src", json.items[0].participant_1.photo_url_160)

        vs.innerHTML = "VS";

        battleRightName.innerHTML = json.items[0].participant_2.username_or_first_name;
        battleRightAvatar.setAttribute("src", json.items[0].participant_2.photo_url_160)

        battle.setAttribute("onclick", "redirect('battle')")

        battleLeftAbout.appendChild(battleLeftAvatar);
        battleLeftAbout.appendChild(battleLeftName);
        battleLeft.appendChild(battleLeftAbout);
        battle.appendChild(battleLeft)

        battle.appendChild(vs)

        battleRightAbout.appendChild(battleRightAvatar);
        battleRightAbout.appendChild(battleRightName);
        battleRight.appendChild(battleRightAbout);
        battle.appendChild(battleRight)
        battles.appendChild(battle);
    }
    body.appendChild(battles);
    localStorage.setItem("battle", JSON.stringify(json));
    localStorage.setItem("ActiveTag", document.querySelector(".tag-active").innerHTML);

    loadMore = document.createElement('div');
    if (json.items.length == 10) {
        loadMore.innerHTML = "Загрузить ещё"

        loadMore.setAttribute("style", "border:1px solid #DADADA; border-radius:20px; width: 34vw; margin: 0 auto 0 auto;text-align:center;");
        loadMore.setAttribute("class", "loadMore");
        loadMore.setAttribute("onclick", `getCurrentBattlesByTag()`)

        body.appendChild(loadMore)
    }
    // console.log(json);
}

async function getTags() {
    let response= await fetch("https://vpchallenge.tw1.su/api/tags/get-tags", {
        method: 'POST',
        headers: {
        'Accept': 'application/json',
        'Init-data': window.Telegram.WebApp.initData,
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
        tag.setAttribute("onclick", `MakeActive('${json.tags_names[i]}'); getCurrentBattlesByTag()`)
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
    if(document.querySelector(".notification")) {
        document.querySelector(".notification").remove();
    }
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
    const notificationLoader = document.createElement("span");

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
            notificationText.innerHTML = "Убедитесь, что у Вашего видео присутствует обязательный тег #vpch";
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
        case "lookingForOpponent":
            notificationHeader.innerHTML = "Ведётся поиск противника";
            notificationLoader.setAttribute("class", "loader")
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

    if(Type != "lookingForOpponent") {
        body.appendChild(notification);
        notification.appendChild(notificationHeader);
        notification.appendChild(notificationText);
        notification.appendChild(notificationButton);
        notification.appendChild(notificationCancelButton);
        notificationButton.appendChild(notificationButtonText);
        notificationCancelButton.appendChild(notificationCancelButtonText);
    } else {
        body.appendChild(notification);
        notification.appendChild(notificationHeader);
        notification.appendChild(notificationText);
        notification.appendChild(notificationCancelButton); 
        notification.appendChild(notificationLoader)
    }
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
    let nameRight = document.createElement("div")
    let avatarRight = document.createElement("img")

    let json = JSON.parse(localStorage.battle);
    let userVideoId = json.items[0].participant_1.video_id;
    let opponentVideoId = json.items[0].participant_2.video_id;

    nameLeft.innerHTML = json.items[0].participant_1.username_or_first_name;
    avatarLeft.setAttribute("src", json.items[0].participant_1.photo_url_160);
    avatarLeft.setAttribute('class', 'battle-avatar')
    avatarLeft.setAttribute('style', 'margin:1vh auto 1vh auto')
    nameRight.innerHTML = json.items[0].participant_2.username_or_first_name;
    avatarRight.setAttribute("src", json.items[0].participant_2.photo_url_160);
    avatarRight.setAttribute("class", "battle-avatar")
    avatarRight.setAttribute('style', 'margin:1vh auto 1vh auto')

    tag.innerHTML = localStorage.getItem("ActiveTag");

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



// Объявление массива категорий, можно дополнять
async function InfiniteScrollGetTags() {
    // Чтение нужного родителя
    let listOfElements = document.querySelector(".categories");

    let response = await fetch("https://vpchallenge.tw1.su/api/tags/get-tags", {
        method: 'POST',
        headers: {
        'Accept': 'application/json',
        'Init-data': window.Telegram.WebApp.initData,
        "Content-Type": "applitcation/json"
        },
        body : null
    });
    let json = await response.json();
    let tags = [];
    for(let i = 0; i < json.tags_names.length; i++) {
        tags.push("#" + json.tags_names[i])
    }
    let categoriesForLoad = tags;
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

function videoDeletion() {
    const videos = document.querySelectorAll(".profileIframe");
    const divs = document.querySelectorAll("div");
    const videosInsertion = document.querySelector(".videos")
    const marked = document.querySelector(".marked")

    for(let i = 0; i < videos.length; i++) {
        videos[i].setAttribute("onclick", "mark(this, this.id)");
    }

    insertion = "<div style='text-align:center' class='manual'><i>Выберите видео (одно) для удаления, а затем нажмите кнопку еще раз<i></div>"

    videosInsertion.insertAdjacentHTML("beforebegin", insertion)

    for(let i = 0; i < divs.length; i++) {
        if(divs[i].classList == "manual") {
            divs[i].remove()
        }
    }

    if(marked.length != 0) {
        deleteVideo(marked.id)
    }
}

function handler() {
    return 0;
}

function backButton() {
    if (localStorage.currentPage == "vp") {
        window.Telegram.WebApp.BackButton.onClick(() => {redirect("menu");})
        window.Telegram.WebApp.BackButton.show(); 
    } else if (localStorage.currentPage == "battle") {
        window.Telegram.WebApp.BackButton.onClick(() => {redirect("vp");})
        window.Telegram.WebApp.BackButton.show(); 
    } else if (localStorage.currentPage == "myvideos") {
        window.Telegram.WebApp.BackButton.onClick(() => {redirect("challenge");})
        window.Telegram.WebApp.BackButton.show(); 
    } else if (localStorage.currentPage == "profile") {
        window.Telegram.WebApp.BackButton.onClick(() => {redirect("menu");})
        window.Telegram.WebApp.BackButton.show(); 
    } else if (localStorage.currentPage == "shop") {
        window.Telegram.WebApp.BackButton.onClick(() => {redirect("menu");})
        window.Telegram.WebApp.BackButton.show(); 
    } else if (localStorage.currentPage == "yt") {
        window.Telegram.WebApp.BackButton.onClick(() => {redirect("profile");})
        window.Telegram.WebApp.BackButton.show(); 
    }
    else {
        window.Telegram.WebApp.BackButton.hide();
        window.Telegram.WebApp.BackButton.isVisible = false;
    }
    // console.log("backButton function worked")
}