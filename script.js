document.addEventListener('DOMContentLoaded', () => {
    const darkModeToggle = document.getElementById('darkModeToggle');
    const body = document.body;

    darkModeToggle.addEventListener('change', () => {
        body.classList.toggle('dark-mode');
        localStorage.setItem('darkMode', body.classList.contains('dark-mode'));
    });

    // 检查用户之前的偏好设置
    if (localStorage.getItem('darkMode') === 'true') {
        body.classList.add('dark-mode');
        darkModeToggle.checked = true;
    } else {
        body.classList.remove('dark-mode');
        darkModeToggle.checked = false;
    }
});

function updateDarkModeButtonText() {
    const darkModeToggle = document.getElementById('darkModeToggle');
    if (document.body.classList.contains('dark-mode')) {
        darkModeToggle.textContent = 'Switch to Light Mode';
    } else {
        darkModeToggle.textContent = 'Switch to Dark Mode';
    }
}