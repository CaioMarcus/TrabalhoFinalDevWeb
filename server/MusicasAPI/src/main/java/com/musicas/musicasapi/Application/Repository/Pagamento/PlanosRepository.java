package com.musicas.musicasapi.Application.Repository.Pagamento;

import com.musicas.musicasapi.Application.Entity.Pagamento.Plano;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface PlanosRepository extends JpaRepository<Plano, Long> {

    @Query(value = "select p from Plano p")
    public List<Plano> getAllPlanos();
}
