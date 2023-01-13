import {Pages} from "./app.js";

export function renderCreateEvenement($page, switchPage) {
    $page.empty();
    $page.load("./views/createevenement.html",() => groupCreationSetUp(switchPage));
}

// activate datepicker
document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.datepicker');
    var instances = M.Datepicker.init(elems);
});