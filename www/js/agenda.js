import {Pages} from "./app.js";

const Events = [
    {
        name: "Restaurant",
        date: new Date(Date.now()),
        dateFin : new Date(Date.now() + 3*60*60*1000)
    },
    {
        name: "Cinéma",
        date: new Date(Date.now() + 24*60*60*1000),
        dateFin : new Date(Date.now() + 27*60*60*1000)
    }
];

export function renderAgendaList($page) {
    $page.empty();
    $page.load("./views/agenda.html",() => agendaListSetUp());
}

function agendaListSetUp(){
    //on met en place les tabs
    var el = document.querySelector('.tabs');
    M.Tabs.init(el, {});
    //on charge le modèle de ligne, puis on le supprime de l'html
    var $eventRow = $("#eventrow");
    const rowModel = $eventRow.clone();
    $eventRow.remove();
    //on charge les évènements : pour l'instant des faux
    Events.forEach((event) => {
        var $newRow = rowModel.clone()
        var $list = $("#eventlist");

        $newRow.find("#nameEventAgenda").text(event.name);
        $newRow.find("#dateEventAgenda").text(event.date.toDateString());
        $list.append($newRow);
    })

    var calendarEl = document.getElementById('calendar');
    var calendar = new FullCalendar.Calendar(calendarEl, {
        initialView: 'dayGridMonth',
        contentHeight: 600,
        events: Events.map((event) => {
            event = {
                "title": event.name,
                "start": event.date,
                "end": event.dateFin
            };
            return event;
        })
    });
    calendar.render();
}