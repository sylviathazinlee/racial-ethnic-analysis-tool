package com.cse416.CSE416Backend.OldAPIs;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.DocumentReference;

import java.util.Collection;
import java.util.List;
@Document(collection = "sc_district_table_data")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class SC_table {

    @Id
    public String _id;
    public int districtNumber;
    public String representativeName;
    public String representativeEthnicity;
    public String mostCommonEthnicity;
    public EthnicityPercentages ethnicityPercentages;
    public String voterAgePopulation;
    public String voterTurnout;


    public static class EthnicityPercentages {
        public String EthnicityA;
        public String EthnicityB;
        public String EthnicityC;
        public String EthnicityD;

    }

//    public static class Polygon {
//        public List<List<Double>> coordinates;
//    }
}
