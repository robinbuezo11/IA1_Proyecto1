const { chatBot, searchGoogle, openApplication } = require('./robotjs.js')
const pl = require("tau-prolog")
const readline = require("readline")
const fs = require('fs');

// Crear una sesión Tau Prolog
const session = pl.create();

// Configuración de readline para la entrada del usuario
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Función para procesar la conversación en Prolog
const conversar = (input) => {
    const goal = `conversar(frase('${input.toLowerCase()}'), respuesta(Respuesta)).`
    session.query(goal, {
        success: () => {
            session.answer({
                success: answer => {
                    let response = session.format_answer(answer)
                    response = response.replace('Respuesta = ', '')
                    if(!['¿Qué quieres buscar?', '¿Qué aplicación?', '¿Cuál es el directorio?'].includes(response)) {
                        console.log(response)
                        openApplication(response)
                    }
                    obtenerEntrada(
                        ['¿Qué quieres buscar?', '¿Qué aplicación?', '¿Cuál es el directorio?']
                            .includes(response)
                        ? `${response} -> `
                        : '\n¿Cómo puedo ayudarte? -> '
                    )
                },
                error: err => console.error('Error al obtener respuesta:', err)
            })
        },
        error: err => console.error('Error en la consulta:', err)
    })
}

const busqueda = (input) => {
    const goal = `preguntaAbierta('${input.toLowerCase()}', Respuesta).`
    session.query(goal, {
        success: () => {
            session.answer({
                success: answer => {
                    let response = session.format_answer(answer)
                    response = response.replace('Respuesta = ', '')
                    console.log(response + '...')
                    searchGoogle(response)
                    obtenerEntrada('\n¿Cómo puedo ayudarte? -> ')
                }
            })
        },
        error: err => console.error('Error en la consulta:', err)
    })
}

const abrirAplicacion = (input) => {
    const goal = `preguntaAbierta('${input.toLowerCase()}', Respuesta).`
    session.query(goal, {
        success: () => {
            session.answer({
                success: answer => {
                    let response = session.format_answer(answer)
                    response = response.replace('Respuesta = ', '')
                    console.log(response)
                    if(response.includes('abrir')) {
                        chatBot(response)
                    } else {
                        openApplication(response)
                    }
                    obtenerEntrada('\n¿Cómo puedo ayudarte? -> ')
                }
            })
        },
        error: err => console.error('Error en la consulta:', err)
    })
}

const organizar = (input) => {
    // Ruta del directorio que deseas validar
    fs.stat(input, (error, stats) => {
        if (error) {
            console.log(error)
            if (error.code === 'ENOENT') {
                console.log('El directorio no existe.');
            } else {
                console.error('Error al verificar el directorio:', error);
            }
        } else if (stats.isDirectory()) {
            console.log('El directorio existe.');
        } else {
            console.log('La ruta especificada no es un directorio.');
        }
    })
    obtenerEntrada('\n¿Cómo puedo ayudarte? -> ')
}

// Función para solicitar la entrada del usuario
const obtenerEntrada = (pregunta) => {
    rl.question(pregunta, input => {
        if(input.toLowerCase() !== 'adios') {
            if(pregunta === '¿Qué quieres buscar? -> ') {
                busqueda(input)
            } else if(pregunta === '¿Qué aplicación? -> ') {
                abrirAplicacion(input)
            } else if(pregunta === '¿Cuál es el directorio? -> ') {
                organizar(input)
            } else {
                conversar(input)
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