package com.soumenprogramming.elearning.dao;

import com.soumenprogramming.elearning.execption.CourseDetailsNotFoundException;
import com.soumenprogramming.elearning.model.CourseDetails;
import com.soumenprogramming.elearning.repository.CourseDetailsRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;

@Service
public class CourseDetailsService {

    @Autowired
    private CourseDetailsRepo courseDetailsRepo;

    @Transactional
    public CourseDetails save(CourseDetails courseDetails) {
        return courseDetailsRepo.save(courseDetails);
    }

    @Transactional(readOnly = true)
    public CourseDetails findById(int id) {
        return courseDetailsRepo.findById(id).orElse(null);
    }

    @Transactional(readOnly = true)
    public CourseDetails findByCourseName(String courseName) {
        return courseDetailsRepo.findByCourseName(courseName);
    }

    @Transactional
    public CourseDetails update(int id, CourseDetails updatedCourseDetails) {
        CourseDetails existingCourseDetails = courseDetailsRepo.findById(id).orElse(null);
        if (existingCourseDetails != null) {
            // Update fields
            existingCourseDetails.setCourseName(updatedCourseDetails.getCourseName());
            existingCourseDetails.setCourseDescription(updatedCourseDetails.getCourseDescription());
            existingCourseDetails.setCoursePrice(updatedCourseDetails.getCoursePrice());
            existingCourseDetails.setCourseDuration(updatedCourseDetails.getCourseDuration());
            existingCourseDetails.setCourseInstructor(updatedCourseDetails.getCourseInstructor());
            existingCourseDetails.setCourseImage(updatedCourseDetails.getCourseImage());
            existingCourseDetails.setCourseCategory(updatedCourseDetails.getCourseCategory());
            existingCourseDetails.setCourseRating(updatedCourseDetails.getCourseRating());
            // Save updated entity
            return courseDetailsRepo.save(existingCourseDetails);
        } else {
            throw new CourseDetailsNotFoundException("CourseDetails not found with id: " + id);
        }
    }

    @Transactional
    public boolean deleteById(int id) {
        CourseDetails existingCourseDetails = courseDetailsRepo.findById(id).orElse(null);
        if (existingCourseDetails != null) {
            courseDetailsRepo.delete(existingCourseDetails);
            return true;
        }
        return false;
    }
    public List<CourseDetails> findAll() {
        return courseDetailsRepo.findAll();
    }
}
