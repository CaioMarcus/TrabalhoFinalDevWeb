package com.musicas.musicasapi.Application.Controllers.Pagamento;

import com.musicas.musicasapi.Application.Entity.Pagamento.Plano;
import com.musicas.musicasapi.Application.Services.Pagamento.Planos.PlanosService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/planos")
@CrossOrigin
public class PlanosController {

    private final PlanosService planosService;

    public PlanosController(PlanosService planosService) {
        this.planosService = planosService;
    }

    @PostMapping
    public ResponseEntity<Plano> createPlano(@RequestBody Plano plano) {
        Plano createdPlano = planosService.createPlano(plano);
        if (createdPlano != null) {
            return new ResponseEntity<>(createdPlano, HttpStatus.CREATED);
        } else {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping
    public ResponseEntity<List<Plano>> getAllPlanos() {
        List<Plano> planos = planosService.getAllPlanos();
        return new ResponseEntity<>(planos, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Plano> getPlanoById(@PathVariable Long id) {
        Optional<Plano> plano = planosService.getPlanoById(id);
        return plano.map(value -> new ResponseEntity<>(value, HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Plano> updatePlano(@PathVariable Long id, @RequestBody Plano updatedPlano) {
        Plano updated = planosService.updatePlano(id, updatedPlano);
        return updated != null ? new ResponseEntity<>(updated, HttpStatus.OK) :
                new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePlano(@PathVariable Long id) {
        boolean deleted = planosService.deletePlano(id);
        return deleted ? new ResponseEntity<>(HttpStatus.NO_CONTENT) :
                new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
}