document.addEventListener('DOMContentLoaded', function () {
    // Sign Up Form Elements
    const signupForm = document.getElementById('signupForm');
    const signupResponse = document.getElementById('signupResponse');

    // Sign In Form Elements
    const signinForm = document.getElementById('signinForm');
    const signinResponse = document.getElementById('signinResponse');

    // Sign Up Form Submission
    signupForm.addEventListener('submit', function (event) {
        event.preventDefault();

        // Get the values from the sign up form
        const username = document.getElementById('signup-username').value;
        const email = document.getElementById('signup-email').value;
        const password = document.getElementById('signup-password').value;

        // Send the data to the backend via a POST request
        fetch('/api/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, email, password })
        })
            .then(response => response.text())
            .then(data => {
                signupResponse.textContent = data;
            })
            .catch(error => {
                signupResponse.textContent = 'Error: ' + error;
            });
    });

    // Sign In Form Submission
    signinForm.addEventListener('submit', function (event) {
        event.preventDefault();

        // Get the values from the sign in form
        const username = document.getElementById('signin-username').value;
        const password = document.getElementById('signin-password').value;

        // Send the data to the backend via a POST request
        fetch('/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        })
            .then(response => response.json())
            .then(data => {
                if (data.status === 'success') {
                    // Hide Sign Up and Sign In buttons
                    document.querySelector('button[onclick="showModal(\'signup\')"]').style.display = 'none';
                    document.querySelector('button[onclick="showModal(\'signin\')"]').style.display = 'none';

                    // Show Account button
                    document.getElementById('accountButton').style.display = 'block';
                }
                signinResponse.textContent = data.message;
            })
            .catch(error => {
                signinResponse.textContent = 'Error: ' + error;
            });
    });

    // Contact Form Submission
    const contactForm = document.getElementById('contactForm');
    contactForm.addEventListener('submit', function (event) {
        event.preventDefault();

        // Get the values from the contact form
        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData.entries());

        // Send the data to the backend via a POST request
        fetch('/api/querydetails', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(response => response.json())
            .then(result => {
                document.getElementById('successMessage').textContent = 'Query successfully sent!';
                contactForm.reset(); // Clear the form
            })
            .catch(error => {
                console.error('Error:', error);
                alert('An error occurred. Please try again.');
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
        });
    });

    // Handle Contact Page Navigation
    document.getElementById('contactLink').addEventListener('click', function (event) {
        event.preventDefault();
        const contactSection = document.getElementById('Contact');
        sections.forEach(section => section.style.display = 'none');
        contactSection.style.display = 'block';
    });

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
});
