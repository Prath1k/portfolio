document.addEventListener("DOMContentLoaded", () => {
    const themeCheckbox = document.getElementById("themeToggleCheckbox");
    const currentTheme = localStorage.getItem("theme") || "light";

    // Set initial state
    if (currentTheme === "dark") {
        document.documentElement.setAttribute("data-theme", "dark");
        if (themeCheckbox) themeCheckbox.checked = true;
    } else {
        if (themeCheckbox) themeCheckbox.checked = false;
    }

    if (themeCheckbox) {
        themeCheckbox.addEventListener("change", (e) => {
            if (e.target.checked) {
                document.documentElement.setAttribute("data-theme", "dark");
                localStorage.setItem("theme", "dark");
            } else {
                document.documentElement.removeAttribute("data-theme");
                localStorage.setItem("theme", "light");
            }
        });
    }

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Trigger the CSS transition by adding the active class
                entry.target.classList.add('animate-up-trigger');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const animateElements = document.querySelectorAll('.scroll-observe');
    animateElements.forEach(el => observer.observe(el));

    // Initialize custom cursor
    initCursor();
});

// Custom cursor trail logic
function initCursor() {
    // Disable on mobile/touch devices
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const cursor = document.createElement("div");
    cursor.id = "custom-cursor";
    document.body.appendChild(cursor);

    // Style injected via JS to avoid polluting every HTML file's <style> block
    Object.assign(cursor.style, {
        position: 'fixed',
        width: '15px',
        height: '15px',
        backgroundColor: 'rgba(59, 130, 246, 0.5)', /* Blue */
        borderRadius: '50%',
        pointerEvents: 'none',
        zIndex: '9999',
        transform: 'translate(-50%, -50%)',
        transition: 'width 0.2s, height 0.2s, background-color 0.2s',
        display: 'none' // hide until mouse moves once
    });

    let mouseX = 0, mouseY = 0;
    let cursorX = 0, cursorY = 0;

    document.addEventListener("mousemove", (e) => {
        cursor.style.display = 'block';
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    // Add hover states to interactive elements
    const interactives = document.querySelectorAll("a, button, input, textarea");
    interactives.forEach(el => {
        el.addEventListener("mouseenter", () => {
            cursor.style.width = '30px';
            cursor.style.height = '30px';
            cursor.style.backgroundColor = 'rgba(59, 130, 246, 0.2)';
            cursor.style.border = '1px solid #3b82f6';
        });
        el.addEventListener("mouseleave", () => {
            cursor.style.width = '15px';
            cursor.style.height = '15px';
            cursor.style.backgroundColor = 'rgba(59, 130, 246, 0.5)';
            cursor.style.border = 'none';
        });
    });

    function animateCursor() {
        let distX = mouseX - cursorX;
        let distY = mouseY - cursorY;

        // Easing factor
        cursorX = cursorX + (distX * 0.15);
        cursorY = cursorY + (distY * 0.15);

        cursor.style.left = cursorX + "px";
        cursor.style.top = cursorY + "px";

        requestAnimationFrame(animateCursor);
    }
    animateCursor();
}
