
export function renderGroupeList($page, switchPage) {
    const userId = sessionStorage.getItem("login");
    $page.empty();

    const requestURL = `http://localhost:8080/getUserGroups/${userId}`;
    let groupDataRequest = fetch(requestURL);

    $page.load("./views/groupelist.html",() => groupeListSetUp(switchPage,groupDataRequest));
}


function groupeListSetUp(switchPage, groupDataRequest){
    //on charge le modèle de ligne, puis on le supprime de l'html
    const $groupeRow = $("#grouperow");
    const rowModel = $groupeRow.clone();

    $groupeRow.remove();

    groupDataRequest
        .then((response) => response.json())
        .then((groups) => {
            groups.forEach((groupe) => {
                const index = groupe.groupId;
                let $newRow = rowModel.clone()
                const $list = $("#groupelist");

                $newRow.find("#name").text(groupe.groupName);
                $newRow.find("#Evenements").prop("href",`#evenements/${index}`)
                $newRow.find("#Amis").prop("href",`#membres/${index}`)
                $newRow.find("#Tchat").prop("href",`#chat/${index}`)

                $list.append($newRow);
        })

        // activate add floating button
        document.addEventListener('DOMContentLoaded', function() {
            const elems = document.querySelectorAll('.fixed-action-btn');
            M.FloatingActionButton.init(elems);
        });

    })
}
