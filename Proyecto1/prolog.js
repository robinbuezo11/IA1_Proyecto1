const { chatBot, searchGoogle, openApplication } = require('./robotjs.js')
const pl = require("tau-prolog")
const readline = require("readline")
const fs = require('fs');

const nodemailer = require('nodemailer');
const path = require('path');
require('dotenv').config();


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
    const destinatario = '3058184570301@ingenieria.usac.edu.gt'; // Cambiar por el destinatario real
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


const leerArchivosJSON = (directorio, callback) => {
    fs.readdir(directorio, (err, files) => {
        if (err) {
            console.error('Error al leer el directorio:', err);
            callback([]);
            return;
        }

        const jsonFiles = files.filter(file => path.extname(file) === '.json');
        const reportes = [];

        jsonFiles.forEach(file => {
            const filePath = path.join(directorio, file);
            const contenido = fs.readFileSync(filePath, 'utf8');
            const reporte = `Reporte de ${file}:\n${contenido}\n`;
            reportes.push(reporte);
        });

        callback(reportes);
    });
};

const enviarCorreo = (reportes, destinatario) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER, // Tu email
            pass: process.env.EMAIL_PASS  // Tu contraseña
        }
    });

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: destinatario,
        subject: 'Reporte de archivos JSON',
        text: reportes.join('\n\n')
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error al enviar el correo:', error);
        } else {
            console.log('Correo enviado: ' + info.response);
        }
    });
};

// Agregar la funcionalidad de reportar los JSONs en la conversación
const reportarJSONs = (directorio, destinatario) => {
    leerArchivosJSON(directorio, (reportes) => {
        if (reportes.length > 0) {
            enviarCorreo(reportes, destinatario);
        } else {
            console.log('No se encontraron archivos JSON en el directorio.');
        }
    });
};

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


