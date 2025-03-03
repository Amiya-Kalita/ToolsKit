const users = JSON.parse(localStorage.getItem('users')) || [];
let currentUser = JSON.parse(sessionStorage.getItem('currentUser')) || null;

const pages = {
    home: `
        <div class="home-content">
            ${currentUser ? 
                 `<h1 style="animation: fadeIn 1s ease"></h1>
                 <p></p>` 
                : '<p></p>'
            }
        </div>
    `,
    about: `<div class="auth-container">
                <h2 id="abt">About me</h2>
                <p id="abt-p">Hello I am "Amiya" a passionate web devloper skilled in modern javascript, frontend
                 frameworks,and backend technologies like node.js and Mongodb.
                  i am constantly learning and building innovative solutions</p>
            </div>`,
    contact: `<div class="auth-container">
                        <h3 id="toolkit">Use this Free Tools :</h3>
                        <br/>
                        <a href="../html/colorPic.html" id="tool">1. Color Picture</a>
                        <br/>
                        <a href="../html/imgCompressor.html" id="tool">2. Image Compressor</a>
                        <br/>
                        <a href="../html/qr.html" id="tool">3. QR Code Generator</a>
                        <br/>
                        <a href="../html/urlShort.html" id="tool">4. URL Shortener</a>
                        <br/>
                        <a href="../html/imgConvert.html" id="tool">5. Image converter</a>
                        <br/>
                        <a href="../html/gradient.html" id="tool">6. Gradient Generator</a>
                        <br/>
                        <a href="../html/beautify.html" id="tool">7. Html Minifier</a>
                        <br/>
                        <a href="../html/percentage.html" id="tool">8. Percentage calculator</a>
                        
              </div>`,
    signup: `
        <div class="auth-container">
            <h2 class="form-title">Create Account</h2>
            <div class="message" id="formMessage"></div>
            <form class="auth-form" onsubmit="handleSignup(event)">
                <div class="input-group">
                    <input type="text" placeholder="Full Name" required>
                </div>
                <div class="input-group">
                    <input type="text" placeholder="Username" required>
                </div>
                <div class="input-group">
                    <input type="email" placeholder="Email" required>
                </div>
                <div class="input-group">
                    <input type="password" placeholder="Password" required>
                </div>
                <button type="submit" class="auth-btn">Sign Up</button>
            </form>
            <div class="switch-form">
                Already have an account? <a href="#" onclick="loadPage('login')">Login</a>
            </div>
        </div>
    `,
    login: `
        <div class="auth-container">
            <h2 class="form-title">Welcome Back</h2>
            <div class="message" id="formMessage"></div>
            <form class="auth-form" onsubmit="handleLogin(event)">
                <div class="input-group">
                    <input type="text" placeholder="Username or Email" required>
                </div>
                <div class="input-group">
                    <input type="password" placeholder="Password" required>
                </div>
                <button type="submit" class="auth-btn">Login</button>
            </form>
            <div class="switch-form">
                Don't have an account? <a href="#" onclick="loadPage('signup')">Sign Up</a>
            </div>
        </div>
    `
};

function handleSignup(e) {
    e.preventDefault();
    const inputs = e.target.elements;
    const user = {
        name: inputs[0].value,
        username: inputs[1].value,
        email: inputs[2].value,
        password: inputs[3].value
    };

    const existingUser = users.find(u => u.username === user.username || u.email === user.email);
    const message = e.target.parentElement.querySelector('.message');

    if (existingUser) {
        showMessage(message, 'Username or email already exists!', 'error');
        return;
    }

    users.push(user);
    localStorage.setItem('users', JSON.stringify(users));
    showMessage(message, 'Account created! Redirecting...', 'success');
    setTimeout(() => loadPage('login'), 1500);
}

function handleLogin(e) {
    e.preventDefault();
    const inputs = e.target.elements;
    const identifier = inputs[0].value;
    const password = inputs[1].value;
    const message = e.target.parentElement.querySelector('.message');

    const user = users.find(u => 
        (u.username === identifier || u.email === identifier) && 
        u.password === password
    );

    if (!user) {
        showMessage(message, 'Invalid credentials!', 'error');
        return;
    }

    sessionStorage.setItem('currentUser', JSON.stringify(user));
    currentUser = user;
    updateAuthState();
    loadPage('home');
}

function showMessage(element, text, type) {
    element.textContent = text;
    element.className = `message ${type}-message`;
    element.style.display = 'block';
    setTimeout(() => {
        element.style.opacity = '0';
        setTimeout(() => element.style.display = 'none', 300);
    }, 3000);
}

function logout() {
    sessionStorage.removeItem('currentUser');
    currentUser = null;
    updateAuthState();
    loadPage('home');
}

function loadPage(page) {
    const contentDiv = document.getElementById('content');
    contentDiv.innerHTML = pages[page] || pages.home;
    window.scrollTo(0, 0);
}

function updateAuthState() {
    const authSection = document.getElementById('authSection');
    authSection.innerHTML = currentUser ? `
        <div class="user-menu" onclick="toggleUserDropdown()">
            <i class="fas fa-user-circle user-icon"></i>
            <div class="user-dropdown" id="userDropdown">
                <button onclick="logout()">Logout</button>
            </div>
        </div>
    ` : `
        <div class="auth-buttons">
            <a href="#" onclick="loadPage('login')" class="btn login">Login</a>
            <a href="#" onclick="loadPage('signup')" class="btn signup">Sign Up</a>
        </div>
    `;
}

function toggleUserDropdown() {
    const dropdown = document.getElementById('userDropdown');
    dropdown.classList.toggle('show');
}

document.addEventListener('DOMContentLoaded', () => {
    updateAuthState();
    loadPage('home');
});

// Mobile Menu Toggle
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');
menuToggle.addEventListener('click', (e) => {
    e.stopPropagation();
    navLinks.classList.toggle('active');
});

// Close menus when clicking outside
document.addEventListener('click', (e) => {
    if (!navLinks.contains(e.target) && !menuToggle.contains(e.target)) {
        navLinks.classList.remove('active');
    }
    if (!e.target.closest('.user-menu')) {
        document.querySelectorAll('.user-dropdown').forEach(d => d.classList.remove('show'));
    }
});