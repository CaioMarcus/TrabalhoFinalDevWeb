package com.musicas.musicasapi.Application.Entity.Pagamento;

import com.musicas.musicasapi.Application.Entity.ProdutoBase;
import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

@Data
@Entity
@Table(name = "ItensCarrinho")
public class ItemCarrinho {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @ManyToOne
    private Carrinho carrinho;
    @OneToMany
    private List<ProdutoBase> produtos;
    private Double preco;
    private int quantidade;
}
