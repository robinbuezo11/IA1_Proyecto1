% preguntas iniciales
preguntaLV1(frase('quiero buscar algo en internet'), respuesta('¿Qué quieres buscar?')).
preguntaLV1(frase('buscar algo en internet'), respuesta('¿Qué quieres buscar?')).
preguntaLV1(frase('buscar algo internet'), respuesta('¿Qué quieres buscar?')).
preguntaLV1(frase('buscar en internet'), respuesta('¿Qué quieres buscar?')).
preguntaLV1(frase('quiero buscar algo'), respuesta('¿Qué quieres buscar?')).
preguntaLV1(frase('buscar internet'), respuesta('¿Qué quieres buscar?')).
preguntaLV1(frase('buscar algo'), respuesta('¿Qué quieres buscar?')).
preguntaLV1(frase('internet'), respuesta('¿Qué quieres buscar?')).
preguntaLV1(frase('buscar'), respuesta('¿Qué quieres buscar?')).
preguntaLV1(frase('quiero redactar texto'), respuesta('Bien, ¡abriré el bloc de notas!')).
preguntaLV1(frase('redactar texto'), respuesta('Bien, ¡abriré el bloc de notas!')).
preguntaLV1(frase('redactar'), respuesta('Bien, ¡abriré el bloc de notas!')).
preguntaLV1(frase('texto'), respuesta('Bien, ¡abriré el bloc de notas!')).
preguntaLV1(frase('redactar nuevo documento'), respuesta('Bien, ¡abriré word!')).
preguntaLV1(frase('redactar documento'), respuesta('Bien, ¡abriré word!')).
preguntaLV1(frase('nuevo documento'), respuesta('Bien, ¡abriré word!')).
preguntaLV1(frase('documento'), respuesta('Bien, ¡abriré word!')).

% busqueda
busqueda(Texto, Respuesta) :- atom_concat('Buscando: ', Texto, Respuesta).