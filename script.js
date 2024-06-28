

javascript
document.addEventListener('DOMContentLoaded', function() {
    const profileLink = document.getElementById('profile-link');
    const signupLink = document.getElementById('signup-link');
    const editProfileButton = document.getElementById('edit-profile-button');
    const logoutButton = document.getElementById('logout-button');

    function checkUserStatus() {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user) {
            profileLink.style.display = 'block';
            signupLink.style.display = 'none';
        } else {
            profileLink.style.display = 'none';
            signupLink.style.display = 'block';
        }
    }

    checkUserStatus();

    const signupForm = document.getElementById('signup-form');
    const profileSection = document.getElementById('profile');
    const profileInfo = document.getElementById('profile-info');
    const profileForm = document.getElementById('profile-form');

    signupForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        const email = document.getElementById('email-signup').value;

        const user = {
            username: username,
            password: password,
            email: email
        };

        localStorage.setItem('user', JSON.stringify(user));
        alert('ثبت نام شما با موفقیت انجام شد!');

        // پنهان کردن فرم ثبت‌نام و نمایش لینک پروفایل
        signupForm.style.display = 'none';
        profileLink.style.display = 'block';
        signupLink.style.display = 'none';

        // Redirect to profile page after signup
        window.location.href = 'profile.html';
    });

    editProfileButton.addEventListener('click', function() {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user) {
            document.getElementById('profile-username').value = user.username;
            document.getElementById('profile-email').value = user.email;
            profileForm.style.display = 'block';
        }
    });

    profileForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const username = document.getElementById('profile-username').value;
        const email = document.getElementById('profile-email').value;
        const password = document.getElementById('profile-password').value;

        let user = JSON.parse(localStorage.getItem('user'));
        user.username = username;
        user.email = email;
        if (password) {
            user.password = password;
        }

        localStorage.setItem('user', JSON.stringify(user));
        alert('پروفایل شما با موفقیت به‌روزرسانی شد!');

        profileInfo.innerHTML = `
            <p>نام کاربری: ${user.username}</p>
            <p>ایمیل: ${user.email}</p>
        `;
        profileForm.style.display = 'none';
    });

    logoutButton.addEventListener('click', function() {
        localStorage.removeItem('user');
        alert('شما با موفقیت خارج شدید');
        profileLink.style.display = 'none';
        signupLink.style.display = 'block';
        checkUserStatus();
        // Redirect to index page after logout
        window.location.href = 'index.html';
    });
});
