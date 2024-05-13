package com.cse416.CSE416Backend.OldAPIs;

import com.cse416.CSE416Backend.OldAPIs.NY_districtRace;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface NY_districtRaceRepository extends MongoRepository<NY_districtRace, ObjectId> {
    Optional<NY_districtRace> findByDistrict(int districtId);
}
