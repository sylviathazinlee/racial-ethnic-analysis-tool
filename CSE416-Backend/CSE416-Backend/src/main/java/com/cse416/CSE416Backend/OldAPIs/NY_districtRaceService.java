package com.cse416.CSE416Backend.OldAPIs;

import com.cse416.CSE416Backend.OldAPIs.NY_districtRace;
import com.cse416.CSE416Backend.OldAPIs.NY_districtRaceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class NY_districtRaceService {
    @Autowired
    private NY_districtRaceRepository ny_district_race_repository;
    public List<NY_districtRace> allDistrictRaces(){
        return ny_district_race_repository.findAll();
    }
    public Optional<NY_districtRace> findByDistricts(int districtsId){
        return ny_district_race_repository.findByDistrict(districtsId);
    }
}
