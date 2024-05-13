package com.cse416.CSE416Backend.precinctData;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.DocumentReference;

import java.util.Collection;
import java.util.List;
@Document(collection = "precinctDB")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class PrecinctData {

    @Id
    public String _id;
    public String state;
    public String precinctID;
    public String precinctName;
    public Properties properties;
    public Geometry geometry;

    public static class Properties {
        public int trumpVotes;
        public int bidenVotes;
        public int total;
        public int white;
        public int hispanicLatino;
        public int black;
        public int asian;
        public String neighbors;
    }

    public static class Geometry {
        public String type;
        public List<List<List<List<Double>>>> coordinates;
    }
}
