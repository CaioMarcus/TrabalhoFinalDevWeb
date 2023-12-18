package com.musicas.musicasapi.Application.Entity.Pagamento;

import com.musicas.musicasapi.Application.Entity.ProdutoBase;
import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "Planos")
public class Plano extends ProdutoBase {
    private String titulo;
    private String descricao;
}
