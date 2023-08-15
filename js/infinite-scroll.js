// // Чтение нужного родителя
// let listOfElements = document.querySelector(".categories");

// // Объявление массива категорий, можно дополнять
// async function InfiniteScrollGetTags() {
//     let response= await fetch("https://vpchallenge.tw1.su/api/tags/get-tags", {
//         method: 'POST',
//         headers: {
//         'Accept': 'application/json',
//         'Init-data': "query_id=AAGCAL0_AAAAAIIAvT9m-88z&user=%7B%22id%22%3A1069351042%2C%22first_name%22%3A%22Yaroslav%22%2C%22last_name%22%3A%22%22%2C%22username%22%3A%22passionfde%22%2C%22language_code%22%3A%22ru%22%2C%22allows_write_to_pm%22%3Atrue%7D&auth_date=1690396687&hash=b44292a9c1e418084508345ac62d3bd5588c5a181212c75930932fe0f2ddd1bf",
//         "Content-Type": "applitcation/json"
//         },
//         body : null
//     });
//     let json = await response.json();
//     let tags = [];
//     for(let i = 0; i < json.tags_names.length; i++) {
//         tags.push("#" + json.tags_names[i])
//     }
//     let categories = tags;

//     // Счётчик загруженных категорий
//     let counter = 0; 

//     // Функция загрузки и удаления новых категорий
//     let loadmore = function() {

//         // Читает элементы с нужными классами
//         let eles = document.getElementsByClassName("category-inactive");
//         let eles_active = document.getElementsByClassName("category-active");

//         // Создаёт новый элемент
//         let item = document.createElement("li");

//         // Присваивает новому элементу нужный тэг и класс
//         item.innerText = categories[0]; 
//         item.className = "category-inactive"

//         // Добавляет и удаляет элементы из списка категорий для бесконечного цикла
//         categories.push(categories[0]);
//         categories.splice(0, 1);

//         // Добавление нового элемента в HTMLCollection (отображение в самом HTML-документе)
//         listOfElements.appendChild(item);

//         // Удаление элемента из HTML-документа
//         if (counter > 0) {
//             listOfElements.removeChild(eles[0]);
//         }

//         // Присваивание эленту по середине активного класса. Проверка на counter == 0 проводится, чтобы при загрузке страницы активным 
//         // был элемент именно по середине, а не нижний. По возможности избавиться от проверки
//         if(counter == 0) {
//             eles[2].className = "category-active";
//         }
//         else {
//             eles[1].className = "category-active"
//         };

//         // Присваивание более давнему активному элементу класс неактивного, чтобы не было сразу 2 активных элемента
//         // 2 активных элемента ломают весь бесконечный скролл из-за того, что eles читает только неактивные
//         if(eles_active.length > 1) {
//             eles_active[0].className = "category-inactive";
//             eles_active[0].setAttribute("onclick", "");
//         }

//         // Добавление активности выбранной категории 
//         eles_active[0].setAttribute("onclick", "redirect(`myvideos`); sendcategory(this.innerHTML)")

//         // Обновление счётчика категорий
//         counter++;
//     };

//     // Детект скролла
//     listOfElements.addEventListener('scroll', function() {
//         if (listOfElements.scrollTop + listOfElements.clientHeight >= listOfElements.scrollHeight) {
//         loadmore();
//         }
//     });

//     // Добавление новой категории при загрузке страницы, чтобы активировался весь скролл
//     loadmore();



//     // При слишком быстром скролле, активным может быть элемент не по середине, а более верхний. Встречается редко
// };

