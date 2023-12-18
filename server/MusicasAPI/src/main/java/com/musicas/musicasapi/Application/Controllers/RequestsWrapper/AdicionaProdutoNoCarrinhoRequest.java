package com.musicas.musicasapi.Application.Controllers.RequestsWrapper;

import com.musicas.musicasapi.Application.Entity.Produto;
import lombok.Data;

@Data
public class AdicionaProdutoNoCarrinhoRequest {
    private Long produtoId;
    private int quantidade;
}
