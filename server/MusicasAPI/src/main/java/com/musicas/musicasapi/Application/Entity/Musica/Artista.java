package com.musicas.musicasapi.Application.Entity.Musica;

import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

@Data
@Entity
@Table(name = "Artistas")
public class Artista {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;


    private String nome;

    @ManyToMany
    private List<Musica> musicas;

    @OneToMany
    private List<Album> albuns;
}
