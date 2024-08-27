package com.soumenprogramming.elearning.dao;

import com.soumenprogramming.elearning.model.Querydetails;
import com.soumenprogramming.elearning.repository.QueryDetailsRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class QueryDetailsService {

    @Autowired
    private QueryDetailsRepo queryDetailsRepo;

    @Transactional
    public Querydetails save(Querydetails querydetails) {
        return queryDetailsRepo.save(querydetails);
    }

    @Transactional(readOnly = true)
    public Querydetails findById(int id) {
        return queryDetailsRepo.findById(id).orElse(null);
    }

    @Transactional(readOnly = true)
    public Querydetails findByEmail(String email) {
        return queryDetailsRepo.findByEmail(email).get(0);
    }

    @Transactional
    public Querydetails update(int id, Querydetails updatedQuerydetails) {
        Querydetails existingQuerydetails = queryDetailsRepo.findById(id).orElse(null);
        if (existingQuerydetails != null) {
            existingQuerydetails.setName(updatedQuerydetails.getName());
            existingQuerydetails.setEmail(updatedQuerydetails.getEmail());
            existingQuerydetails.setQuery(updatedQuerydetails.getQuery());
            return queryDetailsRepo.save(existingQuerydetails);
        } else {
            throw new RuntimeException("Querydetails not found with id: " + id);
        }
    }

    @Transactional
    public boolean deleteById(int id) {
        Querydetails existingQuerydetails = queryDetailsRepo.findById(id).orElse(null);
        if (existingQuerydetails != null) {
            queryDetailsRepo.delete(existingQuerydetails);
            return true;
        }
        return false;
    }




}
