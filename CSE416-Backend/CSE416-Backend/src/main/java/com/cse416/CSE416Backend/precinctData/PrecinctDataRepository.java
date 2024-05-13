package com.cse416.CSE416Backend.precinctData;

import com.cse416.CSE416Backend.precinctData.PrecinctData;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface PrecinctDataRepository extends MongoRepository<PrecinctData, ObjectId> {
    List<PrecinctData> findByState(String state);
    Optional<PrecinctData> findByStateAndPrecinctName(String state, String PrecinctName);
    Optional<PrecinctData> findByPrecinctID(String PrecinctID);
}
