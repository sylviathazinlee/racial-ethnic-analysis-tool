package com.cse416.CSE416Backend.currentDistrictPlan;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/v2/districts/{state}")
public class currentDistrictPlanController {
    @Autowired
    private currentDistrictPlanService currentDistrictPlan_Service;

    @GetMapping
    public ResponseEntity<List<currentDistrictPlan>> getAllDistricts(@PathVariable String state) {
        if (!state.equals("NY") && !state.equals("SC")) {
            return ResponseEntity.badRequest().build();
        }

        return new ResponseEntity<List<currentDistrictPlan>>(currentDistrictPlan_Service.allDistricts(state),
                HttpStatus.OK);
    }

    @GetMapping("/{districtID}")
    public ResponseEntity<Optional<currentDistrictPlan>> getSingleDistrict(@PathVariable String state,
            @PathVariable String districtID) {
        if (!state.equals("NY") && !state.equals("SC")) {
            return ResponseEntity.badRequest().build();
        }
        int number = Integer.parseInt(districtID);
        if (state.equals("NY") && (number > 150 || number < 1)
                || (state.equals("SC") && (number > 124 || number < 1))) {
            return ResponseEntity.badRequest().build();
        }
        return new ResponseEntity<Optional<currentDistrictPlan>>(
                currentDistrictPlan_Service.findByDistrictID(state, districtID), HttpStatus.OK);
    }
}