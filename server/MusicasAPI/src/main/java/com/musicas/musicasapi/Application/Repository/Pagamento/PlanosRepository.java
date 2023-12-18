package com.musicas.musicasapi.Application.Repository.Pagamento;

import com.musicas.musicasapi.Application.Entity.Pagamento.Plano;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PlanosRepository extends JpaRepository<Plano, Long> {

}
