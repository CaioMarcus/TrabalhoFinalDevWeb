package com.musicas.musicasapi.Application.Entity.Pagamento;

import com.musicas.musicasapi.Authentication.Models.Entities.User;
import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

@Data
@Entity
@Table(name = "Carrinhos")
public class Carrinho {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @OneToOne
    private User userId;

    @OneToMany
    private List<ItemCarrinho> itens;

    private Double Total;
}
