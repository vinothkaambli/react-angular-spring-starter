package com.excercise.backend.controller;

import com.excercise.backend.entity.UserEntity;
import com.excercise.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.List;

@Controller
@RequestMapping(value = "/api")
public class UserController {

    @Autowired
    private UserRepository  userRepository;

    @PostMapping(value = "/post")
    public ResponseEntity<String> postPoint(@RequestBody UserEntity user) {
        userRepository.saveAndFlush(user);
        return ResponseEntity.ok("Success");
    }

    @GetMapping(value = "/get")
    public ResponseEntity<List<UserEntity>> getPoints() {
        List<UserEntity> users = userRepository.findAll();
        return ResponseEntity.ok(users);
    }
}
