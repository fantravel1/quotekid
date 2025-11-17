// QuoteKid Mobile Features & PWA Enhancements
// Dark Mode, Favorites, Swipe, Streak Counter, and more!

// ==================== PWA SERVICE WORKER REGISTRATION ====================
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/service-worker.js')
            .then(reg => console.log('QuoteKid PWA: Service Worker registered'))
            .catch(err => console.log('QuoteKid PWA: Service Worker registration failed'));
    });
}

// ==================== DARK MODE ====================
const darkModeToggle = document.querySelector('.dark-mode-toggle');
const body = document.body;

// Load dark mode preference
const isDarkMode = localStorage.getItem('darkMode') === 'true';
if (isDarkMode) {
    body.classList.add('dark-mode');
    if (darkModeToggle) darkModeToggle.textContent = '☀️';
}

// Toggle dark mode
if (darkModeToggle) {
    darkModeToggle.addEventListener('click', () => {
        body.classList.toggle('dark-mode');
        const isDark = body.classList.contains('dark-mode');
        darkModeToggle.textContent = isDark ? '☀️' : '🌙';
        localStorage.setItem('darkMode', isDark);

        // Particle effect on toggle
        createParticles(darkModeToggle, isDark ? '⭐' : '🌙', 8);
    });
}

// ==================== HAMBURGER MENU ====================
const hamburger = document.querySelector('.hamburger-menu');
const mobileNav = document.querySelector('.mobile-nav-menu');
const mobileOverlay = document.querySelector('.mobile-nav-overlay');

if (hamburger && mobileNav && mobileOverlay) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        mobileNav.classList.toggle('active');
        mobileOverlay.classList.toggle('active');
        body.style.overflow = mobileNav.classList.contains('active') ? 'hidden' : '';
    });

    mobileOverlay.addEventListener('click', () => {
        hamburger.classList.remove('active');
        mobileNav.classList.remove('active');
        mobileOverlay.classList.remove('active');
        body.style.overflow = '';
    });
}

// ==================== SWIPE GESTURES ====================
let touchStartX = 0;
let touchEndX = 0;
const SWIPE_THRESHOLD = 50;

function handleSwipe() {
    const swipeDistance = touchEndX - touchStartX;

    if (Math.abs(swipeDistance) > SWIPE_THRESHOLD) {
        if (swipeDistance > 0) {
            // Swipe right - previous quote or action
            onSwipeRight();
        } else {
            // Swipe left - next quote or action
            onSwipeLeft();
        }
    }
}

function onSwipeRight() {
    const newQuoteBtn = document.getElementById('new-quote');
    if (newQuoteBtn) {
        newQuoteBtn.click();
        createParticles(document.querySelector('.quote-box'), '←', 5);
    }
}

function onSwipeLeft() {
    const newQuoteBtn = document.getElementById('new-quote');
    if (newQuoteBtn) {
        newQuoteBtn.click();
        createParticles(document.querySelector('.quote-box'), '→', 5);
    }
}

// Add swipe listeners to quote containers
const quoteContainers = document.querySelectorAll('.quote-container, .quote-box');
quoteContainers.forEach(container => {
    container.addEventListener('touchstart', e => {
        touchStartX = e.changedTouches[0].screenX;
    });

    container.addEventListener('touchend', e => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });
});

// ==================== FAVORITES SYSTEM ====================
class FavoritesManager {
    constructor() {
        this.favorites = JSON.parse(localStorage.getItem('quotekid_favorites') || '[]');
    }

    isFavorite(quoteText) {
        return this.favorites.some(fav => fav.text === quoteText);
    }

    toggle(quote) {
        const index = this.favorites.findIndex(fav => fav.text === quote.text);
        if (index > -1) {
            this.favorites.splice(index, 1);
            return false;
        } else {
            this.favorites.push(quote);
            return true;
        }
    }

    save() {
        localStorage.setItem('quotekid_favorites', JSON.stringify(this.favorites));
    }

    getAll() {
        return this.favorites;
    }
}

const favManager = new FavoritesManager();

// Add favorite buttons to all quotes
function addFavoriteButton(quoteElement, quote) {
    const existingBtn = quoteElement.querySelector('.favorite-btn');
    if (existingBtn) return;

    const favoriteBtn = document.createElement('button');
    favoriteBtn.className = 'favorite-btn';
    favoriteBtn.innerHTML = favManager.isFavorite(quote.text) ? '❤️' : '🤍';
    favoriteBtn.setAttribute('aria-label', 'Add to favorites');

    favoriteBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        const isFav = favManager.toggle(quote);
        favoriteBtn.innerHTML = isFav ? '❤️' : '🤍';
        favoriteBtn.classList.toggle('favorited', isFav);
        favManager.save();

        if (isFav) {
            createParticles(favoriteBtn, '❤️', 10);
            showAchievement('Favorite Added!', '💖', 'You saved a quote to your favorites!');
        }
    });

    const actionsContainer = quoteElement.querySelector('.quote-card-actions') ||
                             quoteElement.querySelector('.quote-box');
    if (actionsContainer) {
        actionsContainer.appendChild(favoriteBtn);
    }
}

// ==================== WEB SHARE API ====================
function addShareButton(quoteElement, quote) {
    if (!navigator.share) return; // Only on supported devices

    const existingBtn = quoteElement.querySelector('.share-btn');
    if (existingBtn) return;

    const shareBtn = document.createElement('button');
    shareBtn.className = 'share-btn';
    shareBtn.innerHTML = '<span>📤</span> Share';

    shareBtn.addEventListener('click', async (e) => {
        e.stopPropagation();
        try {
            await navigator.share({
                title: 'QuoteKid',
                text: `"${quote.text}" - ${quote.author}`,
                url: window.location.href
            });
            createParticles(shareBtn, '✨', 8);
        } catch (err) {
            if (err.name !== 'AbortError') {
                copyToClipboard(`"${quote.text}" - ${quote.author}\n\nShared from QuoteKid.com`);
            }
        }
    });

    const actionsContainer = quoteElement.querySelector('.quote-card-actions');
    if (actionsContainer) {
        actionsContainer.appendChild(shareBtn);
    }
}

// ==================== STREAK COUNTER ====================
class StreakCounter {
    constructor() {
        this.streak = parseInt(localStorage.getItem('quotekid_streak') || '0');
        this.lastVisit = localStorage.getItem('quotekid_last_visit') || '';
        this.updateStreak();
    }

    updateStreak() {
        const today = new Date().toDateString();

        if (this.lastVisit !== today) {
            const yesterday = new Date();
            yesterday.setDate(yesterday.getDate() - 1);

            if (this.lastVisit === yesterday.toDateString()) {
                // Consecutive day
                this.streak++;
                this.checkStreakMilestone();
            } else if (this.lastVisit === '') {
                // First visit
                this.streak = 1;
            } else {
                // Streak broken
                this.streak = 1;
            }

            this.lastVisit = today;
            this.save();
        }

        this.display();
    }

    save() {
        localStorage.setItem('quotekid_streak', this.streak);
        localStorage.setItem('quotekid_last_visit', this.lastVisit);
    }

    display() {
        const streakElement = document.querySelector('.streak-counter');
        if (streakElement) {
            streakElement.innerHTML = `<span class="streak-flame">🔥</span> ${this.streak} day streak!`;
        }
    }

    checkStreakMilestone() {
        const milestones = [3, 7, 14, 30, 100];
        if (milestones.includes(this.streak)) {
            showAchievement(
                `${this.streak} Day Streak!`,
                '🔥',
                `Amazing! You've visited QuoteKid for ${this.streak} days in a row!`
            );
        }
    }
}

const streakCounter = new StreakCounter();

// ==================== ACHIEVEMENT SYSTEM ====================
function showAchievement(title, icon, message) {
    const existing = document.querySelector('.achievement-popup');
    if (existing) existing.remove();

    const popup = document.createElement('div');
    popup.className = 'achievement-popup';
    popup.innerHTML = `
        <div class="achievement-icon">${icon}</div>
        <h3>${title}</h3>
        <p>${message}</p>
    `;

    document.body.appendChild(popup);
    setTimeout(() => popup.classList.add('show'), 100);

    // Auto hide after 3 seconds
    setTimeout(() => {
        popup.classList.remove('show');
        setTimeout(() => popup.remove(), 500);
    }, 3000);
}

// ==================== PARTICLE EFFECTS ====================
function createParticles(element, emoji, count = 10) {
    const rect = element.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    for (let i = 0; i < count; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.textContent = emoji;
        particle.style.left = centerX + 'px';
        particle.style.top = centerY + 'px';
        particle.style.fontSize = (Math.random() * 20 + 15) + 'px';

        // Random direction
        const angle = (Math.PI * 2 * i) / count;
        const velocity = 50 + Math.random() * 50;
        particle.style.setProperty('--tx', Math.cos(angle) * velocity + 'px');
        particle.style.setProperty('--ty', Math.sin(angle) * velocity + 'px');

        document.body.appendChild(particle);

        setTimeout(() => particle.remove(), 2000);
    }
}

// ==================== COPY TO CLIPBOARD ====================
function copyToClipboard(text) {
    if (navigator.clipboard) {
        navigator.clipboard.writeText(text).then(() => {
            showNotification('📋 Copied to clipboard!');
        });
    } else {
        // Fallback
        const textarea = document.createElement('textarea');
        textarea.value = text;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
        showNotification('📋 Copied to clipboard!');
    }
}

function showNotification(message) {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        left: 50%;
        transform: translateX(-50%);
        background: #333;
        color: white;
        padding: 15px 25px;
        border-radius: 50px;
        z-index: 10000;
        font-weight: 600;
        box-shadow: 0 4px 15px rgba(0,0,0,0.3);
    `;
    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transition = 'opacity 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 2000);
}

// ==================== PWA INSTALL PROMPT ====================
let deferredPrompt;

window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
    showInstallPrompt();
});

function showInstallPrompt() {
    const installPrompt = document.createElement('div');
    installPrompt.className = 'install-prompt';
    installPrompt.innerHTML = `
        <span>📱</span>
        <span>Install QuoteKid for easy access!</span>
        <button class="install-btn">Install</button>
        <button class="install-close">Later</button>
    `;

    document.body.appendChild(installPrompt);
    setTimeout(() => installPrompt.classList.add('show'), 500);

    installPrompt.querySelector('.install-btn').addEventListener('click', async () => {
        if (deferredPrompt) {
            deferredPrompt.prompt();
            const { outcome } = await deferredPrompt.userChoice;
            if (outcome === 'accepted') {
                showAchievement('App Installed!', '🎉', 'Thanks for installing QuoteKid!');
            }
            deferredPrompt = null;
        }
        installPrompt.remove();
    });

    installPrompt.querySelector('.install-close').addEventListener('click', () => {
        installPrompt.classList.remove('show');
        setTimeout(() => installPrompt.remove(), 500);
    });
}

// ==================== LOADING SKELETONS ====================
function showLoadingSkeleton(container) {
    container.innerHTML = `
        <div class="skeleton skeleton-quote"></div>
        <div class="skeleton skeleton-author"></div>
    `;
}

// ==================== HAPTIC FEEDBACK (MOBILE) ====================
function hapticFeedback() {
    if (navigator.vibrate) {
        navigator.vibrate(10); // Short vibration
    }
}

// Add haptic feedback to buttons
document.addEventListener('click', (e) => {
    if (e.target.matches('button, .btn, .category-card')) {
        hapticFeedback();
    }
});

// ==================== PERFORMANCE MONITORING ====================
if ('PerformanceObserver' in window) {
    const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
            if (entry.duration > 100) {
                console.log('Slow interaction detected:', entry);
            }
        }
    });
    observer.observe({ entryTypes: ['measure'] });
}

// ==================== ACTIVE BOTTOM NAV HIGHLIGHTING ====================
function updateActiveNav() {
    const currentPage = window.location.pathname;
    const navItems = document.querySelectorAll('.bottom-nav-item');

    navItems.forEach(item => {
        const href = item.getAttribute('href');
        if (currentPage.includes(href) || (currentPage === '/' && href === 'index.html')) {
            item.classList.add('active');
        } else {
            item.classList.remove('active');
        }
    });
}

updateActiveNav();

// ==================== INITIALIZE ON PAGE LOAD ====================
document.addEventListener('DOMContentLoaded', () => {
    // Add favorite and share buttons to existing quotes
    document.querySelectorAll('.quote-card, .quote-box').forEach((el, index) => {
        // Get quote data from the element
        const textEl = el.querySelector('.quote-card-text, .quote-text');
        const authorEl = el.querySelector('.quote-card-author, .quote-author');

        if (textEl && authorEl) {
            const quote = {
                text: textEl.textContent.replace(/^"|"$/g, ''),
                author: authorEl.textContent.replace(/^—\s*/, '')
            };

            addFavoriteButton(el, quote);
            addShareButton(el, quote);
        }
    });

    // Show welcome achievement for first-time visitors
    if (!localStorage.getItem('quotekid_visited')) {
        localStorage.setItem('quotekid_visited', 'true');
        setTimeout(() => {
            showAchievement('Welcome to QuoteKid! 🎉', '👋', 'Get inspired daily with amazing quotes!');
        }, 1000);
    }
});

console.log('QuoteKid Mobile Features Loaded! 🚀');
