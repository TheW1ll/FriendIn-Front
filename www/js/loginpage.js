import {Pages} from "./app.js";

export function renderLoginPage($page, switchPage) {
    $page.empty();
    $page.load("./views/loginpage.html",() => buttonSetUp(switchPage));
}

function buttonSetUp(switchPage){
    const $login = $('#login');
    const $password= $('#password');

    function submitForm(){
        const login = $login.val();
        const password = $password.val();
        if (login!=null && password!=null){
            const request = 'http://localhost:8080/checkLogin/' + login + '/' + password;
            console.log(request);
            const response = fetch(request)
                .then((data) => {
                    return data.json();
                })
                .then((json) => {
                    if(json==true){
                        switchPage(Pages.Home);
                    }
                    else{
                        alert("Votre login et/ou votre mot de passe sont incorrects");
                        switchPage(Pages.Login);
                    }
                })
        }

    }

    $('#Connection').on('touchstart click', function (){
        submitForm();
    })

    $('form').submit(function(event) {
        event.preventDefault();
        submitForm();
    })

    $('#Inscription').on('touchstart click', function (){
        switchPage(Pages.Inscription);
    })
}