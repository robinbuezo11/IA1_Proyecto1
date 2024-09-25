let inputmsg = document.getElementById("msgs");

//-----------------------------------------------------------
//--------------------SEND MESSAGE---------------------------
function sendMessage(){
    let msg = $('#msgs').val();
    $('#msgs').val("");
    $(`#chat`).append(`
        <li class="list-group-item bg-transparent border-0 p-0">
            <div class="d-flex justify-content-end">
                <div class="send-msg bg-primary opacity-75 text-light rounded-3 py-2 px-3 my-1">
                    ${msg}
                </div>
            </div>
        </li>
    `);
    receiveMessage("He recibido tu mensaje: " + msg);
    $('#chatcontainer').scrollTop($('#chatcontainer')[0].scrollHeight);
}

function receiveMessage(msg){
    $(`#chat`).append(`
        <li class="list-group-item bg-transparent border-0 p-0">
            <div class="d-flex justify-content-start">
                <div class="receive-msg bg-secondary text-light rounded-3 py-2 px-3 my-1">
                    ${msg}
                </div>
            </div>
        </li>
    `);
    $('#chatcontainer').scrollTop($('#chatcontainer')[0].scrollHeight);
}

//-----------------------------------------------------------
//--------------------EVENT LISTENERS------------------------

inputmsg.addEventListener("keyup", function(event) {
    if (event.key === 'Enter') {
        event.preventDefault();
        sendMessage();
    }
});