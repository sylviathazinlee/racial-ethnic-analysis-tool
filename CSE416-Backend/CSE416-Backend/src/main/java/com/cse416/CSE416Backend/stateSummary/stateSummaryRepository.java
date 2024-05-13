package com.cse416.CSE416Backend.stateSummary;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface stateSummaryRepository extends MongoRepository<stateSummary, ObjectId> {
        stateSummary findByState(String state);
}
