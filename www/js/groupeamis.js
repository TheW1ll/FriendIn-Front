
const GroupeAmis = [
    {
        name: "William Le Conquérant",
    },
    {
        name: "Harold Godwinson",
    }
];

export function renderGroupeAmisList($page, groupId) {
    $page.empty();
    $page.load("./views/groupeamislist.html",() => groupeAmisListSetUp());
}

function groupeAmisListSetUp(){
    //on charge le modèle de ligne, puis on le supprime de l'html
    const $friendRow = $("#friendrow");
    const rowModel = $friendRow.clone();
    $friendRow.remove();
    //on charge les évènements : pour l'instant des faux
    GroupeAmis.forEach((ami) => {
        const $newRow = rowModel.clone()
        const $list = $("#friendlist");

        $newRow.find("#name").text(ami.name);
        $list.append($newRow);
    })
}