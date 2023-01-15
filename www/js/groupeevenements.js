export function renderGroupeEvenementsList($page, groupId) {
    console.log(`group id : ${groupId}`);
    $page.empty();

    const requestURL = `http://localhost:8080/getGroupEvents/${groupId}`;
    let eventsRequest = fetch(requestURL);

    $page.load("./views/groupeevenementslist.html",() => groupeEvenementsListSetUp(groupId,eventsRequest));
}

function groupeEvenementsListSetUp(groupId, eventsRequest){
    //on modifie le lien du bouton de création pour prendre en compte l'id du groupe
    $("#eventbutton").prop("href",`#creerEvenement/${groupId}`)
    //on charge le modèle de ligne, puis on le supprime de l'html
    const $eventRow = $("#eventrow");
    const rowModel = $eventRow.clone();
    $eventRow.remove();

    eventsRequest
        .then((response) => response.json())
        .then((events) => {
            events.forEach((event) => {
                const $newRow = rowModel.clone();
                const $list = $("#eventlist");
                const date = new Date(event.dateDebut)
                $newRow.find("#name").text(event.eventName);
                $newRow.find("#date").text(`${date.toLocaleDateString()} : ${date.toLocaleTimeString()}`);
                $list.append($newRow);
            })

        })

    // activate add floating button
    document.addEventListener('DOMContentLoaded', function() {
        const elems = document.querySelectorAll('.fixed-action-btn');
        M.FloatingActionButton.init(elems);
    });

}