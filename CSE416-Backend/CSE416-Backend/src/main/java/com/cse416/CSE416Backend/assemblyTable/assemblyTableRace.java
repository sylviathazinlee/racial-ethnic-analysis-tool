package com.cse416.CSE416Backend.assemblyTable;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.DocumentReference;

import java.util.Collection;
import java.util.List;
@Document(collection = "assemblyRace")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class assemblyTableRace{
    @Id
    public String _id;
    public String name;
    public String districtID;
    public String race;
    public String state;
    public String party;
    public Double voteMargin;
}
