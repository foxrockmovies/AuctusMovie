// TMDB API Configuration
const API_KEY = 'b0e24d67a2b4a3a3a3a3a3a3a3a3a3a'; // Replace with your actual TMDB API key
const BASE_URL = 'https://api.themoviedb.org/3';
const IMG_URL = 'https://image.tmdb.org/t/p/w500';
const MOVIE_URL = 'https://www.themoviedb.org/movie';
const TV_URL = 'https://www.themoviedb.org/tv';
const PERSON_URL = 'https://www.themoviedb.org/person';
const API_VERSION = 'api/v4'; // TMDB API version

// Enhanced Loading Screen
window.addEventListener('load', function() {
    setTimeout(() => {
        gsap.to('.loading-screen', {
            opacity: 0,
            duration: 0.5,
            onComplete: () => {
                document.querySelector('.loading-screen').style.display = 'none';
            }
        });
    }, 2000);
});

// Slideshow with Enhanced Features
let slideIndex = 0;
let slideInterval;
const slides = document.querySelectorAll('.slide');
const dotsContainer = document.querySelector('.dots');

function setupSlideshow() {
    // Create dots for each slide
    slides.forEach((_, index) => {
        const dot = document.createElement('span');
        dot.className = 'dot';
        dot.onclick = () => currentSlide(index);
        dotsContainer.appendChild(dot);
    });
    
    // Initialize first slide
    showSlides();
    startSlideShow();
}

function showSlides() {
    const dots = document.querySelectorAll('.dot');
    
    // Hide all slides
    slides.forEach(slide => {
        slide.classList.remove('active');
    });
    
    // Remove active class from all dots
    dots.forEach(dot => {
        dot.classList.remove('active');
    });
    
    // Handle wrap-around for slide index
    if (slideIndex >= slides.length) slideIndex = 0;
    if (slideIndex < 0) slideIndex = slides.length - 1;
    
    // Show current slide
    slides[slideIndex].classList.add('active');
    dots[slideIndex].classList.add('active');
    
    // Add animations to active slide content
    const activeSlide = slides[slideIndex];
    gsap.from(activeSlide.querySelector('h2'), {
        y: 50,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out"
    });
    gsap.from(activeSlide.querySelector('p'), {
        y: 50,
        opacity: 0,
        duration: 0.8,
        delay: 0.3,
        ease: "power3.out"
    });
    gsap.from(activeSlide.querySelector('.slide-buttons'), {
        y: 50,
        opacity: 0,
        duration: 0.8,
        delay: 0.6,
        ease: "power3.out"
    });
}

function startSlideShow() {
    clearInterval(slideInterval);
    slideInterval = setInterval(() => plusSlides(1), 6000);
}

function plusSlides(n) {
    slideIndex += n;
    showSlides();
    startSlideShow();
}

function currentSlide(n) {
    slideIndex = n;
    showSlides();
    startSlideShow();
}

// Initialize the slideshow after DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    setupSlideshow();
    
    // Other initialization code...
});

// Enhanced Search System with Debounce
const debouncedShowSuggestions = debounce(showSuggestions, 300);

function debounce(func, wait) {
    let timeout;
    return function() {
        const context = this, args = arguments;
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(context, args), wait);
    };
}

async function showSuggestions() {
    const query = document.getElementById('search').value.trim();
    const suggestions = document.getElementById('suggestions');
    
    if (query.length < 2) {
        suggestions.style.display = 'none';
        return;
    }

    try {
        const [movieRes, personRes, tvRes] = await Promise.all([
            fetch(`${BASE_URL}/search/movie?api_key=${API_KEY}&query=${query}`),
            fetch(`${BASE_URL}/search/person?api_key=${API_KEY}&query=${query}`),
            fetch(`${BASE_URL}/search/tv?api_key=${API_KEY}&query=${query}`)
        ]);

        const [movies, persons, tvShows] = await Promise.all([movieRes.json(), personRes.json(), tvRes.json()]);
        suggestions.innerHTML = '';

        // Add movies
        if (movies.results.length > 0) {
            const movieHeader = document.createElement('div');
            movieHeader.className = 'suggestion-header';
            movieHeader.textContent = 'Movies';
            suggestions.appendChild(movieHeader);
            
            movies.results.slice(0, 5).forEach(movie => {
                const div = createSuggestionDiv(
                    `<img src="${IMG_URL + movie.poster_path}" alt="${movie.title}">
                     <span>${movie.title} (${new Date(movie.release_date).getFullYear()})</span>`, 
                    () => showMovieModal(movie.id, 'movie')
                );
                suggestions.appendChild(div);
            });
        }

        // Add TV shows
        if (tvShows.results.length > 0) {
            const tvHeader = document.createElement('div');
            tvHeader.className = 'suggestion-header';
            tvHeader.textContent = 'TV Shows';
            suggestions.appendChild(tvHeader);
            
            tvShows.results.slice(0, 3).forEach(show => {
                const div = createSuggestionDiv(
                    `<img src="${IMG_URL + show.poster_path}" alt="${show.name}">
                     <span>${show.name} (${new Date(show.first_air_date).getFullYear()})</span>`, 
                    () => showMovieModal(show.id, 'tv')
                );
                suggestions.appendChild(div);
            });
        }

        // Add people
        if (persons.results.length > 0) {
            const personHeader = document.createElement('div');
            personHeader.className = 'suggestion-header';
            personHeader.textContent = 'People';
            suggestions.appendChild(personHeader);
            
            persons.results.slice(0, 3).forEach(person => {
                const div = createSuggestionDiv(
                    `<img src="${IMG_URL + person.profile_path}" alt="${person.name}">
                     <span>${person.name}</span>`, 
                    () => showPersonDetails(person.id)
                );
                suggestions.appendChild(div);
            });
        }

        if (suggestions.children.length > 0) {
            suggestions.style.display = 'block';
            gsap.from(suggestions.children, { 
                opacity: 0, 
                y: 20, 
                stagger: 0.1,
                duration: 0.3,
                ease: "power1.out"
            });
        } else {
            suggestions.style.display = 'none';
        }
    } catch (error) {
        console.error('Error fetching suggestions:', error);
        suggestions.style.display = 'none';
    }
}

function createSuggestionDiv(content, onClick) {
    const div = document.createElement('div');
    div.className = 'suggestion-item';
    div.innerHTML = content;
    div.onclick = (e) => {
        e.stopPropagation();
        onClick();
        document.getElementById('search').value = '';
        suggestions.style.display = 'none';
    };
    return div;
}

function handleSearchKey(event) {
    if (event.key === 'Enter') {
        searchMovies();
    }
}

async function searchMovies() {
    const query = document.getElementById('search').value.trim();
    if (!query) return;

    try {
        const response = await fetch(`${BASE_URL}/search/multi?api_key=${API_KEY}&query=${query}`);
        const data = await response.json();
        
        // Create search results modal
        const modal = document.createElement('div');
        modal.className = 'search-results-modal';
        modal.innerHTML = `
            <div class="search-results-content">
                <div class="search-header">
                    <h2>Search Results for "${query}"</h2>
                    <button class="close-search" onclick="this.parentElement.parentElement.remove()">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="search-results-grid" id="search-results-grid"></div>
            </div>
        `;
        document.body.appendChild(modal);
        
        // Display results
        const grid = document.getElementById('search-results-grid');
        if (data.results.length === 0) {
            grid.innerHTML = '<p class="no-results">No results found</p>';
        } else {
            data.results.forEach(item => {
                const card = document.createElement('div');
                card.className = 'search-result-card';
                
                if (item.media_type === 'movie') {
                    card.innerHTML = `
                        <img src="${IMG_URL + item.poster_path}" alt="${item.title}">
                        <div class="search-result-info">
                            <h3>${item.title}</h3>
                            <p>Movie • ${new Date(item.release_date).getFullYear()}</p>
                            <button onclick="showMovieModal(${item.id}, 'movie')">View Details</button>
                        </div>
                    `;
                } else if (item.media_type === 'tv') {
                    card.innerHTML = `
                        <img src="${IMG_URL + item.poster_path}" alt="${item.name}">
                        <div class="search-result-info">
                            <h3>${item.name}</h3>
                            <p>TV Show • ${new Date(item.first_air_date).getFullYear()}</p>
                            <button onclick="showMovieModal(${item.id}, 'tv')">View Details</button>
                        </div>
                    `;
                } else if (item.media_type === 'person') {
                    card.innerHTML = `
                        <img src="${IMG_URL + item.profile_path}" alt="${item.name}">
                        <div class="search-result-info">
                            <h3>${item.name}</h3>
                            <p>Person • ${item.known_for_department}</p>
                            <button onclick="showPersonDetails(${item.id})">View Profile</button>
                        </div>
                    `;
                }
                
                grid.appendChild(card);
            });
        }
        
        // Show modal with animation
        gsap.from(modal, {
            opacity: 0,
            y: 50,
            duration: 0.5,
            ease: "power2.out"
        });
        
        // Hide suggestions
        document.getElementById('suggestions').style.display = 'none';
    } catch (error) {
        console.error('Error searching movies:', error);
        showNotification('Error performing search. Please try again.');
    }
}
// Display Movies Function 
function displayMovies(movies, containerId) {
    const container = document.getElementById(containerId);
    if (!container) {
        console.error(`Container with ID ${containerId} not found`);
        return;
    }
    
    container.innerHTML = '';
    
    if (!movies || movies.length === 0) {
        container.innerHTML = '<p class="no-movies">No movies found in this category</p>';
        return;
    }
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const card = entry.target;
                card.style.opacity = 1;
                observer.unobserve(card);
            }
        });
    }, { threshold: 0.1 });
    
    movies.forEach(movie => {
        const card = document.createElement('div');
        card.className = 'movie-card';
        card.style.opacity = 0;
        card.innerHTML = `
            <div class="movie-poster">
                <img src="${movie.poster_path}" alt="${movie.title || movie.name}" loading="lazy">
                <div class="movie-overlay">
                    <div class="movie-rating">
                        <i class="fas fa-star"></i> ${movie.vote_average?.toFixed(1) || 'N/A'}
                    </div>
                    <div class="movie-info">
                        <h3 class="movie-title">${movie.title || movie.name}</h3>
                        <div class="movie-meta">
                            <span>${movie.release_date || 'N/A'}</span>
                            <span>${movie.media_type === 'tv' ? 'TV Show' : 'Movie'}</span>
                        </div>
                        <p class="movie-description">${movie.overview || 'No description available'}</p>
                        <div class="movie-actions">
                            <button class="play-btn" onclick="playMovie(${movie.id}, '${movie.media_type || 'movie'}')">
                                <i class="fas fa-play"></i>
                            </button>
                            <button class="download-btn" onclick="downloadMovie('${movie.id}')">
                                <i class="fas fa-download"></i> Download
                            </button>
                            <button class="favorite-btn" onclick="toggleFavorite(${movie.id}, this)">
                                <i class="fas fa-heart"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;
        container.appendChild(card);
        observer.observe(card);
        
        // Add hover effect
        card.addEventListener('mouseenter', () => {
            gsap.to(card.querySelector('.movie-overlay'), {
                opacity: 1,
                duration: 0.3
            });
        });
        
        card.addEventListener('mouseleave', () => {
            gsap.to(card.querySelector('.movie-overlay'), {
                opacity: 0,
                duration: 0.3
            });
        });
    });
}


// Video Player Functionality
const videoPlayer = document.getElementById('video-player');
const videoElement = document.getElementById('main-video');
const progressBar = document.getElementById('progress');

function playMovie(movieId, mediaType = 'movie') {
    // In a real app, this would fetch the actual video URL
    const videoUrl = mediaType === 'movie' 
        ? `https://example.com/stream/movie/${movieId}` 
        : `https://example.com/stream/tv/${movieId}`;
    
    videoElement.src = videoUrl;
    document.getElementById('player-title').textContent = getMovieTitle(movieId);
    document.getElementById('player-description').textContent = getMovieDescription(movieId);
    
    videoPlayer.style.display = 'flex';
    gsap.from(videoPlayer, {
        opacity: 0,
        duration: 0.5
    });
    
    videoElement.play();
}

function closeVideoPlayer() {
    gsap.to(videoPlayer, {
        opacity: 0,
        duration: 0.3,
        onComplete: () => {
            videoPlayer.style.display = 'none';
            videoElement.pause();
            videoElement.currentTime = 0;
        }
    });
}

function togglePlay() {
    if (videoElement.paused) {
        videoElement.play();
        document.querySelector('.control-btn i').className = 'fas fa-pause';
    } else {
        videoElement.pause();
        document.querySelector('.control-btn i').className = 'fas fa-play';
    }
}

function toggleMute() {
    videoElement.muted = !videoElement.muted;
    document.querySelectorAll('.control-btn i')[1].className = videoElement.muted 
        ? 'fas fa-volume-mute' 
        : 'fas fa-volume-up';
}

function toggleFullscreen() {
    if (!document.fullscreenElement) {
        videoPlayer.requestFullscreen().catch(err => {
            console.error(`Error attempting to enable fullscreen: ${err.message}`);
        });
    } else {
        document.exitFullscreen();
    }
}

videoElement.addEventListener('timeupdate', () => {
    const progress = (videoElement.currentTime / videoElement.duration) * 100;
    progressBar.style.width = `${progress}%`;
});

// Movie Modal Functionality
const movieModal = document.getElementById('movie-modal');

async function showMovieModal(movieId, mediaType = 'movie') {
    try {
        const response = await fetch(`${BASE_URL}/${mediaType}/${movieId}?api_key=${API_KEY}`);
        const movie = await response.json();
        
        // Set modal content
        document.getElementById('modal-poster').src = IMG_URL + movie.poster_path;
        document.getElementById('modal-title').textContent = movie.title || movie.name;
        document.getElementById('modal-rating').textContent = movie.vote_average?.toFixed(1) || 'N/A';
        document.getElementById('modal-year').textContent = new Date(movie.release_date || movie.first_air_date).getFullYear() || 'N/A';
        document.getElementById('modal-duration').textContent = mediaType === 'movie' 
            ? `${Math.floor(movie.runtime / 60)}h ${movie.runtime % 60}m` 
            : `${movie.number_of_seasons} seasons`;
        document.getElementById('modal-quality').textContent = 'HD';
        document.getElementById('modal-description').textContent = movie.overview || 'No description available';
        
        // Fetch cast
        const creditsResponse = await fetch(`${BASE_URL}/${mediaType}/${movieId}/credits?api_key=${API_KEY}`);
        const credits = await creditsResponse.json();
        const castGrid = document.getElementById('cast-grid');
        castGrid.innerHTML = '';
        
        credits.cast.slice(0, 6).forEach(person => {
            const castItem = document.createElement('div');
            castItem.className = 'cast-item';
            castItem.innerHTML = `
                <img src="${person.profile_path ? IMG_URL + person.profile_path : 'https://via.placeholder.com/150'}" alt="${person.name}">
                <p>${person.name}</p>
                <small>${person.character}</small>
            `;
            castGrid.appendChild(castItem);
        });
        
        // Show modal
        movieModal.style.display = 'flex';
        gsap.from(movieModal.querySelector('.modal-content'), {
            y: 50,
            opacity: 0,
            duration: 0.5,
            ease: "power2.out"
        });
        
        // Store current movie info for buttons
        movieModal.dataset.movieId = movieId;
        movieModal.dataset.mediaType = mediaType;
    } catch (error) {
        console.error('Error fetching movie details:', error);
        showNotification('Error loading movie details. Please try again.');
    }
}

function closeMovieModal() {
    gsap.to(movieModal.querySelector('.modal-content'), {
        y: 50,
        opacity: 0,
        duration: 0.3,
        onComplete: () => {
            movieModal.style.display = 'none';
        }
    });
}

function playMovieFromModal() {
    const movieId = movieModal.dataset.movieId;
    const mediaType = movieModal.dataset.mediaType;
    closeMovieModal();
    playMovie(movieId, mediaType);
}

function downloadFromModal() {
    const movieId = movieModal.dataset.movieId;
    downloadMovie(movieId);
}

function toggleFavoriteFromModal() {
    const movieId = movieModal.dataset.movieId;
    const btn = document.querySelector('.favorite-btn');
    toggleFavorite(movieId, btn);
}

// Helper functions
function getMovieTitle(movieId) {
    // In a real app, this would fetch from API or local data
    return "Movie Title";
}

function getMovieDescription(movieId) {
    // In a real app, this would fetch from API or local data
    return "Movie description will appear here";
}

// Download Movie Function
function downloadMovie(movieId) {
    // In a real app, this would initiate the download
    const url = `https://example.com/download/${movieId}`;
    console.log(`Downloading from: ${url}`);
    showNotification('Download started!');
    
    // Simulate download (for demo purposes)
    const a = document.createElement('a');
    a.href = url;
    a.target = '_blank';
    a.click();
}

// Toggle Favorite Function
function toggleFavorite(movieId, button) {
    const profile = profiles[currentProfile];
    const index = profile.favorites.indexOf(movieId);
    
    if (index === -1) {
        profile.favorites.push(movieId);
        button.classList.add('active');
        showNotification('Added to your list');
    } else {
        profile.favorites.splice(index, 1);
        button.classList.remove('active');
        showNotification('Removed from your list');
    }
    
    // Update localStorage
    localStorage.setItem('auctusProfiles', JSON.stringify(profiles));
    
    // Update My List section if visible
    if (document.getElementById('my-list')) {
        displayMovies(
            profile.favorites.map(id => 
                Object.values(moviesData).flat().find(movie => movie.id === id)
            ).filter(Boolean),
            'my-list'
        );
    }
}

// Enhanced Profile System
let currentProfile = 'Profile 1';
const profiles = {
    'Profile 1': {
        id: 'profile1',
        name: 'Profile 1',
        avatar: 'https://ui-avatars.com/api/?name=Profile+1&background=ff0000&color=fff',
        preferences: {
            theme: 'dark',
            language: 'english',
            autoPlay: true,
            maturityLevel: 'PG-13'
        },
        watchlist: [],
        favorites: [1, 3, 6],
        recentlyWatched: []
    },
    'Profile 2': {
        id: 'profile2',
        name: 'Profile 2',
        avatar: 'https://ui-avatars.com/api/?name=Profile+2&background=0092E4&color=fff',
        preferences: {
            theme: 'dark',
            language: 'hindi',
            autoPlay: false,
            maturityLevel: 'PG'
        },
        watchlist: [],
        favorites: [2, 4],
        recentlyWatched: []
    },
    'Kids': {
        id: 'profile3',
        name: 'Kids',
        avatar: 'https://ui-avatars.com/api/?name=Kids&background=00ff00&color=fff',
        preferences: {
            theme: 'light',
            language: 'english',
            autoPlay: true,
            maturityLevel: 'G'
        },
        watchlist: [],
        favorites: [5, 8],
        recentlyWatched: []
    }
};

const avatarOptions = [
    'https://ui-avatars.com/api/?name=User&background=random',
    'https://ui-avatars.com/api/?name=Profile&background=ff0000',
    'https://ui-avatars.com/api/?name=Movie&background=0092E4',
    'https://ui-avatars.com/api/?name=Fan&background=00ff00',
    'https://ui-avatars.com/api/?name=Family&background=ff00ff',
    'https://ui-avatars.com/api/?name=Kids&background=ffff00',
    'https://ui-avatars.com/api/?name=Adult&background=00ffff',
    'https://ui-avatars.com/api/?name=VIP&background=ff7700'
];

// Initialize profiles 11111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
function initProfiles() {
    renderProfileMenu();
    switchProfile(currentProfile);
    
    // Load profiles from localStorage if available
    const savedProfiles = localStorage.getItem('auctusProfiles');
    if (savedProfiles) {
        Object.assign(profiles, JSON.parse(savedProfiles));
        renderProfileMenu();
    }
}

// Render profile menu
function renderProfileMenu() {
    const profileList = document.querySelector('.profile-list');
    profileList.innerHTML = '';
    
    Object.values(profiles).forEach(profile => {
        const profileItem = document.createElement('li');
        profileItem.className = `profile-item ${currentProfile === profile.name ? 'active-profile' : ''}`;
        profileItem.innerHTML = `
            <img src="${profile.avatar}" alt="${profile.name}">
            <div class="profile-info">
                <div class="profile-name">${profile.name}</div>
                <div class="profile-status">${profile.preferences.language.toUpperCase()} • ${profile.preferences.maturityLevel}</div>
            </div>
        `;
        profileItem.onclick = (e) => {
            e.stopPropagation();
            switchProfile(profile.name);
        };
        profileList.appendChild(profileItem);
    });
}

// Show profile menu with animation
function showProfileMenu(e) {
    e.stopPropagation();
    const profileMenu = document.getElementById('profile-menu');
    
    if (profileMenu.style.display === 'block') {
        gsap.to(profileMenu, {
            scale: 0.9,
            opacity: 0,
            duration: 0.2,
            onComplete: () => {
                profileMenu.style.display = 'none';
            }
        });
    } else {
        profileMenu.style.display = 'block';
        gsap.from(profileMenu, {
            scale: 0.9,
            opacity: 0,
            duration: 0.3,
            ease: "back.out(1.7)"
        });
        
        // Close when clicking outside
        setTimeout(() => {
            document.addEventListener('click', closeProfileMenuOnClickOutside);
        }, 10);
    }
}

function closeProfileMenuOnClickOutside(e) {
    const profileMenu = document.getElementById('profile-menu');
    const profileIcon = document.querySelector('.profile-icon');
    
    if (!profileMenu.contains(e.target) && !profileIcon.contains(e.target)) {
        gsap.to(profileMenu, {
            scale: 0.9,
            opacity: 0,
            duration: 0.2,
            onComplete: () => {
                profileMenu.style.display = 'none';
            }
        });
        document.removeEventListener('click', closeProfileMenuOnClickOutside);
    }
}

// Switch profiles with enhanced animation
function switchProfile(profileName) {
    if (!profiles[profileName]) return;
    
    // Animation: shrink current profile icon
    gsap.to('.profile-icon img', {
        scale: 0.8,
        duration: 0.2,
        onComplete: () => {
            currentProfile = profileName;
            const profile = profiles[profileName];
            
            // Update profile icon
            document.querySelector('.profile-icon img').src = profile.avatar;
            
            // Animation: grow new profile icon
            gsap.to('.profile-icon img', {
                scale: 1,
                duration: 0.3,
                ease: "back.out(1.7)"
            });
            
            // Apply profile preferences
            applyProfilePreferences(profile);
            
            // Update profile menu
            renderProfileMenu();
            
            // Show notification with animation
            showNotification(`Switched to ${profileName}`, profile.avatar);
            
            // Load profile-specific data
            loadProfileData(profile);
        }
    });
}

function applyProfilePreferences(profile) {
    // Theme
    if (profile.preferences.theme === 'light') {
        document.body.classList.add('light-theme');
    } else {
        document.body.classList.remove('light-theme');
    }
    
    // Language - would be implemented in a real app
    console.log(`Language set to: ${profile.preferences.language}`);
    
    // Maturity level - would filter content in a real app
    console.log(`Maturity level set to: ${profile.preferences.maturityLevel}`);
}

function loadProfileData(profile) {
    console.log(`Loading data for ${profile.name}`);
    // Update UI with profile-specific data
    updateMyList(profile.favorites);
    
    // In a real app, this would also update:
    // updateWatchlist(profile.watchlist);
    // updateRecentlyWatched(profile.recentlyWatched);
}

function updateMyList(favorites) {
    if (document.getElementById('my-list')) {
        displayMovies(
            favorites.map(id => 
                Object.values(moviesData).flat().find(movie => movie.id === id)
            ).filter(Boolean),
            'my-list'
        );
    }
}

// Add new profile
function addProfile() {
    // Create modal
    const modal = document.createElement('div');
    modal.className = 'profile-modal';
    modal.innerHTML = `
        <div class="profile-modal-content">
            <h2>Create New Profile</h2>
            <div class="profile-avatar-selector">
                ${avatarOptions.map((avatar, index) => `
                    <img src="${avatar}" class="profile-avatar ${index === 0 ? 'selected' : ''}" 
                         onclick="selectAvatar(this)" data-index="${index}">
                `).join('')}
            </div>
            <div class="profile-form">
                <input type="text" id="profile-name" placeholder="Profile name" maxlength="15">
                <div class="profile-settings">
                    <div class="setting-group">
                        <label>Theme</label>
                        <select id="profile-theme">
                            <option value="dark">Dark</option>
                            <option value="light">Light</option>
                        </select>
                    </div>
                    <div class="setting-group">
                        <label>Language</label>
                        <select id="profile-language">
                            <option value="english">English</option>
                            <option value="hindi">Hindi</option>
                            <option value="gujarati">Gujarati</option>
                        </select>
                    </div>
                    <div class="setting-group">
                        <label>Maturity Level</label>
                        <select id="profile-maturity">
                            <option value="G">G - All Ages</option>
                            <option value="PG">PG - Parental Guidance</option>
                            <option value="PG-13" selected>PG-13 - Teens and Above</option>
                            <option value="R">R - Restricted</option>
                        </select>
                    </div>
                </div>
                <div class="profile-form-actions">
                    <button class="cancel-btn" onclick="closeModal()">Cancel</button>
                    <button class="save-btn" onclick="saveProfile()">Save</button>
                </div>
            </div>
        </div>
    `;
    document.body.appendChild(modal);
    
    // Show modal with animation
    setTimeout(() => {
        modal.classList.add('active');
    }, 10);
    
    // Focus on name input
    setTimeout(() => {
        document.getElementById('profile-name').focus();
    }, 300);
}

function selectAvatar(element) {
    document.querySelectorAll('.profile-avatar').forEach(avatar => {
        avatar.classList.remove('selected');
    });
    element.classList.add('selected');
}

function closeModal() {
    const modal = document.querySelector('.profile-modal');
    gsap.to(modal, {
        opacity: 0,
        duration: 0.3,
        onComplete: () => {
            modal.remove();
        }
    });
}

function saveProfile() {
    const nameInput = document.getElementById('profile-name');
    const profileName = nameInput.value.trim();
    const selectedAvatar = document.querySelector('.profile-avatar.selected').src;
    const theme = document.getElementById('profile-theme').value;
    const language = document.getElementById('profile-language').value;
    const maturityLevel = document.getElementById('profile-maturity').value;
    
    if (!profileName) {
        showNotification('Please enter a profile name');
        nameInput.focus();
        return;
    }
    
    if (profiles[profileName]) {
        showNotification('Profile name already exists');
        nameInput.focus();
        return;
    }
    
    // Create new profile
    const profileId = 'profile' + (Object.keys(profiles).length + 1);
    profiles[profileName] = {
        id: profileId,
        name: profileName,
        avatar: selectedAvatar,
        preferences: {
            theme: theme,
            language: language,
            autoPlay: true,
            maturityLevel: maturityLevel
        },
        watchlist: [],
        favorites: [],
        recentlyWatched: []
    };
    
    // Save to localStorage
    localStorage.setItem('auctusProfiles', JSON.stringify(profiles));
    
    // Close modal
    closeModal();
    
    // Switch to new profile
    switchProfile(profileName);
    
    // Show success notification
    showNotification(`Profile "${profileName}" created successfully`);
}

// Edit profile
function editProfile() {
    const profile = profiles[currentProfile];
    const modal = document.createElement('div');
    modal.className = 'profile-modal';
    modal.innerHTML = `
        <div class="profile-modal-content">
            <h2>Edit Profile</h2>
            <div class="profile-avatar-selector">
                ${avatarOptions.map((avatar, index) => `
                    <img src="${avatar}" class="profile-avatar ${avatar === profile.avatar ? 'selected' : ''}" 
                         onclick="selectAvatar(this)" data-index="${index}">
                `).join('')}
            </div>
            <div class="profile-form">
                <input type="text" id="profile-name" placeholder="Profile name" value="${profile.name}" maxlength="15">
                <div class="profile-settings">
                    <div class="setting-group">
                        <label>Theme</label>
                        <select id="profile-theme">
                            <option value="dark" ${profile.preferences.theme === 'dark' ? 'selected' : ''}>Dark</option>
                            <option value="light" ${profile.preferences.theme === 'light' ? 'selected' : ''}>Light</option>
                        </select>
                    </div>
                    <div class="setting-group">
                        <label>Language</label>
                        <select id="profile-language">
                            <option value="english" ${profile.preferences.language === 'english' ? 'selected' : ''}>English</option>
                            <option value="hindi" ${profile.preferences.language === 'hindi' ? 'selected' : ''}>Hindi</option>
                            <option value="gujarati" ${profile.preferences.language === 'gujarati' ? 'selected' : ''}>Gujarati</option>
                        </select>
                    </div>
                    <div class="setting-group">
                        <label>Maturity Level</label>
                        <select id="profile-maturity">
                            <option value="G" ${profile.preferences.maturityLevel === 'G' ? 'selected' : ''}>G - All Ages</option>
                            <option value="PG" ${profile.preferences.maturityLevel === 'PG' ? 'selected' : ''}>PG - Parental Guidance</option>
                            <option value="PG-13" ${profile.preferences.maturityLevel === 'PG-13' ? 'selected' : ''}>PG-13 - Teens and Above</option>
                            <option value="R" ${profile.preferences.maturityLevel === 'R' ? 'selected' : ''}>R - Restricted</option>
                        </select>
                    </div>
                </div>
                <div class="profile-form-actions">
                    <button class="cancel-btn" onclick="closeModal()">Cancel</button>
                    <button class="delete-btn" onclick="deleteProfile()">Delete</button>
                    <button class="save-btn" onclick="updateProfile()">Save</button>
                </div>
            </div>
        </div>
    `;
    document.body.appendChild(modal);
    
    // Show modal with animation
    setTimeout(() => {
        modal.classList.add('active');
    }, 10);
    
    // Focus on name input
    setTimeout(() => {
        document.getElementById('profile-name').focus();
    }, 300);
}

function updateProfile() {
    const nameInput = document.getElementById('profile-name');
    const newName = nameInput.value.trim();
    const selectedAvatar = document.querySelector('.profile-avatar.selected').src;
    const theme = document.getElementById('profile-theme').value;
    const language = document.getElementById('profile-language').value;
    const maturityLevel = document.getElementById('profile-maturity').value;
    
    if (!newName) {
        showNotification('Please enter a profile name');
        nameInput.focus();
        return;
    }
    
    const profile = profiles[currentProfile];
    
    // If name changed, check if new name exists
    if (newName !== currentProfile && profiles[newName]) {
        showNotification('Profile name already exists');
        nameInput.focus();
        return;
    }
    
    // Update profile
    if (newName !== currentProfile) {
        profiles[newName] = {
            ...profile, 
            name: newName, 
            avatar: selectedAvatar,
            preferences: {
                theme: theme,
                language: language,
                autoPlay: profile.preferences.autoPlay,
                maturityLevel: maturityLevel
            }
        };
        delete profiles[currentProfile];
        currentProfile = newName;
    } else {
        profile.avatar = selectedAvatar;
        profile.preferences.theme = theme;
        profile.preferences.language = language;
        profile.preferences.maturityLevel = maturityLevel;
    }
    
    // Save to localStorage
    localStorage.setItem('auctusProfiles', JSON.stringify(profiles));
    
    // Close modal
    closeModal();
    
    // Update UI
    renderProfileMenu();
    document.querySelector('.profile-icon img').src = selectedAvatar;
    applyProfilePreferences(profiles[currentProfile]);
    
    // Show success notification
    showNotification(`Profile updated successfully`);
}

function deleteProfile() {
    if (Object.keys(profiles).length <= 1) {
        showNotification('You must have at least one profile');
        return;
    }
    
    if (confirm(`Are you sure you want to delete "${currentProfile}" profile?`)) {
        delete profiles[currentProfile];
        
        // Switch to another profile
        const remainingProfiles = Object.keys(profiles);
        const newProfile = remainingProfiles[0];
        switchProfile(newProfile);
        
        // Save to localStorage
        localStorage.setItem('auctusProfiles', JSON.stringify(profiles));
        
        // Close modal
        closeModal();
        
        // Show notification
        showNotification(`Profile deleted`);
    }
}

// Enhanced notification system
function showNotification(message, icon = null) {
    const notificationCount = document.querySelector('.notification-count');
    let count = parseInt(notificationCount.textContent);
    notificationCount.textContent = count + 1;
    notificationCount.style.display = 'block';
    
    // Animation for notification count
    gsap.from(notificationCount, {
        scale: 0,
        duration: 0.3,
        ease: "back.out(1.7)"
    });
    
    // Create toast
    const toast = document.createElement('div');
    toast.className = 'notification-toast';
    
    if (icon) {
        toast.innerHTML = `
            <img src="${icon}" class="notification-icon">
            <span>${message}</span>
        `;
    } else {
        toast.textContent = message;
    }
    
    document.body.appendChild(toast);
    
    // Animation for toast
    gsap.from(toast, {
        x: 100,
        opacity: 0,
        duration: 0.5,
        ease: "back.out(1.7)"
    });
    
    // Auto remove after 3 seconds
    setTimeout(() => {
        gsap.to(toast, {
            x: 100,
            opacity: 0,
            duration: 0.3,
            onComplete: () => {
                toast.remove();
                // Update notification count
                const newCount = parseInt(notificationCount.textContent) - 1;
                notificationCount.textContent = newCount > 0 ? newCount : '';
                if (newCount <= 0) {
                    notificationCount.style.display = 'none';
                }
            }
        });
    }, 3000);
}

// Toggle theme
function toggleTheme() {
    document.body.classList.toggle('light-theme');
    const currentTheme = document.body.classList.contains('light-theme') ? 'light' : 'dark';
    
    // Update current profile's theme preference
    if (profiles[currentProfile]) {
        profiles[currentProfile].preferences.theme = currentTheme;
        localStorage.setItem('auctusProfiles', JSON.stringify(profiles));
    }
    
    showNotification(`Theme set to ${currentTheme}`);
}

// Toggle notifications panel
function toggleNotifications() {
    const panel = document.getElementById('notifications-panel');
    if (!panel) {
        createNotificationsPanel();
    } else {
        panel.style.display = panel.style.display === 'block' ? 'none' : 'block';
    }
}

function createNotificationsPanel() {
    const panel = document.createElement('div');
    panel.id = 'notifications-panel';
    panel.innerHTML = `
        <div class="notifications-header">
            <h3>Notifications</h3>
            <button onclick="this.parentElement.parentElement.style.display='none'">
                <i class="fas fa-times"></i>
            </button>
        </div>
        <div class="notifications-list">
            <div class="notification-item">
                <img src="https://ui-avatars.com/api/?name=AUCTUS&background=random">
                <div class="notification-content">
                    <p>Welcome to Auctus Movies! Start exploring our collection.</p>
                    <small>Just now</small>
                </div>
            </div>
        </div>
    `;
    document.body.appendChild(panel);
    panel.style.display = 'block';
    gsap.from(panel, {
        y: 20,
        opacity: 0,
        duration: 0.3
    });
}

// Movie Data - Added manually with more details
const moviesData = {
    trending: [
        {
            id: 1,
            title: "Kale Lagan Chhe",
            poster_path: "https://m.media-amazon.com/images/M/MV5BY2RiMDcwZmUtMWRlYS00OGQ2LWEyMWMtZTQ1MDYzYTJkNGJiXkEyXkFqcGc@._V1_.jpg",
            release_date: "7 November, 2024",
            vote_average: 8.5,
            overview: "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.",
            media_type: "movie",
            runtime: 152,
            genres: ["Action", "Crime", "Drama"],
            download_url: "https://www.youtube.com/"
        },
        {
            id: 2,
            title: "Inception",
            poster_path: "/9gk7adHYeDvHkCSEqAvQNLV5Uge.jpg",
            release_date: "2010-07-16",
            vote_average: 8.4,
            overview: "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.",
            media_type: "movie",
            runtime: 148,
            genres: ["Action", "Adventure", "Sci-Fi"],
            download_url: "https://example.com/download/2"
        },
        {
            id: 3,
            title: "Interstellar",
            poster_path: "/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg",
            release_date: "2014-11-07",
            vote_average: 8.4,
            overview: "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
            media_type: "movie",
            runtime: 169,
            genres: ["Adventure", "Drama", "Sci-Fi"],
            download_url: "https://example.com/download/3"
        },
        {
            id: 4,
            title: "Pulp Fiction",
            poster_path: "/d5iIlFn5s0ImszYzBPb8JPIfbXD.jpg",
            release_date: "1994-09-10",
            vote_average: 8.5,
            overview: "The lives of two mob hitmen, a boxer, a gangster and his wife, and a pair of diner bandits intertwine in four tales of violence and redemption.",
            media_type: "movie",
            runtime: 154,
            genres: ["Crime", "Drama"],
            download_url: "https://example.com/download/4"
        },
        {
            id: 5,
            title: "The Shawshank Redemption",
            poster_path: "/q6y0Go1tsGEsmtFryDOJo3dEmqu.jpg",
            release_date: "1994-09-23",
            vote_average: 8.7,
            overview: "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.",
            media_type: "movie",
            runtime: 142,
            genres: ["Drama"],
            download_url: "https://example.com/download/5"
        }
    ],
    hindi: [
        {
            id: 6,
            title: "Dangal",
            poster_path: "/6JjfSchsU6daXk2AKX1EEgSlvQG.jpg",
            release_date: "2016-12-21",
            vote_average: 8.8,
            overview: "Former wrestler Mahavir Singh Phogat trains his daughters Geeta and Babita to become India's first world-class female wrestlers.",
            media_type: "movie",
            runtime: 161,
            genres: ["Action", "Biography", "Drama"],
            download_url: "https://example.com/download/6"
        },
        {
            id: 7,
            title: "3 Idiots",
            poster_path: "/2gvbZMtV1Zsl7FedJa5ysbpBx2G.jpg",
            release_date: "2009-12-25",
            vote_average: 8.4,
            overview: "Two friends are searching for their long lost companion. They revisit their college days and recall the memories of their friend who inspired them to think differently.",
            media_type: "movie",
            runtime: 170,
            genres: ["Comedy", "Drama"],
            download_url: "https://example.com/download/7"
        },
        {
            id: 10,
            title: "Lagaan",
            poster_path: "/1M91Bt3oGspda75H9eLqYZkJGCR.jpg",
            release_date: "2001-06-15",
            vote_average: 8.0,
            overview: "The people of a small village in Victorian India stake their future on a game of cricket against their ruthless British rulers.",
            media_type: "movie",
            runtime: 224,
            genres: ["Drama", "Musical", "Sport"],
            download_url: "https://example.com/download/10"
        }
    ],
    gujarati: [
        {
            id: 8,
            title: "Chhello Divas",
            poster_path: "/y2Jq1FM0SeHGsVfXJgYQ5QYQJlP.jpg",
            release_date: "2015-10-02",
            vote_average: 8.1,
            overview: "A coming-of-age comedy film about a group of college friends and their hilarious misadventures.",
            media_type: "movie",
            runtime: 135,
            genres: ["Comedy", "Drama"],
            download_url: "https://example.com/download/8"
        },
        {
            id: 9,
            title: "Gujjubhai the Great",
            poster_path: "/lYqK9akLkqF4QoKXbG4X4V5q5qK.jpg",
            release_date: "2015-08-28",
            vote_average: 7.8,
            overview: "A comedy film about a middle-aged man who gets caught up in hilarious situations when he tries to help his nephew with his love life.",
            media_type: "movie",
            runtime: 125,
            genres: ["Comedy", "Drama"],
            download_url: "https://example.com/download/9"
        }
    ],
    recommended: [
        {
            id: 11,
            title: "The Godfather",
            poster_path: "/3bhkrj58Vtu7enYsRolD1fZdja1.jpg",
            release_date: "1972-03-14",
            vote_average: 8.7,
            overview: "The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.",
            media_type: "movie",
            runtime: 175,
            genres: ["Crime", "Drama"],
            download_url: "https://example.com/download/11"
        },
        {
            id: 12,
            title: "The Lord of the Rings: The Fellowship of the Ring",
            poster_path: "/6oom5QYQ2yQTMJIbnvbkBL9cHo6.jpg",
            release_date: "2001-12-19",
            vote_average: 8.4,
            overview: "A meek Hobbit from the Shire and eight companions set out on a journey to destroy the powerful One Ring and save Middle-earth from the Dark Lord Sauron.",
            media_type: "movie",
            runtime: 178,
            genres: ["Adventure", "Fantasy", "Action"],
            download_url: "https://example.com/download/12"
        }
    ]
};

// Filter movies by category
function filterMovies(category) {
    const movies = moviesData[category] || [];
    const modal = document.createElement('div');
    modal.className = 'category-modal';
    modal.innerHTML = `
        <div class="category-content">
            <div class="category-header">
                <h2>${category.charAt(0).toUpperCase() + category.slice(1)} Movies</h2>
                <button class="close-category" onclick="this.parentElement.parentElement.remove()">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div class="category-grid" id="category-grid"></div>
        </div>
    `;
    document.body.appendChild(modal);
    
    if (movies.length > 0) {
        displayMovies(movies, 'category-grid');
    } else {
        document.getElementById('category-grid').innerHTML = '<p class="no-movies">No movies found in this category</p>';
    }
    
    gsap.from(modal, {
        opacity: 0,
        y: 50,
        duration: 0.5
    });
}

// Show categories dropdown
function showCategories() {
    const dropdown = document.getElementById('categories-dropdown');
    dropdown.style.display = dropdown.style.display === 'block' ? 'none' : 'block';
    
    if (dropdown.style.display === 'block') {
        gsap.from(dropdown, {
            opacity: 0,
            y: 20,
            duration: 0.3
        });
    }
}

// Close dropdowns when clicking outside
document.addEventListener('click', function(e) {
    if (!e.target.closest('.dropdown')) {
        document.getElementById('categories-dropdown').style.display = 'none';
    }
    
    if (!e.target.closest('.search-bar')) {
        document.getElementById('suggestions').style.display = 'none';
    }
});

document.addEventListener('DOMContentLoaded', function() {
    setupSlideshow();
    
    // Header scroll effect
    window.addEventListener('scroll', function() {
        document.querySelector('header').classList.toggle('scrolled', window.scrollY > 50);
    });
    
    // Initial animations
    gsap.from('.logo', { 
        opacity: 0, 
        x: -50, 
        duration: 1,
        ease: "power2.out"
    });
    
    // Initialize profiles and movies - ONLY CALL THIS ONCE
    initProfiles();
    initMovies();
    
    gsap.from('.nav-links li', { 
        opacity: 0, 
        y: -20, 
        stagger: 0.2, 
        duration: 0.8,
        ease: "back.out(1.7)"
    });
    gsap.from('.hero-slideshow', { 
        opacity: 0, 
        scale: 0.9, 
        duration: 1.5,
        ease: "power2.out"
    });
    gsap.from('section', { 
        opacity: 0, 
        y: 50, 
        stagger: 0.3, 
        duration: 1,
        ease: "back.out(1.7)"
    });
    gsap.from('.footer-section', { 
        opacity: 0, 
        y: 30, 
        stagger: 0.2, 
        duration: 1,
        ease: "back.out(1.7)"
    });
    
    // Remove this duplicate initialization
    // initProfiles();
    // initMovies();
    
    // Add scroll animations
    gsap.utils.toArray('section').forEach(section => {
        ScrollTrigger.create({
            trigger: section,
            start: "top 80%",
            onEnter: () => {
                gsap.from(section.querySelectorAll('.movie-card'), {
                    opacity: 0,
                    y: 50,
                    stagger: 0.1,
                    duration: 0.8,
                    ease: "back.out(1.7)"
                });
            }
        });
    });
});
    

    // Add scroll animations
    gsap.utils.toArray('section').forEach(section => {
        ScrollTrigger.create({
            trigger: section,
            start: "top 80%",
            onEnter: () => {
                gsap.from(section.querySelectorAll('.movie-card'), {
                    opacity: 0,
                    y: 50,
                    stagger: 0.1,
                    duration: 0.8,
                    ease: "back.out(1.7)"
                });
            }
        });
    });


// Add this API integration code near the top of your script.js file, after the constants
const fetchLowestRatedMovies = async () => {
    try {
        const response = await fetch('https://imdb236.p.rapidapi.com/imdb/lowest-rated-movies', {
            method: 'GET',
            headers: {
                'x-rapidapi-key': 'edf338572bmsh25d146b9010945ap14297djsn2a4addf7b1f4',
                'x-rapidapi-host': 'imdb236.p.rapidapi.com'
            }
        });
        
        if (!response.ok) {
            throw new Error('Failed to fetch lowest rated movies');
        }
        
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching lowest rated movies:', error);
        return null;
    }
};

// Add this function to display the lowest rated movies
async function displayLowestRatedMovies() {
    const lowestRated = await fetchLowestRatedMovies();
    if (lowestRated && lowestRated.length > 0) {
        // Format the data to match your existing movie structure
        const formattedMovies = lowestRated.map(movie => ({
            id: movie.id,
            title: movie.title,
            poster_path: movie.image || '/placeholder.jpg', // Use a placeholder if no image
            vote_average: movie.rating || 1, // Default to 1 if no rating
            overview: movie.description || 'No description available',
            media_type: 'movie',
            release_date: movie.year ? `${movie.year}-01-01` : '2023-01-01' // Default date if no year
        }));
        
        // Create a new section for lowest rated movies
        const lowestRatedSection = document.createElement('section');
        lowestRatedSection.className = 'lowest-rated container';
        lowestRatedSection.innerHTML = `
            <div class="section-header">
                <h2><i class="fas fa-thumbs-down"></i> Lowest Rated Movies</h2>
                <button class="see-all" onclick="showAllMovies('lowest-rated')">See All</button>
            </div>
            <div id="lowest-rated" class="movie-grid" role="list"></div>
        `;
        
        // Insert the new section before the footer
        const main = document.querySelector('main');
        main.appendChild(lowestRatedSection);
        
        // Display the movies
        displayMovies(formattedMovies.slice(0, 5), 'lowest-rated');
        
        // Add to moviesData object for filtering
        moviesData['lowest-rated'] = formattedMovies;
    }
}

function initMovies() {
    // Display movies from local data
    displayMovies(moviesData.trending, 'downloads');
    displayMovies(moviesData.hindi.slice(0, 5), 'hindi');
    displayMovies(moviesData.gujarati.slice(0, 5), 'gujarati');
    
    // Initialize "My List" with profile favorites
    if (profiles[currentProfile] && profiles[currentProfile].favorites.length > 0) {
        displayMovies(
            profiles[currentProfile].favorites.map(id => 
                Object.values(moviesData).flat().find(movie => movie.id === id)
            ).filter(Boolean),
            'my-list'
        );
    } else {
        const myListElement = document.getElementById('my-list');
        if (myListElement) {
            myListElement.innerHTML = '<p class="no-movies">Your list is empty. Add movies to watch later.</p>';
        }
    }
}
try {
    // Add your code logic here
    displayLowestRatedMovies();
} catch (error) {
    console.error('Error initializing movies:', error);
}
    // Add lowest rated movies if needed
    // displayLowestRatedMovies();

    
    // Add lowest rated movies
    displayLowestRatedMovies();

// Initialize profiles
initProfiles();
// Initialize movies


