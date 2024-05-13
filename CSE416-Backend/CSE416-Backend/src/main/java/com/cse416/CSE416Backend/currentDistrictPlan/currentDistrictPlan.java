package com.cse416.CSE416Backend.currentDistrictPlan;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.DocumentReference;

import java.util.Collection;
import java.util.List;
@Document(collection = "currentDistrictPlan")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class currentDistrictPlan {

    @Id
    public String _id;
    public String type;
    public String state;
    public String districtID;
    public Properties properties;
    public Geometry geometry;

    public static class Properties {
        public int total;
        public int white;
        public int black;
        public int hispanicLatino;
        public int asian;
        public int trumpVotes;
        public int bidenVotes;
    }

    public static class Geometry {
        public String type;
        public List<List<List<List<Double>>>> coordinates;
    }
}
