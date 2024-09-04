package com.soumenprogramming.elearning.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class ProfileController {

    @GetMapping("/profile")
    public String showProfile(Model model) {
        // Add attributes to the model if needed, for example:
        model.addAttribute("username", "YourUsername");
        model.addAttribute("password", "YourPassword");

        return "profile"; // This should correspond to the profile.html in the templates folder
    }
}
