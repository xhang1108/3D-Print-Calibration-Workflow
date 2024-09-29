document.addEventListener('DOMContentLoaded', () => {
    loadNavbar();
    loadFooter();

    const darkModeToggle = document.getElementById('darkModeToggle');
    const body = document.body;

    darkModeToggle.addEventListener('change', () => {
        body.classList.toggle('dark-mode');
        localStorage.setItem('darkMode', body.classList.contains('dark-mode'));
    });

    // 检查用户之前的偏好设置，如果没有设置，默认使用深色模式
    if (localStorage.getItem('darkMode') === null) {
        localStorage.setItem('darkMode', 'true');
    }

    if (localStorage.getItem('darkMode') === 'true') {
        body.classList.add('dark-mode');
        darkModeToggle.checked = true;
    } else {
        body.classList.remove('dark-mode');
        darkModeToggle.checked = false;
    }

    const searchInput = document.getElementById('searchInput');
    const searchButton = document.getElementById('searchButton');
    const searchResults = document.getElementById('searchResults');

    searchButton.addEventListener('click', performSearch);
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            performSearch();
        }
    });

    const pages = {
        'E-Step Calibration': {
            url: 'e-step.html',
            content: 'How to calibrate E-steps...'
        },
        'Flow Calibration': {
            url: 'flow.html',
            content: 'Calibrating flow rate for better prints...'
        },
        'Temperature Tuning': {
            url: 'temperature.html',
            content: 'Finding the optimal temperature...'
        },
        // 添加更多页面内容
    };

    function performSearch() {
        const searchTerm = searchInput.value.toLowerCase();
        if (searchTerm.length < 2) {
            alert('Please enter at least 2 characters to search.');
            return;
        }

        const results = [];
        for (const [title, page] of Object.entries(pages)) {
            if (title.toLowerCase().includes(searchTerm) || page.content.toLowerCase().includes(searchTerm)) {
                results.push({ title, url: page.url, content: page.content });
            }
        }

        displaySearchResults(results, searchTerm);
    }

    function displaySearchResults(results, searchTerm) {
        searchResults.innerHTML = '';
        if (results.length === 0) {
            searchResults.innerHTML = '<p>No results found.</p>';
        } else {
            results.forEach(result => {
                const resultItem = document.createElement('div');
                resultItem.className = 'search-result-item';
                resultItem.innerHTML = `
                    <a href="${result.url}">
                        <h3>${highlightSearchTerm(result.title, searchTerm)}</h3>
                        <p>${highlightSearchTerm(result.content, searchTerm)}</p>
                    </a>
                `;
                searchResults.appendChild(resultItem);
            });
        }
        searchResults.style.display = 'block';
    }

    function highlightSearchTerm(text, searchTerm) {
        const regex = new RegExp(searchTerm, 'gi');
        return text.replace(regex, match => `<mark>${match}</mark>`);
    }

    // 点击页面其他地方时隐藏搜索结果
    document.addEventListener('click', (e) => {
        if (!searchResults.contains(e.target) && e.target !== searchInput && e.target !== searchButton) {
            searchResults.style.display = 'none';
        }
    });
});

function loadNavbar() {
    fetch('navbar.html')
        .then(response => response.text())
        .then(data => {
            document.querySelector('header').innerHTML = data;
            // 重新绑定事件监听器
            const darkModeToggle = document.getElementById('darkModeToggle');
            darkModeToggle.addEventListener('change', () => {
                document.body.classList.toggle('dark-mode');
                localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
            });

            const searchInput = document.getElementById('searchInput');
            const searchButton = document.getElementById('searchButton');
            searchButton.addEventListener('click', performSearch);
            searchInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    performSearch();
                }
            });
        });
}

function loadFooter() {
    fetch('footer.html')
        .then(response => response.text())
        .then(data => {
            document.querySelector('footer').innerHTML = data;
        });
}