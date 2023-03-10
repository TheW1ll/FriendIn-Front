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
import {router} from './router.js'
import {renderInviteMember} from "./invitemember.js";
import {renderInvitation} from "./invitation.js";

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
    InviteMember: Symbol("invitemember"),
    InvitationList: Symbol("invitationlist"),
}

$(document).ready(function() {
    console.log("le doc est ready");
    const $page = $('#page-content');

    //ajout des routes

    router.addRoute('', function() {
        if (sessionStorage.getItem("logged_in") === "true"){
            switchPage(Pages.Home);
        }
        else {
            switchPage(Pages.Login);
        }
    });

    router.addRoute('inscription', function() {
        switchPage(Pages.Inscription);
    });

    router.addRoute('agenda', function() {
        switchPage(Pages.Agenda);
    });

    router.addRoute('groupes', function() {
        switchPage(Pages.Groupe);
    });

    router.addRoute('evenements/:groupId', function(groupId) {
        switchPage(Pages.GroupeEvenements, {groupId:groupId});
    });

    router.addRoute('membres/:groupId', function(groupId) {
        switchPage(Pages.GroupeAmis, {groupId:groupId});
    });

    router.addRoute('chat/:groupId', function(groupId) {
        switchPage(Pages.GroupeTchat, {groupId:groupId});
    });

    router.addRoute('creerGroupe', function() {
        switchPage(Pages.CreateGroup);
    });

    router.addRoute('creerEvenement/:groupId',function(groupId) {
        switchPage(Pages.CreateEvenement, {groupId:groupId});
    });

    router.addRoute('inviterMembre/:groupId',function(groupId) {
        switchPage(Pages.InviteMember, {groupId:groupId});
    });

    router.addRoute('invitationList',function() {
        switchPage(Pages.InvitationList);
    });

    //d??marrer le router
    router.start()

    function switchPage(pageType, options) {
        console.log("on switch vers : " + pageType.toString());
        switch(pageType) {
            case Pages.Login : renderLoginPage($page, switchPage); break;
            case Pages.Inscription : renderInscriptionPage($page); break;
            case Pages.Home : renderHomePage($page); break;
            case Pages.Agenda : renderAgendaList($page); break;
            case Pages.CreateGroup : renderCreateGroup($page); break;
            case Pages.Groupe : renderGroupeList($page); break;
            case Pages.GroupeEvenements : renderGroupeEvenementsList($page, options.groupId); break;
            case Pages.GroupeAmis : renderGroupeAmisList($page, options.groupId); break;
            case Pages.GroupeTchat : renderGroupeTchatList($page, options.groupId); break;
            case Pages.CreateEvenement : renderCreateEvenement($page, options.groupId); break;
            case Pages.InviteMember : renderInviteMember($page, options.groupId); break;
            case Pages.InvitationList : renderInvitation($page); break;
        }
    }

    $(window).on("login_change", (event, is_login) => {
        if(is_login){
            $('#logout').removeClass('hide');
            $('#sidenav_trigger').removeClass('hide');
            $('#logout_sidenav').removeClass('hide');
        }
        else {
            $('#logout').addClass('hide');
            $('#sidenav_trigger').addClass('hide');
            $('#logout_sidenav').addClass('hide');
        }
    });

    //activate sidenav
    var mobile_menu = document.querySelectorAll('.sidenav');
    M.Sidenav.init(mobile_menu);

    $('#logout').on('touchstart click', function (){
        sessionStorage.setItem("logged_in","false");
        $(window).trigger("login_change",[false])
        switchPage(Pages.Login);
    });
    $('#logout_sidenav').on('touchstart click', function (){
        sessionStorage.setItem("logged_in","false");
        $(window).trigger("login_change",[false])
        switchPage(Pages.Login);
    });




})