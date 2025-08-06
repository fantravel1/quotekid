// DOM Elements
const quoteText = document.querySelector('.quote-text');
const quoteAuthor = document.querySelector('.quote-author');
const newQuoteBtn = document.getElementById('new-quote');
const confettiContainer = document.getElementById('confetti-container');

// Check if we're on the homepage
const isHomePage = window.location.pathname.endsWith('index.html') || 
                   window.location.pathname.endsWith('/');

// Check if we're on the daily quote page
const isDailyPage = window.location.pathname.includes('daily.html');

// Check if we're on a category page
const isCategoryPage = window.location.pathname.includes('category-');

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
    // Initialize based on the current page
    if (isHomePage) {
        displayRandomQuote();
        setupNewQuoteButton();
    } else if (isDailyPage) {
        displayQuoteOfTheDay();
        setupConfetti();
    } else if (isCategoryPage) {
        initializeCategoryPage();
    }
    
    // Add any global event listeners
    setupGlobalEventListeners();
});

// Display a random quote on the homepage
function displayRandomQuote() {
    if (!quoteText || !quoteAuthor) return;
    
    const quote = getRandomQuote();
    animateQuoteChange(quote);
}

// Display the quote of the day
function displayQuoteOfTheDay() {
    const quote = getQuoteOfTheDay();
    const funFact = getFunFact();
    
    if (quoteText) {
        quoteText.textContent = `"${quote.text}"`;
    }
    
    if (quoteAuthor) {
        quoteAuthor.textContent = `— ${quote.author}`;
    }
    
    // Add fun fact if on daily page
    const funFactElement = document.createElement('p');
    funFactElement.className = 'fun-fact';
    funFactElement.innerHTML = `✨ <strong>Did you know?</strong> ${funFact}`;
    
    const quoteBox = document.querySelector('.quote-box');
    if (quoteBox) {
        // Remove existing fun fact if any
        const existingFunFact = quoteBox.querySelector('.fun-fact');
        if (existingFunFact) {
            quoteBox.removeChild(existingFunFact);
        }
        quoteBox.appendChild(funFactElement);
    }
}

// Set up the "New Quote" button
function setupNewQuoteButton() {
    if (!newQuoteBtn) return;
    
    newQuoteBtn.addEventListener('click', function() {
        const quote = getRandomQuote();
        animateQuoteChange(quote);
        
        // Small bounce animation
        this.style.transform = 'scale(0.95)';
        setTimeout(() => {
            this.style.transform = '';
        }, 100);
    });
}

// Animate quote change with fade effect
function animateQuoteChange(quote) {
    if (!quoteText || !quoteAuthor) return;
    
    // Fade out
    quoteText.style.opacity = '0';
    quoteAuthor.style.opacity = '0';
    
    // Change content after fade out
    setTimeout(() => {
        quoteText.textContent = `"${quote.text}"`;
        quoteAuthor.textContent = `— ${quote.author}`;
        
        // Fade in
        quoteText.style.opacity = '1';
        quoteAuthor.style.opacity = '1';
    }, 300);
}

// Set up confetti effect for the daily quote page
function setupConfetti() {
    if (!confettiContainer) return;
    
    // Only trigger confetti on page load for the daily quote page
    if (isDailyPage) {
        setTimeout(() => {
            createConfetti();
        }, 500);
    }
}

// Create confetti effect
function createConfetti() {
    if (!confettiContainer) return;
    
    // Clear any existing confetti
    confettiContainer.innerHTML = '';
    
    // Create confetti elements
    const colors = ['#4DA8DA', '#FFD166', '#6BD4CD', '#FF6B6B', '#A5D8FF'];
    const confettiCount = 100;
    
    for (let i = 0; i < confettiCount; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        
        // Random properties
        const size = Math.random() * 10 + 5; // 5-15px
        const color = colors[Math.floor(Math.random() * colors.length)];
        const left = Math.random() * 100; // 0-100% of viewport width
        const animationDuration = Math.random() * 3 + 2; // 2-5 seconds
        const delay = Math.random() * 2; // 0-2 seconds
        
        // Apply styles
        confetti.style.width = `${size}px`;
        confetti.style.height = `${size}px`;
        confetti.style.backgroundColor = color;
        confetti.style.left = `${left}%`;
        confetti.style.animation = `fall ${animationDuration}s ease-in ${delay}s infinite`;
        
        // Random shape
        if (Math.random() > 0.5) {
            confetti.style.borderRadius = '50%';
        }
        
        confettiContainer.appendChild(confetti);
    }
    
    // Add keyframes for falling animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fall {
            0% { 
                transform: translateY(-100vh) rotate(0deg); 
                opacity: 1;
            }
            100% { 
                transform: translateY(100vh) rotate(360deg); 
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
}

// Initialize category page
function initializeCategoryPage() {
    // Extract category from URL
    const pathParts = window.location.pathname.split('/');
    const filename = pathParts[pathParts.length - 1];
    const category = filename.replace('.html', '');
    
    // Get quotes for this category
    const categoryQuotes = getQuotesByCategory(category);
    
    // Display quotes in the grid
    displayQuotesGrid(categoryQuotes, category);
    
    // Set up filter buttons
    setupQuoteFilters(categoryQuotes, category);
}

// Display quotes in a grid layout
function displayQuotesGrid(quotes, category) {
    const gridContainer = document.querySelector('.quotes-grid');
    if (!gridContainer) return;
    
    // Clear existing content
    gridContainer.innerHTML = '';
    
    // Add each quote as a card
    quotes.forEach((quote, index) => {
        const quoteCard = createQuoteCard(quote, index, category);
        gridContainer.appendChild(quoteCard);
    });
    
    // Initialize tooltips for copy buttons
    initializeTooltips();
}

// Create a quote card element
function createQuoteCard(quote, index, category) {
    const card = document.createElement('div');
    card.className = 'quote-card fade-in';
    card.style.animationDelay = `${index * 0.1}s`;
    
    // Set category-specific accent color
    const accentColors = {
        'confidence': '#4DA8DA',
        'kindness': '#6BD4CD',
        'humor': '#FFD166',
        'wisdom': '#FF6B6B'
    };
    
    const accentColor = accentColors[category] || '#4DA8DA';
    
    card.innerHTML = `
        <div class="quote-card-content">
            <p class="quote-card-text">"${quote.text}"</p>
            <p class="quote-card-author">— ${quote.author}</p>
        </div>
        <div class="quote-card-actions">
            <button class="copy-btn" data-tooltip="Copy to clipboard" data-quote="${escapeHtml(quote.text)} - ${escapeHtml(quote.author)}">
                <span class="copy-icon">📋</span>
                <span class="copied-text">Copied!</span>
            </button>
        </div>
    `;
    
    // Add click event to show modal
    card.addEventListener('click', () => {
        showQuoteModal(quote, accentColor);
    });
    
    return card;
}

// Show quote in a modal
function showQuoteModal(quote, accentColor) {
    // Create modal if it doesn't exist
    let modal = document.querySelector('.quote-modal');
    
    if (!modal) {
        modal = document.createElement('div');
        modal.className = 'quote-modal';
        modal.innerHTML = `
            <div class="quote-modal-content">
                <span class="close-modal">&times;</span>
                <p class="quote-modal-text">"${quote.text}"</p>
                <p class="quote-modal-author">— ${quote.author}</p>
                <button class="copy-btn" data-tooltip="Copy to clipboard">
                    <span class="copy-icon">📋</span> Copy Quote
                </button>
            </div>
        `;
        document.body.appendChild(modal);
        
        // Close modal when clicking the close button
        const closeBtn = modal.querySelector('.close-modal');
        closeBtn.addEventListener('click', () => {
            modal.style.display = 'none';
        });
        
        // Close modal when clicking outside the content
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.style.display = 'none';
            }
        });
        
        // Set up copy button in modal
        const copyBtn = modal.querySelector('.copy-btn');
        setupCopyButton(copyBtn, `"${quote.text}" — ${quote.author}`);
    }
    
    // Update modal content
    const quoteText = modal.querySelector('.quote-modal-text');
    const quoteAuthor = modal.querySelector('.quote-modal-author');
    
    if (quoteText) quoteText.textContent = `"${quote.text}"`;
    if (quoteAuthor) quoteAuthor.textContent = `— ${quote.author}`;
    
    // Set accent color
    const modalContent = modal.querySelector('.quote-modal-content');
    if (modalContent) {
        modalContent.style.borderTop = `4px solid ${accentColor}`;
    }
    
    // Show modal
    modal.style.display = 'flex';
}

// Set up quote filters
function setupQuoteFilters(quotes, category) {
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Get filter type
            const filterType = this.getAttribute('data-filter');
            
            // Filter quotes
            let filteredQuotes = [...quotes];
            
            if (filterType === 'short') {
                filteredQuotes = quotes.filter(quote => quote.text.length < 80);
            } else if (filterType === 'medium') {
                filteredQuotes = quotes.filter(quote => quote.text.length >= 80 && quote.text.length < 150);
            } else if (filterType === 'long') {
                filteredQuotes = quotes.filter(quote => quote.text.length >= 150);
            }
            
            // Display filtered quotes
            displayQuotesGrid(filteredQuotes, category);
        });
    });
}

// Initialize tooltips
function initializeTooltips() {
    const tooltipElements = document.querySelectorAll('[data-tooltip]');
    
    tooltipElements.forEach(element => {
        // Create tooltip element
        const tooltip = document.createElement('div');
        tooltip.className = 'tooltip';
        tooltip.textContent = element.getAttribute('data-tooltip');
        
        // Position tooltip
        const rect = element.getBoundingClientRect();
        tooltip.style.top = `${rect.top - 40}px`;
        tooltip.style.left = `${rect.left + (rect.width / 2)}px`;
        tooltip.style.transform = 'translateX(-50%)';
        
        // Add tooltip to body
        document.body.appendChild(tooltip);
        
        // Show/hide tooltip on hover
        element.addEventListener('mouseenter', () => {
            tooltip.style.visibility = 'visible';
            tooltip.style.opacity = '1';
        });
        
        element.addEventListener('mouseleave', () => {
            tooltip.style.visibility = 'hidden';
            tooltip.style.opacity = '0';
        });
    });
}

// Set up copy to clipboard functionality
function setupCopyButton(button, textToCopy) {
    if (!button) return;
    
    button.addEventListener('click', function(e) {
        e.stopPropagation(); // Prevent modal from closing
        
        // Copy text to clipboard
        navigator.clipboard.writeText(textToCopy).then(() => {
            // Show copied feedback
            const copiedText = this.querySelector('.copied-text') || this;
            const originalText = this.innerHTML;
            
            copiedText.textContent = 'Copied!';
            copiedText.style.color = '#4CAF50';
            
            // Reset after delay
            setTimeout(() => {
                if (this.classList.contains('copy-btn')) {
                    this.innerHTML = originalText;
                } else {
                    copiedText.textContent = 'Copy';
                    copiedText.style.color = '';
                }
            }, 2000);
        }).catch(err => {
            console.error('Failed to copy text: ', err);
        });
    });
}

function setupGlobalEventListeners() {
    // Close modals when clicking outside
    document.addEventListener('click', function(event) {
        const modals = document.querySelectorAll('.modal');
        modals.forEach(modal => {
            if (event.target === modal) {
                modal.style.display = 'none';
            }
        });
    });
    
    // Close modals when pressing Escape key
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
            const modals = document.querySelectorAll('.modal');
            modals.forEach(modal => {
                modal.style.display = 'none';
            });
        }
    });
    
    // Set up Easter egg mascot
    setupEasterEggMascot();
    
    // Set up all copy buttons
    document.querySelectorAll('.copy-btn').forEach(button => {
        const quoteText = button.getAttribute('data-quote') || 
                         button.closest('.quote-card')?.querySelector('.quote-card-text')?.textContent + ' ' +
                         button.closest('.quote-card')?.querySelector('.quote-card-author')?.textContent;
        
        if (quoteText) {
            setupCopyButton(button, quoteText);
        }
    });
    
    // Set up escape key to close modals
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            const modals = document.querySelectorAll('.quote-modal');
            modals.forEach(modal => {
                modal.style.display = 'none';
            });
        }
    });
}

// Set up the Easter egg mascot functionality
function setupEasterEggMascot() {
    const mascot = document.getElementById('easter-egg-mascot');
    if (!mascot) return;
    
    let clickCount = 0;
    const clickThreshold = 3; // Number of clicks needed to trigger Easter egg
    let clickTimeout;
    
    mascot.addEventListener('click', function() {
        clickCount++;
        const mascotIcon = this.querySelector('.mascot-icon');
        
        // Clear any existing timeout
        if (clickTimeout) {
            clearTimeout(clickTimeout);
        }
        
        // Animate the mascot on click
        this.style.transform = 'scale(0.9)';
        setTimeout(() => {
            this.style.transform = '';
        }, 100);
        
        // Change emoji based on click count
        if (clickCount === 1) {
            mascotIcon.textContent = '👀';
        } else if (clickCount === 2) {
            mascotIcon.textContent = '🤔';
        } else if (clickCount >= clickThreshold) {
            mascotIcon.textContent = '🎉';
            
            // Show success message
            const tooltip = this.querySelector('.mascot-tooltip');
            if (tooltip) {
                tooltip.textContent = 'Easter egg unlocked!';
                tooltip.style.backgroundColor = '#4CAF50';
                
                // Change tooltip arrow color
                tooltip.style.setProperty('--tooltip-arrow', '#4CAF50');
                
                // Show tooltip immediately
                tooltip.style.opacity = '1';
                tooltip.style.visibility = 'visible';
                tooltip.style.bottom = '70px';
                
                // Redirect to Easter egg page after a delay
                setTimeout(() => {
                    window.location.href = 'funny.html';
                }, 800);
                
                // Reset click count after a delay
                setTimeout(() => {
                    clickCount = 0;
                    mascotIcon.textContent = '👀';
                    tooltip.textContent = 'Click me 3 times!';
                    tooltip.style.backgroundColor = '#333';
                    tooltip.style.setProperty('--tooltip-arrow', '#333');
                }, 2000);
                
                return;
            }
        }
        
        // Show tooltip with click count
        const tooltip = this.querySelector('.mascot-tooltip');
        if (tooltip) {
            tooltip.textContent = `Click ${clickThreshold - clickCount} more time${clickThreshold - clickCount === 1 ? '' : 's'}!`;
            tooltip.style.opacity = '1';
            tooltip.style.visibility = 'visible';
            tooltip.style.bottom = '70px';
            
            // Hide tooltip after delay if not hovering
            setTimeout(() => {
                if (!mascot.matches(':hover')) {
                    tooltip.style.opacity = '0';
                    tooltip.style.visibility = 'hidden';
                    tooltip.style.bottom = '80px';
                }
            }, 2000);
        }
        
        // Reset click count if no clicks for 3 seconds
        clickTimeout = setTimeout(() => {
            clickCount = 0;
            const tooltip = this.querySelector('.mascot-tooltip');
            if (tooltip && !mascot.matches(':hover')) {
                tooltip.textContent = 'Click me 3 times!';
                tooltip.style.opacity = '0';
                tooltip.style.visibility = 'hidden';
                tooltip.style.bottom = '80px';
            }
            mascot.querySelector('.mascot-icon').textContent = '👀';
        }, 3000);
    });
    
    // Hide tooltip when not hovering
    mascot.addEventListener('mouseleave', function() {
        const tooltip = this.querySelector('.mascot-tooltip');
        if (tooltip && clickCount < clickThreshold) {
            setTimeout(() => {
                if (!mascot.matches(':hover')) {
                    tooltip.style.opacity = '0';
                    tooltip.style.visibility = 'hidden';
                    tooltip.style.bottom = '80px';
                }
            }, 500);
        }
    });
}

// Helper function to escape HTML
function escapeHtml(unsafe) {
    if (!unsafe) return '';
    return unsafe
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}
