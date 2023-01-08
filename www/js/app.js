const Pages = {
    Login: Symbol("login"),
    Inscription: Symbol("inscription"),
    Home: Symbol("homepage")
}
$(document).ready(function() {
    console.log("test2");
    const $page = $('#page-content');

    switchPage(Pages.Login);

    function switchPage(pageType) {
        console.log("on switch vers" + pageType.toString());
        switch(pageType) {
            case Pages.Login : renderLoginPage($page, switchPage); break;
            case Pages.Inscription : renderInscriptionPage($page, switchPage); break;
            case Pages.Home : renderHomePage($page, switchPage); break;
        }
    }
})