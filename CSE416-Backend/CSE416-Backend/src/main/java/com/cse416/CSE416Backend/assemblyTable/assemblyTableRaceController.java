package com.cse416.CSE416Backend.assemblyTable;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/v2/table/{state}")
public class assemblyTableRaceController {
    @Autowired
    private assemblyTableRaceService assemblyTableRace_Service;

    @GetMapping
    public ResponseEntity<List<assemblyTableRace>> getAllDistrictTableInState(@PathVariable String state) {
        if (!state.equals("NY") && !state.equals("SC")) {
            return ResponseEntity.badRequest().build();
        }
        return new ResponseEntity<List<assemblyTableRace>>(assemblyTableRace_Service.getAllDistrictTableInState(state),
                HttpStatus.OK);
    }

    @GetMapping("/{districtID}")
    public ResponseEntity<Optional<assemblyTableRace>> getOneAssemblyRace(@PathVariable String state,
            @PathVariable String districtID) {
        if (!state.equals("NY") && !state.equals("SC")) {
            return ResponseEntity.badRequest().build();
        }
        int number = Integer.parseInt(districtID);
        if (state.equals("NY") && (number > 150 || number < 1)
                || (state.equals("SC") && (number > 124 || number < 1))) {
            return ResponseEntity.badRequest().build();
        }
        return new ResponseEntity<Optional<assemblyTableRace>>(
                assemblyTableRace_Service.getOneDistrictTableInState(state, districtID), HttpStatus.OK);
    }

//    @GetMapping("/{party}")
//    public ResponseEntity<Optional<List<assemblyTableRace>>> getOneAssemblyRace(@PathVariable String state,
//                                                                          @PathVariable String party) {
//        if (!state.equals("NY") && !state.equals("SC")) {
//            return ResponseEntity.badRequest().build();
//        }
//        if (!(party.equals("democrat") || party.equals("republican"))) {
//            return ResponseEntity.badRequest().build();
//        }
//        return new ResponseEntity<Optional<List<assemblyTableRace>>>(
//                assemblyTableRace_Service.getDistrictTableInStateByParty(state, party), HttpStatus.OK);
//    }
//
//    @GetMapping("/{race}")
//    public ResponseEntity<Optional<List<assemblyTableRace>>> getOneAssemblyRace(@PathVariable String state,
//                                                                          @PathVariable String race) {
//        if (!state.equals("NY") && !state.equals("SC")) {
//            return ResponseEntity.badRequest().build();
//        }
//        if (!(race.equals("black") || race.equals("white") || race.equals("hispanic") || race.equals("asian"))) {
//            return ResponseEntity.badRequest().build();
//        }
//        return new ResponseEntity<Optional<List<assemblyTableRace>>>(
//                assemblyTableRace_Service.getDistrictTableInStateByRace(state, race), HttpStatus.OK);
//    }

}
