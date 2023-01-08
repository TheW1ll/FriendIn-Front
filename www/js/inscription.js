
function renderInscriptionPage($page, switchPage) {
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
        const request = 'http://localhost:8080/checkLogin?identifier=' + login + '&password=' + password;
        console.log(request);
        const response = fetch(request)
            .then((data) => {
                //
            })
            .then((json) => {
                console.log(json);
            })
        switchPage(Pages.Login)
    }

    $('#Submit').on('touchstart click', function (){
        submitForm();
    })


    $('form').submit(function(event) {
        event.preventDefault();
        submitForm();
    });
}