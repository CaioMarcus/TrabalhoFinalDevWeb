package com.musicas.musicasapi.Application.Exceptions;

public class MusicaNaoEncontradaException extends Exception {
    public MusicaNaoEncontradaException(long id) {
        super("A musica não foi encontrada no banco de dados. ID = " + id);
    }
}
