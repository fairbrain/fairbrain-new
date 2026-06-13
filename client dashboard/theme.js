// Global Tailwind Dark Mode styles
const darkModeStyles = `
/* Dark Mode Core Styles */
html.dark body {
    background: radial-gradient(circle at top left, #1f1b2e, transparent 40%),
                radial-gradient(circle at top right, #241630, transparent 40%),
                radial-gradient(circle at bottom left, #121c2c, transparent 40%),
                radial-gradient(circle at bottom right, #2c201a, transparent 40%);
    background-color: #0d0f17;
    color: #e2e8f0;
}
html.dark .main-content-bg {
    background: linear-gradient(135deg, rgba(25, 27, 43, 0.8) 0%, rgba(15, 17, 28, 0.9) 100%);
    border: 1px solid rgba(255, 255, 255, 0.1);
    box-shadow: -10px -10px 20px rgba(0,0,0,0.3), 10px 10px 20px rgba(0,0,0,0.6);
}
html.dark .bg-white {
    background-color: rgba(30, 32, 48, 0.6);
    border-color: rgba(255,255,255,0.05);
}
html.dark .bg-white\\/40, html.dark .bg-white\\/60, html.dark .bg-white\\/30 {
    background-color: rgba(255, 255, 255, 0.05);
}
html.dark input, html.dark .bg-dash-chatGray {
    background-color: rgba(30, 32, 48, 0.6);
    color: #e2e8f0;
    border-color: rgba(255,255,255,0.1);
}
html.dark .text-dash-text {
    color: #f1f5f9;
}
html.dark .text-dash-cardBlue {
    color: #a5b4fc;
}
html.dark .border-white {
    border-color: rgba(255, 255, 255, 0.05);
}
html.dark .border-dash-textLight\\/20 {
    border-color: rgba(255, 255, 255, 0.05);
}
html.dark .bg-dash-chatOrange {
    background-color: #d97746;
}
`;

document.addEventListener('DOMContentLoaded', () => {
    // Inject dark mode CSS mapping
    const styleEl = document.createElement('style');
    styleEl.innerHTML = darkModeStyles;
    document.head.appendChild(styleEl);

    const themeToggleBtn = document.getElementById('theme-toggle-btn');
    const themeText = document.getElementById('theme-text');
    const dot = document.getElementById('theme-toggle-dot');
    const htmlElement = document.documentElement;

    function applyTheme(isDark) {
        if (isDark) {
            htmlElement.classList.add('dark');
            if (themeText) themeText.textContent = 'Dark Mode';
            if (dot) dot.classList.replace('left-0', 'translate-x-4');
        } else {
            htmlElement.classList.remove('dark');
            if (themeText) themeText.textContent = 'Light Mode';
            if (dot) dot.classList.replace('translate-x-4', 'left-0');
        }
    }

    // Load saved theme or system preference
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    let isDark = savedTheme === 'dark' || (!savedTheme && systemPrefersDark);

    applyTheme(isDark);

    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            isDark = !isDark;
            localStorage.setItem('theme', isDark ? 'dark' : 'light');
            applyTheme(isDark);
        });
    }
});
