package com.example;

import io.quarkus.hibernate.orm.panache.PanacheEntity;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;

@Entity
public class User extends PanacheEntity {

    @Column(unique = true, nullable = false)
    public String username;

    @Column(unique = true)
    public String credentialId;

    public String email;
    public String role;
}