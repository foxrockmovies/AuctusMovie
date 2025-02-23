const movies = [
    {
        title: 'Marco',
        description: 'Adattu is one of the most renowned gold-trading families in Kerala. Unexpectedly, an incident shakes the Adattu family. George, the head of the family, sets out to uncover the truth and find those responsible. At the same time, his younger brother, Marco, embarks on the same quest but through a different Path.',
        image: 'https://m.media-amazon.com/images/M/MV5BMDNkZmZlOWEtMjIxYS00MzMwLTg4ODYtMDRmNzY2NjY3NDdkXkEyXkFqcGc@._V1_.jpg',
        genre: 'Adventure',
        downloadUrl: 'https://hubcloud.ink/drive/qycw4b4ddyxbzvc',
        rating: 4.5
    },
    {
        title: 'Baby John',
        description: 'DCP Satya Verma fakes his own death to protect his daughter from the dangerous politician Babbar Sher. When old enemies resurface, Satya must confront his past and put everything on the line to safeguard his family.',
        image: 'https://i.redd.it/84mju1gjr4hc1.jpeg',
        genre: 'Action/Drama',
        downloadUrl: 'https://hubcloud.ink/drive/anjvvvrnbnafh1v',
        rating: 4.0
    },
    {
        title: 'The Sabarmati Report',
        description: 'A journalist investigates the 2002 Godhra train burning in Gujarat. Years later, another reporter discovers his hidden report. They uncover a conspiracy involving powerful figures, facing threats as they pursue the truth.',
        image: 'https://assets.voxcinemas.com/posters/P_HO00011674_1731043173783.jpg',
        genre: 'Drama',
        downloadUrl: 'https://hubcloud.ink/drive/zzj4ymum1c31qr1',
        rating: 3.8
    },
    {
        title: 'Pushpa 2: The Rule',
        description: 'The clash is on as Pushpa and Bhanwar Singh continue their rivalry in this epic conclusion to the two-parted action drama.',
        image: 'https://m.media-amazon.com/images/M/MV5BZjllNTdiM2QtYjQ0Ni00ZGM1LWFlYmUtNWY0YjMzYWIxOTYxXkEyXkFqcGc@._V1_.jpg',
        genre: 'Action/Thriller',
        downloadUrl: 'https://hubcloud.ink/drive/0u2t7tugc11gtdj',
        rating: 4.7
    },
    {
        title: 'Game Changer',
        description: 'Ram Nandan, a government official, embarks on a relentless fight against corrupt politicians. Determined to bring about fair elections, he tries to revolutionise the way the government operates.',
        image: 'https://resizing.flixster.com/oU1jMB-OmqwbQHEfEwX7ZxLJNww=/ems.cHJkLWVtcy1hc3NldHMvbW92aWVzLzE3NjVhNzY3LWNhM2ItNGY0ZS05Y2RkLWFjZjQ0ODdjZTI5Mi5qcGc=',
        genre: 'Action/Thriller',
        downloadUrl: 'https://hubcloud.ink/drive/jh86l8aqbojb9lb',
        rating: 4.2
    },
    {
        title: 'Kanguva',
        description: 'While working as a bounty hunter in Goa, Francis recalls his past life, a centuries-old tale of warrior Kanguva. Turns out, he has an old score to settle and someone dear to protect in the present.',
        image: 'https://static.moviecrow.com/gallery/20241112/237621-Kanguva%20Suriya%20Bobby%20Deol%20SWOT.jpg',
        genre: 'Action/Drama',
        downloadUrl: 'https://hubcloud.ink/drive/mqhpbhleel4fqok',
        rating: 4.1
    }
];

const movieGrid = document.getElementById('movies');
const searchInput = document.getElementById('search-input');
const searchResults = document.getElementById('search-results');
let watchlist = JSON.parse(localStorage.getItem('watchlist')) || [];

// Load Movies Function
const loadMovies = () => {
    movies.forEach(movie => {
        const movieCard = document.createElement('div');
        movieCard.classList.add('movie-card');

        const img = new Image();
        img.src = movie.image;
        img.alt = movie.title;
        img.onerror = () => {
            img.src = 'https://via.placeholder.com/200x300?text=Image+Not+Available';
        };

        const isInWatchlist = watchlist.some(m => m.title === movie.title);

        movieCard.innerHTML = `
            <div class="movie-overlay"></div>
            <div class="movie-info">
                <h3>${movie.title}</h3>
                <p>${movie.description}</p>
                <div class="rating">Rating: ${movie.rating}/5</div>
                <button class="add-to-watchlist ${isInWatchlist ? 'added' : ''}" data-title="${movie.title}" onclick="addToWatchlist('${movie.title}')">
                    <i class="fas ${isInWatchlist ? 'fa-check' : 'fa-plus'}"></i> ${isInWatchlist ? 'Added to Watchlist' : 'Add to Watchlist'}
                </button>
                <a href="${movie.downloadUrl}" class="download-button" target="_blank">
                    <i class="fas fa-download"></i> Download
                </a>
            </div>
        `;
        movieCard.insertBefore(img, movieCard.firstChild);

        movieGrid.appendChild(movieCard);
    });
};

// Enhanced Watchlist Functionality
const addToWatchlist = (title) => {
    const movie = movies.find(m => m.title === title);
    const watchlistButton = document.querySelector(`.add-to-watchlist[data-title="${title}"]`);

    if (movie) {
        const isInWatchlist = watchlist.some(m => m.title === title);

        if (!isInWatchlist) {
            watchlist.push(movie);
            localStorage.setItem('watchlist', JSON.stringify(watchlist));
            watchlistButton.innerHTML = `<i class="fas fa-check"></i> Added to Watchlist`;
            watchlistButton.classList.add('added');
            alert(`${title} added to watchlist!`);
        } else {
            watchlist = watchlist.filter(m => m.title !== title);
            localStorage.setItem('watchlist', JSON.stringify(watchlist));
            watchlistButton.innerHTML = `<i class="fas fa-plus"></i> Add to Watchlist`;
            watchlistButton.classList.remove('added');
            alert(`${title} removed from watchlist.`);
        }
    }
};

// Initial Load
loadMovies();

// Slideshow Functionality
let currentSlide = 0;
let slideInterval;
let isPaused = false;

const slides = [
    {
        image: 'https://assets-in.bmscdn.com/discovery-catalog/events/et00416394-txqmnuwarp-landscape.jpg',
        title: 'Marco',
    },
    {
        image: 'https://i.redd.it/84mju1gjr4hc1.jpeg',
        title: 'Baby John',
    },
    {
        image: 'https://assets.voxcinemas.com/posters/P_HO00011674_1731043173783.jpg',
        title: 'The Sabarmati Report',
    },
    {
        image: 'https://m.media-amazon.com/images/M/MV5BZjllNTdiM2QtYjQ0Ni00ZGM1LWFlYmUtNWY0YjMzYWIxOTYxXkEyXkFqcGc@._V1_.jpg',
        title: 'Pushpa 2: The Rule',
    }
];

function renderSlideshow() {
    const slideshowContainer = document.getElementById('slideshow');
    const dotsContainer = document.querySelector('.dots-container');
    const thumbnailsContainer = document.createElement('div');
    thumbnailsContainer.className = 'thumbnails-container';
    slideshowContainer.appendChild(thumbnailsContainer);

    slides.forEach((slide, index) => {
        const slideDiv = document.createElement('div');
        slideDiv.className = 'slide';
        slideDiv.style.backgroundImage = `url(${slide.image})`;
        slideDiv.innerHTML = `
            <div class="slide-content">
                <h2>${slide.title}</h2>
            </div>
        `;
        slideshowContainer.insertBefore(slideDiv, slideshowContainer.firstChild);

        const dot = document.createElement('span');
        dot.className = 'dot';
        dot.addEventListener('click', () => showSlide(index));
        dotsContainer.appendChild(dot);

        const thumbnail = document.createElement('img');
        thumbnail.src = slide.image;
        thumbnail.alt = slide.title;
        thumbnail.className = 'thumbnail';
        thumbnail.addEventListener('click', () => showSlide(index));
        thumbnailsContainer.appendChild(thumbnail);
    });

    showSlide(currentSlide);
    startSlideInterval();
}

function showSlide(index) {
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');
    const thumbnails = document.querySelectorAll('.thumbnail');

    slides.forEach((slide, i) => {
        slide.style.opacity = i === index ? '1' : '0';
        slide.style.transition = 'opacity 1s ease-in-out';
    });

    dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === index);
    });

    thumbnails.forEach((thumbnail, i) => {
        thumbnail.classList.toggle('active', i === index);
    });

    currentSlide = index;
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
}

function prevSlide() {
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    showSlide(currentSlide);
}

function startSlideInterval() {
    if (!isPaused) {
        slideInterval = setInterval(nextSlide, 5000);
    }
}

const slideshowContainer = document.getElementById('slideshow');
slideshowContainer.addEventListener('mouseenter', () => {
    isPaused = true;
    pauseSlideInterval();
});
slideshowContainer.addEventListener('mouseleave', () => {
    isPaused = false;
    startSlideInterval();
});

function pauseSlideInterval() {
    clearInterval(slideInterval);
}

let touchStartX = 0;
let touchEndX = 0;

slideshowContainer.addEventListener('touchstart', (e) => {
    touchStartX = e.touches[0].clientX;
});

slideshowContainer.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].clientX;
    handleSwipe();
});

function handleSwipe() {
    if (touchEndX < touchStartX) {
        nextSlide();
    } else if (touchEndX > touchStartX) {
        prevSlide();
    }
}

document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') {
        nextSlide();
    } else if (e.key === 'ArrowLeft') {
        prevSlide();
    }
});

const fullscreenButton = document.createElement('button');
fullscreenButton.className = 'fullscreen-button';
fullscreenButton.innerHTML = '<i class="fas fa-expand"></i>';
fullscreenButton.addEventListener('click', toggleFullscreen);
slideshowContainer.appendChild(fullscreenButton);

function toggleFullscreen() {
    if (!document.fullscreenElement) {
        slideshowContainer.requestFullscreen().catch(err => {
            alert('Error attempting to enable fullscreen mode: ' + err.message);
        });
    } else {
        document.exitFullscreen();
    }
}

renderSlideshow();

// Search Functionality with Auto-Search and Suggestions
let searchTimeout;

function debounceSearch() {
    clearTimeout(searchTimeout);
    searchTimeout = setTimeout(() => {
        performSearch();
    }, 300); // Adjust the delay as needed
}

function performSearch() {
    const searchInput = document.getElementById('search-input').value.toLowerCase();
    const searchResults = document.getElementById('search-results');
    searchResults.innerHTML = '';

    if (searchInput.length === 0) {
        searchResults.classList.remove('show');
        return;
    }

    const filteredMovies = movies.filter(movie => movie.title.toLowerCase().includes(searchInput));
    if (filteredMovies.length > 0) {
        filteredMovies.forEach(movie => {
            const result = document.createElement('div');
            const highlightedTitle = highlightMatch(movie.title, searchInput);
            result.innerHTML = highlightedTitle;
            result.addEventListener('click', () => {
                alert(`You selected: ${movie.title}`);
            });
            searchResults.appendChild(result);
        });
        searchResults.classList.add('show');
    } else {
        searchResults.classList.remove('show');
        searchResults.innerHTML = '<div>No results found.</div>';
    }
}

function highlightMatch(text, searchTerm) {
    const regex = new RegExp(`(${searchTerm})`, 'gi');
    return text.replace(regex, '<span class="highlight-text">$1</span>');
}

document.getElementById('search-input').addEventListener('input', (e) => {
    const clearButton = document.getElementById('clear-search');
    clearButton.style.display = e.target.value.length > 0 ? 'block' : 'none';
    debounceSearch();
});

document.getElementById('clear-search').addEventListener('click', () => {
    document.getElementById('search-input').value = '';
    document.getElementById('search-results').innerHTML = '';
    document.getElementById('search-results').classList.remove('show');
    document.getElementById('clear-search').style.display = 'none';
});

document.getElementById('search-input').addEventListener('keydown', (e) => {
    const searchResults = document.getElementById('search-results');
    const results = searchResults.querySelectorAll('div');
    let currentHighlight = searchResults.querySelector('.highlight');

    if (e.key === 'ArrowDown') {
        e.preventDefault();
        if (!currentHighlight) {
            results[0].classList.add('highlight');
        } else {
            currentHighlight.classList.remove('highlight');
            const next = currentHighlight.nextElementSibling;
            if (next) {
                next.classList.add('highlight');
            } else {
                results[0].classList.add('highlight');
            }
        }
    } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        if (!currentHighlight) {
            results[results.length - 1].classList.add('highlight');
        } else {
            currentHighlight.classList.remove('highlight');
            const prev = currentHighlight.previousElementSibling;
            if (prev) {
                prev.classList.add('highlight');
            } else {
                results[results.length - 1].classList.add('highlight');
            }
        }
    } else if (e.key === 'Enter' && currentHighlight) {
        e.preventDefault();
        currentHighlight.click();
    }
});

document.addEventListener('click', (event) => {
    const searchResults = document.getElementById('search-results');
    const searchBar = document.querySelector('.search-bar');
    if (!searchBar.contains(event.target)) {
        searchResults.classList.remove('show');
    }
});

// Enhanced Light Mode Toggle
document.addEventListener("DOMContentLoaded", () => {
    const toggle = document.getElementById("dark-mode-toggle");
    const body = document.body;

    if (localStorage.getItem("theme") === "light") {
        body.classList.add("light-mode");
        toggle.textContent = "Dark Mode";
    } else {
        toggle.textContent = "Light Mode";
    }

    toggle.addEventListener("click", () => {
        body.classList.toggle("light-mode");
        if (body.classList.contains("light-mode")) {
            localStorage.setItem("theme", "light");
            toggle.textContent = "Dark Mode";
        } else {
            localStorage.setItem("theme", "dark");
            toggle.textContent = "Light Mode";
        }
    });
});

// Enhanced Edit Profile Functionality with Animation
document.getElementById('edit-profile').addEventListener('click', () => {
    const dropdown = document.getElementById('profile-dropdown');
    const editForm = document.createElement('div');
    editForm.className = 'edit-profile-form';
    editForm.innerHTML = `
        <input type="text" id="edit-name" placeholder="Enter your name">
        <input type="email" id="edit-email" placeholder="Enter your email">
        <button onclick="saveProfile()">Save</button>
    `;
    
    // Append the form to the dropdown
    dropdown.appendChild(editForm);

    // Trigger the fade-in animation
    setTimeout(() => {
        editForm.style.opacity = '1';
        editForm.style.transform = 'translateY(0)';
    }, 10); // Small delay to allow the browser to render the element before applying the transition
});

function saveProfile() {
    const name = document.getElementById('edit-name').value;
    const email = document.getElementById('edit-email').value;

    if (name || email) {
        alert(`Profile Updated!\nName: ${name}\nEmail: ${email}`);
    } else {
        alert('Please fill in at least one field.');
    }

    // Remove the form with fade-out animation
    const editForm = document.querySelector('.edit-profile-form');
    editForm.style.opacity = '0';
    editForm.style.transform = 'translateY(-10px)';

    // Wait for the animation to complete before removing the form
    setTimeout(() => {
        editForm.remove();
    }, 300); // Match this duration with the CSS transition duration
}

// Enhanced Logout Functionality with Confirmation Modal
document.getElementById('logout').addEventListener('click', () => {
    const modal = document.createElement('div');
    modal.className = 'confirmation-modal';
    modal.innerHTML = `
        <div class="confirmation-modal-content">
            <h3>Are you sure you want to log out?</h3>
            <button class="confirm" onclick="confirmLogout()">Yes, Log Out</button>
            <button class="cancel" onclick="closeModal()">Cancel</button>
        </div>
    `;
    document.body.appendChild(modal);
    modal.classList.add('show');
});

function confirmLogout() {
    alert('You have been logged out.');
    window.location.href = '/login';
    closeModal();
}

function closeModal() {
    const modal = document.querySelector('.confirmation-modal');
    modal.classList.remove('show');
    setTimeout(() => {
        modal.remove();
    }, 300); // Match this duration with the CSS transition duration
}
// Profile Dropdown with Animation
document.getElementById('user-profile').addEventListener('click', () => {
    const dropdown = document.getElementById('profile-dropdown');
    dropdown.classList.toggle('show');
});

document.addEventListener('click', (event) => {
    const dropdown = document.getElementById('profile-dropdown');
    const profile = document.getElementById('user-profile');
    if (!profile.contains(event.target)) {
        dropdown.classList.remove('show');
    }
});

// Edit Profile Functionality
document.getElementById('edit-profile').addEventListener('click', () => {
    const editForm = document.createElement('div');
    editForm.className = 'edit-profile-form';
    editForm.innerHTML = `
        <input type="text" id="edit-name" placeholder="Enter your name">
        <input type="email" id="edit-email" placeholder="Enter your email">
        <button onclick="saveProfile()">Save</button>
    `;
    const dropdown = document.getElementById('profile-dropdown');
    dropdown.appendChild(editForm);
    editForm.style.display = 'block';
});

function saveProfile() {
    const name = document.getElementById('edit-name').value;
    const email = document.getElementById('edit-email').value;
    if (name || email) {
        alert(`Profile Updated!\nName: ${name}\nEmail: ${email}`);
    } else {
        alert('Please fill in at least one field.');
    }
    const editForm = document.querySelector('.edit-profile-form');
    editForm.remove();
}

// Logout Functionality
document.getElementById('logout').addEventListener('click', () => {
    if (confirm('Are you sure you want to log out?')) {
        alert('You have been logged out.');
        window.location.href = '/login';
    }
});
function showLoginForm() {
    document.getElementById('login-form').style.display = 'block';
    document.getElementById('register-form').style.display = 'none';
}

function showRegisterForm() {
    document.getElementById('register-form').style.display = 'block';
    document.getElementById('login-form').style.display = 'none';
}

function login() {
    const username = document.getElementById('login-username').value;
    const password = document.getElementById('login-password').value;

    fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    })
    .then(response => response.json())
    .then(data => {
        if (data.error) {
            alert(data.error);
        } else {
            alert('Login successful!');
            // Store user data in localStorage or session
            localStorage.setItem('user', JSON.stringify(data));
            // Redirect or update UI
        }
    });
}

function register() {
    const username = document.getElementById('register-username').value;
    const password = document.getElementById('register-password').value;
    const email = document.getElementById('register-email').value;

    fetch('http://localhost:3000/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password, email })
    })
    .then(response => response.json())
    .then(data => {
        if (data.error) {
            alert(data.error);
        } else {
            alert('Registration successful!');
            showLoginForm();
        }
    });
}
// Edit Profile Functionality with Animation
document.getElementById('edit-profile').addEventListener('click', () => {
    const dropdown = document.getElementById('profile-dropdown');
    const editForm = document.createElement('div');
    editForm.className = 'edit-profile-form';
    editForm.innerHTML = `
        <input type="text" id="edit-name" placeholder="Enter your name">
        <input type="email" id="edit-email" placeholder="Enter your email">
        <button onclick="saveProfile()">Save</button>
    `;
    
    // Append the form to the dropdown
    dropdown.appendChild(editForm);

    // Trigger the fade-in animation
    setTimeout(() => {
        editForm.style.opacity = '1';
        editForm.style.transform = 'translateY(0)';
    }, 10); // Small delay to allow the browser to render the element before applying the transition
});

function saveProfile() {
    const name = document.getElementById('edit-name').value;
    const email = document.getElementById('edit-email').value;

    if (name || email) {
        alert(`Profile Updated!\nName: ${name}\nEmail: ${email}`);
    } else {
        alert('Please fill in at least one field.');
    }

    // Remove the form with fade-out animation
    const editForm = document.querySelector('.edit-profile-form');
    editForm.style.opacity = '0';
    editForm.style.transform = 'translateY(-10px)';

    // Wait for the animation to complete before removing the form
    setTimeout(() => {
        editForm.remove();
    }, 300); // Match this duration with the CSS transition duration
}

// Auct AI Bot Functionality
const auctAiBot = document.getElementById('auct-ai-bot');
const auctAiMessages = document.getElementById('auct-ai-messages');
const auctAiInput = document.getElementById('auct-ai-input');
const auctAiSend = document.getElementById('auct-ai-send');
const closeAiBot = document.getElementById('close-ai-bot');

// Toggle AI Bot
document.addEventListener('DOMContentLoaded', () => {
    const aiBotToggle = document.createElement('button');
    aiBotToggle.id = 'ai-bot-toggle';
    aiBotToggle.innerHTML = '<i class="fas fa-robot"></i> Auct AI';
    aiBotToggle.style.position = 'fixed';
    aiBotToggle.style.bottom = '20px';
    aiBotToggle.style.right = '20px';
    aiBotToggle.style.padding = '10px 20px';
    aiBotToggle.style.backgroundColor = '#e50914';
    aiBotToggle.style.color = '#fff';
    aiBotToggle.style.border = 'none';
    aiBotToggle.style.borderRadius = '25px';
    aiBotToggle.style.cursor = 'pointer';
    aiBotToggle.style.zIndex = '1000';
    aiBotToggle.style.transition = 'transform 0.3s, background-color 0.3s';
    aiBotToggle.addEventListener('click', () => {
        auctAiBot.classList.toggle('show');
    });
    aiBotToggle.addEventListener('mouseenter', () => {
        aiBotToggle.style.transform = 'scale(1.1)';
    });
    aiBotToggle.addEventListener('mouseleave', () => {
        aiBotToggle.style.transform = 'scale(1)';
    });
    document.body.appendChild(aiBotToggle);
});

// Close AI Bot
closeAiBot.addEventListener('click', () => {
    auctAiBot.classList.remove('show');
});

// Send Message to Auct AI
auctAiSend.addEventListener('click', () => {
    const userMessage = auctAiInput.value.trim();
    if (userMessage) {
        addMessage(userMessage, 'user');
        auctAiInput.value = '';
        setTimeout(() => {
            handleAuctAiResponse(userMessage);
        }, 500);
    }
});

// Handle Auct AI Response
async function handleAuctAiResponse(userMessage) {
    let botResponse = '';
    const query = userMessage.toLowerCase();

    // Top 7 AI Features
    if (query.includes('recommend')) {
        botResponse = 'Here are some movie recommendations: Marco, Baby John, Pushpa 2.';
    } else if (query.includes('search')) {
        const movieName = query.replace('search', '').trim();
        botResponse = await searchMovie(movieName);
    } else if (query.includes('watchlist')) {
        botResponse = 'You can manage your watchlist from the "My List" section.';
    } else if (query.includes('trending')) {
        botResponse = 'Trending movies: Marco, Baby John, Pushpa 2.';
    } else if (query.includes('review')) {
        botResponse = 'Marco has a rating of 4.5/5. Baby John has a rating of 4.0/5.';
    } else if (query.includes('light mode') || query.includes('dark mode')) {
        botResponse = 'You can toggle light/dark mode from the profile dropdown.';
    } else {
        botResponse = 'I’m here to help! Ask me about movies, recommendations, or your watchlist.';
    }

    addMessage(botResponse, 'bot');
}

// Search Movie Function (IMDb Integration)
async function searchMovie(movieName) {
    const apiKey = 'YOUR_IMDB_API_KEY'; // Replace with your IMDb API key
    const url = `https://imdb-api.com/en/API/SearchMovie/${apiKey}/${movieName}`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        if (data.results.length > 0) {
            const movie = data.results[0];
            return `Here's what I found: ${movie.title} (${movie.description}).`;
        } else {
            return 'Sorry, I couldn\'t find any movies matching your query.';
        }
    } catch (error) {
        return 'Sorry, there was an error processing your request.';
    }
}

// Add Message to Chat
function addMessage(text, sender) {
    const message = document.createElement('div');
    message.classList.add('message', sender);
    message.textContent = text;
    auctAiMessages.appendChild(message);
    auctAiMessages.scrollTop = auctAiMessages.scrollHeight;
}

// API Keys (Replace with your actual API keys)
const OPENAI_API_KEY = 'your-openai-api-key';
const DEEPSEEK_API_KEY = 'your-deepseek-api-key';
const BLACKBOX_API_KEY = 'your-blackbox-api-key';

// Function to send a message to ChatGPT
async function sendToChatGPT(message) {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${OPENAI_API_KEY}`
        },
        body: JSON.stringify({
            model: "gpt-3.5-turbo",
            messages: [{ role: "user", content: message }],
            max_tokens: 150
        })
    });
    const data = await response.json();
    return data.choices[0].message.content;
}

// Function to send a message to DeepSeek.ai
async function sendToDeepSeek(message) {
    const response = await fetch('https://api.deepseek.ai/v1/chat', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${DEEPSEEK_API_KEY}`
        },
        body: JSON.stringify({
            query: message,
            max_tokens: 150
        })
    });
    const data = await response.json();
    return data.response;
}

// Function to send a message to Blackbox.ai
async function sendToBlackbox(message) {
    const response = await fetch('https://api.blackbox.ai/v1/chat', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${BLACKBOX_API_KEY}`
        },
        body: JSON.stringify({
            query: message,
            max_tokens: 150
        })
    });
    const data = await response.json();
    return data.response;
}

// Handle Auct AI Response
async function handleAuctAiResponse(userMessage) {
    const selectedAI = document.getElementById('ai-service').value;
    let responses = [];

    if (selectedAI === 'all' || selectedAI === 'chatgpt') {
        const chatGPTResponse = await sendToChatGPT(userMessage);
        responses.push({ source: 'ChatGPT', response: chatGPTResponse });
    }

    if (selectedAI === 'all' || selectedAI === 'deepseek') {
        const deepSeekResponse = await sendToDeepSeek(userMessage);
        responses.push({ source: 'DeepSeek.ai', response: deepSeekResponse });
    }

    if (selectedAI === 'all' || selectedAI === 'blackbox') {
        const blackboxResponse = await sendToBlackbox(userMessage);
        responses.push({ source: 'Blackbox.ai', response: blackboxResponse });
    }

    // Display all responses
    responses.forEach(res => {
        addMessage(`${res.source}: ${res.response}`, 'bot');
    });
}

// Add Message to Chat
function addMessage(text, sender) {
    const message = document.createElement('div');
    message.classList.add('message', sender);
    message.textContent = text;
    auctAiMessages.appendChild(message);
    auctAiMessages.scrollTop = auctAiMessages.scrollHeight;
}

// Send Message to Auct AI
auctAiSend.addEventListener('click', () => {
    const userMessage = auctAiInput.value.trim();
    if (userMessage) {
        addMessage(userMessage, 'user');
        auctAiInput.value = '';
        setTimeout(() => {
            handleAuctAiResponse(userMessage);
        }, 500);
    }
});



// Function to send a message to ChatGPT
async function sendToChatGPT(message) {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${OPENAI_API_KEY}`
        },
        body: JSON.stringify({
            model: "gpt-3.5-turbo",
            messages: [{ role: "user", content: message }],
            max_tokens: 150
        })
    });
    const data = await response.json();
    return data.choices[0].message.content;
}

// Function to send a message to DeepSeek.ai
async function sendToDeepSeek(message) {
    const response = await fetch('https://api.deepseek.ai/v1/chat', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${DEEPSEEK_API_KEY}`
        },
        body: JSON.stringify({
            query: message,
            max_tokens: 150
        })
    });
    const data = await response.json();
    return data.response;
}

// Function to send a message to Blackbox.ai
async function sendToBlackbox(message) {
    const response = await fetch('https://api.blackbox.ai/v1/chat', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${BLACKBOX_API_KEY}`
        },
        body: JSON.stringify({
            query: message,
            max_tokens: 150
        })
    });
    const data = await response.json();
    return data.response;
}

// Handle Auct AI Response
async function handleAuctAiResponse(userMessage) {
    const selectedAI = document.getElementById('ai-service').value;
    let responses = [];

    // Show loading indicator
    const loadingIndicator = document.createElement('div');
    loadingIndicator.className = 'loading-indicator';
    loadingIndicator.textContent = 'Loading...';
    auctAiMessages.appendChild(loadingIndicator);

    if (selectedAI === 'all' || selectedAI === 'chatgpt') {
        try {
            const chatGPTResponse = await sendToChatGPT(userMessage);
            responses.push({ source: 'ChatGPT', response: chatGPTResponse });
        } catch (error) {
            responses.push({ source: 'ChatGPT', response: 'Sorry, there was an error processing your request.' });
        }
    }

    if (selectedAI === 'all' || selectedAI === 'deepseek') {
        try {
            const deepSeekResponse = await sendToDeepSeek(userMessage);
            responses.push({ source: 'DeepSeek.ai', response: deepSeekResponse });
        } catch (error) {
            responses.push({ source: 'DeepSeek.ai', response: 'Sorry, there was an error processing your request.' });
        }
    }

    if (selectedAI === 'all' || selectedAI === 'blackbox') {
        try {
            const blackboxResponse = await sendToBlackbox(userMessage);
            responses.push({ source: 'Blackbox.ai', response: blackboxResponse });
        } catch (error) {
            responses.push({ source: 'Blackbox.ai', response: 'Sorry, there was an error processing your request.' });
        }
    }

    // Remove loading indicator
    loadingIndicator.remove();

    // Display all responses
    responses.forEach(res => {
        addMessage(`${res.source}: ${res.response}`, 'bot');
    });
}

// Add Message to Chat
function addMessage(text, sender) {
    const message = document.createElement('div');
    message.classList.add('message', sender);
    message.textContent = text;
    auctAiMessages.appendChild(message);
    auctAiMessages.scrollTop = auctAiMessages.scrollHeight;
}

// Send Message to Auct AI
auctAiSend.addEventListener('click', () => {
    const userMessage = auctAiInput.value.trim();
    if (userMessage) {
        addMessage(userMessage, 'user');
        auctAiInput.value = '';
        setTimeout(() => {
            handleAuctAiResponse(userMessage);
        }, 500);
    }
});

// New Features

// 1. Movie Recommendations
function getMovieRecommendations() {
    const recommendations = movies.slice(0, 5).map(movie => movie.title).join(', ');
    addMessage(`Here are some movie recommendations: ${recommendations}`, 'bot');
}

// 2. Movie Reviews
function getMovieReviews(movieName) {
    const movie = movies.find(m => m.title.toLowerCase() === movieName.toLowerCase());
    if (movie) {
        addMessage(`Reviews for ${movie.title}: ${movie.description}`, 'bot');
    } else {
        addMessage(`Sorry, I couldn't find reviews for ${movieName}.`, 'bot');
    }
}

// 3. Watchlist Management
function manageWatchlist(action, movieName) {
    const movie = movies.find(m => m.title.toLowerCase() === movieName.toLowerCase());
    if (movie) {
        if (action === 'add') {
            watchlist.push(movie);
            localStorage.setItem('watchlist', JSON.stringify(watchlist));
            addMessage(`${movie.title} added to watchlist.`, 'bot');
        } else if (action === 'remove') {
            watchlist = watchlist.filter(m => m.title !== movie.title);
            localStorage.setItem('watchlist', JSON.stringify(watchlist));
            addMessage(`${movie.title} removed from watchlist.`, 'bot');
        }
    } else {
        addMessage(`Sorry, I couldn't find ${movieName}.`, 'bot');
    }
}

// 4. Trending Movies
function getTrendingMovies() {
    const trendingMovies = movies.slice(0, 5).map(movie => movie.title).join(', ');
    addMessage(`Trending movies: ${trendingMovies}`, 'bot');
}

// 5. Light/Dark Mode Toggle
function toggleLightDarkMode() {
    const body = document.body;
    body.classList.toggle('light-mode');
    const toggle = document.getElementById('dark-mode-toggle');
    if (body.classList.contains('light-mode')) {
        localStorage.setItem('theme', 'light');
        toggle.textContent = 'Dark Mode';
    } else {
        localStorage.setItem('theme', 'dark');
        toggle.textContent = 'Light Mode';
    }
    addMessage(`Light/Dark mode toggled.`, 'bot');
}

// Handle Auct AI Response with New Features
async function handleAuctAiResponse(userMessage) {
    const selectedAI = document.getElementById('ai-service').value;
    let responses = [];

    // Show loading indicator
    const loadingIndicator = document.createElement('div');
    loadingIndicator.className = 'loading-indicator';
    loadingIndicator.textContent = 'Loading...';
    auctAiMessages.appendChild(loadingIndicator);

    if (selectedAI === 'all' || selectedAI === 'chatgpt') {
        try {
            const chatGPTResponse = await sendToChatGPT(userMessage);
            responses.push({ source: 'ChatGPT', response: chatGPTResponse });
        } catch (error) {
            responses.push({ source: 'ChatGPT', response: 'Sorry, there was an error processing your request.' });
        }
    }

    if (selectedAI === 'all' || selectedAI === 'deepseek') {
        try {
            const deepSeekResponse = await sendToDeepSeek(userMessage);
            responses.push({ source: 'DeepSeek.ai', response: deepSeekResponse });
        } catch (error) {
            responses.push({ source: 'DeepSeek.ai', response: 'Sorry, there was an error processing your request.' });
        }
    }

    if (selectedAI === 'all' || selectedAI === 'blackbox') {
        try {
            const blackboxResponse = await sendToBlackbox(userMessage);
            responses.push({ source: 'Blackbox.ai', response: blackboxResponse });
        } catch (error) {
            responses.push({ source: 'Blackbox.ai', response: 'Sorry, there was an error processing your request.' });
        }
    }

    // Remove loading indicator
    loadingIndicator.remove();

    // Display all responses
    responses.forEach(res => {
        addMessage(`${res.source}: ${res.response}`, 'bot');
    });

    // Handle New Features
    const query = userMessage.toLowerCase();
    if (query.includes('recommend')) {
        getMovieRecommendations();
    } else if (query.includes('review')) {
        const movieName = query.replace('review', '').trim();
        getMovieReviews(movieName);
    } else if (query.includes('add to watchlist')) {
        const movieName = query.replace('add to watchlist', '').trim();
        manageWatchlist('add', movieName);
    } else if (query.includes('remove from watchlist')) {
        const movieName = query.replace('remove from watchlist', '').trim();
        manageWatchlist('remove', movieName);
    } else if (query.includes('trending')) {
        getTrendingMovies();
    } else if (query.includes('light mode') || query.includes('dark mode')) {
        toggleLightDarkMode();
    }
}

// Function to set or edit the user's name
document.getElementById('edit-name').addEventListener('click', () => {
    const dropdown = document.getElementById('profile-dropdown');
    const editNameForm = document.createElement('div');
    editNameForm.className = 'edit-profile-form';
    editNameForm.innerHTML = `
        <input type="text" id="edit-name-input" placeholder="Enter your name">
        <button onclick="saveName()">Save</button>
    `;
    
    // Append the form to the dropdown
    dropdown.appendChild(editNameForm);

    // Trigger the fade-in animation
    setTimeout(() => {
        editNameForm.style.opacity = '1';
        editNameForm.style.transform = 'translateY(0)';
    }, 10);
});

// Function to save the user's name
function saveName() {
    const name = document.getElementById('edit-name-input').value;
    if (name) {
        localStorage.setItem('userName', name);
        updateUserNameDisplay(name);
        alert('Name saved successfully!');
    } else {
        alert('Please enter a valid name.');
    }

    // Remove the form with fade-out animation
    const editNameForm = document.querySelector('.edit-profile-form');
    editNameForm.style.opacity = '0';
    editNameForm.style.transform = 'translateY(-10px)';

    // Wait for the animation to complete before removing the form
    setTimeout(() => {
        editNameForm.remove();
    }, 300);
}

// Function to update the user's name display in the header
function updateUserNameDisplay(name) {
    const userNameDisplay = document.querySelector('.user-profile .user-name');
    if (userNameDisplay) {
        userNameDisplay.textContent = name;
    } else {
        const userProfile = document.querySelector('.user-profile');
        const userNameDisplay = document.createElement('span');
        userNameDisplay.className = 'user-name';
        userNameDisplay.textContent = name;
        userProfile.insertBefore(userNameDisplay, userProfile.firstChild);
    }
}

// Load the user's name from localStorage on page load
document.addEventListener('DOMContentLoaded', () => {
    const userName = localStorage.getItem('userName');
    if (userName) {
        updateUserNameDisplay(userName);
    }
});
// Load the user's name from localStorage on page load
document.addEventListener('DOMContentLoaded', () => {
    const userName = localStorage.getItem('userName');
    if (userName) {
        updateUserNameDisplay(userName);
    }
});
// Function to detect if the user is on a mobile device
function isMobileDevice() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

// Function to detect if the user is on a desktop
function isDesktopDevice() {
    return !isMobileDevice();
}

// Function to check screen width and determine device type
function getDeviceType() {
    const screenWidth = window.innerWidth;
    if (screenWidth <= 768) {
        return 'mobile';
    } else {
        return 'desktop';
    }
}

// Example usage
document.addEventListener('DOMContentLoaded', () => {
    const deviceType = getDeviceType();
    console.log(`User is on a ${deviceType} device.`);

    if (deviceType === 'mobile') {
        // Apply mobile-specific styles or layout changes
        document.body.classList.add('mobile-layout');
    } else {
        // Apply desktop-specific styles or layout changes
        document.body.classList.add('desktop-layout');
    }
});
document.addEventListener('DOMContentLoaded', () => {
    const deviceType = getDeviceType();

    if (deviceType === 'mobile') {
        // Example: Change the grid layout for mobile
        const movieGrid = document.getElementById('movies');
        movieGrid.style.gridTemplateColumns = 'repeat(2, 1fr)'; // 2 columns for mobile
    } else {
        // Example: Change the grid layout for desktop
        const movieGrid = document.getElementById('movies');
        movieGrid.style.gridTemplateColumns = 'repeat(4, 1fr)'; // 4 columns for desktop
    }
});
window.addEventListener('resize', () => {
    const deviceType = getDeviceType();
    console.log(`User is on a ${deviceType} device.`);

    if (deviceType === 'mobile') {
        document.body.classList.remove('desktop-layout');
        document.body.classList.add('mobile-layout');
    } else {
        document.body.classList.remove('mobile-layout');
        document.body.classList.add('desktop-layout');
    }
});
