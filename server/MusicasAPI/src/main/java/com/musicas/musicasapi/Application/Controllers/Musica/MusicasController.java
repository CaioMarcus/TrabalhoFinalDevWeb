package com.musicas.musicasapi.Application.Controllers.Musica;

import com.musicas.musicasapi.Application.Controllers.RequestsWrapper.InformacaoPaginacaoMusica;
import com.musicas.musicasapi.Application.Controllers.RequestsWrapper.ResultadoPaginado;
import com.musicas.musicasapi.Application.Exceptions.MusicaNaoEncontradaException;
import com.musicas.musicasapi.Application.Entity.Musica.Musica;
import com.musicas.musicasapi.Application.Services.Musica.MusicasService;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
@RequestMapping("/api/musicas")
@CrossOrigin
public class MusicasController {
    private final MusicasService musicasService;

    public MusicasController(MusicasService musicasService) {
        this.musicasService = musicasService;
    }

    @PostMapping("adicionaMusica")
    public ResponseEntity<Musica> addMusica(@RequestBody Musica musica){
        Musica musicaCriada = musicasService.createMusica(musica);
        if (musicaCriada == null) return ResponseEntity.badRequest().body(null);
        return ResponseEntity.ok().body(musicaCriada);
    }

    @GetMapping("filtro")
    public ResponseEntity<List<Musica>> getMusicas(@RequestBody String nomeMusica, @RequestBody String nomeArtista, @RequestBody String nomeAlbum){
        List<Musica> musica = musicasService.readMusicasMultiFilter(nomeMusica, nomeAlbum, nomeArtista);
        if (musica == null || musica.isEmpty()) return ResponseEntity.badRequest().body(null);
        return ResponseEntity.ok().body(musica);
    }

    @GetMapping("musica")
    public ResponseEntity<Musica> getMusica(
            @RequestParam(name = "musicaId") Long musicaId
    ){
        Musica musica = musicasService.readMusicaById(musicaId);
        if (musica == null) return ResponseEntity.badRequest().body(null);
        return ResponseEntity.ok().body(musica);
    }

    @GetMapping
    public ResponseEntity<List<Musica>> getMusicas(){
        List<Musica> musicas = musicasService.getAll();
        if (musicas == null || musicas.isEmpty()) return ResponseEntity.badRequest().body(null);
        return ResponseEntity.ok().body(musicas);
    }

    @GetMapping("getPorNomeComPaginacao")
    public ResponseEntity<ResultadoPaginado<Musica>> getMusicasComNomeComPaginacao(
            @RequestParam("nome") String nome,
            @RequestParam("pagina") int pagina,
            @RequestParam("tamanho") int tamanho
    ){
        ResultadoPaginado<Musica> musicas = musicasService.getMusicasByNamePaginadas(nome, pagina, tamanho);
        if (musicas == null) return ResponseEntity.badRequest().body(null);
        return ResponseEntity.ok(musicas);
    }

    @GetMapping("getComPaginacao")
    public ResponseEntity<ResultadoPaginado<Musica>> getMusicasComPaginacao(
            @RequestParam("pagina") int pagina,
            @RequestParam("tamanho") int tamanho
    ){
        ResultadoPaginado<Musica> musicas = musicasService.getMusicasPaginadas(pagina, tamanho);
        if (musicas == null) return ResponseEntity.badRequest().body(null);
        return ResponseEntity.ok(musicas);
    }

    @PutMapping("atualizaMusica")
    public ResponseEntity<Musica> updateMusica(@RequestBody Musica musicaNova){

        Musica musicaCriada = null;
        try {
            musicaCriada = musicasService.updateMusica(musicaNova);
        } catch (MusicaNaoEncontradaException e) {
            return ResponseEntity.badRequest().body(null);
        }
        if (musicaCriada == null) return ResponseEntity.badRequest().body(null);
        return ResponseEntity.ok().body(musicaCriada);
    }

    @DeleteMapping("deletaMusica")
    public ResponseEntity<String> deleteMusica(@RequestParam long musicaId){
        try {
            musicasService.deleteMusica(musicaId);
        } catch (MusicaNaoEncontradaException e) {
            return ResponseEntity.badRequest().body(null);
        }
        return ResponseEntity.ok().body("Deleted");
    }

}
