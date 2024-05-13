package com.cse416.CSE416Backend.OldAPIs;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.CacheControl;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.concurrent.TimeUnit;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/v1/ny/races")
public class NY_districtRaceController {
    @Autowired
    private NY_districtRaceService ny_district_race_service;
    @GetMapping
    public ResponseEntity<List<NY_districtRace>> getAllDistrictRaces(){
        return new ResponseEntity<List<NY_districtRace>>(ny_district_race_service.allDistrictRaces(), HttpStatus.OK);
    }

    @GetMapping("/{districtsId}")
    public ResponseEntity<Optional<NY_districtRace>> getSingleDistrictRaces(@PathVariable int districtsId){
        Optional<NY_districtRace> result = ny_district_race_service.findByDistricts(districtsId);
        if(result.isPresent()){
            CacheControl cacheControl = CacheControl.maxAge(10, TimeUnit.SECONDS).cachePublic();
            return ResponseEntity.ok().cacheControl(cacheControl).body(result);
        } else {
            return ResponseEntity.noContent().build();
        }
    }
}
