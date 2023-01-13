import {Pages} from "./app.js";

const GroupeEvents = [
    {
        name: "Grande Fête",
        date: new Date(Date.now())
    },
    {
        name: "Petite Fête",
        date: new Date(Date.now())
    }
];

export function renderGroupeEvenementsList($page, switchPage) {
    $page.empty();
    $page.load("./views/groupeevenementslist.html",() => groupeEvenementsListSetUp(switchPage));
}

function groupeEvenementsListSetUp(switchPage){
    //on charge le modèle de ligne, puis on le supprime de l'html
    var $eventRow = $("#eventrow");
    const rowModel = $eventRow.clone();
    $eventRow.remove();
    //on charge les évènements : pour l'instant des faux
    GroupeEvents.forEach((event) => {
        var $newRow = rowModel.clone()
        var $list = $("#eventlist");

        $newRow.find("#name").text(event.name);
        $newRow.find("#date").text(event.date.toDateString());
        $list.append($newRow);
    })

    // activate add floating button
    document.addEventListener('DOMContentLoaded', function() {
        var elems = document.querySelectorAll('.fixed-action-btn');
        var instances = M.FloatingActionButton.init(elems);
    });

    // navigate vers la page createGroup on clickant sur le floating btn
    $('.fixed-action-btn').on('touchstart click', function () {
        switchPage(Pages.CreateEvenement);
    })
}