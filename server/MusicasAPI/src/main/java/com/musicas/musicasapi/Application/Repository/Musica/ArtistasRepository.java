package com.musicas.musicasapi.Application.Repository.Musica;

import com.musicas.musicasapi.Application.Entity.Musica.Artista;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ArtistasRepository extends JpaRepository<Artista, Long> {

}
