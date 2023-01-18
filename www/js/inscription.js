export function renderInscriptionPage($page) {
    $page.empty();
    $page.load("./views/inscription.html",() => inscriptionSetUp());
}

function inscriptionSetUp(){
    const $login = $('#login');
    const $password= $('#password');
    const $passwordVerif = $('#password2');

    function submitForm(){
        const login = $login.val();
        const password = $password.val();
        const passwordVerif = $passwordVerif.val();

        if(password !== passwordVerif){
            alert("Les mots de passe ne correspondent pas");
        }
        else{
            const request = `http://localhost:8080/createUser/${login}/${password}`;
            fetch(request, {method:'POST'})
                .then((data) => {
                    return data.json()
                })
                .then((json) => {
                    if(json==true){
                        alert("Bonjour " + login + " , vous avez bien été enregistré.");
                        window.location.href = "#"
                    }
                    else{
                        alert("L'utilisateur nommé '"+ login + "' existe déjà");
                    }
                })
        }

    }

    $('#Submit').on('touchstart click', function (){
        submitForm();
    })


    $('form').submit(function(event) {
        event.preventDefault();
        submitForm();
    });
}