import {Pages} from "./app.js";

const Tchats = [
    {
        name: "Harold Godwinson",
        discussion: "Cette année, j'ai gagné une bataille le 20 septembre et une autre le 25 septembre"
    },
    {
        name: "William Le Conquérant",
        discussion: "Pfff! C'est du passé, on est le 28, tu ne gagneras pas contre moi"
    },
    {
        name: "Harold Godwinson",
        discussion: "Tu veux que je tente le grand chelem, Pourquoi pas?"
    },
    {
        name: "William Le Conquérant",
        discussion: "C'est l'histoire qui veut ça!"
    },
    {
        name: "Harold Godwinson",
        discussion: "Dis moi, ce n'est pas un forum de discussion entre amis"
    },
    {
        name: "William Le Conquérant",
        discussion: "Précisement! Jusqu'à ce que la mort, nous sépare"
    }
];

export function renderGroupeTchatList($page, switchPage, groupId) {
    $page.empty();
    $page.load("./views/groupetchat.html",() => groupeTchatSetUp(switchPage));
}

function groupeTchatSetUp(switchPage){
    //on charge le modèle de ligne, puis on le supprime de l'html
    var $tchatRow = $("#tchatrow");
    const rowModel = $tchatRow.clone();
    $tchatRow.remove();
    //on charge les évènements : pour l'instant des faux
    Tchats.forEach((tchat) => {
        var $newRow = rowModel.clone()
        var $list = $("#tchatlist");

        $newRow.find("#name").text(tchat.name);
        $newRow.find("#discussion").text(tchat.discussion);
        $list.append($newRow);
    })
}