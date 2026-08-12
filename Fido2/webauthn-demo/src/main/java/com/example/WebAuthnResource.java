package com.example;

import com.example.dto.WebAuthnDtos.LoginFinishRequest;
import com.example.dto.WebAuthnDtos.RegisterFinishRequest;
import com.example.dto.WebAuthnDtos.UsernameRequest;
import io.quarkus.security.webauthn.WebAuthnSecurity;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
import jakarta.ws.rs.Consumes;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;

/**
 * Endpoints REST alinhados com o frontend React.
 * Eles simplesmente delegam para o mecanismo WebAuthn do Quarkus.
 */
@Path("/api/webauthn")
@Consumes(MediaType.APPLICATION_JSON)
@Produces(MediaType.APPLICATION_JSON)
public class WebAuthnResource {

    @Inject
    WebAuthnSecurity webAuthnSecurity;

    @POST
    @Path("/register/options")
    public Response getRegistrationOptions(UsernameRequest request) {
        if (request == null || request.username == null || request.username.isBlank()) {
            return Response.status(Response.Status.BAD_REQUEST).entity("username is required").build();
        }
        var options = webAuthnSecurity.getRegisterOptions(request.username);
        return Response.ok(options).build();
    }

    @POST
    @Path("/register")
    @Transactional
    public Response finishRegistration(RegisterFinishRequest request) {
        if (request == null || request.username == null || request.credential == null) {
            return Response.status(Response.Status.BAD_REQUEST).entity("username and credential are required").build();
        }
        webAuthnSecurity.finishRegistration(request.username, request.credential);
        return Response.noContent().build();
    }

    @POST
    @Path("/login/options")
    public Response getLoginOptions(UsernameRequest request) {
        var username = request != null ? request.username : null;
        var options = webAuthnSecurity.getLoginOptions(username);
        return Response.ok(options).build();
    }

    @POST
    @Path("/login")
    public Response finishLogin(LoginFinishRequest request) {
        if (request == null || request.credential == null) {
            return Response.status(Response.Status.BAD_REQUEST).entity("credential is required").build();
        }
        webAuthnSecurity.finishLogin(request.credential);
        return Response.noContent().build();
    }
}