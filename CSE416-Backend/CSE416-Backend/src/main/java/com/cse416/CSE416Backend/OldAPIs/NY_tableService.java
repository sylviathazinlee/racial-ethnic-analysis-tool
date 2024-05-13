package com.cse416.CSE416Backend.OldAPIs;

import com.cse416.CSE416Backend.OldAPIs.NY_table;
import com.cse416.CSE416Backend.OldAPIs.NY_tableRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class NY_tableService {
    @Autowired
    private NY_tableRepository ny_table_repository;
    public List<NY_table> getAllDistrictTable(){
        return ny_table_repository.findAll();
    }

//    public Optional<NY_district> findByDistricts(int districtsId){
//        return ny_district_repository.findByProperties_Districts(districtsId);
//    }
}
