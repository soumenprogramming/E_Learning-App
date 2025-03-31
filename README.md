E-Learning App


An interactive e-learning platform built with Spring Boot for the backend and HTML, CSS, and JavaScript for the frontend.


Features
✅ User Authentication (Sign Up & Login)
✅ Profile Management (View & Edit Profile)
✅ Course Management (Add, View, and Filter Courses)
✅ Secure and Scalable Backend with Spring Boot
✅ Responsive Frontend with HTML, CSS, and JavaScript

Technologies Used
Backend: Spring Boot, Spring Security, PostgreSQL (or YugabyteDB)

Frontend: HTML, CSS, JavaScript

Build Tool: Maven/Manually added JARs

Database: PostgreSQL / YugabyteDB

Installation & Setup
1. Clone the Repository
sh
Copy
Edit
git clone https://github.com/yourusername/your-repo-name.git  
cd your-repo-name
2. Backend Setup
Install Java 17+ and PostgreSQL/YugabyteDB

Configure database settings in application.properties

Run the Spring Boot application

sh
Copy
Edit
mvn spring-boot:run
3. Frontend Setup
Open index.html in a browser or deploy it using a web server.

API Endpoints
Endpoint	Method	Description
/api/auth/signup	POST	User Registration
/api/auth/login	POST	User Login
/api/profile	GET	Fetch User Profile
/api/courses	GET	Get Course List
/api/courses/{id}	GET	Get Course Details
Contributing
Feel free to fork and contribute by submitting a pull request.

License
This project is licensed under the MIT License.
