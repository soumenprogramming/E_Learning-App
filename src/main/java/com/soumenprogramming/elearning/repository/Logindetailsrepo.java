package com.soumenprogramming.elearning.repository;

import com.soumenprogramming.elearning.model.Logindetails;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface Logindetailsrepo extends JpaRepository<Logindetails, Integer> {
    Logindetails findByUsername(String username);

}
