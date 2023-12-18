package com.musicas.musicasapi.Authentication.Models;

import lombok.Data;

@Data
public class LoginRequest {
    private String username;
    private String password;
}
