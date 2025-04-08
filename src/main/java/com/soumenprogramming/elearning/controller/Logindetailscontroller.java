package com.soumenprogramming.elearning.controller;

import com.soumenprogramming.elearning.dao.Logindetailsservice;
import com.soumenprogramming.elearning.model.Logindetails;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

import static com.soumenprogramming.elearning.constants.AllConstants.*;

@RestController
@RequestMapping("/api")
public class Logindetailscontroller {

    private static final Logger logger = LoggerFactory.getLogger(Logindetailscontroller.class);

    @Autowired
    private Logindetailsservice logindetailsservice;

    @PostMapping("/signup")
    @CrossOrigin(origins = "*", allowedHeaders = "*")
    public ResponseEntity<Map<String, String>> register(@RequestBody Logindetails logindetails) {
        Logindetails existingUser = logindetailsservice.findByUsername(logindetails.getUsername());
        Logindetails existingEmail = logindetailsservice.findByEmail(logindetails.getEmail());
        
        Map<String, String> response = new HashMap<>();

        if (existingUser != null) {
            response.put("status", "error");
            response.put("message", "Username already exists");
            return new ResponseEntity<>(response, HttpStatus.CONFLICT);
        } else if (existingEmail != null) {
            response.put("status", "error");
            response.put("message", "Email already exists");
            return new ResponseEntity<>(response, HttpStatus.CONFLICT);
        } else {
            logindetailsservice.save(logindetails);
            response.put("status", "success");
            response.put("message", "Registration Successful");
            return new ResponseEntity<>(response, HttpStatus.CREATED);
        }
    }

    @PostMapping("/login")
    @CrossOrigin(origins = "*", allowedHeaders = "*")
    public ResponseEntity<Map<String, String>> login(@RequestBody Logindetails logindetails) {
        logger.info("Login attempt for username: {}", logindetails.getUsername());
        logger.info("Login request received with body: {}", logindetails);
        
        Logindetails existingUser = logindetailsservice.findByUsername(logindetails.getUsername());
        Map<String, String> response = new HashMap<>();

        if (existingUser == null) {
            logger.warn("Login failed: Username not found - {}", logindetails.getUsername());
            response.put(STATUS, "error");
            response.put(MESSAGE, "Username is incorrect");
            return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
        }

        if (existingUser.getPassword().equals(logindetails.getPassword())) {
            logger.info("Login successful for username: {}", logindetails.getUsername());
            response.put("status", "success");
            response.put("message", "Login Successful");
            return new ResponseEntity<>(response, HttpStatus.OK);
        } else {
            logger.warn("Login failed: Incorrect password for username - {}", logindetails.getUsername());
            response.put("status", "error");
            response.put("message", "Password is incorrect");
            return new ResponseEntity<>(response, HttpStatus.UNAUTHORIZED);
        }
    }

    @GetMapping("/login/{id}")
    public ResponseEntity<Logindetails> getLogin(@PathVariable int id) {
        Logindetails logindetails = logindetailsservice.findById(id);
        if (logindetails != null) {
            return new ResponseEntity<>(logindetails, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PutMapping("/logins/{id}")
    public ResponseEntity<Logindetails> updateLogin(@PathVariable int id, @RequestBody Logindetails updatedLogindetails) {
        Logindetails updatedUser = logindetailsservice.update(id, updatedLogindetails);
        if (updatedUser != null) {
            return new ResponseEntity<>(updatedUser, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/logins/{id}")
    public ResponseEntity<String> deleteLogin(@PathVariable int id) {
        boolean isDeleted = logindetailsservice.deleteById(id);
        if (isDeleted) {
            return new ResponseEntity<>("Deleted", HttpStatus.OK);
        } else {
            return new ResponseEntity<>("Not Found", HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping("/logout")
    @CrossOrigin(origins = "*", allowedHeaders = "*")
    public ResponseEntity<Map<String, String>> logout(@RequestBody(required = false) String userData) {
        logger.info("Logout request received");
        Map<String, String> response = new HashMap<>();

        try {
            response.put("status", "success");
            response.put("message", "Logout Successful");
            return new ResponseEntity<>(response, HttpStatus.OK);
        } catch (Exception e) {
            logger.error("Error during logout: ", e);
            response.put("status", "error");
            response.put("message", "Logout failed");
            return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
