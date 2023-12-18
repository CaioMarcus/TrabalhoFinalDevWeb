package com.musicas.musicasapi.Application.Entity.Musica;

import com.musicas.musicasapi.Application.Entity.Pagamento.ItemCarrinho;
import com.musicas.musicasapi.Application.Entity.ProdutoBase;
import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

@Data
@Entity
@Table(name = "Musicas")
public class Musica extends ProdutoBase {
    private Float duracao;
    @ManyToOne
    private Album album;
    @ManyToMany
    private List<Artista> artistas;
}

