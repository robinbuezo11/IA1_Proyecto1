const pl = require("tau-prolog");
const readline = require("readline");

// Crear una sesión Tau Prolog
const session = pl.create();

// Configuración de readline para la entrada del usuario
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Función para procesar la conversación en Prolog
function preguntaLV1(input) {
    const goal = `preguntaLV1(frase('${input.toLowerCase()}'), respuesta(Respuesta)).`
    session.query(goal, {
        success: () => {
            session.answer({
                success: answer => {
                    const response = session.format_answer(answer)
                    if(response.replace('Respuesta = ', '') !== '¿Qué quieres buscar?') {
                        console.log(response.replace('Respuesta = ', ''))
                    }
                    obtenerEntrada(
                        response.replace('Respuesta = ', '') === '¿Qué quieres buscar?'
                        ? '¿Qué quieres buscar? -> '
                        : '\n¿Cómo puedo ayudarte? -> '
                    )
                },
                error: err => console.error('Error al obtener respuesta:', err)
            })
        },
        error: err => console.error('Error en la consulta:', err)
    })
}

function busqueda(input) {
    const goal = `busqueda('${input.toLowerCase()}', Respuesta).`
    session.query(goal, {
        success: () => {
            session.answer({
                success: answer => {
                    const response = session.format_answer(answer)
                    console.log(response.replace('Respuesta = ', '') + '...')
                    obtenerEntrada('\n¿Cómo puedo ayudarte? -> ')
                }
            })
        },
        error: err => console.error('Error en la consulta:', err)
    })
}

// Función para solicitar la entrada del usuario
function obtenerEntrada(pregunta) {
    rl.question(pregunta, input => {
        if(input.toLowerCase() !== 'adios') {
            if(pregunta === '¿Qué quieres buscar? -> ') {
                busqueda(input)
            } else {
                preguntaLV1(input)
            }
            return
        }
        rl.close()
    })
}

// Cargar el archivo Prolog
session.consult("./prolog/chatbot.pl", {
    success: () => {
        console.log("Archivo Prolog cargado exitosamente.")
        obtenerEntrada('¿Cómo puedo ayudarte? -> ')
    },
    error: (err) => {
        console.error('Error al cargar el archivo Prolog:', err)
    }
})