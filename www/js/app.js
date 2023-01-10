import {renderAgendaList} from './agenda.js';
import {renderHomePage} from './homepage.js';
import {renderLoginPage} from './loginpage.js';
import {renderInscriptionPage} from './inscription.js';
import {renderCreateGroup} from './creategroup.js';

export const Pages = {
    Login: Symbol("login"),
    Inscription: Symbol("inscription"),
    Home: Symbol("homepage"),
    Agenda: Symbol("agenda"),
    Groupe: Symbol("groupe"),
    GroupeEvenements: Symbol("groupeevenementslist"),
    GroupeAmis: Symbol("groupeamislist"),
    GroupeTchat: Symbol("groupetchatlist"),
    CreateGroup: Symbol("create group"),
}
$(document).ready(function() {
    const $page = $('#page-content');

    switchPage(Pages.Login);

    function switchPage(pageType) {
        console.log("on switch vers" + pageType.toString());
        switch(pageType) {
            case Pages.Login : renderLoginPage($page, switchPage); break;
            case Pages.Inscription : renderInscriptionPage($page, switchPage); break;
            case Pages.Home : renderHomePage($page, switchPage); break;
            case Pages.Agenda : renderAgendaList($page, switchPage); break;
            case Pages.CreateGroup : renderCreateGroup($page, switchPage); break;
            case Pages.Groupe : renderGroupeList($page, switchPage); break;
            case Pages.GroupeEvenements : renderGroupeEvenementsList($page, switchPage); break;
            case Pages.GroupeAmis : renderGroupeAmisList($page, switchPage); break;
            case Pages.GroupeTchat : renderGroupeTchatList($page, switchPage); break;
        }
    }

    $('#navgohome').on('touchstart click', function (){
        switchPage(Pages.Home);
    })
})