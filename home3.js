const movies = [
    {
        title: 'Marco',
        description: 'Adattu is one of the most renowned gold-trading families in Kerala. Unexpectedly, an incident shakes the Adattu family. George, the head of the family, sets out to uncover the truth and find those responsible. At the same time, his younger brother, Marco, embarks on the same quest but through a different Path.',
        image: 'https://m.media-amazon.com/images/M/MV5BNTVmNDVhMDEtNDMyNy00NTY0LWJkNzEtY2E5ZTVlZDRmYWY3XkEyXkFqcGc@._V1_.jpg',
        genre: 'Adventure',
        downloadUrl: 'https://hubcloud.ink/drive/qycw4b4ddyxbzvc'
    },
    {
        title: 'Baby John',
        description: 'DCP Satya Verma fakes his own death to protect his daughter from the dangerous politician Babbar Sher. When old enemies resurface, Satya must confront his past and put everything on the line to safeguard his family.',
        image: 'https://i.redd.it/84mju1gjr4hc1.jpeg',
        genre: 'Action/Drama',
        downloadUrl: 'https://hubcloud.ink/drive/anjvvvrnbnafh1v'
    },
    {
        title: 'The Sabarmati Report',
        description: 'A journalist investigates the 2002 Godhra train burning in Gujarat. Years later, another reporter discovers his hidden report. They uncover a conspiracy involving powerful figures, facing threats as they pursue the truth.',
        image: 'https://assets.voxcinemas.com/posters/P_HO00011674_1731043173783.jpg',
        genre: 'Drama',
        downloadUrl: 'https://hubcloud.ink/drive/zzj4ymum1c31qr1'
    },
    {
        title: 'Pushpa 2: The Rule',
        description: 'The clash is on as Pushpa and Bhanwar Singh continue their rivalry in this epic conclusion to the two-parted action drama.',
        image: 'https://m.media-amazon.com/images/M/MV5BZjllNTdiM2QtYjQ0Ni00ZGM1LWFlYmUtNWY0YjMzYWIxOTYxXkEyXkFqcGc@._V1_.jpg',
        genre: 'Action/Thriller',
        downloadUrl: 'https://hubcloud.ink/drive/0u2t7tugc11gtdj'
    },
    {
        title: 'Game Changer',
        description: 'Ram Nandan, a government official, embarks on a relentless fight against corrupt politicians. Determined to bring about fair elections, he tries to revolutionise the way the government operates.',
        image: 'https://resizing.flixster.com/oU1jMB-OmqwbQHEfEwX7ZxLJNww=/ems.cHJkLWVtcy1hc3NldHMvbW92aWVzLzE3NjVhNzY3LWNhM2ItNGY0ZS05Y2RkLWFjZjQ0ODdjZTI5Mi5qcGc=',
        genre: 'Action/Thriller',
        downloadUrl: 'https://hubcloud.ink/drive/jh86l8aqbojb9lb'
    },
    {
        title: 'Kanguva',
        description: 'While working as a bounty hunter in Goa, Francis recalls his past life, a centuries-old tale of warrior Kanguva. Turns out, he has an old score to settle and someone dear to protect in the present.',
        image: 'https://static.moviecrow.com/gallery/20241112/237621-Kanguva%20Suriya%20Bobby%20Deol%20SWOT.jpg',
        genre: 'Action/Drama',
        downloadUrl: 'https://hubcloud.ink/drive/mqhpbhleel4fqok'
    }
];

const topFeatures = [
    {
        title: 'Exclusive Content',
        description: 'Access to exclusive movies and shows only available on AUCTUS.',
        image: 'exclusive-content.jpg'
    },
    {
        title: '4K Streaming',
        description: 'Enjoy your favorite movies in stunning 4K resolution.',
        image: '4k-streaming.jpg'
    },
    {
        title: 'Offline Viewing',
        description: 'Download movies and watch them offline anytime, anywhere.',
        image: 'offline-viewing.jpg'
    }
];

function createMovieCard(movie) {
    const card = document.createElement('div');
    card.className = 'movie-card';
    card.innerHTML = `
        <img src="${movie.image}" alt="${movie.title}">
        <div class="movie-overlay"></div>
        <div class="movie-info">
            <h3>${movie.title}</h3>
            <p>${movie.description}</p>
            <a href="${movie.downloadUrl}" class="download-button" download>Download</a>
        </div>
    `;
    return card;
}

function createFeatureCard(feature) {
    const card = document.createElement('div');
    card.className = 'feature-card';
    card.innerHTML = `
        <img src="${feature.image}" alt="${feature.title}">
        <div class="feature-info">
            <h3>${feature.title}</h3>
            <p>${feature.description}</p>
        </div>
    `;
    return card;
}

function renderMovies() {
    const movieGrid = document.getElementById('movies');
    movies.forEach(movie => {
        const card = createMovieCard(movie);
        movieGrid.appendChild(card);
    });
}

function renderTopFeatures() {
    const featureGrid = document.getElementById('top-features');
    topFeatures.forEach(feature => {
        const card = createFeatureCard(feature);
        featureGrid.appendChild(card);
    });
}

let currentSlide = 0;
let slideInterval;
const slides = [
    {
        image: 'https://m.media-amazon.com/images/M/MV5BNTVmNDVhMDEtNDMyNy00NTY0LWJkNzEtY2E5ZTVlZDRmYWY3XkEyXkFqcGc@._V1_.jpg',
        title: 'Marco',
        description: 'Adattu is one of the most renowned gold-trading families in Kerala. Unexpectedly, an incident shakes the Adattu family. George, the head of the family, sets out to uncover the truth and find those responsible. At the same time, his younger brother, Marco, embarks on the same quest but through a different Path.'
    },
    {
        image: 'https://i.redd.it/84mju1gjr4hc1.jpeg',
        title: 'Baby John',
        description: 'DCP Satya Verma fakes his own death to protect his daughter from the dangerous politician Babbar Sher. When old enemies resurface, Satya must confront his past and put everything on the line to safeguard his family.'
    },
    {
        image: 'https://assets.voxcinemas.com/posters/P_HO00011674_1731043173783.jpg',
        title: 'The Sabarmati Report',
        description: 'A journalist investigates the 2002 Godhra train burning in Gujarat. Years later, another reporter discovers his hidden report. They uncover a conspiracy involving powerful figures, facing threats as they pursue the truth.'
    }
];

function renderSlideshow() {
    const slideshowContainer = document.getElementById('slideshow');
    const dotsContainer = document.querySelector('.dots-container');

    slides.forEach((slide, index) => {
        const slideDiv = document.createElement('div');
        slideDiv.className = 'slide';
        slideDiv.style.backgroundImage = `url(${slide.image})`;
        slideDiv.innerHTML = `
            <div class="slide-content">
                <h2>${slide.title}</h2>
                <p>${slide.description}</p>
                <a href="#" class="slide-button">Watch Now</a>
            </div>
        `;
        slideshowContainer.insertBefore(slideDiv, slideshowContainer.firstChild);

        const dot = document.createElement('span');
        dot.className = 'dot';
        dot.addEventListener('click', () => showSlide(index));
        dotsContainer.appendChild(dot);
    });

    showSlide(currentSlide);
    startSlideInterval();
}

function showSlide(index) {
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');

    slides.forEach((slide, i) => {
        slide.style.opacity = i === index ? '1' : '0';
    });

    dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === index);
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
    slideInterval = setInterval(nextSlide, 5000);
}

function pauseSlideInterval() {
    clearInterval(slideInterval);
}

let touchStartX = 0;
let touchEndX = 0;

const slideshowContainer = document.getElementById('slideshow');
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

slideshowContainer.addEventListener('mouseenter', pauseSlideInterval);
slideshowContainer.addEventListener('mouseleave', startSlideInterval);

document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') {
        nextSlide();
    } else if (e.key === 'ArrowLeft') {
        prevSlide();
    }
});

let searchTimeout;

function debounceSearch() {
    clearTimeout(searchTimeout);
    searchTimeout = setTimeout(() => {
        performSearch();
    }, 300);
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
    }
}

function highlightMatch(text, searchTerm) {
    const regex = new RegExp(`(${searchTerm})`, 'gi');
    return text.replace(regex, '<span class="highlight-text">$1</span>');
}

document.getElementById('clear-search').addEventListener('click', () => {
    document.getElementById('search-input').value = '';
    document.getElementById('search-results').innerHTML = '';
    document.getElementById('search-results').classList.remove('show');
    document.getElementById('clear-search').style.display = 'none';
});

document.getElementById('search-input').addEventListener('input', (e) => {
    const clearButton = document.getElementById('clear-search');
    clearButton.style.display = e.target.value.length > 0 ? 'block' : 'none';
    debounceSearch();
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

document.getElementById('user-profile').addEventListener('click', () => {
    const dropdown = document.getElementById('profile-dropdown');
    dropdown.style.display = dropdown.style.display === 'block' ? 'none' : 'block';
});

document.addEventListener('click', (event) => {
    const dropdown = document.getElementById('profile-dropdown');
    const profile = document.getElementById('user-profile');
    if (!profile.contains(event.target)) {
        dropdown.style.display = 'none';
    }
});

renderMovies();
renderTopFeatures();
renderSlideshow();

fetch('/api/movies.php')
    .then(response => response.json())
    .then(data => {
        const movieGrid = document.getElementById('movies');
        data.forEach(movie => {
            const card = createMovieCard(movie);
            movieGrid.appendChild(card);
        });
    });

import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyAp0P8C98oUGTwfBc31ElXVuEs9J0nuoRc",
  authDomain: "auctus-b6689.firebaseapp.com",
  projectId: "auctus-b6689",
  storageBucket: "auctus-b6689.firebasestorage.app",
  messagingSenderId: "229548942829",
  appId: "1:229548942829:web:7bceeefb37861d62bf33e4",
  measurementId: "G-G1TZT8P1B0"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
