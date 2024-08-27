package com.soumenprogramming.elearning.controller;

import com.soumenprogramming.elearning.model.Querydetails;
import com.soumenprogramming.elearning.repository.QueryDetailsRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@Controller
public class QueryDetailsController {

    @Autowired
    private QueryDetailsRepo queryDetailsRepo;

    @PostMapping("/querydetails")
    public ResponseEntity<Querydetails> save(@RequestBody Querydetails querydetails) {
        return ResponseEntity.ok(queryDetailsRepo.save(querydetails));
    }
}