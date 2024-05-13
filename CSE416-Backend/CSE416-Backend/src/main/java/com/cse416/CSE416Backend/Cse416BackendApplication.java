package com.cse416.CSE416Backend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@SpringBootApplication
@RestController
@EnableCaching
public class Cse416BackendApplication {

	public static void main(String[] args) {
		SpringApplication.run(Cse416BackendApplication.class, args);
	}

	@GetMapping("/root")
	public String apiRoot(){
		return "Hello World!";
	}
}
