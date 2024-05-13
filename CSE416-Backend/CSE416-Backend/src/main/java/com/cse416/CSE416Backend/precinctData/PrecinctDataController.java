package com.cse416.CSE416Backend.precinctData;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

import java.util.Optional;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/v2/precinct")
public class PrecinctDataController {
    @Autowired
    private PrecinctDataService precinct_data_service;
    @GetMapping
    public ResponseEntity<List<PrecinctData>> getAllPrecincts(){
        return new ResponseEntity<List<PrecinctData>>(precinct_data_service.allPrecincts(), HttpStatus.OK);
    }
    @GetMapping("/{state}")
    public ResponseEntity<List<PrecinctData>> getStatePrecincts(@PathVariable String state){

        return new ResponseEntity<List<PrecinctData>>(precinct_data_service.getByState(state), HttpStatus.OK);
//        if(state.equals("NY")){
//            return new ResponseEntity<List<PrecinctData>>(precinct_data_service.allNYPrecincts(), HttpStatus.OK);}
//        else if (state.equals("SC")) {
//            return new ResponseEntity<List<PrecinctData>>(precinct_data_service.allSCPrecincts(), HttpStatus.OK);
//        }
//        else{
//            return ResponseEntity.badRequest().build();
//        }
    }
    @GetMapping("/id/{PrecinctID}")
    public ResponseEntity<Optional<PrecinctData>> getByPrecinctID(@PathVariable String PrecinctID){
        return new ResponseEntity<Optional<PrecinctData>>(precinct_data_service.findByPrecinctID(PrecinctID), HttpStatus.OK);
    }
    @GetMapping("/state/{state}/name/{PrecinctName}")
    public ResponseEntity<Optional<PrecinctData>> getByPrecinctName(@PathVariable String state, @PathVariable String PrecinctName){
        return new ResponseEntity<Optional<PrecinctData>>(precinct_data_service.findByStateAndPrecinctName(state, PrecinctName), HttpStatus.OK);
    }
}