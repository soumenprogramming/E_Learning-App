package com.soumenprogramming.elearning.repository;


import com.soumenprogramming.elearning.model.Querydetails;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface QueryDetailsRepo extends JpaRepository<Querydetails, Integer> {
    List<Querydetails> findByEmail(String email);
}
