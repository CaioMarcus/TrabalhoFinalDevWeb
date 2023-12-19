package com.musicas.musicasapi.Application.Entity.Pagamento;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.musicas.musicasapi.Application.Entity.Produto;
import com.musicas.musicasapi.Authentication.Models.Entities.User;
import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.ColumnDefault;
import org.springframework.lang.NonNull;

import java.util.*;

@Data
@Entity
@Table
public class Carrinho {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne(mappedBy = "carrinho")
    @JsonIgnore
    private User user;

    @OneToMany(cascade = CascadeType.ALL)
    private List<ProdutoCarrinho> produtos = new ArrayList<>();

    @NonNull
    @ColumnDefault("0.0")
    private Double total = 0.0;


    public void adicionaNoCarrinho(ProdutoCarrinho produtoCarrinho){
        if (this.produtos.contains(produtoCarrinho))
            produtoCarrinho.setQuantidade(produtoCarrinho.getQuantidade() + 1);
        else
            this.produtos.add(produtoCarrinho);
        this.atualizaValor();
    }

    public void subtraiDoCarrinho(ProdutoCarrinho produtoCarrinho){
        if(!this.produtos.contains(produtoCarrinho)) return;
        produtoCarrinho.setQuantidade(produtoCarrinho.getQuantidade() - 1);
        if (produtoCarrinho.getQuantidade() <= 0) removeDoCarrinho(produtoCarrinho);
        else this.atualizaValor();
    }

    public void removeDoCarrinho(ProdutoCarrinho produtoCarrinho){
        if(!this.produtos.contains(produtoCarrinho)) return;
        this.produtos.remove(produtoCarrinho);
        this.atualizaValor();
    }

    private void atualizaValor(){
        this.total = 0.0;
        for (ProdutoCarrinho produtoCarrinho : produtos){
            this.total += produtoCarrinho.getValor();
        }
    }
}
