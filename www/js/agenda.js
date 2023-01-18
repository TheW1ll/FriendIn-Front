
export function renderAgendaList($page) {
    $page.empty();

    const userId = sessionStorage.getItem("login");
    let requestURL = `http://localhost:8080/getUserEvent/${userId}`;
    let eventsRequest = fetch(requestURL);

    $page.load("./views/agenda.html",() => agendaListSetUp(eventsRequest));
}

function agendaListSetUp(eventsRequest){
    //on met en place les tabs
    const el = document.querySelector('.tabs');
    M.Tabs.init(el, {});
    //on charge le modèle de ligne, puis on le supprime de l'html
    const $eventRow = $("#eventrow");
    const rowModel = $eventRow.clone();
    $eventRow.remove();

    //calendrier
    const calendarEl = document.getElementById('calendar');
    const calendar = new FullCalendar.Calendar(calendarEl, {
        initialView: 'dayGridMonth',
        firstDay: 1,
        contentHeight: 600,
        locale: 'fr',
        eventTimeFormat: {
            hour: '2-digit',
            minute: '2-digit',
            meridiem: false
        },
        buttonText: {
            today: "Aujourd'hui"
        }
    });

    //on charge les évènements
    eventsRequest
        .then((response) => response.json())
        .then((events) => {
            events.forEach((event) => {
                const $newRow = rowModel.clone()
                const $list = $("#eventlist");
                const dateDebut = new Date(event.dateDebut);
                const dateFin = new Date(event.dateFin);

                $newRow.find("#nameEventAgenda").text(event.eventName);
                $newRow.find("#dateEventAgenda").text(`${dateDebut.toLocaleDateString()} : ${dateDebut.toLocaleTimeString()}`);
                $list.append($newRow);
                calendar.addEvent({
                    title: event.eventName,
                    start: dateDebut,
                    end: dateFin,
                })
            });

        })



    calendar.render();
}