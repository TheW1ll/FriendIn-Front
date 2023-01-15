
export function renderCreateEvenement($page, groupId) {
    $page.empty();
    console.log(groupId);
    $page.load("./views/createevenement.html",() => eventCreationSetUp(groupId));
}

function eventCreationSetUp(groupId) {

    const $evenementName = $("#evenementName");
    const $datePicker = $("#datePicker");
    const $timePicker = $("#timePicker");
    const $duree = $("#duree");
    const $adresse = $("#adresse");
    const $description = $("#description");
    function submitForm(){
        const submitter = sessionStorage.getItem("login");
        const name = $evenementName.val();
        const date = $datePicker.val();
        const time = $timePicker.val();
        const duree = $duree.val();
        const adresse = $adresse.val();
        const description = $description.val();

        const dateDebut = new Date(date + " " + time);
        const dateFin = new Date(dateDebut.getTime() + duree*60*60*1000);

        const requestURL = `http://localhost:8080/createEvent/${submitter}/${groupId}`;
        const requestBody = {
            dateDebut: dateDebut.toISOString(),
            dateFin: dateFin.toISOString(),
            title: name,
            description: description,
            location: adresse
        }
        fetch(requestURL, {
            method:'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestBody)
        })
            .then((data) => {
                return data.json()
            })
            .then((json) => {
                if(json==="SUCCESS"){
                    alert("L'événement a été ajouté");

                }
                else{
                    console.log(json);
                    alert("L'événement n'a pas été ajouté");
                }
                window.location.href = `#evenements/${groupId}`
            })

    }

    $('#create').on('touchstart click', function (){
        submitForm();
    })

    $('form').submit(function(event) {
        event.preventDefault();
        submitForm();
    })

    // activate datepicker
    const dates = document.querySelectorAll('.datepicker');
    M.Datepicker.init(dates);

    const time = document.querySelectorAll('.timepicker');
    M.Timepicker.init(time);
}


