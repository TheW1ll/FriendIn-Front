import {Pages} from "./app.js";

export function renderCreateGroup($page, switchPage) {
    $page.empty();
    $page.load("./views/creategroup.html",() => groupCreationSetUp(switchPage));
}

function groupCreationSetUp(switchPage){
    const $groupName = $('#groupName');
    const $description = $('#description');
    function submitForm() {
        const creatorId = sessionStorage.getItem("login");
        const groupName = $groupName.val();
        const description = $description.val();

        console.log("L'id du créateur est " + creatorId);

        const requestRoute = `http://localhost:8080/createGroup/${creatorId}/${groupName}`;
        const request = new Request(requestRoute, {
            method:"POST",
            body: description,
        })
        console.log(request);
        const response = fetch(request)
            .then((data) => {
                return data.json()
            })
            .then((json) => {
                if (json.groupCreated === true) {
                    alert("Le groupe" + groupName + ", a été enregistré.");
                    window.location.href = "#groupes"
                } else {
                    alert("Un groupe nommé '" + groupName + "' existe déjà");
                }
            })
    }

    $('#create').on('touchstart click', function (){
        submitForm();
    })


    $('form').submit(function(event) {
        event.preventDefault();
        submitForm();
    });
}