import "https://telegram.org/js/telegram-web-app.js"

let WebApp = window.Telegram.WebApp;

WebApp.expand();

let username = document.getElementById("username");
if (WebApp.initDataUnsafe.user.name) {
    username.textContent = WebApp.initDataUnsafe.user.name;
}

