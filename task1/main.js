// main.js - All authentication page logic

// Helper for popups
function showPopup(msg, success = false) {
  let popup = document.getElementById('popup');
  if (!popup) {
    popup = document.createElement('div');
    popup.id = 'popup';
    popup.className = 'popup';
    document.body.appendChild(popup);
  }
  popup.textContent = msg;
  popup.style.display = 'block';
  popup.style.background = success ? '#d4f5e9' : '#ffeaea';
  popup.style.color = success ? '#388e3c' : '#d32f2f';
  setTimeout(() => { popup.style.display = 'none'; }, 2300);
}

// LOGIN
if (document.getElementById('loginForm')) {
  document.getElementById('loginForm').onsubmit = function(e) {
    e.preventDefault();
    const email = document.getElementById('loginEmail').value.trim();
    const password = document.getElementById('loginPassword').value;
    if (!email.endsWith('@gmail.com')) {
      showPopup('Only @gmail.com emails allowed. Example: user@gmail.com', false);
      return;
    }
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,}$/;
    if (!passwordRegex.test(password)) {
      showPopup('Password must be at least 8 characters and include a lowercase, uppercase, number, and special character.', false);
      return;
    }
    localStorage.setItem('accessify_user_email', email);
    showPopup('Login successful!', true);
    setTimeout(() => { window.location.href = 'dashboard.html'; }, 900);
  };
}

// REGISTER
if (document.getElementById('registerForm')) {
  document.getElementById('registerForm').onsubmit = function(e) {
    e.preventDefault();
    const email = document.getElementById('registerEmail').value.trim();
    const password = document.getElementById('registerPassword').value;
    const confirmPassword = document.getElementById('registerConfirmPassword').value;
    if (!email.endsWith('@gmail.com')) {
      showPopup('Only @gmail.com emails allowed. Example: user@gmail.com', false);
      return;
    }
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,}$/;
    if (!passwordRegex.test(password)) {
      showPopup('Password must be at least 8 characters and include a lowercase, uppercase, number, and special character.', false);
      return;
    }
    if (password !== confirmPassword) {
      showPopup('Passwords do not match.', false);
      return;
    }
    localStorage.setItem('accessify_user_email', email);
    showPopup('Registration successful!', true);
    setTimeout(() => { window.location.href = 'dashboard.html'; }, 900);
  };
}

// CHANGE PASSWORD
if (document.getElementById('pwChangeForm')) {
  document.getElementById('pwChangeForm').onsubmit = function(e) {
    e.preventDefault();
    const newPw = document.getElementById('newPw').value;
    const confirmPw = document.getElementById('confirmPw').value;
    const errorDiv = document.getElementById('pwChangeError');
    errorDiv.textContent = '';
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,}$/;
    if (!passwordRegex.test(newPw)) {
      errorDiv.style.color = '#d32f2f';
      errorDiv.textContent = 'Password must be at least 8 characters and include a lowercase, uppercase, number, and special character.';
      return;
    }
    if (newPw !== confirmPw) {
      errorDiv.style.color = '#d32f2f';
      errorDiv.textContent = 'New and Confirm Password must match.';
      return;
    }
    errorDiv.style.color = '#388e3c';
    errorDiv.textContent = 'Password changed successfully!';
  };
}

// FORGOT PASSWORD
if (document.querySelector('.auth-form') && document.getElementById('forgotEmail')) {
  document.querySelector('.auth-form').onsubmit = function(e) {
    e.preventDefault();
    const email = document.getElementById('forgotEmail').value.trim();
    const sentDiv = document.getElementById('forgotSent');
    if (!email.endsWith('@gmail.com')) {
      sentDiv.textContent = 'Only @gmail.com emails allowed.';
      sentDiv.style.background = '#ffeaea';
      sentDiv.style.color = '#d32f2f';
      sentDiv.style.display = 'block';
      setTimeout(() => { sentDiv.style.display = 'none'; }, 2500);
      return;
    }
    sentDiv.textContent = 'Reset link sent to ' + email;
    sentDiv.style.background = '#d4f5e9';
    sentDiv.style.color = '#388e3c';
    sentDiv.style.display = 'block';
    setTimeout(() => { sentDiv.style.display = 'none'; }, 2500);
  };
}

// DASHBOARD: Show welcome message
if (document.getElementById('welcomeMsg')) {
  const email = localStorage.getItem('accessify_user_email');
  if(email) {
    document.getElementById('welcomeMsg').textContent = `Welcome, ${email}!`;
    if(document.getElementById('userEmail')) document.getElementById('userEmail').textContent = '';
  } else {
    document.getElementById('welcomeMsg').textContent = 'Welcome!';
    if(document.getElementById('userEmail')) document.getElementById('userEmail').textContent = 'Please log in.';
  }
  // Logout logic
  var logoutBtn = document.getElementById('logoutBtn');
  if(logoutBtn) {
    logoutBtn.addEventListener('click', function(e) {
      e.preventDefault();
      localStorage.removeItem('accessify_user_email');
      window.location.href = 'login.html';
    });
  }
}
