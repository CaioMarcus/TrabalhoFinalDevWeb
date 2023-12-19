package com.musicas.musicasapi.Application.Entity.Pagamento;

import com.musicas.musicasapi.Application.Entity.Produto;
import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@DiscriminatorValue("plano")
public class Plano extends Produto {
    private String descricao;
}
