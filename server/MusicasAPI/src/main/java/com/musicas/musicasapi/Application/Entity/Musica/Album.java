package com.musicas.musicasapi.Application.Entity.Musica;

import jakarta.persistence.*;
import lombok.Data;


import java.util.List;

@Data
@Entity
@Table(name = "Albuns")
public class Album {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;

    private String nome;

    @ManyToOne
    private Artista artista;

    @OneToMany()
    private List<Musica> musicas;
}
