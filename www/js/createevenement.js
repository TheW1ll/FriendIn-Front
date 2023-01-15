
export function renderCreateEvenement($page, switchPage, groupId) {
    $page.empty();
    $page.load("./views/createevenement.html",() => eventCreationSetUp(switchPage));
}

function eventCreationSetUp(switchPage) {
    // activate datepicker
    const dates = document.querySelectorAll('.datepicker');
    M.Datepicker.init(dates);

    const time = document.querySelectorAll('.timepicker');
    M.Timepicker.init(time);
}


