% Regla para dicidir si buscar en google
buscar(Query) :-
    string_length(Query, Length),
    Length > 1.