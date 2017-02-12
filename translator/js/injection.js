(function () {
     // назначаем обработчик на кнопку добавления ИП
    document.getElementById('problem_create').addEventListener("click", function () {
        //ожидаем постройки DOM модального окна
        setTimeout(function () {
            //Вставляем кнопку переводчика
            var modal = document.getElementsByClassName('modal-footer');
            modal[0].innerHTML =  "<button id=\"translater\" type=\"button\" class=\"btn btn-info\">Перевести</button>" + modal[0].innerHTML;
           //Устанавливаем обработчик на кнопку Перевести
            document.getElementById('translater').addEventListener("click", function () {
                main(localStorage["master"] || "ru")
            });

           // document.getElementsByClassName('close').addEventListener("click", clienlocalStorage);
            document.getElementById('apply-create-problem').addEventListener("click", clienlocalStorage);
            document.querySelectorAll('.modal-footer')[0].children[1].addEventListener("click", clienlocalStorage);
            document.querySelectorAll('.modal-footer')[0].children[2].addEventListener("click", clienlocalStorage);


        }, 100)
    });

        function main(master) {
            if (master === "ru") {
                localStorage["translit"] = document.getElementById('create-info').value;
                requestTrans(document.getElementById('create-info').value).then(function (response) {
                    return JSON.parse(response).trans
                }).then(function (response) {
                    localStorage["master"] = "uk";
                    backResult(response)
                });
            } else if (master === "uk") {
                if(localStorage["translit"]){
                    localStorage["master"] = "ru";
                    backResult(localStorage["translit"]);
                } else {
                    alert("Архив не найден в localStorage")
                }
            } else {
                alert("Ошибка выбора языка")
            }
        }




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

    function backResult(text){
        document.getElementById('create-info').value = text;
    }

    //удаляет все элементы из localStorage
    function clienlocalStorage(){
        delete localStorage["translit"];
        delete localStorage["master"];
    }


})();
