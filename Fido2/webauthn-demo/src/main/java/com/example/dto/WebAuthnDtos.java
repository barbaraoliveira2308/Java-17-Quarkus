package com.example.dto;

public class WebAuthnDtos {

    public static class UsernameRequest {
        public String username;
    }

    public static class RegisterFinishRequest {
        public String username;
        public Object credential;
    }

    public static class LoginFinishRequest {
        public String username;
        public Object credential;
    }
}