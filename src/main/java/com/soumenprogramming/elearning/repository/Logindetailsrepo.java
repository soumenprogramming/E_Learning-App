package com.soumenprogramming.elearning.repository;

import com.soumenprogramming.elearning.model.Logindetails;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface Logindetailsrepo extends JpaRepository<Logindetails, Integer> {
    Logindetails findByUsername(String username);

   List<Logindetails> findByEmail(String email);
}
