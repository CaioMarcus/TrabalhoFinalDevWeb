package com.musicas.musicasapi.Application.Repository.Musica;

import com.musicas.musicasapi.Application.Entity.Musica.Album;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AlbunsRepository extends JpaRepository<Album, Long> {

}
