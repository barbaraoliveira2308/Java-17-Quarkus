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
        User user = userRepository.findByUsername(username);

        // Se o usuário ainda não existe, criamos um novo na hora do registro
        if (user == null) {
            user = new User();
            user.username = username;
            user.persist();
        }

        WebAuthnUser webAuthnUser = new WebAuthnUser();
        webAuthnUser.setUsername(user.username);
        // Se quiser roles depois:
        // webAuthnUser.setRoles(Collections.singletonList("user"));

        return Collections.singletonList(webAuthnUser);
    }

    @Override
    public List<WebAuthnUser> findByCredentialId(String credentialId) {
        User user = userRepository.findByCredentialId(credentialId);
        if (user == null) {
            return Collections.emptyList();
        }

        WebAuthnUser webAuthnUser = new WebAuthnUser();
        webAuthnUser.setUsername(user.username);
        return Collections.singletonList(webAuthnUser);
    }
}