package com.musicas.musicasapi.Application.Entity.Pagamento;

import com.musicas.musicasapi.Application.Entity.Produto;
import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import java.util.List;


@Entity
@Table
@Getter
public class ProdutoCarrinho {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Setter
    private Long id;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "produto_id")
    private Produto produto;

    private int quantidade;

    private Double valor;

    public void setProduto(Produto produto){
        this.produto = produto;
        this.quantidade = 1;
        this.valor = produto.getPreco();
    }

    public void setQuantidade(int quantidade){
        if (this.quantidade < 0) return;
        this.quantidade = quantidade;
        this.valor = this.quantidade * this.produto.getPreco();
    }

}
