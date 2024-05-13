package com.cse416.CSE416Backend.assemblyTable;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class assemblyTableRaceService {
    @Autowired
    private assemblyTableRaceRepository assemblyTableRace_Repository;
    @Cacheable(value = "assemblyTableRace", key = "'assemblyTableRace' + #state")
    public List<assemblyTableRace> getAllDistrictTableInState(String state){
        return assemblyTableRace_Repository.findByState(state);
    }

    @Cacheable(value = "assemblyTableRace", key = "'assemblyTableRace' + #state + #districtID")
    public Optional<assemblyTableRace> getOneDistrictTableInState(String state, String districtID){
        return assemblyTableRace_Repository.findByStateAndDistrictID(state, districtID);
    }
}
