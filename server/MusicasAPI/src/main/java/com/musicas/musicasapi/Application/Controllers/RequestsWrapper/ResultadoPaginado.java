package com.musicas.musicasapi.Application.Controllers.RequestsWrapper;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.ToString;

import java.util.List;

@AllArgsConstructor
@Getter
@ToString
public class ResultadoPaginado<T> {
    private long quantiadeItens;
    private int quantidadePaginas;
    private int paginaAtual;
    private List<T> itens;
}
