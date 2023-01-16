
export function renderGroupeList($page) {
    const userId = sessionStorage.getItem("login");
    $page.empty();

    const requestURL = `http://localhost:8080/getUserGroups/${userId}`;
    let groupDataRequest = fetch(requestURL);

    $page.load("./views/groupelist.html",() => groupeListSetUp(groupDataRequest));
}


function groupeListSetUp(groupDataRequest){
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
        })
    // activate tooltip
    const tooltip = document.querySelectorAll('.tooltipped');
    M.Tooltip.init(tooltip);

    // activate modal
    const modal = document.querySelectorAll('.modal');
    M.Modal.init(modal);

    // activate add floating button
    document.addEventListener('DOMContentLoaded', function() {
        const addBtn = document.querySelectorAll('.fixed-action-btn');
        M.FloatingActionButton.init(addBtn);

    });
}
