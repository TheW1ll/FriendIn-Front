
export function renderInviteMember($page, groupId) {
    $page.empty();
    $page.load("./views/invitemember.html",() => inviteMemberSetUp(groupId));
}

function inviteMemberSetUp(groupId) {
    const $memberId = $("#memberId");
    function submitForm(){
        const memberId = $memberId.val();
        const login = sessionStorage.getItem("login");
        const password = sessionStorage.getItem("password");
        if (memberId !== ""){
            const requestURL = `http://localhost:8080/inviteToGroup/${groupId}/${memberId}/${password}`;
            fetch(requestURL, {method:'POST'})
                .then((data) => {
                    return data.json()
                })
                .then((json) => {
                    if(json==true){
                        alert("L'utilisateur a bien été ajouté au groupe");

                    }
                    else{
                        alert("L'utilisateur n'a pas pu être ajouté au groupe");
                    }
                    window.location.href = `#membres/${groupId}`
                })
        }
    }

    $('#create').on('touchstart click', function (){
        submitForm();
    })

    $('form').submit(function(event) {
        event.preventDefault();
        submitForm();
    })
}

