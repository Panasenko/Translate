(function () {

//Назначаем обработчик на кнопку добавления ИП
    document.getElementById('problem_create').addEventListener("click", function () {

//Очищаем локальное хранилище
        cliensessionStorage();

//Ожидаем постройки DOM модального окна
        setTimeout(function () {

//Вставляем кнопку переводчика
            var modal = document.getElementsByClassName('modal-footer');
            var buttonTranslit = "<button id=\"translater\" type=\"button\" class=\"btn btn-info\">Перевести</button>";
            modal[0].innerHTML = buttonTranslit + modal[0].innerHTML;

//Устанавливаем обработчик на кнопку Перевести
            document.getElementById('translater').addEventListener("click", function () {
                delete document.querySelectorAll('.modal-footer')[0]
                main(sessionStorage["master"] || "ru")
            });


//Вешаем обработчики событий на кнопки закрытия модального окна для очистки хранилища
            document.querySelectorAll('.modal-footer')[0].children[1].addEventListener("click", cliensessionStorage);
            document.querySelectorAll('.modal-footer')[0].children[2].addEventListener("click", cliensessionStorage);
            document.querySelectorAll('.modal-header')[0].children[0].addEventListener("click", cliensessionStorage);
        }, 100)
    });

//Выбираем источник получения данных для вывода
    function main(master) {
        if (master === "ru") {
            sessionStorage["translit"] = document.getElementById('create-info').value;
            requestTrans(document.getElementById('create-info').value).then(function (response) {
                return JSON.parse(response).trans
            }).then(function (response) {
                sessionStorage["master"] = "uk";
                backResult(response)
            });
        } else if (master === "uk") {
            if(sessionStorage["translit"]){
                sessionStorage["master"] = "ru";
                backResult(sessionStorage["translit"]);
            } else {
                alert("Архив не найден в sessionStorage")
            }
        } else {
            alert("Ошибка выбора языка")
        }
    }

//Вызываем API Google переводчика
    function requestTrans(text){
        var requestURL = "https://script.google.com/macros/s/AKfycbys4Q7s43XcosBx5hKmGPVhWOyrl5_cRKXe2YCBvYWB3EZ9RH0P/exec?text=" + text;
        return new Promise(function(resolve, reject) {
            var req = new XMLHttpRequest();
            req.open('GET', requestURL);
            req.onload = function() {
                if (req.status == 200) {
                    resolve(req.responseText);
                }
                else {
                    reject(Error(req.statusText));
                }
            };
            req.onerror = function() {
                reject(Error("Network Error"));
            };
            req.send();
        });
    }

//Вставляем результат перевода
    function backResult(text){
        document.getElementById('create-info').value = text;
    }

//удаляет все элементы из sessionStorage
    function cliensessionStorage(){
        delete sessionStorage["translit"];
        delete sessionStorage["master"];
    }


})();
