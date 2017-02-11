(function () {
     // назначаем обработчик на кнопку добавления ИП
    document.getElementById('problem_create').addEventListener("click", function () {
        //ожидаем постройки DOM модального окна
        setTimeout(function () {
            //Вставляем кнопку переводчика
            var modal = document.getElementsByClassName('modal-footer');
            modal[0].innerHTML =  "<button id=\"translater\" type=\"button\" class=\"btn btn-info\">Перевести</button>" + modal[0].innerHTML;
           //Устанавливаем обработчик на кнопку Перевести
        }, 100)
            var master = "ru";
            document.getElementById('translater').addEventListener("click", function () {
                //Получаем значение поля Ввода информации

                console.log(master)
                if(document.getElementById('create-info').value.length > 0){
                   var arch = document.getElementById('create-info').value
                } else {
                    alert("В поле описания ИП пусто")
                }

                if(master === "ru"){

                    requestTrans(arch).then(function(response) {
                        return JSON.parse(response).trans
                    }).then(function(response) {
                            backResult(response)
                        })

                    master = "uk";

                } else if(master === "uk"){
                    backResult(arch)
                    master = "ru";
                } else {
                    alert("Ошибка выбора языка")
                }
                console.log(master)

            });

    });


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


})();
