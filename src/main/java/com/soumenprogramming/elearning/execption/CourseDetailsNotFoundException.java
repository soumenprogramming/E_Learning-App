package com.soumenprogramming.elearning.execption;

public class CourseDetailsNotFoundException extends RuntimeException {
    public CourseDetailsNotFoundException(String message) {
        super(message);
    }
}
