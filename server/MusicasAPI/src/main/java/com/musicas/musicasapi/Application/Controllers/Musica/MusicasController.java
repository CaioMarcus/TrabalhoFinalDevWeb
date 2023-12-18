package com.musicas.musicasapi.Application.Controllers.Musica;

import com.musicas.musicasapi.Application.Exceptions.MusicaNaoEncontradaException;
import com.musicas.musicasapi.Application.Entity.Musica.Musica;
import com.musicas.musicasapi.Application.Services.Musica.MusicasService;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.List;

@Controller
@RequestMapping("/Musicas")
@CrossOrigin
public class MusicasController {
    private final MusicasService musicasService;

    public MusicasController(MusicasService musicasService) {
        this.musicasService = musicasService;
    }

    public ResponseEntity<Musica> addMusica(Musica musica){
        Musica musicaCriada = musicasService.createMusica(musica);
        if (musicaCriada == null) return ResponseEntity.badRequest().body(null);
        return ResponseEntity.ok().body(musicaCriada);
    }

    public ResponseEntity<List<Musica>> getMusicas(String nomeMusica, String nomeArtista, String nomeAlbum){
        List<Musica> musica = musicasService.readMusicasMultiFilter(nomeMusica, nomeAlbum, nomeArtista);
        if (musica == null || musica.isEmpty()) return ResponseEntity.badRequest().body(null);
        return ResponseEntity.ok().body(musica);
    }

    public ResponseEntity<Musica> updateMusica(Musica musicaNova){

        Musica musicaCriada = null;
        try {
            musicaCriada = musicasService.updateMusica(musicaNova);
        } catch (MusicaNaoEncontradaException e) {
            return ResponseEntity.badRequest().body(null);
        }
        if (musicaCriada == null) return ResponseEntity.badRequest().body(null);
        return ResponseEntity.ok().body(musicaCriada);
    }

    public ResponseEntity<String> deleteMusica(long musicaId){
        try {
            musicasService.deleteMusica(musicaId);
        } catch (MusicaNaoEncontradaException e) {
            return ResponseEntity.badRequest().body(null);
        }
        return ResponseEntity.ok().body("Deleted");
    }

}
