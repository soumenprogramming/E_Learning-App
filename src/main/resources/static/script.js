document.addEventListener('DOMContentLoaded', function () {
    console.log('DOM fully loaded and parsed');
    
    // Force hide profile dropdown immediately
    const profileDropdown = document.getElementById('profileDropdown');
    if (profileDropdown) {
        console.log('Force hiding profile dropdown on DOMContentLoaded');
        profileDropdown.style.display = 'none';
        // Add inline style to ensure it stays hidden
        profileDropdown.setAttribute('style', 'display: none !important');
        
        // Add a class to force hide it
        profileDropdown.classList.add('d-none');
    }
    
    // Check and clear any invalid login data
    const loggedInUser = localStorage.getItem('loggedInUser');
    if (loggedInUser) {
        try {
            // Try to parse the JSON to verify it's valid
            JSON.parse(loggedInUser);
        } catch (e) {
            // Invalid JSON in localStorage, clear it
            console.error('Invalid JSON in localStorage:', e);
            localStorage.removeItem('loggedInUser');
        }
    }
    
    // Sign Up Form Elements
    const signupForm = document.getElementById('signupForm');
    const signupResponse = document.getElementById('signupResponse');
    console.log('Signup form element:', signupForm);
    console.log('Signup response element:', signupResponse);

    // Sign In Form Elements
    const loginForm = document.getElementById('loginForm');
    const signinResponse = document.getElementById('loginResponse');
    console.log('Login form element:', loginForm);
    console.log('Login response element:', signinResponse);

    // Contact Form Elements
    const contactForm = document.getElementById('contactForm');
    const successMessage = document.getElementById('successMessage');
    console.log('Contact form element:', contactForm);
    console.log('Success message element:', successMessage);

    // Profile Elements
    const profileUsername = document.getElementById('profileUsername');
    const profilePassword = document.getElementById('profilePassword');
    console.log('Profile username element:', profileUsername);
    console.log('Profile password element:', profilePassword);

    // Logout Link
    const logoutLink = document.getElementById('logoutLink');
    console.log('Logout link element:', logoutLink);

    // Directly hide profile dropdown by default
    if (profileDropdown) {
        console.log('Directly hiding profile dropdown');
        profileDropdown.style.display = 'none';
        // Add inline style to ensure it stays hidden
        profileDropdown.setAttribute('style', 'display: none !important');
    }

    // Update UI based on login status
    updateUIForLoginStatus();

    // Sign Up Form Submission
    if (signupForm) {
        signupForm.addEventListener('submit', function (event) {
            event.preventDefault();
            console.log('Signup form submitted');

            // Get the values from the sign up form
            const username = document.getElementById('signupUsername').value;
            const email = document.getElementById('signupEmail').value;
            const password = document.getElementById('signupPassword').value;
            console.log('Signup username:', username);
            console.log('Signup email:', email);
            console.log('Signup password:', password);

            // Send the data to the backend via a POST request
            console.log('Sending fetch request to http://localhost:8080/api/signup');
            fetch('http://localhost:8080/api/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username, email, password })
            })
            .then(response => {
                console.log('Signup response status:', response.status);
                if (!response.ok) {
                    return response.json().then(data => {
                        throw new Error(data.message || 'Signup failed');
                    });
                }
                return response.json();
            })
            .then(data => {
                console.log('Signup response data:', data);
                if (data.status === 'success') {
                    signupResponse.textContent = data.message;
                    signupResponse.className = 'text-center text-success';
                    // Clear form fields
                    document.getElementById('signupUsername').value = '';
                    document.getElementById('signupEmail').value = '';
                    document.getElementById('signupPassword').value = '';
                    document.getElementById('signupFullName').value = '';
                    
                    // Force hide profile dropdown after signup
                    const profileDropdown = document.getElementById('profileDropdown');
                    if (profileDropdown) {
                        console.log('Force hiding profile dropdown after signup');
                        profileDropdown.style.display = 'none';
                        profileDropdown.setAttribute('style', 'display: none !important');
                        profileDropdown.classList.add('d-none');
                    }
                    
                    // Redirect to login page after successful signup
                    setTimeout(() => {
                        window.location.href = 'login.html';
                    }, 2000);
                } else {
                    signupResponse.textContent = data.message || 'Signup failed. Please try again.';
                    signupResponse.className = 'text-center text-danger';
                }
            })
            .catch(error => {
                console.error('Error during signup:', error);
                signupResponse.textContent = 'An error occurred. Please try again.';
            });
        });
    } else {
        console.warn('Signup form not found in the DOM');
    }

    // Sign In Form Submission
    if (loginForm) {
        console.log('Login form found in the DOM, adding submit event listener');
        loginForm.addEventListener('submit', function (event) {
            event.preventDefault();
            console.log('Login form submitted');

            // Get the values from the sign in form
            const username = document.getElementById('loginUsername').value;
            const password = document.getElementById('loginPassword').value;
            
            console.log('Username:', username);
            console.log('Password:', password);

            // Send the data to the backend via a POST request
            console.log('Sending fetch request to http://localhost:8080/api/login');
            
            // Create the request body
            const requestBody = JSON.stringify({ username, password });
            console.log('Request body:', requestBody);
            
            fetch('http://localhost:8080/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: requestBody
            })
            .then(response => {
                console.log('Response status:', response.status);
                console.log('Response headers:', response.headers);
                
                if (!response.ok) {
                    return response.json().then(data => {
                        throw new Error(data.message || 'Login failed');
                    });
                }
                
                // Check if the response is JSON
                const contentType = response.headers.get('content-type');
                if (contentType && contentType.includes('application/json')) {
                    return response.json();
                } else {
                    return response.text().then(text => {
                        console.log('Non-JSON response:', text);
                        throw new Error('Expected JSON response but got: ' + text);
                    });
                }
            })
            .then(data => {
                console.log('Response data:', data);
                
                if (data.status === 'success') {
                    signinResponse.textContent = data.message;
                    signinResponse.className = 'text-center text-success';
                    
                    // Store user information in localStorage
                    console.log('Login successful, storing user info in localStorage');
                    localStorage.setItem('loggedInUser', JSON.stringify(data));
                    
                    // Force show profile dropdown after successful login
                    const profileDropdown = document.getElementById('profileDropdown');
                    if (profileDropdown) {
                        console.log('Force showing profile dropdown after successful login');
                        profileDropdown.style.display = 'block';
                        profileDropdown.removeAttribute('style');
                        profileDropdown.classList.remove('d-none');
                    }
                    
                    // Hide login link
                    const loginLink = document.getElementById('loginLink');
                    if (loginLink) {
                        loginLink.style.display = 'none';
                    }
                    
                    // Hide Join Now buttons
                    const joinNowButtons = document.querySelectorAll('[id^="joinNowButton"], [id^="carouselJoinNowButton"], [id^="courseJoinNowButton"]');
                    joinNowButtons.forEach(button => {
                        button.style.display = 'none';
                    });
                    
                    // Redirect to profile page on successful login
                    console.log('Login successful, redirecting to profile page');
                    setTimeout(() => {
                        window.location.href = 'profile.html';
                    }, 1000);
                } else {
                    signinResponse.textContent = data.message || 'Login failed. Please try again.';
                    signinResponse.className = 'text-center text-danger';
                }
            })
            .catch(error => {
                console.error('Error during login:', error);
                signinResponse.textContent = 'An error occurred. Please try again.';
            });
        });
    } else {
        console.warn('Login form not found in the DOM');
    }

    // Contact Form Submission
    if (contactForm) {
        contactForm.addEventListener('submit', function (event) {
            event.preventDefault();
            console.log('Contact form submitted');

            // Get the values from the contact form
            const formData = new FormData(contactForm);
            const data = Object.fromEntries(formData.entries());
            console.log('Contact form data:', data);

            // Send the data to the backend via a POST request
            console.log('Sending fetch request to /api/querydetails');
            fetch('/api/querydetails', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
            .then(response => {
                console.log('Contact response status:', response.status);
                return response.json();
            })
            .then(result => {
                console.log('Contact response data:', result);
                successMessage.textContent = 'Query successfully sent!';
                contactForm.reset(); // Clear the form
            })
            .catch(error => {
                console.error('Error during contact form submission:', error);
                alert('An error occurred. Please try again.');
            });
        });
    } else {
        console.warn('Contact form not found in the DOM');
    }

    // Logout functionality
    if (logoutLink) {
        logoutLink.addEventListener('click', function(event) {
            event.preventDefault();
            console.log('Logout clicked');
            
            // Clear user data from localStorage
            localStorage.removeItem('loggedInUser');
            console.log('User data cleared from localStorage');
            
            // Redirect to login page
            window.location.href = 'login.html';
        });
    }

    // Function to check if user is logged in
    function isUserLoggedIn() {
        const loggedInUser = localStorage.getItem('loggedInUser');
        if (!loggedInUser) {
            return false;
        }
        
        try {
            // Try to parse the JSON to verify it's valid
            const userData = JSON.parse(loggedInUser);
            return userData && userData.status === 'success';
        } catch (e) {
            // Invalid JSON in localStorage, clear it
            console.error('Invalid JSON in localStorage:', e);
            localStorage.removeItem('loggedInUser');
            return false;
        }
    }

    // Function to update UI based on login status
    function updateUIForLoginStatus() {
        const loggedIn = isUserLoggedIn();
        const loginLink = document.getElementById('loginLink');
        const profileDropdown = document.getElementById('profileDropdown');
        const joinNowButtons = document.querySelectorAll('[id^="joinNowButton"], [id^="carouselJoinNowButton"], [id^="courseJoinNowButton"]');
        
        console.log('Updating UI for login status:', loggedIn);
        console.log('Found Join Now buttons:', joinNowButtons.length);
        console.log('Login link element:', loginLink);
        console.log('Profile dropdown element:', profileDropdown);
        
        // Force hide profile dropdown by default
        if (profileDropdown) {
            console.log('Force hiding profile dropdown in updateUIForLoginStatus');
            profileDropdown.style.display = 'none';
            // Add inline style to ensure it stays hidden
            profileDropdown.setAttribute('style', 'display: none !important');
            // Add a class to force hide it
            profileDropdown.classList.add('d-none');
        }
        
        if (loggedIn) {
            // User is logged in
            if (loginLink) loginLink.style.display = 'none';
            if (profileDropdown) {
                profileDropdown.style.display = 'block';
                // Remove the !important style if user is logged in
                profileDropdown.removeAttribute('style');
                // Remove the d-none class
                profileDropdown.classList.remove('d-none');
            }
            
            // Hide Join Now buttons as user is already logged in
            console.log('User is logged in, hiding Join Now buttons');
            joinNowButtons.forEach(button => {
                console.log('Hiding Join Now button:', button.id);
                button.style.display = 'none';
                // Add inline style to ensure it stays hidden
                button.setAttribute('style', 'display: none !important');
                // Add a class to force hide it
                button.classList.add('d-none');
            });
            
            // Also hide any other Join Now buttons that might be in the DOM
            const allJoinNowButtons = document.querySelectorAll('a:contains("Join Now"), button:contains("Join Now")');
            allJoinNowButtons.forEach(button => {
                console.log('Hiding additional Join Now button:', button.id || button.textContent);
                button.style.display = 'none';
                button.setAttribute('style', 'display: none !important');
                button.classList.add('d-none');
            });
        } else {
            // User is not logged in
            if (loginLink) loginLink.style.display = 'block';
            if (profileDropdown) {
                profileDropdown.style.display = 'none';
                // Add inline style to ensure it stays hidden
                profileDropdown.setAttribute('style', 'display: none !important');
                // Add a class to force hide it
                profileDropdown.classList.add('d-none');
            }
            
            // Show Join Now buttons
            console.log('User is not logged in, showing Join Now buttons');
            joinNowButtons.forEach(button => {
                console.log('Showing Join Now button:', button.id);
                button.style.display = 'block';
                // Remove any inline style that might be hiding it
                button.removeAttribute('style');
                // Remove the d-none class
                button.classList.remove('d-none');
            });
        }
    }

    // Call updateUIForLoginStatus when the page loads
    updateUIForLoginStatus();

    // Call updateUIForLoginStatus when the user navigates to a new page
    window.addEventListener('popstate', updateUIForLoginStatus);

    // Call updateUIForLoginStatus when the page is loaded or refreshed
    window.addEventListener('load', updateUIForLoginStatus);

    // Call updateUIForLoginStatus when the DOM content is loaded
    document.addEventListener('DOMContentLoaded', updateUIForLoginStatus);

    // Function to handle logout
    function handleLogout() {
        console.log('Logging out user');
        localStorage.removeItem('loggedInUser');
        updateUIForLoginStatus();
        window.location.href = 'index.html';
    }

    // Function to load registered courses
    async function loadRegisteredCourses() {
        const loggedInUser = localStorage.getItem('loggedInUser');
        if (!loggedInUser) {
            window.location.href = 'login.html';
            return;
        }

        try {
            const response = await fetch('http://localhost:8080/api/courses/registered', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${loggedInUser}`
                }
            });

            if (!response.ok) {
                throw new Error('Failed to load registered courses');
            }

            const courses = await response.json();
            const coursesContainer = document.querySelector('.row.g-4.justify-content-center');
            
            if (coursesContainer && courses.length > 0) {
                coursesContainer.innerHTML = courses.map(course => `
                    <div class="col-lg-4 col-md-6 wow fadeInUp" data-wow-delay="0.1s">
                        <div class="course-item bg-light">
                            <div class="position-relative overflow-hidden">
                                <img class="img-fluid" src="${course.imageUrl || 'img/course-1.jpg'}" alt="${course.title}">
                                <div class="w-100 d-flex justify-content-center position-absolute bottom-0 start-0 mb-4">
                                    <a href="course-details.html?id=${course.id}" class="flex-shrink-0 btn btn-sm btn-primary px-3 border-end" style="border-radius: 30px 0 0 30px;">View Course</a>
                                    <a href="course-content.html?id=${course.id}" class="flex-shrink-0 btn btn-sm btn-primary px-3" style="border-radius: 0 30px 30px 0;">Continue Learning</a>
                                </div>
                            </div>
                            <div class="text-center p-4 pb-0">
                                <h3 class="mb-0">$${course.price}</h3>
                                <div class="mb-3">
                                    ${Array(5).fill('<small class="fa fa-star text-primary"></small>').join('')}
                                    <small>(${course.rating || 0})</small>
                                </div>
                                <h5 class="mb-4">${course.title}</h5>
                            </div>
                            <div class="d-flex border-top">
                                <small class="flex-fill text-center border-end py-2"><i class="fa fa-user-tie text-primary me-2"></i>${course.instructor}</small>
                                <small class="flex-fill text-center border-end py-2"><i class="fa fa-clock text-primary me-2"></i>${course.duration}</small>
                                <small class="flex-fill text-center py-2"><i class="fa fa-user text-primary me-2"></i>${course.students} Students</small>
                            </div>
                        </div>
                    </div>
                `).join('');
            } else if (coursesContainer) {
                coursesContainer.innerHTML = `
                    <div class="col-12 text-center">
                        <h3>No registered courses found</h3>
                        <p>Browse our available courses and start learning today!</p>
                        <a href="courses.html" class="btn btn-primary">Browse Courses</a>
                    </div>
                `;
            }
        } catch (error) {
            console.error('Error loading registered courses:', error);
            const coursesContainer = document.querySelector('.row.g-4.justify-content-center');
            if (coursesContainer) {
                coursesContainer.innerHTML = `
                    <div class="col-12 text-center">
                        <h3>Error loading courses</h3>
                        <p>Please try again later.</p>
                    </div>
                `;
            }
        }
    }

    // Add event listener for page navigation to ensure UI is updated
    window.addEventListener('popstate', function() {
        console.log('Page navigation detected, updating UI');
        updateUIForLoginStatus();
    });

    // Add event listener for page load to ensure UI is updated
    window.addEventListener('load', function() {
        console.log('Page loaded, updating UI');
        updateUIForLoginStatus();
    });

    // Add event listener for all navigation links to ensure UI is updated
    document.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', function() {
            console.log('Link clicked:', this.href);
            // We'll update the UI after a short delay to allow the page to load
            setTimeout(updateUIForLoginStatus, 100);
        });
    });

    // Show and Hide Modal Functions
    function showModal(modalId) {
        document.getElementById(modalId + '-modal').style.display = 'block';
    }

    function closeModal(modalId) {
        document.getElementById(modalId + '-modal').style.display = 'none';
    }

    // Toggle Dropdown Menu
    function toggleDropdown() {
        const dropdownMenu = document.getElementById('dropdownMenu');
        dropdownMenu.style.display = dropdownMenu.style.display === 'block' ? 'none' : 'block';
    }

    // Handle Navigation
    const sections = document.querySelectorAll('.section');
    document.querySelectorAll('.top-nav a').forEach(link => {
        link.addEventListener('click', function (event) {
            event.preventDefault();
            const targetId = this.id.replace('Link', '');
            sections.forEach(section => {
                section.style.display = (section.id === targetId) ? 'block' : 'none';
            });
            
            // Update UI based on login status after navigation
            updateUIForLoginStatus();
        });
    });

    // Handle Contact and About Page Navigation Separately
    document.getElementById('contactLink').addEventListener('click', function (event) {
        event.preventDefault();
        const contactSection = document.getElementById('Contact');
        sections.forEach(section => section.style.display = 'none');
        contactSection.style.display = 'block';
        
        // Update UI based on login status after navigation
        updateUIForLoginStatus();
    });

    // Handle Home or Logo Click
    const homeLink = document.getElementById('homeLink');
    const logoLink = document.getElementById('logoLink');
    const firstPageSection = document.getElementById('Home');

    function showHomePage(event) {
        event.preventDefault();
        sections.forEach(section => section.style.display = 'none');
        firstPageSection.style.display = 'block';
        
        // Update UI based on login status after navigation
        updateUIForLoginStatus();
    }

    homeLink.addEventListener('click', showHomePage);
    logoLink.addEventListener('click', showHomePage);

    // Close modal if clicked outside of it
    window.onclick = function (event) {
        if (event.target.classList.contains('modal')) {
            event.target.style.display = 'none';
        }

        if (!event.target.matches('#accountButton')) {
            const dropdowns = document.getElementsByClassName("dropdown-menu");
            for (let i = 0; i < dropdowns.length; i++) {
                const openDropdown = dropdowns[i];
                if (openDropdown.style.display === 'block') {
                    openDropdown.style.display = 'none';
                }
            }
        }
    };

    // Expose functions to global scope
    window.showModal = showModal;
    window.closeModal = closeModal;
    window.toggleDropdown = toggleDropdown;

    // Load registered courses if on the registered-courses page
    if (window.location.pathname.includes('registered-courses.html')) {
        loadRegisteredCourses();
    }

    // Handle logout
    if (logoutLink) {
        logoutLink.addEventListener('click', function(e) {
            e.preventDefault();
            handleLogout();
        });
    }

    // Function to register for a course
    async function registerForCourse(courseId) {
        const loggedInUser = localStorage.getItem('loggedInUser');
        if (!loggedInUser) {
            window.location.href = 'login.html';
            return;
        }

        try {
            const response = await fetch(`http://localhost:8080/api/courses/${courseId}/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${loggedInUser}`
                }
            });

            if (!response.ok) {
                throw new Error('Failed to register for course');
            }

            // Show success message
            alert('Successfully registered for the course!');
            
            // If on the courses page, update the UI
            const joinNowButton = document.querySelector(`a[data-course-id="${courseId}"]`);
            if (joinNowButton) {
                joinNowButton.textContent = 'Registered';
                joinNowButton.classList.remove('btn-primary');
                joinNowButton.classList.add('btn-success');
                joinNowButton.disabled = true;
            }
        } catch (error) {
            console.error('Error registering for course:', error);
            alert('Failed to register for the course. Please try again later.');
        }
    }

    // Add click handlers for "Join Now" buttons
    const joinNowButtons = document.querySelectorAll('a[id^="joinNowButton"], a[id^="carouselJoinNowButton"], a[id^="courseJoinNowButton"]');
    joinNowButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const courseId = this.getAttribute('data-course-id');
            if (courseId) {
                registerForCourse(courseId);
            }
        });
    });

    // Function to force hide profile dropdown on all pages
    function forceHideProfileDropdownOnAllPages() {
        console.log('Force hiding profile dropdown on all pages');
        const profileDropdown = document.getElementById('profileDropdown');
        if (profileDropdown) {
            console.log('Found profile dropdown, hiding it');
            profileDropdown.style.display = 'none';
            profileDropdown.setAttribute('style', 'display: none !important');
            profileDropdown.classList.add('d-none');
            
            // Also hide any dropdown menu inside it
            const dropdownMenu = profileDropdown.querySelector('.dropdown-menu');
            if (dropdownMenu) {
                dropdownMenu.style.display = 'none';
                dropdownMenu.setAttribute('style', 'display: none !important');
            }
        }
        
        // Check if user is logged in
        const loggedInUser = localStorage.getItem('loggedInUser');
        if (!loggedInUser) {
            console.log('No user logged in, ensuring profile dropdown is hidden');
            if (profileDropdown) {
                profileDropdown.style.display = 'none';
                profileDropdown.setAttribute('style', 'display: none !important');
                profileDropdown.classList.add('d-none');
            }
        }
    }

    // Call forceHideProfileDropdownOnAllPages immediately
    forceHideProfileDropdownOnAllPages();

    // Call forceHideProfileDropdownOnAllPages when the page loads
    window.addEventListener('load', forceHideProfileDropdownOnAllPages);

    // Call forceHideProfileDropdownOnAllPages when the DOM content is loaded
    document.addEventListener('DOMContentLoaded', forceHideProfileDropdownOnAllPages);

    // Add a MutationObserver to watch for changes to the profile dropdown
    const observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (mutation.type === 'attributes' && mutation.attributeName === 'style') {
                const profileDropdownElement = document.getElementById('profileDropdown');
                if (profileDropdownElement && !isUserLoggedIn()) {
                    console.log('MutationObserver detected style change on profile dropdown, forcing hide');
                    profileDropdownElement.style.display = 'none';
                    profileDropdownElement.setAttribute('style', 'display: none !important');
                    profileDropdownElement.classList.add('d-none');
                    
                    // Also hide any dropdown menu inside it
                    const dropdownMenu = profileDropdownElement.querySelector('.dropdown-menu');
                    if (dropdownMenu) {
                        dropdownMenu.style.display = 'none';
                        dropdownMenu.setAttribute('style', 'display: none !important');
                    }
                }
            }
        });
    });
    
    // Start observing the profile dropdown if it exists
    const profileDropdownElement = document.getElementById('profileDropdown');
    if (profileDropdownElement) {
        observer.observe(profileDropdownElement, { attributes: true });
    }
});