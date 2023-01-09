
const Events = [
    {
        name: "event 1",
        date: new Date(Date.now())
    },
    {
        name: "event 2",
        date: new Date(Date.now())
    }
];

function renderAgendaList($page, switchPage) {
    $page.empty();
    $page.load("./views/agendalist.html",() => agendaListSetUp(switchPage));
}

function agendaListSetUp(switchPage){
    //on charge le modèle de ligne, puis on le supprime de l'html
    var $eventRow = $("#eventrow");
    const rowModel = $eventRow.clone();
    $eventRow.remove();
    //on charge les évènements : pour l'instant des faux
    Events.forEach((event) => {
        var $newRow = rowModel.clone()
        var $list = $("#eventlist");

        $newRow.find("#name").text(event.name);
        $newRow.find("#date").text(event.date.toDateString());
        $list.append($newRow);
    })
}