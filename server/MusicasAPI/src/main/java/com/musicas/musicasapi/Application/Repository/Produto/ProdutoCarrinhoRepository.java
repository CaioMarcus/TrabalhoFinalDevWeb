package com.musicas.musicasapi.Application.Repository.Produto;

import com.musicas.musicasapi.Application.Entity.Pagamento.ProdutoCarrinho;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ProdutoCarrinhoRepository extends JpaRepository<com.musicas.musicasapi.Application.Entity.Pagamento.ProdutoCarrinho, Long> {

    @Query(value = "select pc from ProdutoCarrinho pc where pc.produto.id = :produtoId ")
    List<ProdutoCarrinho> getProdutoCarrinhosByProdutoId(Long produtoId);
}
