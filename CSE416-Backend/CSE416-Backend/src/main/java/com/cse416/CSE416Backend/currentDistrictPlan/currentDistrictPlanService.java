package com.cse416.CSE416Backend.currentDistrictPlan;

import com.cse416.CSE416Backend.currentDistrictPlan.currentDistrictPlan;
import com.cse416.CSE416Backend.currentDistrictPlan.currentDistrictPlanRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class currentDistrictPlanService {
    @Autowired
    private currentDistrictPlanRepository currentDistrictPlan_Repository;
    @Cacheable(value = "currentDistrictPlan", key = "'currentDistrictPlan'+#state")
    public List<currentDistrictPlan> allDistricts(String state){
        return currentDistrictPlan_Repository.findByState(state);
    }
    @Cacheable(value = "currentDistrictPlan", key = "'currentDistrictPlan'+#state+#districtID ")
    public Optional<currentDistrictPlan> findByDistrictID(String state, String districtID){
        return currentDistrictPlan_Repository.findByStateAndDistrictID(state, districtID);
    }
}