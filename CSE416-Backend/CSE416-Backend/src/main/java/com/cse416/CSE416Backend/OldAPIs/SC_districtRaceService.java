package com.cse416.CSE416Backend.OldAPIs;

import com.cse416.CSE416Backend.OldAPIs.SC_districtRace;
import com.cse416.CSE416Backend.OldAPIs.SC_districtRaceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
@Service
public class SC_districtRaceService {
    @Autowired
    private SC_districtRaceRepository sc_district_race_repository;
    public List<SC_districtRace> allDistrictRaces(){
        return sc_district_race_repository.findAll();
    }
    public Optional<SC_districtRace> findByDistricts(int districtsId){
        return sc_district_race_repository.findByDistrict(districtsId);
    }
}
