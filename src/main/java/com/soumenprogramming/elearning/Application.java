package com.soumenprogramming.elearning;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication
@ComponentScan(basePackages = "com.soumenprogramming.elearning")
@EntityScan(basePackages = "com.soumenprogramming.elearning.model")
public class Application {
	public static void main(String[] args) {
		SpringApplication.run(Application.class, args);
	}
}
