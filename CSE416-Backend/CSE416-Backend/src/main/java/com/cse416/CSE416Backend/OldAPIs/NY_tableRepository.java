package com.cse416.CSE416Backend.OldAPIs;

import com.cse416.CSE416Backend.OldAPIs.NY_table;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface NY_tableRepository extends MongoRepository<NY_table, ObjectId> {
    //Optional<NY_district> findByProperties_Districts(int districtId);
}
