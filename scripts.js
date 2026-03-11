document.addEventListener("DOMContentLoaded", () => {
    const themeCheckbox = document.getElementById("themeToggleCheckbox");
    const currentTheme = localStorage.getItem("theme") || "light";
    const bgVideo = document.getElementById("dark-bg-video");

    // Set initial state
    if (currentTheme === "dark") {
        document.documentElement.setAttribute("data-theme", "dark");
        if (themeCheckbox) themeCheckbox.checked = true;
        if (bgVideo) bgVideo.play().catch(e => console.log(e));
    } else {
        if (themeCheckbox) themeCheckbox.checked = false;
        if (bgVideo) bgVideo.pause();
    }

    if (themeCheckbox) {
        themeCheckbox.addEventListener("change", (e) => {
            if (e.target.checked) {
                document.documentElement.setAttribute("data-theme", "dark");
                localStorage.setItem("theme", "dark");
                if (bgVideo) bgVideo.play().catch(console.error);
            } else {
                document.documentElement.removeAttribute("data-theme");
                localStorage.setItem("theme", "light");
                if (bgVideo) bgVideo.pause();
            }
            initParticles(); // Re-init particles to match theme colors/stars
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

    // Initialize custom canvas particles
    initParticles();

    // Initialize custom cursor
    initCursor();
});

// Particle logic
function initParticles() {
    const canvas = document.getElementById("particles-js");
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let particlesArray = [];
    let numberOfParticles = window.innerWidth > 768 ? 60 : 30; // Base particles
    const isDark = document.documentElement.getAttribute("data-theme") === "dark";

    // Increase density massively for galaxy/starfield effect in dark mode
    if (isDark) {
        numberOfParticles = window.innerWidth > 768 ? 200 : 100;
    } else {
        // For light mode, generate 150 black and silver particles (sand effect)
        numberOfParticles = 150;
    }

    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.isDark = isDark;

            if (this.isDark) {
                // Stars (dark mode) are tiny, light mode orbs are bigger
                this.size = (Math.random() * 1.5 + 0.1);
                // Stars move very slowly
                const speedModifier = 0.2;
                this.speedX = (Math.random() * 1 - 0.5) * speedModifier;
                this.speedY = (Math.random() * 1 - 0.5) * speedModifier;
                // For twinkling effect
                this.opacity = Math.random();
                this.fadeSpeed = Math.random() * 0.02 + 0.005;
            } else {
                // Sand particles for light mode
                this.radius = Math.random() * 2 + 1; // smaller sand particles
                this.dx = (Math.random() * 3 + 2);   // fast horizontal wind to the right
                this.dy = (Math.random() * 1.5 + 0.5); // slight downward gravity

                // Randomly choose black or silver
                const isSilver = Math.random() > 0.5;
                if (isSilver) {
                    this.color = `rgba(192, 192, 192, ${Math.random() * 0.6 + 0.3})`; // Silver
                } else {
                    this.color = `rgba(0, 0, 0, ${Math.random() * 0.6 + 0.3})`; // Black
                }
            }
        }
        update() {
            if (this.isDark) {
                this.x += this.speedX;
                this.y += this.speedY;

                // Subtle twinkling for stars
                this.opacity += this.fadeSpeed;
                if (this.opacity >= 1 || this.opacity <= 0.1) {
                    this.fadeSpeed = -this.fadeSpeed;
                }

                // Loop particles around screen edges (bounce for dark mode)
                if (this.x > canvas.width || this.x < 0) this.speedX = -this.speedX;
                if (this.y > canvas.height || this.y < 0) this.speedY = -this.speedY;
            } else {
                // Update for sand particles
                this.x += this.dx;
                this.y += this.dy;

                // Boundary Wrap for sand particles
                // Dynamic screen wrap bounds
                let leftBound = -10;
                let rightBound = canvas.width + 10;
                let topBound = -10;
                let bottomBound = canvas.height + 10;

                if (this.x > rightBound) this.x = leftBound;
                if (this.x < leftBound) this.x = rightBound;
                if (this.y > bottomBound) this.y = topBound;
                if (this.y < topBound) this.y = bottomBound;
            }
        }
        draw() {
            if (this.isDark) {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
                ctx.fill();
            } else {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
                ctx.fillStyle = this.color;
                ctx.fill();
            }
        }
    }

    function init() {
        particlesArray = [];
        for (let i = 0; i < numberOfParticles; i++) {
            particlesArray.push(new Particle());
        }
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (let i = 0; i < particlesArray.length; i++) {
            particlesArray[i].update();
            particlesArray[i].draw();
        }
        requestAnimationFrame(animate);
    }

    init();
    animate();

    window.addEventListener("resize", () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        init();
    });
}

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
