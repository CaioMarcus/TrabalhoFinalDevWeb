package com.musicas.musicasapi.Application.Services.Pagamento.Carrinho;

import com.musicas.musicasapi.Application.Entity.Pagamento.Carrinho;
import com.musicas.musicasapi.Application.Entity.Pagamento.ProdutoCarrinho;
import com.musicas.musicasapi.Application.Entity.Produto;
import com.musicas.musicasapi.Application.Repository.Pagamento.CarrinhoRepository;
import com.musicas.musicasapi.Application.Repository.ProdutoRepository;
import com.musicas.musicasapi.Authentication.Repositories.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;
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

    public boolean adicionaProduto(Long userId, Long idProduto){
        try {
            Carrinho carrinho = getCarrinho(userId);
            if (carrinho == null) return false;
            Produto produto = produtoRepository.findProdutoById(idProduto);
            if (produto == null) return false;

            //Verificar se o carrinho já possui o produto
            ProdutoCarrinho produtoCarrinhoExistente = carrinho.getProdutos().stream().filter(p -> Objects.equals(p.getProduto().getId(), produto.getId())).findFirst().orElse(null);

            if (produtoCarrinhoExistente != null){
                produtoCarrinhoExistente.setQuantidade(produtoCarrinhoExistente.getQuantidade() + 1);
                carrinho.atualizaValor();
                carrinhoRepository.save(carrinho);
                return true;
            }

            // Criando Produto Carrinho
            ProdutoCarrinho produtoCarrinho = new ProdutoCarrinho();
            produtoCarrinho.setProduto(produto);

            carrinho.adicionaNoCarrinho(produtoCarrinho);
            carrinho.atualizaValor();
            carrinhoRepository.save(carrinho);
        } catch (Exception e) {
            return false;
        }
        return true;
    }

    public boolean removeProduto(Long userId, Long idProduto){
        try {
            Carrinho carrinho = getCarrinho(userId);
            if (carrinho == null) return false;
            Produto produto = produtoRepository.findProdutoById(idProduto);
            if (produto == null) return false;

            //Verificar se o carrinho já possui o produto
            ProdutoCarrinho produtoCarrinhoExistente = carrinho.getProdutos().stream().filter(p -> Objects.equals(p.getProduto().getId(), produto.getId())).findFirst().orElse(null);
            if (produtoCarrinhoExistente == null) return false;

            produtoCarrinhoExistente.setQuantidade(produtoCarrinhoExistente.getQuantidade() - 1);

            //Remover Produto
            if (produtoCarrinhoExistente.getQuantidade() == 0) {
                carrinho.removeDoCarrinho(produtoCarrinhoExistente);
            }
            carrinho.atualizaValor();
            carrinhoRepository.save(carrinho);
            return true;
        } catch (Exception e){
            return false;
        }
    }

    public Carrinho getCarrinho(Long userId){
        return carrinhoRepository.getByUser_Id(userId);
    }
}
