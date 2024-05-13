package com.cse416.CSE416Backend.OldAPIs;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.DocumentReference;

@Document(collection = "ny_race_district_data")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class NY_districtRace {
    @Id
    public String _id;
    public int district;
    public White white;
    public Hispanic hispanic;
    public Black black;
    public Asian asian;
    public Mixed mixed;
    public Other other;

    public static class White {
        public String percent;
        public String count;
    }

    public static class Hispanic {
        public String percent;
        public String count;
    }
    public static class Black {
        public String percent;
        public String count;
    }
    public static class Asian {
        public String percent;
        public String count;
    }
    public static class Mixed {
        public String percent;
        public String count;
    }
    public static class Other {
        public String percent;
        public String count;
    }
}
