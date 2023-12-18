package com.musicas.musicasapi.Application.Repository;

import com.musicas.musicasapi.Application.Entity.Produto;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProdutoRepository extends JpaRepository<Produto, Long> {
    public Produto findProdutoById(Long produtoId);
}
