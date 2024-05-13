package com.cse416.CSE416Backend;

import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/v1/countyGeoData")
public class get_geoData {
    @GetMapping("/{state}")
    public ResponseEntity<String> getGeoJSON(@PathVariable String state) throws IOException {
        if(state.equals("NY")) {
            Resource resource = new ClassPathResource("ny-geodata.json");
            String geoJSON = new String(Files.readAllBytes(Paths.get(resource.getURI())));

            // Return GeoJSON as response
            return ResponseEntity.ok()
                    .header("Content-Type", "application/json")
                    .body(geoJSON);
        }
        else if(state.equals("SC")){
            Resource resource = new ClassPathResource("sc-geodata.json");
            String geoJSON = new String(Files.readAllBytes(Paths.get(resource.getURI())));

            // Return GeoJSON as response
            return ResponseEntity.ok()
                    .header("Content-Type", "application/json")
                    .body(geoJSON);
        }else{
            return ResponseEntity.badRequest().build();
        }
    }
//    @GetMapping("/ny")
//    public ResponseEntity<String> getNYGeoJSON() throws IOException {
//        Resource resource = new ClassPathResource("ny-geodata.json");
//        String geoJSON = new String(Files.readAllBytes(Paths.get(resource.getURI())));
//
//        // Return GeoJSON as response
//        return ResponseEntity.ok()
//                .header("Content-Type", "application/json")
//                .body(geoJSON);
//    }
//
//    @GetMapping("/sc")
//    public ResponseEntity<String> getSCGeoJSON() throws IOException {
//        Resource resource = new ClassPathResource("sc-geodata.json");
//        String geoJSON = new String(Files.readAllBytes(Paths.get(resource.getURI())));
//
//        // Return GeoJSON as response
//        return ResponseEntity.ok()
//                .header("Content-Type", "application/json")
//                .body(geoJSON);
//    }
}
