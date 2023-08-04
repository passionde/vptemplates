// Чтение нужного родителя
let listOfElements = document.querySelector(".categories");

// Объявление массива категорий, можно дополнять
let categories = ["#beatbox", "#dance", "#vocal", "#sport", "#talent"];

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
    }

    // Обновление счётчика категорий
    counter++;
};

// Детект скролла
listOfElements.addEventListener('scroll', function() {
    if (listOfElements.scrollTop + listOfElements.clientHeight >= listOfElements.scrollHeight-20) {
      loadmore();
    }
  });

// Добавление новой категории при загрузке страницы, чтобы активировался весь скролл
loadmore();


// При слишком быстром скролле, активным может быть элемент не по середине, а более верхний. Встречается редко