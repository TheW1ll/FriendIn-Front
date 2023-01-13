import {Pages} from "./app.js";

const Groupes = [
    {
        name: "Groupe 1",
    },
    {
        name: "Groupe 2",
    }
];

export function renderGroupeList($page, switchPage) {
    $page.empty();
    $page.load("./views/groupelist.html",() => groupeListSetUp(switchPage));
}

function groupeListSetUp(switchPage){
    //on charge le modèle de ligne, puis on le supprime de l'html
    var $groupeRow = $("#grouperow");
    const rowModel = $groupeRow.clone();
    console.log(rowModel.html());

    $groupeRow.remove();
    //on charge les groupes : pour l'instant des faux
    Groupes.forEach((groupe,index) => {
        var $newRow = rowModel.clone()
        var $list = $("#groupelist");

        $newRow.find("#name").text(groupe.name);
        $newRow.find("#Evenements").prop("id","Evenements" + index)
        $newRow.find("#Amis").prop("id","Amis" + index)
        $newRow.find("#Tchat").prop("id","Tchat" + index)

        $newRow.find('#Evenements' + index).on('touchstart click', function (){
            switchPage(Pages.GroupeEvenements);
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
