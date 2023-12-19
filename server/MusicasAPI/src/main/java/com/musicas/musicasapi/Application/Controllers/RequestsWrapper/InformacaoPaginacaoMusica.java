package com.musicas.musicasapi.Application.Controllers.RequestsWrapper;

import lombok.Data;

@Data
public class InformacaoPaginacaoMusica {
    private int pagina;
    private int tamanho;
    private String nome;
}
