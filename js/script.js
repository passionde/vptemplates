function redirect(url) {
    window.location.href = url + ".html"
}

function MakeActive(Tag) {
    var ActiveTag = document.querySelector(".tag-active")
    var MakeActive = document.querySelector("#" + Tag);

    ActiveTag.classList.remove("tag-active")
    ActiveTag.classList.add("tag-inactive")
    MakeActive.classList.add("tag-active")
};

function darkenbg() {
    var body = document.querySelector("html");
    body.classList.add("overlay");
};

function notify(Type) {
    const body = document.querySelector("body");
    const notification = document.createElement("div");
    const notificationHeader = document.createElement("div");
    const notificationText = document.createElement("div");
    const notificationButton = document.createElement("div");
    const notificationButtonText = document.createElement("div");

    switch(Type) {
        case "clipaddition":
            notificationHeader.innerHTML = "Ваш клип успешно загружен";
            notificationText.innerHTML = "Не забудьте бросить вызов другим талантливым пользователям";
            notificationButtonText.innerHTML = "Отлично";
            notificationButton.setAttribute("onclick", "redirect('profile')")
        case "opponentfound":
            notificationHeader.innerHTML = "Ваш соперник найден";
            notificationText.innerHTML = "Не забывайте следить за голосованием и пусть удача преследует Вас!";
            notificationButtonText.innerHTML = "Продолжить";
            notificationButton.setAttribute("onclick", "redirect('battle')")
    };

    notification.setAttribute("class", "notification");
    notificationHeader.setAttribute("class", "notification-header");
    notificationText.setAttribute("class", "notification-text");
    notificationButton.setAttribute("class", "notification-button");
    notificationButtonText.setAttribute("class", "notification-button-text");
    notificationButtonText.setAttribute("align", "center");

    body.appendChild(notification);
    notification.appendChild(notificationHeader);
    notification.appendChild(notificationText);
    notification.appendChild(notificationButton);
    notificationButton.appendChild(notificationButtonText);
};