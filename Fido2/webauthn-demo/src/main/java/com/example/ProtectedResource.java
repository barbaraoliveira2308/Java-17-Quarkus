package com.example;

import org.jboss.logging.Logger;

import io.quarkus.security.Authenticated;
import jakarta.inject.Inject;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.Context;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.SecurityContext;

@Path("/api")
@Produces(MediaType.TEXT_PLAIN)
public class ProtectedResource {

    @Inject
    Logger log;

    @GET
    @Path("/protected")
    @Authenticated
    public String protectedEndpoint(@Context SecurityContext securityContext) {
        var principal = securityContext.getUserPrincipal();
        String username = principal != null ? principal.getName() : "unknown";

        log.debugf("Acessando endpoint protegido para o usuário: %s", username);
        log.infof("Usuário %s acessou o endpoint protegido", username);

        if ("admin".equalsIgnoreCase(username)) {
            log.warnf("Acesso de admin ao endpoint protegido: %s", username);
        }

        try {
            int x = 1 / 1;
            log.debugf("Operação simulada retornou: %d", x);
        } catch (Exception e) {
            log.error("Erro ao processar algo no endpoint protegido", e);
        }

        return "Olá, " + username + "! Você está autenticado com WebAuthn.";
    }
}