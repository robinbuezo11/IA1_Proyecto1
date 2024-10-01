*Universidad de San Carlos de Guatemala*  
*Facultad de Ingenieria*  
*Escuela de Ingeniería en Ciencias y Sistemas*  
*Inteligencia Artificial 1*  
*Segundo Semestre 2024.*  

___
## **Proyecto 1**
### **Automatización Con Tau-Prolog Y RobotJS**
___
**201908355 - Danny Hugo Bryan Tejaxún Pichiyá**  
**201944994 - Robin Omar Buezo Díaz**  
**201907774 - Dyllan José Rodrigo García Mejía**  

## Procesamiento De Lenguaje
### tau-prolog
Tau-Prolog es un intérprete de Prolog escrito completamente en JavaScript, diseñado para ejecutarse en entornos basados en la web. Prolog es un lenguaje de programación lógico, utilizado principalmente en inteligencia artificial y procesamiento de lenguajes naturales. Tau-Prolog permite ejecutar programas de Prolog directamente en el navegador o en aplicaciones basadas en Node.js, sin necesidad de servidores o compiladores externos.

#### Características
* Como está escrito en JavaScript, Tau-Prolog se puede ejecutar en cualquier plataforma que soporte JavaScript, incluidos navegadores web y entornos como Node.js.

* Es ideal para integrar la lógica Prolog en aplicaciones web, permitiendo el uso de Prolog en el lado del cliente.

* Permite la interacción con las páginas web y sus elementos DOM, lo que lo hace útil para desarrollar aplicaciones interactivas que requieran lógica basada en Prolog.

### Implementación
El script de tau-prolog está organizado para manejar varias frases similares que apuntan a una misma intención o acción.

#### 1. Hechos de conversación
Cada línea del tipo `conversar(frase(...), respuesta(...))` es un hecho que relaciona una frase reconocida con una respuesta específica.


* El primer argumento es un término `frase(...)` que contiene una cadena de texto que representa la frase que el usuario podría decir.
* El segundo argumento es un término `respuesta(...)` que contiene una cadena de texto que representa la respuesta que debe ser devuelta cuando se reconoce la frase correspondiente.

```prolog
% respuestas para frases reconocidas
conversar(frase('quiero buscar algo en internet'), respuesta('¿Qué quieres buscar?')).
conversar(frase('buscar algo en internet'), respuesta('¿Qué quieres buscar?')).
conversar(frase('buscar algo internet'), respuesta('¿Qué quieres buscar?')).
conversar(frase('buscar en internet'), respuesta('¿Qué quieres buscar?')).
conversar(frase('quiero buscar algo'), respuesta('¿Qué quieres buscar?')).
conversar(frase('buscar internet'), respuesta('¿Qué quieres buscar?')).
conversar(frase('buscar algo'), respuesta('¿Qué quieres buscar?')).
conversar(frase('internet'), respuesta('¿Qué quieres buscar?')).
conversar(frase('buscar'), respuesta('¿Qué quieres buscar?')).
conversar(frase('navegador'), respuesta('¿Qué quieres buscar?')).
conversar(frase('quiero redactar texto'), respuesta('bloc de notas')).
conversar(frase('redactar texto'), respuesta('bloc de notas')).
conversar(frase('redactar'), respuesta('bloc de notas')).
conversar(frase('quiero escribir texto'), respuesta('bloc de notas')).
conversar(frase('escribir texto'), respuesta('bloc de notas')).
conversar(frase('escribir'), respuesta('bloc de notas')).
conversar(frase('texto'), respuesta('bloc de notas')).
conversar(frase('redactar nuevo documento'), respuesta('word')).
conversar(frase('redactar documento'), respuesta('word')).
conversar(frase('escribir nuevo documento'), respuesta('word')).
conversar(frase('escribir documento'), respuesta('word')).
conversar(frase('nuevo documento'), respuesta('word')).
conversar(frase('documento'), respuesta('word')).
conversar(frase('abrir aplicacion'), respuesta('¿Qué aplicación?')).
conversar(frase('aplicacion'), respuesta('¿Qué aplicación?')).
conversar(frase('abrir app'), respuesta('¿Qué aplicación?')).
conversar(frase('app'), respuesta('¿Qué aplicación?')).
conversar(frase('monitorear directorio'), respuesta('¿Cuál es el directorio?')).
conversar(frase('organizar directorio'), respuesta('¿Cuál es el directorio?')).
conversar(frase('organización directorio'), respuesta('¿Cuál es el directorio?')).
conversar(frase('organizacion directorio'), respuesta('¿Cuál es el directorio?')).
conversar(frase('organizacion json'), respuesta('¿Cuál es el directorio?')).
conversar(frase('organizar json'), respuesta('¿Cuál es el directorio?')).
conversar(frase('monitorear json'), respuesta('¿Cuál es el directorio?')).
conversar(frase('monitoreo json'), respuesta('¿Cuál es el directorio?')).
conversar(frase('json'), respuesta('¿Cuál es el directorio?')).
conversar(frase('reportar jsons'), respuesta('¿Cuál es el directorio?')). % Solicita el directorio
```
* El propósito de estos hechos es que si el usuario introduce una frase que coincide con alguna de las expresadas en estos hechos, el programa devuelve la respuesta asociada. Por ejemplo, si el usuario dice "quiero buscar algo en internet", la respuesta será "¿Qué quieres buscar?".

#### 2. Regla `preguntaAbierta/2`
Esta es una regla que permite simplemente devolver la misma entrada del usuario como respuesta.

* La regla `preguntaAbierta/2` toma un texto como entrada y lo asigna directamente a la respuesta. Esto podría utilizarse para repetir lo que el usuario dice, o en casos donde se quiera hacer una pregunta abierta (como `"¿Qué quieres buscar?"`).

```prolog
% busqueda
preguntaAbierta(Texto, Respuesta) :- Respuesta = Texto.
```

#### 3. Manejo de frases no reconocidas
Este hecho es una especie de respuesta por defecto para frases que no están explícitamente definidas en el sistema.

* El guion bajo `(_)` representa un comodín que puede coincidir con cualquier frase no reconocida. Si la frase no coincide con ninguno de los hechos anteriores, el sistema devolverá una respuesta genérica: "Lo siento, no entiendo lo que quieres decir. ¿Puedes intentar otra cosa?".

```prolog
% Manejo de frases no reconocidas
conversar(frase(_), respuesta('Lo siento, no entiendo lo que quieres decir. ¿Puedes intentar otra cosa?')).
```

## Automatización De Tareas
### robotjs
Es una librería para Node.js que permite la automatización del sistema mediante la simulación de acciones de teclado y ratón, así como la captura de pantallas. Se utiliza principalmente para crear scripts que interactúan con el sistema operativo simulando la interacción del usuario con las interfaces gráficas, sin necesidad de intervención humana.

#### Características
* **Simulación de ratón**: Es posible mover el ratón a una posición específica en la pantalla, hacer clic, hacer doble clic, y realizar otros movimientos y acciones de ratón.
* **Simulación de teclad**o: Permite simular pulsaciones de teclas individuales o combinaciones de teclas, como escribir texto, realizar atajos de teclado (Ctrl+C, Ctrl+V, etc.), y más.
* **Captura de pantalla**: RobotJS permite capturar imágenes de áreas específicas de la pantalla y trabajar con los datos de color de los píxeles.
* **Velocidad**: Está diseñado para ser rápido, utilizando código nativo escrito en C++, lo que lo hace eficiente en cuanto a rendimiento.

### Implementación
#### 1. Librerías Utilizadas
* **robot**: Importa la librería @hurdlegroup/robotjs para simular entradas de teclado y ratón en el sistema operativo.
* **dotenv**: Carga variables de entorno desde un archivo .env a process.env para facilitar la configuración de parámetros como retrasos o nombres de aplicaciones.

```js
const robot = require('@hurdlegroup/robotjs');
const dotenv = require('dotenv');
```

#### 2. Configuración de Variables de Entorno
Esto carga las variables del archivo .env, como BROWSER, TYPE_DELAY, y ENTER_DELAY, para usarlas en el script.
```js
dotenv.config();
```

#### 3. Función `chatbot`
Esta función recibe como entrada una cadena de texto `(input)` y ejecuta una acción en función del contenido:
* Si la entrada contiene la palabra `"buscar"`, extrae la consulta `(query)` que sigue a `"buscar"` y llama a la función `searchGoogle(query)` para buscar en `Google`.
* Si la entrada contiene la palabra `"abrir"`, extrae el nombre de la aplicación `(app)` y llama a la función `openApplication(app)` para abrirla.

```js
const chatBot = (input) => {
    if(input.includes("buscar")) {
        const query = input.split("buscar ")[1];
        searchGoogle(query);
    } else if (input.includes("abrir")) {
        const app = input.split("abrir ")[1];
        openApplication(app);
    }
};
```

#### 4. Función `searchGoogle`
Simula una búsqueda en Google con los siguientes pasos:
* Simula la tecla command (en macOS, equivalente a abrir el `"Spotlight"` o la barra de búsqueda del sistema).
* Escribe el nombre del navegador definido en la variable de entorno `BROWSER` (por ejemplo, chrome, firefox o edge) después de un retraso de `TYPE_DELAY` (para simular la escritura humana).
* Después de otro retraso de `ENTER_DELAY`, simula la tecla `enter` para abrir el navegador.
* Una vez que el navegador esté abierto, escribe la consulta query y presiona `enter` para realizar la búsqueda en Google.

```js
const searchGoogle = (query) => {
    robot.keyTap('command');
    setTimeout(() => {
        robot.typeString(process.env.BROWSER);
    }, process.env.TYPE_DELAY);
    setTimeout(() => {
        robot.keyTap('enter');
        setTimeout(() => {
            robot.typeString(`${query}`);
            robot.keyTap('enter');
        }, process.env.ENTER_DELAY);
    }, process.env.ENTER_DELAY);
};
```

#### 5. Función `openApplication`
Abre una aplicación utilizando los siguientes pasos:
Simula la tecla `command` (para abrir Spotlight o la barra de búsqueda del sistema).
Después de un retraso de `TYPE_DELAY`, escribe el nombre de la aplicación `(appName)`.
Finalmente, después de un retraso de `ENTER_DELAY`, simula la tecla `enter` para abrir la aplicación.

```js
const openApplication = (appName) => {
    robot.keyTap('command');
    setTimeout(() => {
        robot.typeString(appName);
    }, process.env.TYPE_DELAY);
    setTimeout(() => {
        robot.keyTap('enter');
    }, process.env.ENTER_DELAY);
};
```

## Integración Tau-Prolog Y RobotJS
### 1. Importación de Librerías y Módulos
* `robotjs.js`: Importa funciones que simulan entradas de teclado para ejecutar búsquedas en Google, abrir aplicaciones, o realizar acciones automáticas con RobotJS.
* `tau-prolog`: Carga el motor Prolog para procesar lógica Prolog y consultas.
* `fs`: Permite interactuar con el sistema de archivos.
* `json.js`: Importa una función reportarJSONs que procesa archivos JSON y los envía por correo.
* `dotenv`: Carga las variables de entorno desde un archivo .env.

```js
const { chatBot, searchGoogle, openApplication } = require('./robotjs.js');
const pl = require("tau-prolog");
const fs = require('fs');
const { reportarJSONs } = require('./json.js');
require('dotenv').config();
```

### 2. Creación de la Sesión Tau-Prolog
Crea una sesión de Tau Prolog donde se cargarán reglas y hechos para procesar el diálogo.

```js
const session = pl.create();
```

### 3. Función `conversar`
Procesa una frase de entrada (input) y evalúa una consulta Prolog. Si el chatbot puede interpretar la frase, devuelve una respuesta adecuada.
* Consulta Prolog: `conversar(frase(...), respuesta(Respuesta))` busca generar una respuesta en base a la entrada del usuario.
* Si la respuesta implica abrir una aplicación, utiliza `openApplication(response)` para automatizar esa acción.

```js
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
```

### 4. Función `busqueda`
Esta función se ejecuta cuando el usuario quiere realizar una búsqueda. Realiza una consulta Prolog similar a la anterior para obtener la respuesta.
* Usa `searchGoogle(response)` para buscar automáticamente en Google la información relacionada con la entrada del usuario.

```js
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
```

### 5. Función `abrirAplicacion`
Abre una aplicación basándose en el input del usuario. Si la respuesta incluye la palabra `"abrir"`, utiliza `chatBot(response)` para determinar la acción correspondiente.

```js
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
```

### 6. Función `organizar`
Organiza archivos en un directorio especificado por el usuario y llama a `reportarJSONs` para procesar y enviar esos archivos por correo.

```js
const organizar = (input) => {
    const destinatario = '3058184570301@ingenieria.usac.edu.gt'; 
    const directorio = input;

    fs.stat(directorio, (error, stats) => {
        if (error) {
            console.log(error);
            if (error.code === 'ENOENT') {
                console.log('El directorio no existe.');
            } else {
                console.error('Error al verificar el directorio:', error);
            }
        } else if (stats.isDirectory()) {
            reportarJSONs(directorio, destinatario);
        } else {
            console.log('La ruta especificada no es un directorio.');
        }
    });
};
```

### 7. Función `obtenerEntrada`
Esta función determina qué acción realizar basándose en la pregunta del chatbot (por ejemplo, búsqueda, abrir una aplicación o trabajar con directorios).
* Llama a `busqueda`, `abrirAplicacion`, `organizar` o `conversar` según la necesidad.

```js
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
```

### 8. Función `initTauProlog`
Carga el archivo Prolog `(chatbot.pl)` que contiene la lógica del chatbot y ejecuta la consulta basándose en la entrada del usuario.

```js
const initTauProlog = async (body) => {
    return new Promise((resolve, reject) => {
        const { question, request } = body
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
};
```

### 9. Función `chat`
Controlador `HTTP` que recibe una solicitud del usuario, inicia la interacción con Prolog y devuelve una respuesta JSON con el resultado.
* El servidor responderá con una pregunta o acción dependiendo del procesamiento Prolog.

```js
const chat = async (req, res) => {
    try {
        const resp = await initTauProlog(req.body)
        res.status(200).json({ status: 200, message: 'success', next: resp.question, resp: resp.request })
    } catch (error) {
        res.status(500).json({ status: 500, message: 'error', error: error.toString() })
    }
};
```