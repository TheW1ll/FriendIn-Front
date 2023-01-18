
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

                $newRow.prop("id", `grouperow${index}`)
                $newRow.find("#name").text(groupe.groupName);
                $newRow.find("#Evenements").prop("href",`#evenements/${index}`)
                $newRow.find("#Amis").prop("href",`#membres/${index}`)
                $newRow.find("#Tchat").prop("href",`#chat/${index}`)
                $newRow.find("#leave_grp").prop("id",`leave_grp${index}`)
                $newRow.find("#delete_grp").prop("id",`delete_grp${index}`)

                $list.append($newRow);
                $(`#leave_grp${index}`).on('touchstart click', function (){
                    const userId = sessionStorage.getItem("login");
                    const request = `http://localhost:8080/leaveGroup/${userId}/${index}`;
                    fetch(request, {method:'DELETE'})
                        .then((data) => {
                            return data.json()
                        })
                        .then((isSuccessful) =>{
                            if(isSuccessful){
                                alert(`Vous venez de quitter ${groupe.groupName}`);
                                $(`#grouperow${index}`).remove();
                            }
                            else{
                                alert("Vous êtes le créateur de ce groupe et vous ne pouvez donc pas le quitter");
                            }
                        })
                })

            });
            // activate modal
            const modal = document.querySelectorAll('.modal');
            M.Modal.init(modal);
        })


    // activate add floating button
    document.addEventListener('DOMContentLoaded', function() {
        const addBtn = document.querySelectorAll('.fixed-action-btn');
        M.FloatingActionButton.init(addBtn);

    });
}
