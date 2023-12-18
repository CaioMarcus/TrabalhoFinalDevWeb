package com.musicas.musicasapi.Application.Entity.Musica;

import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

@Data
@Entity
@Table
public class Artista {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    private String nome;

    @ManyToMany
    private List<Musica> musicas;

    @OneToMany
    private List<Album> albuns;
}
