document.addEventListener('DOMContentLoaded', () => {
    // --- PLACEHOLDERS ---
    // Replace these with the output from generate_hashes.py
    const APPPWD = "9f5506a40f5d328f27cf4f75a25f596cd7e3d683d60448fca33c79123a96925d";
    const APAYGC = "YW5vdGhlcl9nY190ZXN0";
    // ---------------------

    const SALT = "VigneshSarumathy_Wedding_2025";

    const authSection = document.getElementById('auth-section');
    const passwordInput = document.getElementById('password-input');
    const loginButton = document.getElementById('login-button');
    const giftCardSection = document.getElementById('gift-card-section');
    const giftCodeContainer = document.getElementById('gift-code-container');
    const giftCodeEl = document.getElementById('gift-code');
    const copyButton = document.getElementById('copy-button');
    const canvas = document.getElementById('scratch-canvas');
    const ctx = canvas.getContext('2d');
    const backgroundImageEl = document.querySelector('.background-image');
    const overlayEl = document.querySelector('.overlay');
    const contentEl = document.querySelector('.content');
    const heartsContainer = document.getElementById('hearts-container');
    const passwordArrows = document.querySelectorAll('#auth-section .pointer-arrow');
    const giftArrow = document.getElementById('gift-arrow');

    function hashPassword(password) {
        const saltedPassword = password + SALT;
        return CryptoJS.SHA256(saltedPassword).toString();
    }

    function decodeBase64(encodedStr) {
        return atob(encodedStr);
    }

    // Show arrows pointing to password field after 3 seconds
    setTimeout(() => {
        passwordArrows.forEach(arrow => {
            arrow.classList.add('show');
        });
    }, 3000);

    // Golden hearts animation
    function createGoldenHeart() {
        const heart = document.createElement('div');
        heart.className = 'golden-heart';
        heart.textContent = '❤';

        // Random horizontal position
        heart.style.left = Math.random() * 100 + '%';

        // Random animation duration (3-6 seconds)
        const duration = 3 + Math.random() * 3;
        heart.style.animationDuration = duration + 's';

        // Random size variation
        const size = 15 + Math.random() * 15;
        heart.style.fontSize = size + 'px';

        // Random delay
        heart.style.animationDelay = Math.random() * 0.5 + 's';

        heartsContainer.appendChild(heart);

        // Remove heart after animation completes
        setTimeout(() => {
            heart.remove();
        }, (duration + 0.5) * 1000);
    }

    function triggerGoldenHeartsRain(duration = 5000, heartCount = 50) {
        const interval = duration / heartCount;
        let count = 0;

        const heartInterval = setInterval(() => {
            createGoldenHeart();
            count++;

            if (count >= heartCount) {
                clearInterval(heartInterval);
            }
        }, interval);
    }

    // Password validation
    loginButton.addEventListener('click', () => {
        const inputPassword = passwordInput.value;
        const hashedInput = hashPassword(inputPassword);

        if (hashedInput === APPPWD) {
            // Hide password arrows
            passwordArrows.forEach(arrow => {
                arrow.style.display = 'none';
            });

            // Transition to photo page
            authSection.style.transition = 'opacity 0.8s';
            authSection.style.opacity = '0';

            setTimeout(() => {
                authSection.style.display = 'none';

                // Show background photo with animation
                backgroundImageEl.classList.add('show-photo');
                overlayEl.classList.add('photo-overlay');
                contentEl.classList.add('photo-page');

                // Show gift card section
                setTimeout(() => {
                    giftCardSection.classList.remove('hidden');
                    giftCardSection.classList.add('visible');

                    // Initialize scratch card after it's visible
                    setTimeout(() => {
                        setupScratchCard();

                        // Show arrows pointing to gift card
                        setTimeout(() => {
                            giftArrow.style.display = 'block';
                            giftArrow.classList.add('show');
                        }, 1000);
                    }, 100);
                }, 500);
            }, 800);
        } else {
            passwordInput.classList.add('shake');
            setTimeout(() => passwordInput.classList.remove('shake'), 500);
            passwordInput.value = '';
        }
    });

    // Allow Enter key to submit password
    passwordInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            loginButton.click();
        }
    });

    // Scratch card setup
    function setupScratchCard() {
        const container = document.getElementById('scratch-card-container');
        if (!container) return;

        const rect = container.getBoundingClientRect();

        // Set canvas size to match container
        canvas.width = rect.width;
        canvas.height = rect.height;

        // Create scratch surface with gradient
        const gradient = ctx.createLinearGradient(0, 0, rect.width, rect.height);
        gradient.addColorStop(0, '#d4af37');
        gradient.addColorStop(1, '#f4d03f');

        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Add "Scratch Here" text
        ctx.font = 'bold 20px Poppins, sans-serif';
        ctx.fillStyle = 'rgba(0, 0, 0, 0.4)';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('Scratch Here!', canvas.width / 2, canvas.height / 2);

        // Set composite operation for scratching
        ctx.globalCompositeOperation = 'destination-out';
    }

    let isDrawing = false;

    let scratchingStarted = false;

    function scratch(e) {
        if (!isDrawing) return;
        e.preventDefault();

        // Hide gift arrow when user starts scratching
        if (!scratchingStarted) {
            scratchingStarted = true;
            giftArrow.style.display = 'none';
        }

        const rect = canvas.getBoundingClientRect();
        const x = (e.clientX || e.touches?.[0]?.clientX) - rect.left;
        const y = (e.clientY || e.touches?.[0]?.clientY) - rect.top;

        ctx.beginPath();
        ctx.arc(x, y, 30, 0, Math.PI * 2, true);
        ctx.fill();

        checkScratchProgress();
    }

    function checkScratchProgress() {
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const pixelData = imageData.data;
        let transparentPixels = 0;
        const totalPixels = canvas.width * canvas.height;

        for (let i = 3; i < pixelData.length; i += 4) {
            if (pixelData[i] < 50) {
                transparentPixels++;
            }
        }

        const percentage = (transparentPixels / totalPixels) * 100;

        if (percentage > 60) {
            revealGift();
        }
    }

    let giftRevealed = false;

    function revealGift() {
        if (giftRevealed) return;
        giftRevealed = true;

        // Remove scratch canvas with fade
        canvas.style.transition = 'opacity 0.5s';
        canvas.style.opacity = '0';

        // Add pop animation to card
        const cardContainer = document.getElementById('scratch-card-container');
        cardContainer.classList.add('revealed');

        setTimeout(() => {
            canvas.style.display = 'none';

            // Add burst animation to gift section
            giftCardSection.classList.add('pop-burst');

            // Show gift code with animation
            giftCodeContainer.classList.remove('hidden');
            giftCodeEl.textContent = decodeBase64(APAYGC);

            // Trigger golden hearts rain - more hearts!
            triggerGoldenHeartsRain(8000, 80);
        }, 500);
    }

    // Mouse events
    canvas.addEventListener('mousedown', () => isDrawing = true);
    canvas.addEventListener('mouseup', () => isDrawing = false);
    canvas.addEventListener('mouseleave', () => isDrawing = false);
    canvas.addEventListener('mousemove', scratch);

    // Touch events
    canvas.addEventListener('touchstart', (e) => {
        isDrawing = true;
        e.preventDefault();
    }, { passive: false });

    canvas.addEventListener('touchend', () => isDrawing = false);
    canvas.addEventListener('touchcancel', () => isDrawing = false);
    canvas.addEventListener('touchmove', scratch, { passive: false });

    // Copy button
    copyButton.addEventListener('click', () => {
        const code = giftCodeEl.textContent;

        if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(code).then(() => {
                copyButton.textContent = 'Copied!';
                copyButton.style.background = '#4CAF50';
                setTimeout(() => {
                    copyButton.textContent = 'Copy Code';
                    copyButton.style.background = '';
                }, 2000);
            }).catch(() => {
                fallbackCopy(code);
            });
        } else {
            fallbackCopy(code);
        }
    });

    function fallbackCopy(text) {
        const textArea = document.createElement('textarea');
        textArea.value = text;
        textArea.style.position = 'fixed';
        textArea.style.left = '-9999px';
        document.body.appendChild(textArea);
        textArea.select();

        try {
            document.execCommand('copy');
            copyButton.textContent = 'Copied!';
            copyButton.style.background = '#4CAF50';
            setTimeout(() => {
                copyButton.textContent = 'Copy Code';
                copyButton.style.background = '';
            }, 2000);
        } catch (err) {
            console.error('Copy failed:', err);
        }

        document.body.removeChild(textArea);
    }

    // Note: Scratch card is initialized after password is entered and gift section is shown

    // Handle window resize
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            if (!giftRevealed && canvas.style.display !== 'none' && giftCardSection.classList.contains('visible')) {
                setupScratchCard();
            }
        }, 250);
    });
});
