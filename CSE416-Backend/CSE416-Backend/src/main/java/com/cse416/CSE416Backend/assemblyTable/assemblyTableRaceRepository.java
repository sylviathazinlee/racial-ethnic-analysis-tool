package com.cse416.CSE416Backend.assemblyTable;


import com.cse416.CSE416Backend.assemblyTable.assemblyTableRace;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface assemblyTableRaceRepository extends MongoRepository<assemblyTableRace, ObjectId> {
    List<assemblyTableRace> findByState(String state);
    Optional<assemblyTableRace> findByStateAndDistrictID(String state, String districtID);
}
