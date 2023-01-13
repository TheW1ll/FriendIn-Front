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
    $groupeRow.remove();
    //on charge les groupes : pour l'instant des faux
    Groupes.forEach((groupe,index) => {
        var $newRow = rowModel.clone()
        var $list = $("#groupelist");

        $newRow.find("#name").text(groupe.name);
        //$newRow.find("#Evenements").prop(id,"#Evenements" + index)
        $('#Evenements').on('touchstart click', function (){
            switchPage(Pages.GroupeEvenements);
        })
        $('#Amis').on('touchstart click', function (){
            switchPage(Pages.GroupeAmis);
        })
        $('#Tchat').on('touchstart click', function (){
            switchPage(Pages.GroupeTchat);
        })

        $list.append($newRow);

        document.addEventListener('DOMContentLoaded', function() {
            var elems = document.querySelectorAll('.fixed-action-btn');
            var instances = M.FloatingActionButton.init(elems);
        });

        $('.fixed-action-btn').on('touchstart click', function () {
            switchPage(Pages.CreateGroup);
        })

    })
}
