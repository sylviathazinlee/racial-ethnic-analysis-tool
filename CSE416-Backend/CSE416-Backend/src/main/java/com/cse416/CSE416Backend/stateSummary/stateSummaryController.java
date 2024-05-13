package com.cse416.CSE416Backend.stateSummary;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/v2/summary/")
public class stateSummaryController {
    @Autowired
    private stateSummaryService stateSummary_Service;

    @GetMapping
    public ResponseEntity<List<stateSummary>> getAllStateSummary() {
        return new ResponseEntity<List<stateSummary>>(stateSummary_Service.getAllStateSummaries(),
                HttpStatus.OK);
    }

    @GetMapping("/{state}")
    public ResponseEntity<stateSummary> getStateSummaryByState(@PathVariable String state) {
        if (!state.equals("NY") && !state.equals("SC")) {
            return ResponseEntity.badRequest().build();
        }
        return new ResponseEntity<stateSummary>(stateSummary_Service.getOneStateSummary(state),
                HttpStatus.OK);
    }
}
