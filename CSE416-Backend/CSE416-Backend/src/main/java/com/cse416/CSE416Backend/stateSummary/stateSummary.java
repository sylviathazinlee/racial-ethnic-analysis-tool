package com.cse416.CSE416Backend.stateSummary;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.DocumentReference;

import java.util.Collection;
import java.util.List;
@Document(collection = "stateSummary")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class stateSummary {
    @Id
    public String _id;
    public String state;
    public int totalPopulation;

    public int totalWhite;
    public int totalBlack;
    public int totalHispanicLatino;
    public int totalAsian;

    public int totalRepVotes;
    public int totalDemVotes;


    public double percentRepVotes;
    public double percentDemVotes;

    public double percentWhite;
    public double percentBlack;
    public double percentHispanicLatino;
    public double percentAsian;

    public String redistrictingControl;

    public RepresentativeStats representativeStats;

    public static class RepresentativeStats{
        public int dem;
        public int rep;
        public int white;
        public int black;
        public int hispanicLatino;
        public int asian;
        public int other;
    }
}
