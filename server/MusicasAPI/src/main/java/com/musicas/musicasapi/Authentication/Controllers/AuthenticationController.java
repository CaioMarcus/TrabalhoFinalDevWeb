package com.musicas.musicasapi.Authentication.Controllers;

import com.musicas.musicasapi.Authentication.Models.Entities.User;
import com.musicas.musicasapi.Authentication.Models.Entities.UserRole;
import com.musicas.musicasapi.Authentication.Models.LoginRequest;
import com.musicas.musicasapi.Authentication.Models.LoginResponse;
import com.musicas.musicasapi.Authentication.Models.RegisterRequest;
import com.musicas.musicasapi.Authentication.Repositories.UserRepository;
import com.musicas.musicasapi.Authentication.Services.TokenService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("auth")
@CrossOrigin
public class AuthenticationController {

    @Autowired
    private AuthenticationManager authenticationManager;
    @Autowired
    private TokenService tokenService;
    @Autowired
    private UserRepository repository;

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(@RequestBody LoginRequest loginRequest){
        //Authenticating User
        Authentication usernamePassword = new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword());
        Authentication authentication = authenticationManager.authenticate(usernamePassword);
        String token = tokenService.generateToken((User) authentication.getPrincipal());

        return ResponseEntity.ok(new LoginResponse(token));
    }

    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody RegisterRequest registerRequest){
        if (this.repository.findByUsername(registerRequest.getUsername()) != null) return ResponseEntity.badRequest().body("UserName Already Registered");
        String encryptedPassword = new BCryptPasswordEncoder().encode(registerRequest.getPassword());

        User newUser = new User();
        newUser.setUsername(registerRequest.getUsername());
        newUser.setPassword(encryptedPassword);
        newUser.setRole(UserRole.valueOf(registerRequest.getRole()));

        this.repository.save(newUser);

        return ResponseEntity.ok().body("");
    }
}
