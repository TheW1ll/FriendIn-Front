import {Pages} from "./app.js";

export function renderCreateEvenement($page, switchPage, groupId) {
    $page.empty();
    $page.load("./views/createevenement.html",() => eventCreationSetUp(switchPage));
}

function eventCreationSetUp(switchPage) {
    // activate datepicker
    var dates = document.querySelectorAll('.datepicker');
    M.Datepicker.init(dates);

    var time = document.querySelectorAll('.timepicker');
    M.Timepicker.init(time);
}


