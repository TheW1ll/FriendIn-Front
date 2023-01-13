import {renderAgendaList} from './agenda.js';
import {renderHomePage} from './homepage.js';
import {renderLoginPage} from './loginpage.js';
import {renderInscriptionPage} from './inscription.js';
import {renderCreateGroup} from './creategroup.js';
import {renderGroupeList} from './groupe.js'
import {renderGroupeEvenementsList} from './groupeevenements.js'
import {renderGroupeAmisList} from './groupeamis.js'
import {renderGroupeTchatList} from './groupetchat.js'
import {renderCreateEvenement} from './createevenement.js'

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
    CreateEvenement: Symbol("create evenement"),
}
$(document).ready(function() {
    console.log("le doc est ready");
    const $page = $('#page-content');

    switchPage(Pages.Login);

    function switchPage(pageType, options) {
        console.log("on switch vers" + pageType.toString());
        switch(pageType) {
            case Pages.Login : renderLoginPage($page, switchPage); break;
            case Pages.Inscription : renderInscriptionPage($page, switchPage); break;
            case Pages.Home : renderHomePage($page, switchPage); break;
            case Pages.Agenda : renderAgendaList($page, switchPage); break;
            case Pages.CreateGroup : renderCreateGroup($page, switchPage); break;
            case Pages.Groupe : renderGroupeList($page, switchPage); break;
            case Pages.GroupeEvenements : renderGroupeEvenementsList($page, switchPage, options.groupId); break;
            case Pages.GroupeAmis : renderGroupeAmisList($page, switchPage); break;
            case Pages.GroupeTchat : renderGroupeTchatList($page, switchPage); break;
            case Pages.CreateEvenement : renderCreateEvenement($page, switchPage); break;
        }
    }

    $('#navgohome').on('touchstart click', function (){
        switchPage(Pages.Home);
    })

    addEventListener('storage', (event) => {
        console.log("test")
        if(event.key === "logged_in" && event.newValue === "true") {
            $('#logout').removeClass('hide');
        }
        else if(event.key === "logged_in" && event.newValue === "false"){
            $('#logout').addClass('hide');
        }
    })



})