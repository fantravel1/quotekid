// Quotes database organized by categories
const quotes = {
    confidence: [
        {
            text: "Believe you can and you're halfway there.",
            author: "Theodore Roosevelt"
        },
        {
            text: "You are braver than you believe, stronger than you seem, and smarter than you think.",
            author: "A.A. Milne"
        },
        {
            text: "No one can make you feel inferior without your consent.",
            author: "Eleanor Roosevelt"
        },
        {
            text: "Confidence is when you believe in yourself and your abilities, arrogance is when you think you are better than others and act accordingly.",
            author: "Stewart Stafford"
        },
        {
            text: "You have within you right now, everything you need to deal with whatever the world can throw at you.",
            author: "Brian Tracy"
        }
    ],
    kindness: [
        {
            text: "No act of kindness, no matter how small, is ever wasted.",
            author: "Aesop"
        },
        {
            text: "Be kind whenever possible. It is always possible.",
            author: "Dalai Lama"
        },
        {
            text: "A single act of kindness throws out roots in all directions, and the roots spring up and make new trees.",
            author: "Amelia Earhart"
        },
        {
            text: "Kindness is the language which the deaf can hear and the blind can see.",
            author: "Mark Twain"
        },
        {
            text: "The simplest acts of kindness are by far more powerful than a thousand heads bowing in prayer.",
            author: "Mahatma Gandhi"
        }
    ],
    humor: [
        {
            text: "I'm not arguing, I'm just explaining why I'm right.",
            author: "Anonymous"
        },
        {
            text: "I'm not lazy, I'm on energy saving mode.",
            author: "Anonymous"
        },
        {
            text: "I don't need a hair stylist, my pillow gives me a new hairstyle every morning.",
            author: "Anonymous"
        },
        {
            text: "I'm not short, I'm concentrated awesome!",
            author: "Anonymous"
        },
        {
            text: "I'm not procrastinating, I'm just prioritizing my tasks based on the importance of doing absolutely nothing.",
            author: "Anonymous"
        }
    ],
    wisdom: [
        {
            text: "The only true wisdom is in knowing you know nothing.",
            author: "Socrates"
        },
        {
            text: "The journey of a thousand miles begins with one step.",
            author: "Lao Tzu"
        },
        {
            text: "In three words I can sum up everything I've learned about life: it goes on.",
            author: "Robert Frost"
        },
        {
            text: "The only way to do great work is to love what you do.",
            author: "Steve Jobs"
        },
        {
            text: "Life is what happens when you're busy making other plans.",
            author: "John Lennon"
        }
    ]
};

// Get all quotes in a single array
const allQuotes = Object.values(quotes).flat();

// Get a random quote from any category
function getRandomQuote() {
    return allQuotes[Math.floor(Math.random() * allQuotes.length)];
}

// Get a random quote from a specific category
function getRandomQuoteByCategory(category) {
    const categoryQuotes = quotes[category] || [];
    if (categoryQuotes.length === 0) return getRandomQuote();
    return categoryQuotes[Math.floor(Math.random() * categoryQuotes.length)];
}

// Get all quotes from a specific category
function getQuotesByCategory(category) {
    return quotes[category] || [];
}

// Get quote of the day (deterministic based on date)
function getQuoteOfTheDay() {
    const today = new Date();
    const dayOfYear = Math.floor((today - new Date(today.getFullYear(), 0, 0)) / (1000 * 60 * 60 * 24));
    return allQuotes[dayOfYear % allQuotes.length];
}

// Get a fun fact (for the quote of the day page)
function getFunFact() {
    const funFacts = [
        "The average person laughs about 15 times a day.",
        "The shortest war in history was between Britain and Zanzibar on August 27, 1896. Zanzibar surrendered after 38 minutes.",
        "A group of flamingos is called a 'flamboyance'.",
        "Bananas are berries, but strawberries aren't.",
        "Octopuses have three hearts.",
        "The unicorn is the national animal of Scotland.",
        "Honey never spoils. You can eat 3000-year-old honey!",
        "The Eiffel Tower can be 15 cm taller during the summer due to thermal expansion.",
        "A day on Venus is longer than a year on Venus.",
        "The inventor of the frisbee was turned into a frisbee after he died!"
    ];
    
    return funFacts[Math.floor(Math.random() * funFacts.length)];
}
