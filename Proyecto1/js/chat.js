let inputmsg = document.getElementById("msgs");

//-----------------------------------------------------------
//--------------------SEND MESSAGE---------------------------
function sendMessage(){
    let msg = $('#msgs').val();
    $('#msgs').val("");
    if(msg.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/\s+/g, '') === 'adios') {
        initChat()
        $(`#chat`).empty();
        setTimeout(() => {writeChat()}, 1000)
        return
    }
    sentMessage(msg)
    updateChat({ user: 2, msg })
    msg = msg.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    fetch(`http://localhost:3000/chat`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ question: localStorage.getItem('next'), request: msg })
    })
    .then(response => response.json())
    .then(data => {
        receivedMessage(data.resp);
        console.log(data)
        localStorage.setItem('next', data.next)
        updateChat({ user: 1, msg: data.resp })
    })
    .catch(error => {
        console.error('Error al consumir la API:', error);
        receivedMessage("Hubo un error al procesar tu solicitud.");
        initChat()
    });
    $('#chatcontainer').scrollTop($('#chatcontainer')[0].scrollHeight);
}

function sentMessage(msg) {
    $(`#chat`).append(`
        <li class="list-group-item bg-transparent border-0 p-0">
            <div class="d-flex justify-content-end">
                <div class="send-msg bg-primary opacity-75 text-light py-2 px-3 my-1">
                    ${msg.replace('\n', '<br>')}
                </div>
            </div>
        </li>
    `);
}

function receivedMessage(msg){
    $(`#chat`).append(`
        <li class="list-group-item bg-transparent border-0 p-0">
            <div class="d-flex justify-content-start">
                <div class="receive-msg bg-secondary text-light py-2 px-3 my-1">
                    ${msg.replace('\n', '<br>')}
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

//-----------------------------------------------------------
function initChat() {
    localStorage.setItem('chat', JSON.stringify([{ user: 1, msg: '¿Cómo puedo ayudarte?' }]))
    localStorage.setItem('next', '¿Cómo puedo ayudarte?')
}

function updateChat(msg) {
    let mensajes = JSON.parse(localStorage.getItem('chat'))
    mensajes.push(msg)
    localStorage.setItem('chat', JSON.stringify(mensajes))
}

if(!localStorage.getItem('chat')) {
    initChat()
}

function writeChat() {
    const mensajes = JSON.parse(localStorage.getItem('chat'))

    for(const msg_ of mensajes) {
        const { user, msg } = msg_
        if(user === 1) {
            receivedMessage(msg)
        } else {
            sentMessage(msg)
        }
    }
}

writeChat()