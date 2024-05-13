package com.cse416.CSE416Backend.stateSummary;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class stateSummaryService {
    @Autowired
    private stateSummaryRepository stateSummary_Repository;
    public List<stateSummary> getAllStateSummaries(){
        return stateSummary_Repository.findAll();
    }

    @Cacheable(value = "stateSummary", key = "'stateSummary'+#state")
    public stateSummary getOneStateSummary(String state){
        return stateSummary_Repository.findByState(state);
    }
}
