package com.musicas.musicasapi.Application.Entity.Musica;

import com.musicas.musicasapi.Application.Entity.Produto;
import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

@Data
@Entity
@DiscriminatorValue("musica")
public class Musica extends Produto {
    private Float duracao;
    @ManyToOne
    private Album album;

    @ManyToMany(mappedBy = "musicas", cascade = CascadeType.ALL)
    private List<Artista> artistas;
}

