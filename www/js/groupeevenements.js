import {Pages} from "./app.js";

export function renderGroupeEvenementsList($page, switchPage, groupId) {
    console.log(`group id ; ${groupId}`);
    $page.empty();

    const requestURL = `http://localhost:8080/getGroupEvents/${groupId}`;
    let eventsRequest = fetch(requestURL);

    $page.load("./views/groupeevenementslist.html",() => groupeEvenementsListSetUp(switchPage,groupId,eventsRequest));
}

function groupeEvenementsListSetUp(switchPage, groupId, eventsRequest){
    //on modifie le lien du bouton de création pour prendre en compte l'id du groupe
    $("#eventbutton").prop("href",`#creerEvenement/${groupId}`)
    //on charge le modèle de ligne, puis on le supprime de l'html
    var $eventRow = $("#eventrow");
    const rowModel = $eventRow.clone();
    $eventRow.remove();

    eventsRequest
        .then((response) => response.json())
        .then((events) => {
            events.forEach((event) => {
                var $newRow = rowModel.clone()
                var $list = $("#eventlist");

                $newRow.find("#name").text(event.eventName);
                $newRow.find("#date").text(event.dateDebut);
                $list.append($newRow);
            })

        })

    // activate add floating button
    document.addEventListener('DOMContentLoaded', function() {
        var elems = document.querySelectorAll('.fixed-action-btn');
        var instances = M.FloatingActionButton.init(elems);
    });

}