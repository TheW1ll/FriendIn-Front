
function renderLoginPage($page, switchPage) {
    $page.empty();
    $page.load("./views/loginpage.html",() => buttonSetUp(switchPage));
}

function buttonSetUp(switchPage){
    const $login = $('#login');
    const $password= $('#password');

    function submitForm(){
        const login = $login.val();
        const password = $password.val();
        const request = 'http://localhost:8080/checkLogin?identifier=' + login + '&password=' + password;
        console.log(request);
        const response = fetch(request)
            .then((data) => {

            })
            .then((json) => {
                console.log(json);
            })
        switchPage(Pages.Home)
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