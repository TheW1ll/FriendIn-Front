import {Pages} from "./app.js";

export function renderInscriptionPage($page, switchPage) {
    $page.empty();
    $page.load("./views/inscription.html",() => inscriptionSetUp(switchPage));
}

function inscriptionSetUp(switchPage){
    const $login = $('#login');
    const $password= $('#password');

    function submitForm(){
        const login = $login.val();
        const password = $password.val();


        //TODO : changer en requête inscription puis gérer la réponse
        const request = 'http://localhost:8080/createUser/' + login + '/' + password;
        console.log(request);
        const response = fetch(request, {method:'POST'})
            .then((data) => {
                return data.json()
            })
            .then((json) => {
                if(json==true){
                    alert("Bonjour "+ login +", vous avez bien été enregistré.");
                    switchPage(Pages.Login);
                }
                else{
                    alert("L'utilisateur nommé '"+ login + "' existe déjà");
                }
            })
    }

    $('#Submit').on('touchstart click', function (){
        submitForm();
    })


    $('form').submit(function(event) {
        event.preventDefault();
        submitForm();
    });
}