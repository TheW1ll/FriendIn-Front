import {Pages} from "./app.js";

export function renderCreateGroup($page, switchPage) {
    $page.empty();
    $page.load("./views/creategroup.html",() => groupCreationSetUp(switchPage));
}

function groupCreationSetUp(switchPage){

    function submitForm() {
        const creatorId = sessionStorage.getItem("login");
        const groupName = $groupName.val();
        const description = $description.val();

        console.log("L'id du créateur est " + creatorId);

        //TODO : changer en requête inscription puis gérer la réponse
        const request = `http://localhost:8080/createGroup/${creatorId}/${groupName}`;
        console.log(request);
        const response = fetch(request, {method: 'POST'})
            .then((data) => {
                return data.json()
            })
            .then((json) => {
                if (json == true) {
                    alert("Le groupe" + login + ", vous avez bien été enregistré.");
                    switchPage(Pages.Login);
                } else {
                    alert("L'utilisateur nommé '" + login + "' existe déjà");
                }
            })
    }

    $('#create').on('touchstart click', function (){
        submitForm();
    })


    $('form').submit(function(event) {
        event.preventDefault();
        submitForm();
    });
}