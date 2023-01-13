import {Pages} from "./app.js";

export function renderCreateGroup($page, switchPage) {
    $page.empty();
    $page.load("./views/creategroup.html",() => groupCreationSetUp(switchPage));
}

function groupCreationSetUp(switchPage){
    const groupName = $groupName.val();
    const description = $description.val();


    //TODO : changer en requête inscription puis gérer la réponse
    const request = 'http://localhost:8080/createUser/' + $groupName + '/' + $description;
    console.log(request);
    const response = fetch(request, {method:'POST'})
        .then((data) => {
            return data.json()
        })
        .then((json) => {
            if(json==true){
                alert("Le groupe"+ login +", vous avez bien été enregistré.");
                switchPage(Pages.Login);
            }
            else{
                alert("L'utilisateur nommé '"+ login + "' existe déjà");
            }
        })
}