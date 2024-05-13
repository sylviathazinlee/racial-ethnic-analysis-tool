package com.cse416.CSE416Backend;


import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface NonLinearRegRepository extends MongoRepository<NonLinearReg, ObjectId> {
    List<NonLinearReg> findByState(String state);
    List<NonLinearReg> findByStateAndRace(String state, String race);
    List<NonLinearReg> findByStateAndPrecinctID(String state, String precinctID);
}