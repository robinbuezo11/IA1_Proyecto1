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

% busqueda
preguntaAbierta(Texto, Respuesta) :- Respuesta = Texto.

% Manejo de frases no reconocidas
conversar(frase(_), respuesta('Lo siento, no entiendo lo que quieres decir. ¿Puedes intentar otra cosa?')).
