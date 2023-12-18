package com.musicas.musicasapi.Application.Controllers.Pagamento;

import com.musicas.musicasapi.Application.Controllers.RequestsWrapper.AdicionaProdutoNoCarrinhoRequest;
import com.musicas.musicasapi.Application.Entity.Pagamento.Carrinho;
import com.musicas.musicasapi.Application.Entity.Pagamento.Plano;
import com.musicas.musicasapi.Application.Entity.Pagamento.ProdutoCarrinho;
import com.musicas.musicasapi.Application.Entity.Produto;
import com.musicas.musicasapi.Application.Services.Pagamento.Carrinho.CarrinhoService;
import com.musicas.musicasapi.Authentication.Models.Entities.User;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/carrinho")
@CrossOrigin
public class CarrinhoController {

    private final CarrinhoService carrinhoService;

    public CarrinhoController(CarrinhoService carrinhoService) {
        this.carrinhoService = carrinhoService;
    }

    @PostMapping("/adicionaProduto")
    public ResponseEntity<String> adicionaProdutoNoCarrinho(@RequestBody AdicionaProdutoNoCarrinhoRequest adicionaProdutoNoCarrinhoRequest) {
        try {
            Long UserId = getUserId();
            boolean adicionou = carrinhoService.adicionaProduto(UserId, adicionaProdutoNoCarrinhoRequest.getProdutoId());
            if (adicionou) return new ResponseEntity<>(HttpStatus.OK);
        } catch (Exception e){
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }

    @GetMapping
    public ResponseEntity<Carrinho> getCarrinho() {
        try{
            Long userId = getUserId();
            if (userId == null) return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
            Carrinho carrinho = carrinhoService.getCarrinho(userId);
            if (carrinho == null) return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
            return ResponseEntity.ok(carrinho);
        } catch (Exception e){
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    private Long getUserId(){
        try {
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

            UserDetails userDetails = (UserDetails) authentication.getPrincipal();

            return ((User) userDetails).getId();
        } catch (Exception e){
            return null;
        }
    }
}
