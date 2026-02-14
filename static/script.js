document.addEventListener('DOMContentLoaded', () => {
    // === SETUP ===
    // Put the names of the images inside 'static/images' here
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

    let currentIndex = 0;
    const imgElement = document.getElementById('valentine-img');
    const yesBtn = document.getElementById('yes-btn');
    const noBtn = document.getElementById('no-btn');
    const mainContent = document.getElementById('main-content');
    const successMsg = document.getElementById('success-msg');

    // Helper to set image source
    const setImg = () => {
        if(images.length > 0) {
            imgElement.src = `/static/images/${images[currentIndex]}`;
        }
    };

    // Initial Load
    setImg();

    // 1. Cycle Images on Click
    imgElement.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % images.length;
        setImg();
    });

    // 2. Handle YES Click
    yesBtn.addEventListener('click', async () => {
        // UI Updates
        mainContent.classList.add('hidden');
        successMsg.classList.remove('hidden');

        // Send API Request to FastAPI Backend
        try {
            await fetch('/she-said-yes', { method: 'POST' });
            console.log("Notification sent!");
        } catch (err) {
            console.error("Error sending notification", err);
        }
    });

    // 3. Handle NO Click (Just for fun)
    noBtn.addEventListener('click', () => {
        const x = Math.random() * (window.innerWidth - 100);
        const y = Math.random() * (window.innerHeight - 100);

        // Make the button jump around so she can't click no easily
        noBtn.style.position = 'absolute';
        noBtn.style.left = `${x}px`;
        noBtn.style.top = `${y}px`;
    });
});