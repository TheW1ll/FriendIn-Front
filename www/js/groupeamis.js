import {Pages} from "./app.js";

const GroupeAmis = [
    {
        name: "William Le Conquérant",
    },
    {
        name: "Harold Godwinson",
    }
];

export function renderGroupeAmisList($page, switchPage) {
    $page.empty();
    $page.load("./views/groupeamislist.html",() => groupeAmisListSetUp(switchPage));
}

function groupeAmisListSetUp(switchPage){
    //on charge le modèle de ligne, puis on le supprime de l'html
    var $friendRow = $("#friendrow");
    const rowModel = $friendRow.clone();
    $friendRow.remove();
    //on charge les évènements : pour l'instant des faux
    GroupeAmis.forEach((ami) => {
        var $newRow = rowModel.clone()
        var $list = $("#friendlist");

        $newRow.find("#name").text(ami.name);
        $list.append($newRow);
    })
}