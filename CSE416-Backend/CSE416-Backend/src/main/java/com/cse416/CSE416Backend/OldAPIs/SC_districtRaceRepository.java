package com.cse416.CSE416Backend.OldAPIs;

import com.cse416.CSE416Backend.OldAPIs.SC_districtRace;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface SC_districtRaceRepository extends MongoRepository<SC_districtRace, ObjectId> {
    Optional<SC_districtRace> findByDistrict(int districtId);
}
