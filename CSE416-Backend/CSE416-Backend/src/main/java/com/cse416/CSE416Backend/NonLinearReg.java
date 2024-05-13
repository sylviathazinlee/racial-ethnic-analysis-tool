package com.cse416.CSE416Backend;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "prepro10")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class NonLinearReg {

    @Id
    public String _id;
    public String precinctID;
    public String state;
    public String race;
    public ElectionStats electionStats;
    public double racialPercentage;


    public static class ElectionStats {
        public double demShare;
        public double repShare;
    }
}
