package com.example;

import io.quarkus.security.webauthn.WebAuthnUser;
import io.quarkus.security.webauthn.WebAuthnUserProvider;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;

import java.util.Collections;
import java.util.List;

@ApplicationScoped
public class QuarkusWebAuthnUserProvider implements WebAuthnUserProvider {

    @Inject
    UserRepository userRepository;

    @Override
    public List<WebAuthnUser> findByUsername(String username) {
        if (username == null || username.isBlank()) {
            return Collections.emptyList();
        }

        User user = userRepository.findByUsername(username);
        if (user == null) {
            user = new User();
            user.username = username;
            user.persist();
        }

        WebAuthnUser webAuthnUser = new WebAuthnUser();
        webAuthnUser.setUsername(user.username);

        return Collections.singletonList(webAuthnUser);
    }

    @Override
    public List<WebAuthnUser> findByCredentialId(String credentialId) {
        // Implementação mínima: ainda não fazemos lookup por credentialId.
        // Quarkus consegue operar com o mecanismo padrão mesmo assim.
        return Collections.emptyList();
    }
}