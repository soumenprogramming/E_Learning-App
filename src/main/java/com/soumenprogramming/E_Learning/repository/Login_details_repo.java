package com.soumenprogramming.E_Learning.repository;

import com.soumenprogramming.E_Learning.model.Login_details;
import org.springframework.data.jpa.repository.JpaRepository;


public interface Login_details_repo extends JpaRepository<Login_details, Integer> {
    Login_details findByUsername(String username);

    public Login_details save(Login_details login_details);

    public void delete(Login_details login_details);

}
