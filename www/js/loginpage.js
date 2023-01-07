$(document).ready(function() {
    renderLoginPage();

    function renderLoginPage() {
        const $page = $('#page-content');
        $page.empty();
        $page.load("./views/loginpage.html",() => buttonSetUp());
    }

    function buttonSetUp(){
        const $login = $('#login');
        const $password= $('#password');

        function submitForm(){
            const login = $login.val();
            const password = $password.val();
            const request = 'http://localhost:8080/checkLogin?identifier=' + login + '&password=' + password;
            console.log(request);
            const response = fetch(request)
                .then((data) => {
                    return data.json();
                })
                .then((json) => {
                    console.log(json);
                })

        }

        $('#Connection').on('touchstart click', function (){
            submitForm();
        })


        $('form').submit(function(event) {
            event.preventDefault();
            submitForm();
        });
    }


})