// Quotes database organized by categories
const quotes = {
    confidence: [
        { text: "Believe you can and you're halfway there.", author: "Theodore Roosevelt" },
        { text: "You are braver than you believe, stronger than you seem, and smarter than you think.", author: "A.A. Milne" },
        { text: "No one can make you feel inferior without your consent.", author: "Eleanor Roosevelt" },
        { text: "Confidence is when you believe in yourself and your abilities, arrogance is when you think you are better than others and act accordingly.", author: "Stewart Stafford" },
        { text: "You have within you right now, everything you need to deal with whatever the world can throw at you.", author: "Brian Tracy" },
        { text: "The way to develop self-confidence is to do the thing you fear.", author: "William Jennings Bryan" },
        { text: "With confidence, you have won before you have started.", author: "Marcus Garvey" },
        { text: "Trust yourself. You know more than you think you do.", author: "Dr. Benjamin Spock" },
        { text: "You yourself, as much as anybody in the entire universe, deserve your love and affection.", author: "Buddha" },
        { text: "Don't wait until everything is just right. It will never be perfect.", author: "Mark Twain" },
        { text: "Confidence comes from discipline and training.", author: "Robert Kiyosaki" },
        { text: "Always be yourself and have faith in yourself.", author: "Bruce Lee" },
        { text: "Low self-confidence isn't a life sentence. Self-confidence can be learned, practiced, and mastered.", author: "Barrie Davenport" },
        { text: "If you hear a voice within you say 'you cannot paint,' then by all means paint and that voice will be silenced.", author: "Vincent Van Gogh" },
        { text: "Optimism is the faith that leads to achievement.", author: "Helen Keller" },
        { text: "Believe in yourself! Have faith in your abilities!", author: "Norman Vincent Peale" },
        { text: "The most beautiful thing you can wear is confidence.", author: "Blake Lively" },
        { text: "To be yourself in a world that is constantly trying to make you something else is the greatest accomplishment.", author: "Ralph Waldo Emerson" },
        { text: "Don't be satisfied with stories, how things have gone with others. Unfold your own myth.", author: "Rumi" },
        { text: "You are the only person on earth who can use your ability.", author: "Zig Ziglar" }
    ],
    kindness: [
        { text: "No act of kindness, no matter how small, is ever wasted.", author: "Aesop" },
        { text: "Be kind whenever possible. It is always possible.", author: "Dalai Lama" },
        { text: "A single act of kindness throws out roots in all directions, and the roots spring up and make new trees.", author: "Amelia Earhart" },
        { text: "Kindness is the language which the deaf can hear and the blind can see.", author: "Mark Twain" },
        { text: "The simplest acts of kindness are by far more powerful than a thousand heads bowing in prayer.", author: "Mahatma Gandhi" },
        { text: "Carry out a random act of kindness, with no expectation of reward, safe in the knowledge that one day someone might do the same for you.", author: "Princess Diana" },
        { text: "Kindness in words creates confidence. Kindness in thinking creates profoundness. Kindness in giving creates love.", author: "Lao Tzu" },
        { text: "Three things in human life are important: the first is to be kind; the second is to be kind; and the third is to be kind.", author: "Henry James" },
        { text: "Wherever there is a human being, there is an opportunity for a kindness.", author: "Lucius Annaeus Seneca" },
        { text: "A warm smile is the universal language of kindness.", author: "William Arthur Ward" },
        { text: "Kindness is a passport that opens doors and fashions friends.", author: "Joseph Joubert" },
        { text: "One kind word can warm three winter months.", author: "Japanese Proverb" },
        { text: "Constant kindness can accomplish much. As the sun makes ice melt, kindness causes misunderstanding, mistrust, and hostility to evaporate.", author: "Albert Schweitzer" },
        { text: "Be the reason someone smiles today.", author: "Anonymous" },
        { text: "Throw kindness around like confetti.", author: "Anonymous" },
        { text: "In a world where you can be anything, be kind.", author: "Jennifer Dukes Lee" },
        { text: "Remember there's no such thing as a small act of kindness. Every act creates a ripple with no logical end.", author: "Scott Adams" },
        { text: "Kindness begins with the understanding that we all struggle.", author: "Charles Glassman" },
        { text: "The smallest act of kindness is worth more than the grandest intention.", author: "Oscar Wilde" },
        { text: "Do things for people not because of who they are or what they do in return, but because of who you are.", author: "Harold S. Kushner" }
    ],
    humor: [
        { text: "I'm not arguing, I'm just explaining why I'm right.", author: "Anonymous" },
        { text: "I'm not lazy, I'm on energy saving mode.", author: "Anonymous" },
        { text: "I don't need a hair stylist, my pillow gives me a new hairstyle every morning.", author: "Anonymous" },
        { text: "I'm not short, I'm concentrated awesome!", author: "Anonymous" },
        { text: "I'm not procrastinating, I'm just prioritizing my tasks based on the importance of doing absolutely nothing.", author: "Anonymous" },
        { text: "Life is short. Smile while you still have teeth.", author: "Anonymous" },
        { text: "I'm on a seafood diet. I see food and I eat it.", author: "Anonymous" },
        { text: "Common sense is like deodorant. The people who need it most never use it.", author: "Anonymous" },
        { text: "If you think nobody cares if you're alive, try missing a couple of payments.", author: "Earl Wilson" },
        { text: "The difference between genius and stupidity is that genius has its limits.", author: "Albert Einstein" },
        { text: "I always wanted to be somebody, but now I realize I should have been more specific.", author: "Lily Tomlin" },
        { text: "Before you marry a person, you should first make them use a computer with slow Internet to see who they really are.", author: "Will Ferrell" },
        { text: "I'm sorry, if you were right, I'd agree with you.", author: "Robin Williams" },
        { text: "Age is of no importance unless you're a cheese.", author: "Billie Burke" },
        { text: "The elevator to success is out of order. You'll have to use the stairs, one step at a time.", author: "Joe Girard" },
        { text: "I intend to live forever. So far, so good.", author: "Steven Wright" },
        { text: "Why do they call it rush hour when nothing moves?", author: "Robin Williams" },
        { text: "People say nothing is impossible, but I do nothing every day.", author: "A.A. Milne" },
        { text: "The road to success is dotted with many tempting parking spaces.", author: "Will Rogers" },
        { text: "I have a lot of growing up to do. I realized that the other day inside my fort.", author: "Zach Galifianakis" }
    ],
    wisdom: [
        { text: "The only true wisdom is in knowing you know nothing.", author: "Socrates" },
        { text: "The journey of a thousand miles begins with one step.", author: "Lao Tzu" },
        { text: "In three words I can sum up everything I've learned about life: it goes on.", author: "Robert Frost" },
        { text: "The only way to do great work is to love what you do.", author: "Steve Jobs" },
        { text: "Life is what happens when you're busy making other plans.", author: "John Lennon" },
        { text: "The best time to plant a tree was 20 years ago. The second best time is now.", author: "Chinese Proverb" },
        { text: "Turn your wounds into wisdom.", author: "Oprah Winfrey" },
        { text: "It is better to remain silent at the risk of being thought a fool, than to talk and remove all doubt of it.", author: "Maurice Switzer" },
        { text: "The fool doth think he is wise, but the wise man knows himself to be a fool.", author: "William Shakespeare" },
        { text: "Knowing yourself is the beginning of all wisdom.", author: "Aristotle" },
        { text: "The saddest aspect of life right now is that science gathers knowledge faster than society gathers wisdom.", author: "Isaac Asimov" },
        { text: "We are what we repeatedly do. Excellence, then, is not an act, but a habit.", author: "Aristotle" },
        { text: "Yesterday I was clever, so I wanted to change the world. Today I am wise, so I am changing myself.", author: "Rumi" },
        { text: "By three methods we may learn wisdom: First, by reflection, which is noblest; Second, by imitation, which is easiest; and third by experience, which is the bitterest.", author: "Confucius" },
        { text: "The only impossible journey is the one you never begin.", author: "Tony Robbins" },
        { text: "In the middle of difficulty lies opportunity.", author: "Albert Einstein" },
        { text: "What we think, we become.", author: "Buddha" },
        { text: "The mind is everything. What you think you become.", author: "Buddha" },
        { text: "Do not dwell in the past, do not dream of the future, concentrate the mind on the present moment.", author: "Buddha" },
        { text: "A wise man can learn more from a foolish question than a fool can learn from a wise answer.", author: "Bruce Lee" }
    ],
    courage: [
        { text: "Courage is not the absence of fear, but rather the assessment that something else is more important than fear.", author: "Franklin D. Roosevelt" },
        { text: "You gain strength, courage, and confidence by every experience in which you really stop to look fear in the face.", author: "Eleanor Roosevelt" },
        { text: "Courage is being scared to death, but saddling up anyway.", author: "John Wayne" },
        { text: "It takes courage to grow up and become who you really are.", author: "E.E. Cummings" },
        { text: "Have the courage to follow your heart and intuition. They somehow know what you truly want to become.", author: "Steve Jobs" },
        { text: "Courage is the most important of all the virtues because without courage, you can't practice any other virtue consistently.", author: "Maya Angelou" },
        { text: "A brave man is a man who dares to look the Devil in the face and tell him he is a Devil.", author: "James A. Garfield" },
        { text: "Courage doesn't always roar. Sometimes courage is the quiet voice at the end of the day saying 'I will try again tomorrow.'", author: "Mary Anne Radmacher" },
        { text: "You cannot swim for new horizons until you have courage to lose sight of the shore.", author: "William Faulkner" },
        { text: "Courage is resistance to fear, mastery of fear - not absence of fear.", author: "Mark Twain" },
        { text: "It is curious that physical courage should be so common in the world and moral courage so rare.", author: "Mark Twain" },
        { text: "Success is not final, failure is not fatal: it is the courage to continue that counts.", author: "Winston Churchill" },
        { text: "Courage is what it takes to stand up and speak; courage is also what it takes to sit down and listen.", author: "Winston Churchill" },
        { text: "The brave man is not he who does not feel afraid, but he who conquers that fear.", author: "Nelson Mandela" },
        { text: "Courage is grace under pressure.", author: "Ernest Hemingway" },
        { text: "All our dreams can come true if we have the courage to pursue them.", author: "Walt Disney" },
        { text: "Courage is like a muscle. We strengthen it by use.", author: "Ruth Gordon" },
        { text: "A ship is safe in harbor, but that's not what ships are for.", author: "John A. Shedd" },
        { text: "Don't be afraid of your fears. They're not there to scare you. They're there to let you know that something is worth it.", author: "C. JoyBell C." },
        { text: "Bran thought about it. 'Can a man still be brave if he's afraid?' 'That is the only time a man can be brave,' his father told him.", author: "George R.R. Martin" }
    ],
    friendship: [
        { text: "A real friend is one who walks in when the rest of the world walks out.", author: "Walter Winchell" },
        { text: "Friendship is born at that moment when one person says to another: 'What! You too? I thought I was the only one.'", author: "C.S. Lewis" },
        { text: "A friend is someone who knows all about you and still loves you.", author: "Elbert Hubbard" },
        { text: "True friendship comes when the silence between two people is comfortable.", author: "David Tyson" },
        { text: "There is nothing on this earth more to be prized than true friendship.", author: "Thomas Aquinas" },
        { text: "The only way to have a friend is to be one.", author: "Ralph Waldo Emerson" },
        { text: "A true friend never gets in your way unless you happen to be going down.", author: "Arnold H. Glasow" },
        { text: "Friends are the family you choose.", author: "Jess C. Scott" },
        { text: "A sweet friendship refreshes the soul.", author: "Proverbs 27:9" },
        { text: "In the end, we will remember not the words of our enemies, but the silence of our friends.", author: "Martin Luther King Jr." },
        { text: "The greatest gift of life is friendship, and I have received it.", author: "Hubert H. Humphrey" },
        { text: "A friend is what the heart needs all the time.", author: "Henry Van Dyke" },
        { text: "Walking with a friend in the dark is better than walking alone in the light.", author: "Helen Keller" },
        { text: "Friends show their love in times of trouble, not in happiness.", author: "Euripides" },
        { text: "Each friend represents a world in us, a world possibly not born until they arrive.", author: "Anaïs Nin" },
        { text: "The language of friendship is not words but meanings.", author: "Henry David Thoreau" },
        { text: "Friendship is the only cement that will ever hold the world together.", author: "Woodrow Wilson" },
        { text: "A friend to all is a friend to none.", author: "Aristotle" },
        { text: "One loyal friend is worth ten thousand relatives.", author: "Euripides" },
        { text: "Be slow to fall into friendship, but when you are in, continue firm and constant.", author: "Socrates" }
    ],
    perseverance: [
        { text: "It does not matter how slowly you go as long as you do not stop.", author: "Confucius" },
        { text: "Perseverance is not a long race; it is many short races one after the other.", author: "Walter Elliot" },
        { text: "Fall seven times, stand up eight.", author: "Japanese Proverb" },
        { text: "Success is not final, failure is not fatal: it is the courage to continue that counts.", author: "Winston Churchill" },
        { text: "The difference between a successful person and others is not a lack of strength, not a lack of knowledge, but rather a lack in will.", author: "Vince Lombardi" },
        { text: "I am not afraid of storms, for I am learning how to sail my ship.", author: "Louisa May Alcott" },
        { text: "The only guarantee for failure is to stop trying.", author: "John C. Maxwell" },
        { text: "It's not that I'm so smart, it's just that I stay with problems longer.", author: "Albert Einstein" },
        { text: "Many of life's failures are people who did not realize how close they were to success when they gave up.", author: "Thomas Edison" },
        { text: "Our greatest weakness lies in giving up. The most certain way to succeed is always to try just one more time.", author: "Thomas Edison" },
        { text: "Perseverance is failing 19 times and succeeding the 20th.", author: "Julie Andrews" },
        { text: "Character consists of what you do on the third and fourth tries.", author: "James A. Michener" },
        { text: "You just can't beat the person who never gives up.", author: "Babe Ruth" },
        { text: "If you're going through hell, keep going.", author: "Winston Churchill" },
        { text: "The man who moves a mountain begins by carrying away small stones.", author: "Confucius" },
        { text: "What you get by achieving your goals is not as important as what you become by achieving your goals.", author: "Zig Ziglar" },
        { text: "Difficult roads often lead to beautiful destinations.", author: "Zig Ziglar" },
        { text: "Don't watch the clock; do what it does. Keep going.", author: "Sam Levenson" },
        { text: "A river cuts through rock not because of its power, but because of its persistence.", author: "Jim Watkins" },
        { text: "The only person you are destined to become is the person you decide to be.", author: "Ralph Waldo Emerson" }
    ],
    creativity: [
        { text: "Creativity is intelligence having fun.", author: "Albert Einstein" },
        { text: "The chief enemy of creativity is good sense.", author: "Pablo Picasso" },
        { text: "Creativity takes courage.", author: "Henri Matisse" },
        { text: "You can't use up creativity. The more you use, the more you have.", author: "Maya Angelou" },
        { text: "Imagination is the beginning of creation.", author: "George Bernard Shaw" },
        { text: "Every child is an artist. The problem is how to remain an artist once we grow up.", author: "Pablo Picasso" },
        { text: "Creativity is contagious. Pass it on.", author: "Albert Einstein" },
        { text: "Logic will get you from A to B. Imagination will take you everywhere.", author: "Albert Einstein" },
        { text: "The desire to create is one of the deepest yearnings of the human soul.", author: "Dieter F. Uchtdorf" },
        { text: "Creativity is thinking up new things. Innovation is doing new things.", author: "Theodore Levitt" },
        { text: "An essential aspect of creativity is not being afraid to fail.", author: "Edwin Land" },
        { text: "Creativity is allowing yourself to make mistakes. Art is knowing which ones to keep.", author: "Scott Adams" },
        { text: "The creative adult is the child who survived.", author: "Ursula K. Le Guin" },
        { text: "To live a creative life, we must lose our fear of being wrong.", author: "Joseph Chilton Pearce" },
        { text: "Creativity is just connecting things.", author: "Steve Jobs" },
        { text: "The worst enemy to creativity is self-doubt.", author: "Sylvia Plath" },
        { text: "There is no innovation and creativity without failure. Period.", author: "Brené Brown" },
        { text: "Creativity doesn't wait for that perfect moment. It fashions its own perfect moments out of ordinary ones.", author: "Bruce Garrabrandt" },
        { text: "Don't think. Thinking is the enemy of creativity.", author: "Ray Bradbury" },
        { text: "Have no fear of perfection - you'll never reach it.", author: "Salvador Dalí" }
    ],
    gratitude: [
        { text: "Gratitude turns what we have into enough.", author: "Anonymous" },
        { text: "The more grateful I am, the more beauty I see.", author: "Mary Davis" },
        { text: "Gratitude is not only the greatest of virtues, but the parent of all others.", author: "Cicero" },
        { text: "When you are grateful, fear disappears and abundance appears.", author: "Tony Robbins" },
        { text: "Gratitude makes sense of our past, brings peace for today, and creates a vision for tomorrow.", author: "Melody Beattie" },
        { text: "It is not joy that makes us grateful; it is gratitude that makes us joyful.", author: "David Steindl-Rast" },
        { text: "Gratitude is the healthiest of all human emotions.", author: "Zig Ziglar" },
        { text: "Let us be grateful to the people who make us happy; they are the charming gardeners who make our souls blossom.", author: "Marcel Proust" },
        { text: "In ordinary life, we hardly realize that we receive a great deal more than we give, and that it is only with gratitude that life becomes rich.", author: "Dietrich Bonhoeffer" },
        { text: "Appreciation is a wonderful thing. It makes what is excellent in others belong to us as well.", author: "Voltaire" },
        { text: "The struggle ends when gratitude begins.", author: "Neale Donald Walsch" },
        { text: "Piglet noticed that even though he had a Very Small Heart, it could hold a rather large amount of Gratitude.", author: "A.A. Milne" },
        { text: "As we express our gratitude, we must never forget that the highest appreciation is not to utter words, but to live by them.", author: "John F. Kennedy" },
        { text: "Gratitude is the fairest blossom which springs from the soul.", author: "Henry Ward Beecher" },
        { text: "When I started counting my blessings, my whole life turned around.", author: "Willie Nelson" },
        { text: "Enjoy the little things, for one day you may look back and realize they were the big things.", author: "Robert Brault" },
        { text: "Gratitude is a powerful catalyst for happiness.", author: "Amy Collette" },
        { text: "The roots of all goodness lie in the soil of appreciation for goodness.", author: "Dalai Lama" },
        { text: "Trade your expectations for appreciation and your whole world changes in an instant.", author: "Tony Robbins" },
        { text: "Gratitude is the sign of noble souls.", author: "Aesop" }
    ],
    success: [
        { text: "Success is not the key to happiness. Happiness is the key to success.", author: "Albert Schweitzer" },
        { text: "Success is not final, failure is not fatal: it is the courage to continue that counts.", author: "Winston Churchill" },
        { text: "The road to success and the road to failure are almost exactly the same.", author: "Colin R. Davis" },
        { text: "Success usually comes to those who are too busy to be looking for it.", author: "Henry David Thoreau" },
        { text: "Don't be afraid to give up the good to go for the great.", author: "John D. Rockefeller" },
        { text: "I find that the harder I work, the more luck I seem to have.", author: "Thomas Jefferson" },
        { text: "Success is walking from failure to failure with no loss of enthusiasm.", author: "Winston Churchill" },
        { text: "The way to get started is to quit talking and begin doing.", author: "Walt Disney" },
        { text: "Success is not how high you have climbed, but how you make a positive difference to the world.", author: "Roy T. Bennett" },
        { text: "Don't aim for success if you want it; just do what you love and believe in, and it will come naturally.", author: "David Frost" },
        { text: "Success is liking yourself, liking what you do, and liking how you do it.", author: "Maya Angelou" },
        { text: "The secret of success is to do the common thing uncommonly well.", author: "John D. Rockefeller Jr." },
        { text: "I never dreamed about success, I worked for it.", author: "Estée Lauder" },
        { text: "Success seems to be connected with action. Successful people keep moving.", author: "Conrad Hilton" },
        { text: "The only place where success comes before work is in the dictionary.", author: "Vidal Sassoon" },
        { text: "Success is not in what you have, but who you are.", author: "Bo Bennett" },
        { text: "Try not to become a person of success, but rather try to become a person of value.", author: "Albert Einstein" },
        { text: "Opportunities don't happen. You create them.", author: "Chris Grosser" },
        { text: "The difference between who you are and who you want to be is what you do.", author: "Bill Phillips" },
        { text: "Success is the sum of small efforts repeated day in and day out.", author: "Robert Collier" }
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
