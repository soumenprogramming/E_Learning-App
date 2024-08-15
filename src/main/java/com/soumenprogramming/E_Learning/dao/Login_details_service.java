package com.soumenprogramming.E_Learning.dao;

import com.soumenprogramming.E_Learning.model.Login_details;
import com.soumenprogramming.E_Learning.repository.Login_details_repo;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class Login_details_service {

    @Autowired
    private Login_details_repo login_details_repo;

    @Transactional
    public void save(Login_details login_details) {
        login_details_repo.save(login_details);

    }

    @Transactional
    public Login_details findByUsername(String username) {
        return login_details_repo.findByUsername(username);
    }

    @Transactional
    public void deleteByUsername(String username) {
        Login_details login_details = login_details_repo.findByUsername(username);
        login_details_repo.delete(login_details);
    }
}
