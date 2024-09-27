const { chatBot, searchGoogle, openApplication } = require('./robotjs.js');
const pl = require("tau-prolog");
const fs = require('fs');
const { reportarJSONs } = require('./json.js')
require('dotenv').config();

// Crear una sesión Tau Prolog
const session = pl.create();

// Función para procesar la conversación en Prolog
const conversar = async (input) => {
    return new Promise((resolve, reject) => {
        const goal = `conversar(frase('${input.toLowerCase()}'), respuesta(Respuesta)).`;

        session.query(goal, {
            success: async () => {
                session.answer({
                    success: async (answer) => {
                        let response = session.format_answer(answer);
                        response = response.replace('Respuesta = ', '');
                        if (!['¿Qué quieres buscar?', '¿Qué aplicación?', '¿Cuál es el directorio?'].includes(response)) {
                            console.log(response);
                            if(response != 'Lo siento, no entiendo lo que quieres decir. ¿Puedes intentar otra cosa?') {
                                openApplication(response);
                                response = `Bien\nIntentaré abrir ${response}`
                            }
                        }
                        resolve({ 
                            question: ['¿Qué quieres buscar?', '¿Qué aplicación?', '¿Cuál es el directorio?'].includes(response)
                                ? response
                                : '¿Cómo puedo ayudarte?', 
                            request: response 
                        });
                    },
                    error: err => {
                        console.error('Error al obtener respuesta:', err);
                        reject(err);
                    }
                });
            },
            error: err => {
                console.error('Error en la consulta:', err);
                reject(err);
            }
        });
    });
};

const busqueda = (input) => {
    return new Promise((resolve, reject) => {
        const goal = `preguntaAbierta('${input.toLowerCase()}', Respuesta).`
        session.query(goal, {
            success: () => {
                session.answer({
                    success: answer => {
                        let response = session.format_answer(answer);
                        response = response.replace('Respuesta = ', '');
                        console.log(response + '...');
                        searchGoogle(response);
                        resolve({ question: '¿Cómo puedo ayudarte?', request: `Buscando sobre "${response}"` })
                    },
                    error: err => {
                        console.error('Error al obtener respuesta:', err);
                        reject(err);
                    }
                });
            },
            error: err => {
                console.error('Error en la consulta:', err)
                reject(err)
            }
        });
    })
};

const abrirAplicacion = (input) => {
    return new Promise((resolve, reject) => {
        const goal = `preguntaAbierta('${input.toLowerCase()}', Respuesta).`
        session.query(goal, {
            success: () => {
                session.answer({
                    success: answer => {
                        let response = session.format_answer(answer);
                        response = response.replace('Respuesta = ', '');
                        console.log(response);
                        if (response.includes('abrir')) {
                            chatBot(response);
                        } else {
                            openApplication(response);
                        }
                        resolve({ question: '¿Cómo puedo ayudarte?', request: response });
                    },
                    error: err => {
                        console.error('Error al obtener respuesta:', err);
                        reject(err);
                    }
                });
            },
            error: err => {
                console.error('Error en la consulta:', err)
                reject(err)
            }
        });
    })
};

const organizar = (input) => {
    const destinatario = '3058184570301@ingenieria.usac.edu.gt'; 
    const directorio = input; // El directorio ingresado por el usuario
    
    // Verificar si es un directorio válido y luego proceder con la función
    fs.stat(directorio, (error, stats) => {
        if (error) {
            console.log(error);
            if (error.code === 'ENOENT') {
                console.log('El directorio no existe.');
            } else {
                console.error('Error al verificar el directorio:', error);
            }
        } else if (stats.isDirectory()) {
            console.log('El directorio existe.');
            // Llama a la función para reportar los archivos JSON
            reportarJSONs(directorio, destinatario);
        } else {
            console.log('La ruta especificada no es un directorio.');
        }
    });
};

// Función para solicitar la entrada del usuario
const obtenerEntrada = async (pregunta, input) => {
    if (input.toLowerCase() !== 'adios') {
        if (pregunta === '¿Qué quieres buscar?') {
            return busqueda(input);
        } else if (pregunta === '¿Qué aplicación?') {
            return abrirAplicacion(input);
        } else if (pregunta === '¿Cuál es el directorio?') {
            return organizar(input);
        }
        return conversar(input);
    }
};

const initTauProlog = async (body) => {
    return new Promise((resolve, reject) => {
        const { question, request } = body
        console.log({ question, request })
        // Cargar el archivo Prolog
        session.consult("./prolog/chatbot.pl", {
            success: async () => {
                console.log("Archivo Prolog cargado exitosamente.");
                const resp = await obtenerEntrada(question, request)
                resolve(resp)
            },
            error: (err) => {
                console.error('Error al cargar el archivo Prolog:', err);
                reject(err)
            }
        });
    })
}

const chat = async (req, res) => {
    try {
        const resp = await initTauProlog(req.body)
        res.status(200).json({ status: 200, message: 'success', next: resp.question, resp: resp.request })
    } catch (error) {
        res.status(500).json({ status: 500, message: 'error', error: error.toString() })
    }
}

const holamundo = (_, res) => {
    res.status(200).json({ status: 200, message: '¡Hola Mundo!' })
}

module.exports = {
    holamundo,
    chat,
}