
export function renderInvitation($page) {
    const userId = sessionStorage.getItem("login");
    $page.empty();

    const requestURL = `http://localhost:8080/getInvitations/${userId}`;
    let invitationDataRequest = fetch(requestURL);

    $page.load("./views/invitationlist.html",() => invitationListSetUp(invitationDataRequest));
}


function invitationListSetUp(invitationDataRequest){
    //on charge le modèle de ligne, puis on le supprime de l'html
    const $invitationRow = $("#invitationrow");
    const rowModel = $invitationRow.clone();

    $invitationRow.remove();

    invitationDataRequest
        .then((response) => response.json())
        .then((groups) => {
            groups.forEach((groupe) => {
                const index = groupe.groupId;
                let $newRow = rowModel.clone()
                const $list = $("#invitationlist");

                $newRow.prop("id", `invitationrow${index}`)
                $newRow.find("#name").text(groupe.groupName);
                $newRow.find("#Accepter").prop("id",`Accepter${index}`)
                $newRow.find("#Refuser").prop("id",`Refuser${index}`)

                $list.append($newRow);

                $(`#Accepter${index}`).on('touchstart click', function (){
                    const userId = sessionStorage.getItem("login");
                    const request = `http://localhost:8080/acceptInvitation/${userId}/${groupe.groupId}`;
                    fetch(request, {method:'POST'})
                        .then((data) => {
                            return data.json()
                        })
                        .then((isSuccessful) =>{
                            if(isSuccessful){
                                alert(`Vous avez rejoint le groupe ${groupe.groupName}`);
                                $(`#invitationrow${index}`).remove();
                            }
                            else{
                                alert(`Nous avons rencontrer un problème durant le traitement de votre demande`);
                            }
                        })
                })

                $(`#Refuser${index}`).on('touchstart click', function (){
                    const userId = sessionStorage.getItem("login");
                    const request = `http://localhost:8080/refuseInvitation/${userId}/${groupe.groupId}`;
                    fetch(request, {method:'POST'})
                        .then((data) => {
                            return data.json()
                        })
                        .then((isSuccessful) =>{
                            if(isSuccessful){
                                alert(`Vous avez refuser l'invitation de ${groupe.groupName}`);
                                $(`#invitationrow${index}`).remove();
                            }
                            else{
                                alert(`Nous avons rencontrer un problème durant le traitement de votre demande`);
                            }
                        })
                })


            });

        })
}
