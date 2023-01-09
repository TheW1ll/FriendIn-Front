import {Pages} from "./app.js";

export function renderHomePage($page, switchPage) {
    $page.empty();
    $page.load("./views/homepage.html", () => cardsHomePageSetUp(switchPage));
}

function cardsHomePageSetUp(switchPage){


    $('#groupes').on('touchstart click', function (){
        alert("Ouvrir page groupes");
    })


    $('#agenda').on('touchstart click', function (){
        switchPage(Pages.Agenda);
    })
}