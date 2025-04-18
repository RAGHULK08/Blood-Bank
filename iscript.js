// Simulated user database with email-based login
const users = [
    { email: 'donor@example.com', password: 'donor123', role: 'donor' },
    { email: 'receiver@example.com', password: 'receiver123', role: 'receiver' }
];

// Function to validate email format
function validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

// Function to validate password
function validatePassword(password) {
    return password.length >= 6;
}

// Toggle functions for Login and Sign Up forms
function showLogin() {
    document.getElementById('loginFormContainer').style.display = 'block';
    document.getElementById('signupFormContainer').style.display = 'none';
    document.getElementById('loginTab').classList.add('active');
    document.getElementById('signupTab').classList.remove('active');
}

function showSignup() {
    document.getElementById('loginFormContainer').style.display = 'none';
    document.getElementById('signupFormContainer').style.display = 'block';
    document.getElementById('signupTab').classList.add('active');
    document.getElementById('loginTab').classList.remove('active');
}

// Login form submission
document.getElementById('loginForm').addEventListener('submit', function (e) {
    e.preventDefault();
    let hasErrors = false;

    const email = document.getElementById('loginEmail').value.trim();
    const password = document.getElementById('loginPassword').value.trim();
    const role = document.getElementById('loginRole').value;

    document.getElementById('loginAuthError').textContent = '';

    if (!validateEmail(email)) {
        document.getElementById('loginEmailError').textContent = 'Please enter a valid email address.';
        hasErrors = true;
    } else {
        document.getElementById('loginEmailError').textContent = '';
    }

    if (!validatePassword(password)) {
        document.getElementById('loginPasswordError').textContent = 'Password must be at least 6 characters long.';
        hasErrors = true;
    } else {
        document.getElementById('loginPasswordError').textContent = '';
    }

    if (!role) {
        document.getElementById('loginRoleError').textContent = 'Please select a role.';
        hasErrors = true;
    } else {
        document.getElementById('loginRoleError').textContent = '';
    }

    if (hasErrors) {
        return;
    }

    const user = users.find(u => u.email === email && u.password === password && u.role === role);

    if (user) {
        document.getElementById('loginAuthError').textContent = '';
        alert(`Login successful as ${role}!`);
        if (role === 'donor') {
            window.location.href = 'donor.html';
        } else if (role === 'receiver') {
            window.location.href = 'receiver.html';
        }
    } else {
        document.getElementById('loginAuthError').textContent = 'Invalid credentials. Please try again or sign up if you are a new user.';
    }
});

// Sign Up form submission
document.getElementById('signupForm').addEventListener('submit', function (e) {
    e.preventDefault();
    let hasErrors = false;

    const email = document.getElementById('signupEmail').value.trim();
    const password = document.getElementById('signupPassword').value.trim();
    const role = document.getElementById('signupRole').value;

    if (!validateEmail(email)) {
        document.getElementById('signupEmailError').textContent = 'Please enter a valid email address.';
        hasErrors = true;
    } else {
        document.getElementById('signupEmailError').textContent = '';
    }

    if (!validatePassword(password)) {
        document.getElementById('signupPasswordError').textContent = 'Password must be at least 6 characters long.';
        hasErrors = true;
    } else {
        document.getElementById('signupPasswordError').textContent = '';
    }

    if (!role) {
        document.getElementById('signupRoleError').textContent = 'Please select a role.';
        hasErrors = true;
    } else {
        document.getElementById('signupRoleError').textContent = '';
    }

    if (hasErrors) {
        return;
    }

    const existingUser = users.find(u => u.email === email && u.role === role);
    if (existingUser) {
        alert('A user with this email and role already exists. Please log in.');
        return;
    }

    users.push({ email, password, role });
    alert('Sign up successful! You can now log in with your credentials.');
    showLogin();
    this.reset();
});
