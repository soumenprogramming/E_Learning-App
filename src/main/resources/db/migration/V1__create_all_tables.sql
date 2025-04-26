-- Table for login_details
CREATE TABLE IF NOT EXISTS login_details (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    full_name VARCHAR(255)
);

-- Table for logindetails (if needed, but likely redundant with login_details)
CREATE TABLE IF NOT EXISTS logindetails (
    id INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(255),
    email VARCHAR(255),
    password VARCHAR(255),
    full_name VARCHAR(255)
);

-- Table for courses
CREATE TABLE IF NOT EXISTS courses (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    price DOUBLE NOT NULL,
    image_url VARCHAR(255),
    instructor VARCHAR(255) NOT NULL,
    duration VARCHAR(255) NOT NULL,
    students INT NOT NULL,
    rating DOUBLE NOT NULL
);

-- Table for course_details
CREATE TABLE IF NOT EXISTS course_details (
    id INT PRIMARY KEY AUTO_INCREMENT,
    course_name VARCHAR(255),
    course_description TEXT,
    course_price DOUBLE,
    course_duration INT,
    course_instructor VARCHAR(255),
    course_image VARCHAR(255),
    course_category VARCHAR(255),
    course_rating DOUBLE
);

-- Table for payment_details
CREATE TABLE IF NOT EXISTS payment_details (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT,
    course_id INT,
    amount DOUBLE,
    payment_id INT,
    payment_date TIMESTAMP,
    payment_status VARCHAR(255),
    payment_mode VARCHAR(255),
    transaction_id VARCHAR(255)
);

-- Table for query_details
CREATE TABLE IF NOT EXISTS query_details (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255),
    email VARCHAR(255),
    query TEXT
);

-- Table for subscription_details
CREATE TABLE IF NOT EXISTS subscription_details (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT,
    course_id INT,
    subscription_id INT,
    subscription_startdate VARCHAR(255),
    subscription_enddate VARCHAR(255),
    subscription_status VARCHAR(255),
    subscription_amount DOUBLE,
    subscription_mode VARCHAR(255),
    transaction_id VARCHAR(255)
);

-- Table for user_courses
CREATE TABLE IF NOT EXISTS user_courses (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    user_id BIGINT NOT NULL,
    course_id BIGINT NOT NULL,
    registration_date TIMESTAMP NOT NULL
);
