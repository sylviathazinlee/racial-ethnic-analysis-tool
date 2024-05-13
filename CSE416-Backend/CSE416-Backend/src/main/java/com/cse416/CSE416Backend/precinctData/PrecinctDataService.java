package com.cse416.CSE416Backend.precinctData;

import com.cse416.CSE416Backend.precinctData.PrecinctData;
import com.cse416.CSE416Backend.precinctData.PrecinctDataRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PrecinctDataService {
    @Autowired
    private PrecinctDataRepository precinct_data_repository;
    public List<PrecinctData> allPrecincts(){
        return precinct_data_repository.findAll();
    }


//    @Cacheable(value = "PrecinctData", key = "#state")
//    public List<PrecinctData> allNYPrecincts(){
//        return precinct_data_repository.findByState("NY");
//    }
//    @Cacheable(value = "PrecinctData", key = "#state")
//    public List<PrecinctData> allSCPrecincts(){
//        return precinct_data_repository.findByState("SC");
//    }

    @Cacheable(value = "PrecinctData", key = "#state")
    public List<PrecinctData> getByState(String state){
        return precinct_data_repository.findByState(state);
    }

    @Cacheable(value = "PrecinctData", key = "'PrecinctData'+#state+#precinctName")
    public Optional<PrecinctData> findByStateAndPrecinctName(String state, String precinctName){
        return precinct_data_repository.findByStateAndPrecinctName(state, precinctName);
    }

    @Cacheable(value = "assemblyTableRace", key = "'PrecinctData'+#state+#precinctID")
    public Optional<PrecinctData> findByPrecinctID(String precinctID){
        return precinct_data_repository.findByPrecinctID(precinctID);
    }
}