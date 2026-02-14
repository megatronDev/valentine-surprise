document.addEventListener('DOMContentLoaded', () => {
    // 1. CONFIGURATION
    const images = [
        'img.png',
        'img_1.png',
        'rose.jpg',
        'animelove.jpg',
        'me.jpg',
        'titanic.gif',
        'img_2.gif',
        'us.jpg'
    ];

    const imgElement = document.getElementById('valentine-img');
    const yesBtn = document.getElementById('yes-btn');
    const noBtn = document.getElementById('no-btn');
    const mainContent = document.getElementById('main-content');
    const successMsg = document.getElementById('success-msg');

    let currentIndex = 0;

    // 2. IMAGE LOGIC
    const updateImage = () => {
        if(images.length > 0) {
            imgElement.src = `/static/images/${images[currentIndex]}`;
        }
    };

    // Initial load
    updateImage();

    // Click image to cycle
    imgElement.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % images.length;
        updateImage();
    });

    // 3. YES BUTTON LOGIC
    yesBtn.addEventListener('click', async () => {
        mainContent.classList.add('hidden');
        successMsg.classList.remove('hidden');

        try {
            await fetch('/she-said-yes', { method: 'POST' });
        } catch (err) {
            console.error("Error sending notification", err);
        }
    });

    // 4. RUNAWAY NO BUTTON LOGIC
    const moveButton = () => {
        // Get window dimensions
        const windowWidth = window.innerWidth;
        const windowHeight = window.innerHeight;

        // Get button dimensions
        const btnWidth = noBtn.offsetWidth;
        const btnHeight = noBtn.offsetHeight;

        // Calculate random position
        // We subtract the button size so it doesn't go off the screen edge
        const randomX = Math.random() * (windowWidth - btnWidth);
        const randomY = Math.random() * (windowHeight - btnHeight);

        // Apply styles
        // CRITICAL: Use 'fixed' so it moves relative to screen, not the card
        noBtn.style.position = 'fixed';
        noBtn.style.left = `${randomX}px`;
        noBtn.style.top = `${randomY}px`;

        // Ensure it stays on top
        noBtn.style.zIndex = "9999";
    };

    // Trigger on Mouse Over (Desktop)
    noBtn.addEventListener('mouseover', moveButton);

    // Trigger on Touch Start (Mobile)
    noBtn.addEventListener('touchstart', (e) => {
        e.preventDefault(); // Stop the click
        moveButton();
    });
});