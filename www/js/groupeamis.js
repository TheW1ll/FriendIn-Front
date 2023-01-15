
export function renderGroupeAmisList($page, groupId) {
    $page.empty();

    let requestURL = `http://localhost:8080/getGroupMembers/${groupId}`;
    let groupMembersRequest = fetch(requestURL);

    requestURL = `http://localhost:8080/getOwner/${groupId}`;
    let groupOwnerRequest = fetch(requestURL);

    $page.load("./views/groupeamislist.html",() => groupeAmisListSetUp(groupMembersRequest, groupOwnerRequest, groupId));
}

function groupeAmisListSetUp(groupMembersRequest, ownerRequest, groupId){
    //on charge le modèle de ligne, puis on le supprime de l'html
    const $friendRow = $("#friendrow");
    const rowModel = $friendRow.clone();
    $friendRow.remove();
    //on charge les évènements : pour l'instant des faux
    groupMembersRequest
        .then((response) => response.json())
        .then((members) => {
            members.forEach((ami) => {
                const $newRow = rowModel.clone()
                const $list = $("#friendlist");

                $newRow.find("#name").text(ami);
                $list.append($newRow);
            })
        })

    document.addEventListener('DOMContentLoaded', function() {
        const elems = document.querySelectorAll('.fixed-action-btn');
        M.FloatingActionButton.init(elems);
    });

    //changer le lien vers lequel le bouton d'invitation pointe
    $("#invitebutton").prop("href",`#inviterMembre/${groupId}`);

    //si on est le créateur du groupe, le bouton pour inviter un membre est visible
    ownerRequest
        .then((response) => response.json())
        .then((ownerResponse) => {
            if(ownerResponse.groupOwnerId === sessionStorage.getItem("login")){
                $("#invitebutton").removeClass("hide");
            }
        })

}