package com.musicas.musicasapi.Application.Repository.Musica;

import com.musicas.musicasapi.Application.Entity.Musica.Musica;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.data.domain.Page;
import java.util.List;

@Repository
public interface MusicasRepository extends JpaRepository<Musica, Long> {

    @Query("SELECT m FROM Musica m " +
            "WHERE (:musicName IS NULL OR m.nome LIKE %:musicName%) " +
            "AND (:albumName IS NULL OR m.album LIKE %:albumName%) " +
            "AND (:artistName IS NULL OR m.artista LIKE %:artistName%)")
    List<Musica> findMusicaByCriteria(String musicName, String albumName, String artistName);

    @Query(
            value = "select m from Musica m where m.nome like %:nome% order by m.nome asc",
            countQuery = "select count(m) from Musica m where m.nome like %:nome%"
    )
    Page<Musica> findMusicaByNameComPaginacao(String nome, Pageable pageable);

    @Query(
            value = "select m from Musica m order by m.nome asc",
            countQuery = "select count(m) from Musica m"
    )
    Page<Musica> findMusicaComPaginacao(Pageable pageable);

}
