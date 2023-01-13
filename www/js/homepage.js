import {Pages} from "./app.js";

export function renderHomePage($page, switchPage) {
    $page.empty();
    $page.load("./views/homepage.html", () => cardsHomePageSetUp(switchPage));
}

function cardsHomePageSetUp(switchPage){


    $('#groupes').on('touchstart click', function (){
        if (sessionStorage.getItem("logged_in") === true)
        switchPage(Pages.Groupe);
        else {
            alert("Vous avez besoin de log-in pour consultez la page")
        }
    })


    $('#agenda').on('touchstart click', function (){
        switchPage(Pages.Agenda);
    })
}