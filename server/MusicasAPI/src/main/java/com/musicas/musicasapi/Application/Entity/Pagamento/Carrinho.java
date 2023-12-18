package com.musicas.musicasapi.Application.Entity.Pagamento;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.musicas.musicasapi.Authentication.Models.Entities.User;
import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.ColumnDefault;
import org.springframework.lang.NonNull;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

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
    private Set<ProdutoCarrinho> produtos = new HashSet<>();

    @NonNull
    @ColumnDefault("0.0")
    private Double total = 0.0;


    public void adicionaNoCarrinho(ProdutoCarrinho produtoCarrinho){
        this.produtos.add(produtoCarrinho);
    }

    public void removeDoCarrinho(ProdutoCarrinho produtoCarrinho){
        if(!this.produtos.contains(produtoCarrinho)) return;
        this.produtos.remove(produtoCarrinho);
    }

    public void atualizaValor(){
        this.total = 0.0;
        for (ProdutoCarrinho produtoCarrinho : produtos){
            this.total += produtoCarrinho.getValor();
        }
    }
}
