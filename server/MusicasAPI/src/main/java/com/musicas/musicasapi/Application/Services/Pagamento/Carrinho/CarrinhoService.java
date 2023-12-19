package com.musicas.musicasapi.Application.Services.Pagamento.Carrinho;

import com.musicas.musicasapi.Application.Entity.Pagamento.Carrinho;
import com.musicas.musicasapi.Application.Entity.Pagamento.ProdutoCarrinho;
import com.musicas.musicasapi.Application.Entity.Produto;
import com.musicas.musicasapi.Application.Repository.Pagamento.CarrinhoRepository;
import com.musicas.musicasapi.Application.Repository.ProdutoRepository;
import com.musicas.musicasapi.Authentication.Repositories.UserRepository;
import org.springframework.stereotype.Service;

import java.util.Objects;

@Service
public class CarrinhoService {

    private final CarrinhoRepository carrinhoRepository;
    private final UserRepository userRepository;
    private final ProdutoRepository produtoRepository;

    public CarrinhoService(CarrinhoRepository carrinhoRepository, UserRepository userRepository, ProdutoRepository produtoRepository) {
        this.carrinhoRepository = carrinhoRepository;
        this.userRepository = userRepository;
        this.produtoRepository = produtoRepository;
    }

    public Carrinho adicionaProduto(Long userId, Long idProduto){
        try {
            Carrinho carrinho = getCarrinho(userId);
            if (carrinho == null) return null;
            Produto produto = produtoRepository.findProdutoById(idProduto);
            if (produto == null) return null;

            //Verificar se o carrinho já possui o produto
            ProdutoCarrinho produtoCarrinho = carrinho.getProdutos().stream().filter(p -> Objects.equals(p.getProduto().getId(), produto.getId())).findFirst().orElse(null);
            //Se existe, somente atualizar o valor

            if (produtoCarrinho == null) {
                // Criando Produto Carrinho
                produtoCarrinho = new ProdutoCarrinho();
                produtoCarrinho.setId(0L);
                produtoCarrinho.setProduto(produto);
            }
            carrinho.adicionaNoCarrinho(produtoCarrinho);
            carrinhoRepository.save(carrinho);
            return carrinho;
        } catch (Exception e) {
            return null;
        }
    }

    public Carrinho subtraiProduto(Long userId, Long idProduto){
        try {
            Carrinho carrinho = getCarrinho(userId);
            if (carrinho == null) return null;
            Produto produto = produtoRepository.findProdutoById(idProduto);
            if (produto == null) return null;

            //Verificar se o carrinho já possui o produto
            ProdutoCarrinho produtoCarrinhoExistente = carrinho.getProdutos().stream().filter(p -> Objects.equals(p.getProduto().getId(), produto.getId())).findFirst().orElse(null);
            if (produtoCarrinhoExistente == null) return null;

            carrinho.subtraiDoCarrinho(produtoCarrinhoExistente);
            carrinhoRepository.save(carrinho);
            return carrinho;
        } catch (Exception e){
            return null;
        }
    }

    public Carrinho removeProduto(Long userId, Long idProduto){
        try {
            Carrinho carrinho = getCarrinho(userId);
            if (carrinho == null) return null;
            Produto produto = produtoRepository.findProdutoById(idProduto);
            if (produto == null) return null;

            //Verificar se o carrinho já possui o produto
            ProdutoCarrinho produtoCarrinhoExistente = carrinho.getProdutos().stream().filter(p -> Objects.equals(p.getProduto().getId(), produto.getId())).findFirst().orElse(null);
            if (produtoCarrinhoExistente == null) return null;

            produtoCarrinhoExistente.setQuantidade(1);

            carrinho.removeDoCarrinho(produtoCarrinhoExistente);
            carrinhoRepository.save(carrinho);
            return carrinho;
        } catch (Exception e){
            return null;
        }
    }

    public Carrinho getCarrinho(Long userId){
        return carrinhoRepository.getByUser_Id(userId);
    }
}
