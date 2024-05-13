package com.cse416.CSE416Backend.OldAPIs;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/v1/sc/races")
public class SC_districtRaceController {
    @Autowired
    private SC_districtRaceService sc_district_race_service;
    @GetMapping
    public ResponseEntity<List<SC_districtRace>> getAllDistrictRaces(){
        return new ResponseEntity<List<SC_districtRace>>(sc_district_race_service.allDistrictRaces(), HttpStatus.OK);
    }
    @GetMapping("/{districtsId}")
    public ResponseEntity<Optional<SC_districtRace>> getSingleDistrict(@PathVariable int districtsId){
        return new ResponseEntity<Optional<SC_districtRace>>(sc_district_race_service.findByDistricts(districtsId), HttpStatus.OK);
    }
}
