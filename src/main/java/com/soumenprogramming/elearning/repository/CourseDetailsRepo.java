package com.soumenprogramming.elearning.repository;


import com.soumenprogramming.elearning.model.CourseDetails;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CourseDetailsRepo extends JpaRepository<CourseDetails, Integer> {
    List<CourseDetails> findByCourseCategory(String courseCategory);

    List<CourseDetails> findByCourseInstructor(String courseInstructor);

    List<CourseDetails> findByCourseRating(double courseRating);

    CourseDetails findByCourseName(String courseName);
}
