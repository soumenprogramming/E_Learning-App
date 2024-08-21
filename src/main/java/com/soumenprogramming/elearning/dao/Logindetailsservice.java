package com.soumenprogramming.elearning.dao;

import com.soumenprogramming.elearning.model.Logindetails;
import com.soumenprogramming.elearning.repository.Logindetailsrepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class Logindetailsservice {

    @Autowired
    private Logindetailsrepo logindetailsrepo;

    @Transactional
    public Logindetails save(Logindetails logindetails) {
        return logindetailsrepo.save(logindetails);
    }

    @Transactional(readOnly = true)
    public Logindetails findById(int id) {
        return logindetailsrepo.findById(id).orElse(null);
    }

    @Transactional(readOnly = true)
    public Logindetails findByUsername(String username) {
        return logindetailsrepo.findByUsername(username);
    }

    @Transactional
    public Logindetails update(int id, Logindetails updatedLogindetails) {
        Logindetails existingLogindetails = logindetailsrepo.findById(id).orElse(null);
        if (existingLogindetails != null) {
            existingLogindetails.setUsername(updatedLogindetails.getUsername());
            existingLogindetails.setPassword(updatedLogindetails.getPassword());
            return logindetailsrepo.save(existingLogindetails);
        } else {
            throw new RuntimeException("Logindetails not found with id: " + id);
        }
    }

    @Transactional
    public boolean deleteById(int id) {
        Logindetails existingLogindetails = logindetailsrepo.findById(id).orElse(null);
        if (existingLogindetails != null) {
            logindetailsrepo.delete(existingLogindetails);
            return true;
        }
        return false;
    }

    @Transactional
    public boolean deleteByUsername(String username) {
        Logindetails existingLogindetails = logindetailsrepo.findByUsername(username);
        if (existingLogindetails != null) {
            logindetailsrepo.delete(existingLogindetails);
            return true;
        }
        return false;
    }

    @Transactional(readOnly = true)
    public List<Logindetails> findAll() {
        return logindetailsrepo.findAll();
    }
}