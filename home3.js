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

// Search Functionality 
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
        searchResults.innerHTML = '<div>No results found.</div>';
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

// Dark Mode Toggle
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
