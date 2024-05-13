package com.cse416.CSE416Backend.OldAPIs;

import com.cse416.CSE416Backend.OldAPIs.SC_table;
import com.cse416.CSE416Backend.OldAPIs.SC_tableRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SC_tableService {
    @Autowired
    private SC_tableRepository sc_table_repository;
    public List<SC_table> getAllDistrictTable(){
        return sc_table_repository.findAll();
    }

//    public Optional<NY_district> findByDistricts(int districtsId){
//        return ny_district_repository.findByProperties_Districts(districtsId);
//    }
}
