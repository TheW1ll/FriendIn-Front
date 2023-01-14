
export function renderCreateEvenement($page, switchPage, groupId) {
    $page.empty();
    $page.load("./views/createevenement.html",() => groupCreationSetUp(switchPage));
}

// activate datepicker
document.addEventListener('DOMContentLoaded', function() {
    const elems = document.querySelectorAll('.datepicker');
    M.Datepicker.init(elems);
});