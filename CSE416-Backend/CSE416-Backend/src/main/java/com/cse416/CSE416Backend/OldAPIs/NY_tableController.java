package com.cse416.CSE416Backend.OldAPIs;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/v1/ny/table")
public class NY_tableController {
    @Autowired
    private NY_tableService ny_table_service;

    @GetMapping
    public ResponseEntity<List<NY_table>> getAllDistrictTable() {
        return new ResponseEntity<List<NY_table>>(ny_table_service.getAllDistrictTable(), HttpStatus.OK);
    }

    // for picture
    // @GetMapping("/{districtsId}")
    // public ResponseEntity<Optional<NY_district>> getSingleDistrict(@PathVariable
    // int districtsId){
    // return new
    // ResponseEntity<Optional<NY_district>>(ny_district_service.findByDistricts(districtsId),
    // HttpStatus.OK);
    // }
}
