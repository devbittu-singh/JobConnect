// Mobile Navigation
document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    if (hamburger && navLinks) {
        hamburger.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            hamburger.classList.toggle('active');
        });
    }
    
    // Password toggle visibility
    const togglePasswordButtons = document.querySelectorAll('.toggle-password');
    
    togglePasswordButtons.forEach(button => {
        button.addEventListener('click', function() {
            const input = this.previousElementSibling;
            const type = input.getAttribute('type') === 'password' ? 'text' : 'password';
            input.setAttribute('type', type);
            this.classList.toggle('fa-eye-slash');
            this.classList.toggle('fa-eye');
        });
    });
    
    // Role selection in signup
    const workerBtn = document.getElementById('workerBtn');
    const employerBtn = document.getElementById('employerBtn');
    const companyField = document.getElementById('companyField');
    
    if (workerBtn && employerBtn && companyField) {
        workerBtn.addEventListener('click', function(e) {
            e.preventDefault();
            workerBtn.classList.add('active');
            employerBtn.classList.remove('active');
            companyField.style.display = 'none';
        });
        
        employerBtn.addEventListener('click', function(e) {
            e.preventDefault();
            employerBtn.classList.add('active');
            workerBtn.classList.remove('active');
            companyField.style.display = 'block';
        });
        
        // Check URL parameter for role
        const urlParams = new URLSearchParams(window.location.search);
        const role = urlParams.get('role');
        
        if (role === 'employer') {
            employerBtn.click();
        }
    }
    
    // Password strength indicator
    const passwordInput = document.getElementById('password');
    if (passwordInput) {
        passwordInput.addEventListener('input', function() {
            const strengthBars = document.querySelectorAll('.strength-bar');
            const strengthText = document.querySelector('.strength-text');
            const password = this.value;
            let strength = 0;
            
            // Check for length
            if (password.length >= 8) strength++;
            
            // Check for uppercase letters
            if (/[A-Z]/.test(password)) strength++;
            
            // Check for numbers and special characters
            if (/[0-9]/.test(password) || /[^A-Za-z0-9]/.test(password)) strength++;
            
            // Update UI
            strengthBars.forEach((bar, index) => {
                if (index < strength) {
                    bar.style.backgroundColor = getStrengthColor(strength);
                    bar.style.width = '100%';
                } else {
                    bar.style.backgroundColor = '#e9ecef';
                    bar.style.width = '0%';
                }
            });
            
            if (strengthText) {
                strengthText.textContent = getStrengthText(strength);
                strengthText.style.color = getStrengthColor(strength);
            }
        });
    }
    
    // Form validation and submission
    const signupForm = document.getElementById('signupForm');
    if (signupForm) {
        signupForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const fullname = document.getElementById('fullname').value.trim();
            const email = document.getElementById('email').value.trim();
            const phone = document.getElementById('phone').value.trim();
            const password = document.getElementById('password').value;
            const confirmPassword = document.getElementById('confirmPassword').value;
            const terms = document.getElementById('terms').checked;
            const role = document.querySelector('.role-btn.active').id === 'workerBtn' ? 'worker' : 'employer';
            const company = role === 'employer' ? document.getElementById('company').value.trim() : '';
            
            // Validate form
            if (!fullname || !email || !phone || !password || !confirmPassword) {
                alert('Please fill in all required fields');
                return;
            }
            
            if (password !== confirmPassword) {
                alert('Passwords do not match');
                return;
            }
            
            if (password.length < 8) {
                alert('Password must be at least 8 characters long');
                return;
            }
            
            if (!terms) {
                alert('You must agree to the terms and conditions');
                return;
            }
            
            if (role === 'employer' && !company) {
                alert('Please enter your company name');
                return;
            }
            
            // Check if user already exists
            const users = JSON.parse(localStorage.getItem('users')) || [];
            const userExists = users.some(user => user.email === email);
            
            if (userExists) {
                alert('An account with this email already exists');
                return;
            }
            
            // Create new user
            const newUser = {
                id: Date.now().toString(),
                fullname,
                email,
                phone,
                password, // Note: In a real app, you would hash the password
                role,
                company: role === 'employer' ? company : null,
                createdAt: new Date().toISOString()
            };
            
            // Save user to localStorage
            users.push(newUser);
            localStorage.setItem('users', JSON.stringify(users));
            
            // Save current user session
            localStorage.setItem('currentUser', JSON.stringify({
                id: newUser.id,
                email: newUser.email,
                role: newUser.role,
                name: newUser.fullname
            }));
            
            // Redirect to dashboard
            alert('Account created successfully!');
            window.location.href = role === 'worker' ? 'worker-dashboard.html' : 'employer-dashboard.html';
        });
    }
    
    // Login form submission
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const email = document.getElementById('email').value.trim();
            const password = document.getElementById('password').value;
            
            // Validate form
            if (!email || !password) {
                alert('Please fill in all fields');
                return;
            }
            
            // Check if user exists
            const users = JSON.parse(localStorage.getItem('users')) || [];
            const user = users.find(user => user.email === email && user.password === password);
            
            if (!user) {
                alert('Invalid email or password');
                return;
            }
            
            // Save current user session
            localStorage.setItem('currentUser', JSON.stringify({
                id: user.id,
                email: user.email,
                role: user.role,
                name: user.fullname
            }));
            
            // Redirect to dashboard
            alert('Login successful!');
            window.location.href = user.role === 'worker' ? 'worker-dashboard.html' : 'employer-dashboard.html';
        });
    }
    
    // Check if user is already logged in
    checkLoggedIn();
});

// Helper functions
function getStrengthColor(strength) {
    switch(strength) {
        case 1: return '#dc3545'; // Weak
        case 2: return '#ffc107'; // Medium
        case 3: return '#28a745'; // Strong
        default: return '#6c757d'; // Default
    }
}

function getStrengthText(strength) {
    switch(strength) {
        case 0: return 'Password Strength';
        case 1: return 'Weak';
        case 2: return 'Medium';
        case 3: return 'Strong';
        default: return 'Password Strength';
    }
}

function checkLoggedIn() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const loginPage = window.location.pathname.includes('login.html');
    const signupPage = window.location.pathname.includes('signup.html');
    
    if (currentUser && (loginPage || signupPage)) {
        // Redirect to appropriate dashboard if already logged in
        window.location.href = currentUser.role === 'worker' ? 'worker-dashboard.html' : 'employer-dashboard.html';
    } else if (!currentUser && !loginPage && !signupPage && !window.location.pathname.includes('index.html')) {
        // Redirect to login if not logged in and not on index/login/signup pages
        window.location.href = 'login.html';
    }
}

// Logout functionality (to be used in dashboard pages)
function logout() {
    localStorage.removeItem('currentUser');
    window.location.href = 'index.html';
}