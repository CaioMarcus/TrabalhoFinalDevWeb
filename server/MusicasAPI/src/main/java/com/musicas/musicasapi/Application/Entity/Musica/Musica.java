package com.musicas.musicasapi.Application.Entity.Musica;

import com.musicas.musicasapi.Application.Entity.Produto;
import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

@Data
@Entity
@DiscriminatorValue("musica")
public class Musica extends Produto {
    private String duracao;
    private String album;
    private String artista;
    @Lob
    private byte[] capa;
}

