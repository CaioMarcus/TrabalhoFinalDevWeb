package com.musicas.musicasapi.Application.Services.Pagamento.Planos;

import com.musicas.musicasapi.Application.Entity.Pagamento.Plano;
import com.musicas.musicasapi.Application.Repository.Pagamento.PlanosRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PlanosService {

    private final PlanosRepository planosRepository;

    public PlanosService(PlanosRepository planosRepository) {
        this.planosRepository = planosRepository;
    }

    public Plano createPlano(Plano plano) {
        if (plano == null || plano.getDescricao() == null || plano.getPreco() < 0.0) return null;
        return planosRepository.save(plano);
    }

    public List<Plano> getAllPlanos() {
        return planosRepository.getAllPlanos();
    }

    public Optional<Plano> getPlanoById(Long id) {
        return planosRepository.findById(id);
    }

    public Plano updatePlano(Long id, Plano updatedPlano) {
        if (id == null || updatedPlano == null || updatedPlano.getDescricao() == null || updatedPlano.getPreco() <= 0.0)
            return null;

        Optional<Plano> existingPlanoOptional = planosRepository.findById(id);

        if (existingPlanoOptional.isPresent()) {
            Plano existingPlano = existingPlanoOptional.get();
            existingPlano.setDescricao(updatedPlano.getDescricao());
            existingPlano.setPreco(updatedPlano.getPreco());
            // You can update other fields as needed
            return planosRepository.save(existingPlano);
        } else {
            return null; // Return null if the plan is not found
        }
    }

    public boolean deletePlano(Long id) {
        if (id != null && planosRepository.existsById(id)) {
            planosRepository.deleteById(id);
            return true;
        } else {
            return false; // Return false if the plan is not found or id is null
        }
    }
}