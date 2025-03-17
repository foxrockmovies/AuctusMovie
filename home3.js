const API_KEY = 'YOUR_TMDB_API_KEY'; // Replace with your TMDb API key
const BASE_URL = 'https://api.themoviedb.org/3';
const IMG_URL = 'https://image.tmdb.org/t/p/w500';

const trendingContainer = document.getElementById('trending');
const downloadsContainer = document.getElementById('downloads');
const castContainer = document.getElementById('cast');
const searchInput = document.getElementById('search');
const suggestionsContainer = document.getElementById('suggestions');

let allMovies = [];
let fuse; // Fuse.js instance for fuzzy search

// Slideshow functionality
let slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) {
    showSlides(slideIndex += n);
}

function currentSlide(n) {
    showSlides(slideIndex = n);
}

function showSlides(n) {
    const slides = document.getElementsByClassName("slide");
    const dots = document.getElementsByClassName("dot");
    if (n > slides.length) slideIndex = 1;
    if (n < 1) slideIndex = slides.length;
    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    for (let i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    slides[slideIndex - 1].style.display = "block";
    dots[slideIndex - 1].className += " active";
}

// Fetch Trending Movies and initialize Fuse.js
async function fetchTrendingMovies() {
    try {
        const url = `${BASE_URL}/trending/movie/week?api_key=${API_KEY}`;
        const response = await fetch(url);
        const data = await response.json();
        allMovies = data.results;
        initializeFuse(data.results);
        displayMovies(data.results, trendingContainer);
    } catch (error) {
        console.error('Error fetching trending movies:', error);
    }
}

// Fetch Movies Available for Download
async function fetchDownloadMovies() {
    try {
        const url = `${BASE_URL}/movie/popular?api_key=${API_KEY}`;
        const response = await fetch(url);
        const data = await response.json();
        displayMovies(data.results, downloadsContainer);
    } catch (error) {
        console.error('Error fetching download movies:', error);
    }
}

// Fetch Top Cast
async function fetchTopCast() {
    try {
        const url = `${BASE_URL}/person/popular?api_key=${API_KEY}`;
        const response = await fetch(url);
        const data = await response.json();
        displayCast(data.results);
    } catch (error) {
        console.error('Error fetching top cast:', error);
    }
}

// Fetch Hindi Movies
async function fetchHindiMovies() {
    try {
        const url = `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_original_language=hi&sort_by=popularity.desc`;
        const response = await fetch(url);
        const data = await response.json();
        displayMovies(data.results, document.getElementById('hindi'));
    } catch (error) {
        console.error('Error fetching Hindi movies:', error);
    }
}

// Fetch Gujarati Movies
async function fetchGujaratiMovies() {
    try {
        const url = `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_original_language=gu&sort_by=popularity.desc`;
        const response = await fetch(url);
        const data = await response.json();
        displayMovies(data.results, document.getElementById('gujarati'));
    } catch (error) {
        console.error('Error fetching Gujarati movies:', error);
    }
}

// Fetch New Releases
async function fetchNewReleases() {
    try {
        const url = `${BASE_URL}/discover/movie?api_key=${API_KEY}&primary_release_date.gte=2023-01-01&sort_by=release_date.desc`;
        const response = await fetch(url);
        const data = await response.json();
        displayMovies(data.results, document.getElementById('new-releases'));
    } catch (error) {
        console.error('Error fetching new releases:', error);
    }
}

// Display Movies
function displayMovies(movies, container) {
    container.innerHTML = '';
    movies.forEach(movie => {
        const movieCard = document.createElement('div');
        movieCard.classList.add('movie-card');
        movieCard.innerHTML = `
            <img src="${IMG_URL + movie.poster_path}" alt="${movie.title}" onerror="this.src='https://via.placeholder.com/500x750';">
            <h3>${movie.title}</h3>
            <p>${movie.release_date}</p>
            <button class="download-btn" onclick="downloadMovie('${movie.title}', 'https://example.com/download/${movie.id}')">Download</button>
        `;
        container.appendChild(movieCard);
    });
}

// Display Cast
function displayCast(cast) {
    castContainer.innerHTML = '';
    cast.forEach(person => {
        const castCard = document.createElement('div');
        castCard.classList.add('cast-card');
        castCard.innerHTML = `
            <img src="${IMG_URL + person.profile_path}" alt="${person.name}" onerror="this.src='https://via.placeholder.com/500x750';">
            <h3>${person.name}</h3>
            <p>${person.known_for_department}</p>
        `;
        castContainer.appendChild(castCard);
    });
}

// Download Movie Function
function downloadMovie(movieTitle, downloadUrl) {
    window.location.href = downloadUrl;
}

// Function to Add Movies Manually
function addMoviesManually(movies, containerId) {
    const container = document.getElementById(containerId);
    if (!container) {
        console.error(`Container with ID ${containerId} not found.`);
        return;
    }

    movies.forEach(movie => {
        const movieCard = document.createElement('div');
        movieCard.classList.add('movie-card');
        movieCard.innerHTML = `
            <img src="${movie.image}" alt="${movie.title}" onerror="this.src='https://via.placeholder.com/500x750';">
            <h3>${movie.title}</h3>
            <p>${movie.releaseDate}</p>
            <button class="download-btn" onclick="downloadMovie('${movie.title}', '${movie.downloadUrl}')">Download</button>
        `;
        container.appendChild(movieCard);
    });
}

// Initialize Fuse.js for fuzzy search
function initializeFuse(movies) {
    const options = {
        keys: ['title'],
        threshold: 0.3,
        includeScore: true,
        minMatchCharLength: 2,
    };
    fuse = new Fuse(movies, options);
}

// Show Search Suggestions
function showSuggestions(movies) {
    suggestionsContainer.innerHTML = '';
    movies.forEach(movie => {
        const suggestion = document.createElement('div');
        suggestion.textContent = movie.title;
        suggestion.addEventListener('click', () => {
            searchInput.value = movie.title;
            searchMovies(movie.title);
            suggestionsContainer.style.display = 'none';
        });
        suggestionsContainer.appendChild(suggestion);
    });
    suggestionsContainer.style.display = movies.length ? 'block' : 'none';
}

// Search Algorithm with Fuzzy Search and Suggestions
function searchMovies(query) {
    if (!query) {
        displayMovies(allMovies, trendingContainer);
        suggestionsContainer.style.display = 'none';
        return;
    }

    const results = fuse.search(query);
    const filteredMovies = results.map(result => result.item);

    showSuggestions(filteredMovies.slice(0, 5));

    filteredMovies.sort((a, b) => {
        const aStartsWithQuery = a.title.toLowerCase().startsWith(query.toLowerCase());
        const bStartsWithQuery = b.title.toLowerCase().startsWith(query.toLowerCase());

        if (aStartsWithQuery && !bStartsWithQuery) return -1;
        if (!aStartsWithQuery && bStartsWithQuery) return 1;

        if (a.popularity && b.popularity) {
            return b.popularity - a.popularity;
        }

        return 0;
    });

    displayMovies(filteredMovies, trendingContainer);
}

// Debounce Function
function debounce(func, delay) {
    let timeout;
    return function (...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), delay);
    };
}

// Event Listener for Search Input with Debounce
searchInput.addEventListener('input', debounce((event) => {
    const query = event.target.value.trim();
    searchMovies(query);
}, 300));

// Close suggestions when clicking outside the search bar
document.addEventListener('click', (event) => {
    if (!event.target.closest('.search-bar')) {
        suggestionsContainer.style.display = 'none';
    }
});

// Function to detect if the device is mobile
function isMobileDevice() {
    return (typeof window.orientation !== "undefined") || (navigator.userAgent.indexOf('IEMobile') !== -1);
}

// Function to adjust header layout based on device type
function adjustHeaderLayout() {
    const header = document.querySelector('header');
    const navLinks = document.querySelector('.nav-links');
    const searchBar = document.querySelector('.search-bar');

    if (isMobileDevice()) {
        header.style.flexDirection = 'column';
        header.style.alignItems = 'flex-start';
        navLinks.style.flexDirection = 'column';
        navLinks.style.gap = '10px';
        navLinks.style.marginTop = '10px';
        searchBar.style.width = '100%';
        searchBar.style.marginTop = '10px';
        document.getElementById('search').style.width = '100%';
    } else {
        header.style.flexDirection = 'row';
        header.style.alignItems = 'center';
        navLinks.style.flexDirection = 'row';
        navLinks.style.gap = '20px';
        navLinks.style.marginTop = '0';
        searchBar.style.width = 'auto';
        searchBar.style.marginTop = '0';
        document.getElementById('search').style.width = '300px';
    }
}

// Initial Load
fetchTrendingMovies();
fetchDownloadMovies();
fetchTopCast();
fetchHindiMovies();
fetchGujaratiMovies();
fetchNewReleases();

// Adjust header layout on initial load and window resize
adjustHeaderLayout();
window.addEventListener('resize', adjustHeaderLayout);

// Example Usage of addMoviesManually
const manualMovies = [
    {
        title: "Upcoming Movies",
        image: "https://m.media-amazon.com/images/M/MV5BMThhMzg1NjUtMWY3OS00NTZiLWEyZDctMTg2YmNhNzAwNTQxXkEyXkFqcGc@._V1_.jpg",
        releaseDate: "2023-01-01",
        downloadUrl: "https://example.com/download/1"
    },
    {
        title: "Azaad (2025) Hindi",
        image: "https://m.media-amazon.com/images/M/MV5BNTc0NzA4M2UtNzBlMi00MDU4LWE4MDMtM2NmOTJkOTMyYjdmXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg",
        releaseDate: "17 January 2025 (India)",
        downloadUrl: "https://hubcloud.ink/drive/ghuljcnduggoc1d"
    },
    {
        title: "Hahacar (2024)GUJARATI",
        image: "https://m.media-amazon.com/images/M/MV5BNjQ3ZjIyZTUtMzFiOC00MzViLTg0NzktZmFiNDVlN2UzZDUwXkEyXkFqcGc@._V1_.jpg",
        releaseDate: "18 October 2024 (India)",
        downloadUrl: "https://hubcloud.ink/drive/alvzffkrgureic8"
    },
    {
        title: "Emergency (2025) Hindi",
        image: "https://m.media-amazon.com/images/M/MV5BZTQ1ZDc0MTUtYjA5ZS00YjkzLWE0MGMtOWY4MTFhZjI5YTI0XkEyXkFqcGc@._V1_.jpg",
        releaseDate: "17 Jan, 2025 (India)",
        downloadUrl: "https://hubcloud.ink/drive/z9p4zh8p71hbait"
    },
    {
        title: "Game Changer (2025) Hindi",
        image: "https://resizing.flixster.com/oU1jMB-OmqwbQHEfEwX7ZxLJNww=/ems.cHJkLWVtcy1hc3NldHMvbW92aWVzLzE3NjVhNzY3LWNhM2ItNGY0ZS05Y2RkLWFjZjQ0ODdjZTI5Mi5qcGc=",
        releaseDate: "10 January 2025 (India)",
        downloadUrl: "https://hubcloud.ink/drive/8lvtxf8sc8q18nn"
    },
    {
        title: "Chaal Jeevi Laiye Gujarati ",
        image: "https://play-lh.googleusercontent.com/proxy/m0vn1jW0MGohwhfjewYDf2PCvMrQMz18eIW9MIKka8g1To4oSEK-XMHcnpvZuWrqYeTDijtF3Zc2wgwUQIY-H8ZG5GGkj3nngdBE2pWibcMmtuviWPzWq2CoWw6iDN7v-m2kHtW0oF0YQabCx1OrJga9qsjF0kU0WCpzjg",
        releaseDate: "1 February 2019 (India)",
        downloadUrl: "https://hubcloud.ink/drive/n9qj0n3ljqanlnn"
    }
];

// Add manual movies to the downloads section
addMoviesManually(manualMovies, 'downloads');
