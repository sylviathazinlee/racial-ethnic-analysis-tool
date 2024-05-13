package com.cse416.CSE416Backend;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/v2/NLR/{state}")
public class NonLinearRegController {
    @Autowired
    private NonLinearRegService NonLinearReg_Service;

    @GetMapping
    public ResponseEntity<List<NonLinearReg>> getAllByState(@PathVariable String state) {
        if (!state.equals("NY") && !state.equals("SC")) {
            return ResponseEntity.badRequest().build();
        }
        return new ResponseEntity<List<NonLinearReg>>(NonLinearReg_Service.getAllRacesByState(state), HttpStatus.OK);
    }

    @GetMapping("/race/{race}")
    public ResponseEntity<List<NonLinearReg>> getByStateAndRace(@PathVariable String state, @PathVariable String race) {
        if (!state.equals("NY") && !state.equals("SC")) {
            return ResponseEntity.badRequest().build();
        }
        if (!race.equals("white") && !race.equals("black") && !race.equals("asian") && !race.equals("hispanicLatino")) {
            return ResponseEntity.badRequest().build();
        }
        return new ResponseEntity<List<NonLinearReg>>(NonLinearReg_Service.getByStateAndRace(state, race),
                HttpStatus.OK);
    }

    @GetMapping("/{precinctID}")
    public ResponseEntity<List<NonLinearReg>> getByStateAndDistrictID(@PathVariable String state,
            @PathVariable String precinctID) {
        if (!state.equals("NY") && !state.equals("SC")) {
            return ResponseEntity.badRequest().build();
        }
        return new ResponseEntity<List<NonLinearReg>>(NonLinearReg_Service.getByStateAndPrecinctID(state, precinctID),
                HttpStatus.OK);
    }

}