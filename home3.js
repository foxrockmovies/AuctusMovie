const API_KEY = 'YOUR_TMDB_API_KEY'; // Replace with your TMDb API key
const BASE_URL = 'https://api.themoviedb.org/3';
const IMG_URL = 'https://image.tmdb.org/t/p/w500';

const trendingContainer = document.getElementById('trending');
const downloadsContainer = document.getElementById('downloads');
const castContainer = document.getElementById('cast');
const searchInput = document.getElementById('search');

let allMovies = [];

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
    let i;
    const slides = document.getElementsByClassName("slide");
    const dots = document.getElementsByClassName("dot");
    if (n > slides.length) { slideIndex = 1 }
    if (n < 1) { slideIndex = slides.length }
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    slides[slideIndex - 1].style.display = "block";
    dots[slideIndex - 1].className += " active";
}

// Fetch Trending Movies
async function fetchTrendingMovies() {
    const url = `${BASE_URL}/trending/movie/week?api_key=${API_KEY}`;
    const response = await fetch(url);
    const data = await response.json();
    allMovies = data.results;
    displayMovies(data.results, trendingContainer);
}

// Fetch Movies Available for Download
async function fetchDownloadMovies() {
    const url = `${BASE_URL}/movie/popular?api_key=${API_KEY}`;
    const response = await fetch(url);
    const data = await response.json();
    displayMovies(data.results, downloadsContainer);
}

// Fetch Top Cast
async function fetchTopCast() {
    const url = `${BASE_URL}/person/popular?api_key=${API_KEY}`;
    const response = await fetch(url);
    const data = await response.json();
    displayCast(data.results);
}

// Display Movies
function displayMovies(movies, container) {
    container.innerHTML = '';
    movies.forEach(movie => {
        const movieCard = document.createElement('div');
        movieCard.classList.add('movie-card');
        movieCard.innerHTML = `
            <img src="${IMG_URL + movie.poster_path}" alt="${movie.title}">
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
            <img src="${IMG_URL + person.profile_path}" alt="${person.name}">
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
            <img src="${movie.image}" alt="${movie.title}">
            <h3>${movie.title}</h3>
            <p>${movie.releaseDate}</p>
            <button class="download-btn" onclick="downloadMovie('${movie.title}', '${movie.downloadUrl}')">Download</button>
        `;
        container.appendChild(movieCard);
    });
}

// Search Algorithm
function searchMovies(query) {
    const filteredMovies = allMovies.filter(movie =>
        movie.title.toLowerCase().includes(query.toLowerCase())
    );
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
    if (query) {
        searchMovies(query);
    } else {
        displayMovies(allMovies, trendingContainer);
    }
}, 300));

// Example Usage of addMoviesManually
const manualMovies = [
    {
        title: "Manual Movie 1",
        image: "https://m.media-amazon.com/images/M/MV5BMThhMzg1NjUtMWY3OS00NTZiLWEyZDctMTg2YmNhNzAwNTQxXkEyXkFqcGc@._V1_.jpg",
        releaseDate: "2023-01-01",
        downloadUrl: "https://example.com/download/1"
    },
    {
        title: "Azaad (2025)",
        image: "https://m.media-amazon.com/images/M/MV5BNTc0NzA4M2UtNzBlMi00MDU4LWE4MDMtM2NmOTJkOTMyYjdmXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg",
        releaseDate: "17 January 2025 (India)",
        downloadUrl: "https://hubcloud.ink/drive/ghuljcnduggoc1d"
    },
    {
        title: "Hahacar (2024)",
        image: "https://m.media-amazon.com/images/M/MV5BNjQ3ZjIyZTUtMzFiOC00MzViLTg0NzktZmFiNDVlN2UzZDUwXkEyXkFqcGc@._V1_.jpg",
        releaseDate: "18 October 2024 (India)",
        downloadUrl: "https://hubcloud.ink/drive/alvzffkrgureic8"
    }
];

// Add manual movies to the downloads section
addMoviesManually(manualMovies, 'downloads');
// Fetch Hindi Movies
async function fetchHindiMovies() {
    const url = `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_original_language=hi&sort_by=popularity.desc`;
    const response = await fetch(url);
    const data = await response.json();
    displayMovies(data.results, document.getElementById('hindi'));
}

// Fetch Gujarati Movies
async function fetchGujaratiMovies() {
    const url = `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_original_language=gu&sort_by=popularity.desc`;
    const response = await fetch(url);
    const data = await response.json();
    displayMovies(data.results, document.getElementById('gujarati'));
}

// Fetch New Releases
async function fetchNewReleases() {
    const url = `${BASE_URL}/discover/movie?api_key=${API_KEY}&primary_release_date.gte=2023-01-01&sort_by=release_date.desc`;
    const response = await fetch(url);
    const data = await response.json();
    displayMovies(data.results, document.getElementById('new-releases'));
}

// Initial Load
fetchTrendingMovies();
fetchDownloadMovies();
fetchTopCast();
fetchHindiMovies();
fetchGujaratiMovies();
fetchNewReleases();

// Initial Load
fetchTrendingMovies();
fetchDownloadMovies();
fetchTopCast();

// Function to detect if the device is mobile
function isMobileDevice() {
    return (typeof window.orientation !== "undefined") || (navigator.userAgent.indexOf('IEMobile') !== -1);
}

// Example usage
if (isMobileDevice()) {
    console.log("This is a mobile device");
    // Adjust functionality for mobile
} else {
    console.log("This is a desktop device");
    // Adjust functionality for desktop
}

// Initial Load
fetchTrendingMovies();
fetchDownloadMovies();
fetchTopCast();
fetchHindiMovies();
fetchGujaratiMovies();
fetchNewReleases();

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
        // Adjust layout for mobile
        header.style.flexDirection = 'column';
        header.style.alignItems = 'flex-start';
        navLinks.style.flexDirection = 'column';
        navLinks.style.gap = '10px';
        navLinks.style.marginTop = '10px';
        searchBar.style.width = '100%';
        searchBar.style.marginTop = '10px';
        document.getElementById('search').style.width = '100%';
    } else {
        // Adjust layout for desktop
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

// Adjust header layout on initial load
adjustHeaderLayout();

// Adjust header layout on window resize
window.addEventListener('resize', adjustHeaderLayout);
