package com.cse416.CSE416Backend.currentDistrictPlan;

import com.cse416.CSE416Backend.currentDistrictPlan.currentDistrictPlan;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface currentDistrictPlanRepository extends MongoRepository<currentDistrictPlan, ObjectId> {

    List<currentDistrictPlan> findByState(String state);
    Optional<currentDistrictPlan> findByStateAndDistrictID(String state, String districtID);
}

