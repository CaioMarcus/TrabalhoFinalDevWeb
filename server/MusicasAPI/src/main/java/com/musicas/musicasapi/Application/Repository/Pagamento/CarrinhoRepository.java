package com.musicas.musicasapi.Application.Repository.Pagamento;

import com.musicas.musicasapi.Application.Entity.Pagamento.Carrinho;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CarrinhoRepository extends JpaRepository<Carrinho, Long> {

    public Carrinho getByUser_Id(Long userId);
}
