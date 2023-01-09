import {Pages} from "./app.js";

export function renderCreateGroup($page, switchPage) {
    $page.empty();
    $page.load("./views/creategroup.html",() => groupCreationSetUp(switchPage));
}

function groupCreationSetUp(switchPage){

}