import {Pages} from "./app.js";

const creatorId = sessionStorage.getItem("login");
const Groupes = [];

export function renderGroupeList($page, switchPage) {
    $page.empty();
    /*$groupes.onload = function () {
        console.log("L'id du créateur est " + creatorId);

        //TODO : changer en requête inscription puis gérer la réponse
        const request = `http://localhost:8080//getUserGroups/${userId}`;
        console.log(request);
        const response = fetch(request)
            .then((data) => {
                return data.json()
            })
            .then((json) => {
                if (json.groupCreated === true) {
                    alert("Le groupe" + groupName + ", a été enregistré.");
                    switchPage(Pages.Groupe);
                } else {
                    alert("Un groupe nommé '" + groupName + "' existe déjà");
                }
            })
    }*/
    $page.load("./views/groupelist.html",() => groupeListSetUp(switchPage));
}


function groupeListSetUp(switchPage){
    //on charge le modèle de ligne, puis on le supprime de l'html
    var $groupeRow = $("#grouperow");
    const rowModel = $groupeRow.clone();
    console.log(rowModel.html());

    $groupeRow.remove();
    //on charge les groupes : pour l'instant des faux
    Groupes.forEach((groupe) => {
        var index = groupe.groupId;
        var $newRow = rowModel.clone()
        var $list = $("#groupelist");

        $newRow.find("#name").text(groupe.groupName);
        $newRow.find("#Evenements").prop("id","Evenements" + index)
        $newRow.find("#Amis").prop("id","Amis" + index)
        $newRow.find("#Tchat").prop("id","Tchat" + index)

        var options = {
            groupId: index,
        };
        $newRow.find('#Evenements' + index).on('touchstart click', function (){
            switchPage(Pages.GroupeEvenements,options);
        })
        $newRow.find('#Amis' + index).on('touchstart click', function (){
            switchPage(Pages.GroupeAmis);
        })
        $newRow.find('#Tchat' + index).on('touchstart click', function (){
            switchPage(Pages.GroupeTchat);
        })

        $list.append($newRow);

        // activate add floating button
        document.addEventListener('DOMContentLoaded', function() {
            var elems = document.querySelectorAll('.fixed-action-btn');
            var instances = M.FloatingActionButton.init(elems);
        });

        // navigate vers la page createGroup on clickant sur le floating btn
        $('.fixed-action-btn').on('touchstart click', function () {
            switchPage(Pages.CreateGroup);
        })

    })
}
