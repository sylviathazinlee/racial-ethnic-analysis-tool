package com.cse416.CSE416Backend;

import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class NonLinearRegService {
    @Autowired
    private NonLinearRegRepository NonLinearReg_Repository;
    public List<NonLinearReg> getAllRacesByState(String state){
        return NonLinearReg_Repository.findByState(state);
    }

    public List<NonLinearReg> getByStateAndRace(String state, String race){
        return NonLinearReg_Repository.findByStateAndRace(state, race);
    }

    public List<NonLinearReg> getByStateAndPrecinctID(String state, String precinctID){
        return NonLinearReg_Repository.findByStateAndPrecinctID(state, precinctID);
    }
}