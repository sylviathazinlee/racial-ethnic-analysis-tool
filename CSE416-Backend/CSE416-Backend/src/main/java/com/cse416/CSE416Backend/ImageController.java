package com.cse416.CSE416Backend;

import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("images")
public class ImageController {

    @GetMapping("/{state}/{number}")
    public ResponseEntity<byte[]> getImage(
            @PathVariable String state,
            @PathVariable int number) {
        try {
            if (!state.equals("NY") && !state.equals("SC")) {
                return ResponseEntity.badRequest().build();
            }
            if (state.equals("NY") && (number > 150 || number < 1)
                    || (state.equals("SC") && (number > 124 || number < 1))) {
                return ResponseEntity.badRequest().build();
            }
            // Construct the absolute path to the image file based on the state and number
            String imagePath = String.format(
                    "C:\\Users\\sylvi\\github_Files\\TeamKnicks\\CSE416-Backend\\CSE416-Backend\\src\\main\\resources\\%s\\%d.jpg",
                    state, number);

            // Read the image data into a byte array
            byte[] imageData = Files.readAllBytes(Paths.get(imagePath));

            // Set the content type to image/jpeg
            MediaType mediaType = MediaType.IMAGE_JPEG;

            // Return the image data in the response with the appropriate content type
            return ResponseEntity.ok().contentType(mediaType).body(imageData);
        } catch (IOException e) {
            // Log the error or return an appropriate error response
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }

    }
}
