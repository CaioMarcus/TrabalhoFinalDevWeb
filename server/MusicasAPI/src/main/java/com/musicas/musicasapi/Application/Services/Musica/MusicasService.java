package com.musicas.musicasapi.Application.Services.Musica;

import com.musicas.musicasapi.Application.Controllers.RequestsWrapper.ResultadoPaginado;
import com.musicas.musicasapi.Application.Entity.Produto;
import com.musicas.musicasapi.Application.Exceptions.MusicaNaoEncontradaException;
import com.musicas.musicasapi.Application.Repository.Musica.MusicasRepository;
import com.musicas.musicasapi.Application.Entity.Musica.Musica;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
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
        if (musica.getArtista() == null) return null;

        return musicasRepository.save(musica);
    }

    public List<Musica> getAll(){
        return musicasRepository.findAll();
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

    public ResultadoPaginado<Musica> getMusicasByNamePaginadas(String nome, int pagina, int tamanho){
        Pageable pageable = PageRequest.of(pagina, tamanho);

        Page<Musica> paginaDeMusicas = musicasRepository.findMusicaByNameComPaginacao(nome, pageable);

        return new ResultadoPaginado<>(
                paginaDeMusicas.getTotalElements(),
                paginaDeMusicas.getTotalPages(),
                paginaDeMusicas.getNumber(),
                paginaDeMusicas.getContent());
    }

    public ResultadoPaginado<Musica> getMusicasPaginadas(int pagina, int tamanho){
        Pageable pageable = PageRequest.of(pagina, tamanho);

        Page<Musica> paginaDeMusicas = musicasRepository.findMusicaComPaginacao(pageable);

        return new ResultadoPaginado<>(
                paginaDeMusicas.getTotalElements(),
                paginaDeMusicas.getTotalPages(),
                paginaDeMusicas.getNumber(),
                paginaDeMusicas.getContent());
    }

}
