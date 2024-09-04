package com.soumenprogramming.elearning.controller;

import com.soumenprogramming.elearning.dao.CourseDetailsService;
import com.soumenprogramming.elearning.execption.CourseDetailsNotFoundException;
import com.soumenprogramming.elearning.model.CourseDetails;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class CourseDetailsController {

    @Autowired
    private CourseDetailsService courseDetailsService;

    @GetMapping("/course")
    public ResponseEntity<List<CourseDetails>> getCourseDetails() {
        List<CourseDetails> courses = courseDetailsService.findAll();
        if (courses.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } else {
            return new ResponseEntity<>(courses, HttpStatus.OK);
        }
    }

    @GetMapping("/course/{id}")
    public ResponseEntity<CourseDetails> getCourseDetailsById(@PathVariable int id) {
        CourseDetails course = courseDetailsService.findById(id);
        if (course == null) {
            throw new CourseDetailsNotFoundException("CourseDetails not found with id: " + id);
        }
        return new ResponseEntity<>(course, HttpStatus.OK);
    }

    @GetMapping("/course/name/{courseName}")
    public ResponseEntity<CourseDetails> getCourseDetailsByName(@PathVariable String courseName) {
        CourseDetails course = courseDetailsService.findByCourseName(courseName);
        if (course == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(course, HttpStatus.OK);
    }

    @PostMapping("/course")
    public ResponseEntity<CourseDetails> saveCourseDetails(@RequestBody CourseDetails courseDetails) {
        CourseDetails savedCourse = courseDetailsService.save(courseDetails);
        return new ResponseEntity<>(savedCourse, HttpStatus.CREATED);
    }

    @PutMapping("/course/{id}")
    public ResponseEntity<CourseDetails> updateCourseDetails(@PathVariable int id, @RequestBody CourseDetails updatedCourseDetails) {
        CourseDetails updatedCourse = courseDetailsService.update(id, updatedCourseDetails);
        if (updatedCourse == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(updatedCourse, HttpStatus.OK);
    }

    @DeleteMapping("/course/{id}")
    public ResponseEntity<Void> deleteCourseDetails(@PathVariable int id) {
        boolean isDeleted = courseDetailsService.deleteById(id);
        if (!isDeleted) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
