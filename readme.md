# Developer Portfolio

A responsive, interactive, and visually stunning developer portfolio website built with HTML, CSS, and Vanilla JavaScript.

## 🚀 Features

### 🎨 Dual Theme Experience
The portfolio features two completely distinct, hand-crafted aesthetic themes that seamlessly transition with a custom sliding toggle switch:
- **Deep Space Dark Mode:**
  - Stunning animated star-field particle engine.
  - Full-screen `background-video.mp4` that gracefully fades in.
  - Frost-glass style cards (`backdrop-filter: blur`) with subtle, glowing white borders.
  - Sleek electric blue accents and hover states.
- **Sandstorm Light Mode:**
  - High-velocity, infinite-looping "sandstorm" particle engine featuring black and silver specks.
  - Clean `background.jpeg` environment scaled perfectly to the viewport.
  - Soft, elegant shadows and high-contrast typography.

### ⚡ Interactive Animations & Micro-Interactions
- **Intersection Observer Engine:** Complex elements (like timeline cards and project grids) dynamically slide and fade into view as the user scrolls down the page.
- **Custom Hardware-Accelerated Cursor:** A buttery-smooth, trailing electric blue cursor follows mouse movements on desktop.
- **Hover States:** Interactive elements scale up, glow, and shift colors to provide immediate tactile feedback.
- **Zero-Lag Mobile Touch:** Implemented `touch-action: manipulation` across all buttons to completely eliminate the native 300ms tap delay on mobile browsers like iOS Safari.

### 📱 100% Fully Responsive
- **Fluid Layouts:** Uses CSS Grid and Flexbox to automatically restructure content from ultrawide desktop monitors down to tiny 320px mobile screens.
- **Mobile Navigation:** The desktop header gracefully collapses into a sleek, animated "Hamburger" drop-down menu on smaller devices.
- **Scroll Locking:** Defensive CSS properties guarantee zero horizontal scroll-bar bleed, no matter how narrow the device gets.

## 🗂️ Project Structure

- `website.html` - The primary landing page featuring an introduction, dynamic typed text, and primary call-to-action buttons.
- `Education.html` - A chronological, animated timeline detailing academic history and certifications.
- `Projects.html` - A responsive CSS Grid showcasing development work and links to live demos/repositories.
- `Contact.html` - A frosted-glass contact form and animated social media link hub.
- `theme.css` - The core styling engine containing all variables, media queries, animations, and typography rules.
- `scripts.js` - Contains the logic for the Theme Toggle switch, the variable-speed Canvas Particle Generation Engine, the custom cursor, and the Intersection Observer scrolling animations.

## 🛠️ Tech Stack
- **HTML5** (Semantic structure)
- **CSS3** (Variables, Grid, Flexbox, Animations, Media Queries)
- **Vanilla JavaScript** (ES6+, DOM Manipulation, Canvas API)

## 🏁 How to Run Locally

Because this project is built entirely independent of heavy node modules or build steps, running it is instantaneous:

1. Clone or download the repository to your local machine.
2. Ensure `background-video.mp4` and `background.jpeg` are located in the root directory.
3. Open `website.html` directly in any modern web browser.
4. (Optional) For the best experience viewing local files, you can use a lightweight server like VS Code's "Live Server" extension.
