package com.musicas.musicasapi.Application.Services.Musica;

import com.musicas.musicasapi.Application.Exceptions.MusicaNaoEncontradaException;
import com.musicas.musicasapi.Application.Repository.Musica.MusicasRepository;
import com.musicas.musicasapi.Application.Entity.Musica.Musica;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MusicasService {


    private final MusicasRepository musicasRepository;

    public MusicasService(MusicasRepository musicasRepository) {
        this.musicasRepository = musicasRepository;
    }

    public Musica createMusica(Musica musica){
        if (musica == null) return null;
        if (musica.getAlbum() == null) return null;
        if (musica.getArtistas() == null || musica.getArtistas().size() == 0) return null;

        return musicasRepository.save(musica);
    }

    public Musica readMusicaById(long idMusica) throws MusicaNaoEncontradaException {
        return musicasRepository.findById(idMusica).orElseThrow(() -> new MusicaNaoEncontradaException(idMusica));
    }

    public List<Musica> readMusicasMultiFilter(String nomeMusica, String nomeAlbum, String nomeArtista){
        return musicasRepository.findMusicaByCriteria(nomeMusica, nomeAlbum, nomeArtista);
    }

    public Musica updateMusica(Musica musicaAtualizada) throws MusicaNaoEncontradaException {
        Musica musicaParaAtualizar = musicasRepository.findById(musicaAtualizada.getId()).orElse(null);
        if (musicaParaAtualizar == null) throw new MusicaNaoEncontradaException(musicaAtualizada.getId());
        return musicasRepository.save(musicaAtualizada);
    }

    public void deleteMusica(long idMusica) throws MusicaNaoEncontradaException {
        readMusicaById(idMusica);
        musicasRepository.deleteById(idMusica);
    }

}
