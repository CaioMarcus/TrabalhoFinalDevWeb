package com.musicas.musicasapi.Application.Repository.Musica;

import com.musicas.musicasapi.Application.Entity.Musica.Musica;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MusicasRepository extends JpaRepository<Musica, Long> {

    @Query("SELECT m FROM Musica m " +
            "LEFT JOIN FETCH m.album AS a " +
            "LEFT JOIN FETCH m.artistas AS art " +
            "WHERE (:musicName IS NULL OR m.nome LIKE %:musicName%) " +
            "AND (:albumName IS NULL OR a.nome LIKE %:albumName%) " +
            "AND (:artistName IS NULL OR art.nome LIKE %:artistName%)")
    List<Musica> findMusicaByCriteria(String musicName, String albumName, String artistName);

}
