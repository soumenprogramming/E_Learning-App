package com.soumenprogramming.elearning.dao;

import com.soumenprogramming.elearning.model.Logindetails;
import com.soumenprogramming.elearning.repository.Logindetailsrepo;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class Logindetailsservice {

    private static final Logger logger = LoggerFactory.getLogger(Logindetailsservice.class);

    @Autowired
    private Logindetailsrepo logindetailsrepo;

    @Transactional
    public Logindetails save(Logindetails logindetails) {
        logger.info("Saving new user: {}", logindetails.getUsername());
        return logindetailsrepo.save(logindetails);
    }

    @Transactional(readOnly = true)
    public Logindetails findById(int id) {
        logger.info("Finding user by ID: {}", id);
        return logindetailsrepo.findById(id).orElse(null);
    }

    @Transactional(readOnly = true)
    public Logindetails findByUsername(String username) {
        logger.info("Finding user by username: {}", username);
        return logindetailsrepo.findByUsername(username);
    }

    @Transactional(readOnly = true)
    public Logindetails findByEmail(String email) {
        logger.info("Finding user by email: {}", email);
        List<Logindetails> results = logindetailsrepo.findByEmail(email);
        return results.isEmpty() ? null : results.get(0);  // Return the first result if multiple exist
    }


    @Transactional
    public Logindetails update(int id, Logindetails updatedLogindetails) {
        logger.info("Updating user with ID: {}", id);
        Logindetails existingLogindetails = logindetailsrepo.findById(id).orElse(null);
        if (existingLogindetails != null) {
            existingLogindetails.setUsername(updatedLogindetails.getUsername());
            existingLogindetails.setPassword(updatedLogindetails.getPassword());
            return logindetailsrepo.save(existingLogindetails);
        } else {
            logger.warn("User not found with ID: {}", id);
            throw new RuntimeException("Logindetails not found with id: " + id);
        }
    }

    @Transactional
    public boolean deleteById(int id) {
        logger.info("Deleting user with ID: {}", id);
        Logindetails existingLogindetails = logindetailsrepo.findById(id).orElse(null);
        if (existingLogindetails != null) {
            logindetailsrepo.delete(existingLogindetails);
            return true;
        }
        return false;
    }

    @Transactional
    public boolean deleteByUsername(String username) {
        logger.info("Deleting user with username: {}", username);
        Logindetails existingLogindetails = logindetailsrepo.findByUsername(username);
        if (existingLogindetails != null) {
            logindetailsrepo.delete(existingLogindetails);
            return true;
        }
        return false;
    }

    @Transactional(readOnly = true)
    public List<Logindetails> findAll() {
        logger.info("Finding all users");
        return logindetailsrepo.findAll();
    }
}