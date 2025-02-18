const movies = [
    {
        title: 'Sky Force 4K',
        description: 'India and Pakistan engage in airstrike warfare. The conflict escalates, risking severe consequences. A group of individuals seeks the truth behind the war amid rising tensions.',
        downloadUrl: 'https://vidtube.one/d/u936cpl37x2y_h',
    },
    {
        title: 'Chhaava SD',
        description: 'Chhaava is a 2025 Indian Hindi-language historical action film based on the life of Chatrapati Sambhaji Maharaj, the second ruler of the Maratha Confederacy, played by Vicky Kaushal. It is an adaptation of the Marathi novel Chhava by Shivaji Sawant.',
        downloadUrl: 'https://hubcloud.ink/drive/11n7jmw7mnq9xam',
    },
    // Add more movies here
];

const features = [
    {
        title: 'Chhaava SD',
        description: 'Chhaava is a 2025 Indian Hindi-language historical action film based on the life of Chatrapati Sambhaji Maharaj, the second ruler of the Maratha Confederacy, played by Vicky Kaushal. It is an adaptation of the Marathi novel Chhava by Shivaji Sawant.',
        downloadUrl: 'https://hubcloud.ink/drive/11n7jmw7mnq9xam',
    },
    {
        title: 'Kill 4K',
        description: 'A train to New Delhi becomes a combat battleground as a pair of commandos faces off against an army of invading bandits.',
        downloadUrl: 'https://fs-01.hubcdn.xyz/Kill.2024.2160p.iT.WEB-DL.DDP5.1.Atmos.H.265-SkymoviesHD.mkv',
    },
    {
        title: 'Munjya 4K',
        description: 'A young mans visit to his native village unveils a family secret and a vengeful spirit, the Munjya, who wants to get married. Now the young man must fight to protect himself and his love from Munjya',
        downloadUrl: 'https://pub-04c8251937854358a8cf74fabe307f38.r2.dev/Munjya.2024.2160p.HEVC.WeB-DL.ATMOS.DDP5.1.x265.ESub-SkymoviesHD.mkv'
    },
    {
        title: 'Chandu Champion 4K',
        description: 'Murlikant Petkars unwavering zeal and never-say-die attitude helped India win its first individual gold medal at the Paralympic Games in 1972.',
        downloadUrl: 'https://fs-08.hubcdn.xyz/Chandu.Champion.2024.2160p.AMZN.WEB-DL.DDP5.1.H.265-SkymoviesHD.mkv',
    },
    {
        title: 'Bachubhai (GUJARATI) 4K',
        description: 'Bachubhai is a 2023 Gujarati comedy, film directed by Rahul Bhole and Vinit Kanojia. It stars Siddharth Randeria. Apara Mehta, and others. It is produced by Jyoti Deshpande, Sharad Patel and Shreyanshi Patel. The film is going to distributed by Panorama Studios and Music has been acquired by Times Music',
        downloadUrl: 'https://pixeldra.in/api/file/nDqLYX4S?download',
    },
];

// Combine movies and features into a single array for searching
const allItems = [...movies, ...features];

const movieGrid = document.getElementById('movies');
const featureGrid = document.getElementById('top-features');
const searchInput = document.getElementById('search-input');
const searchResults = document.getElementById('search-results');
const slideshowContainer = document.getElementById('slideshow');

// Render movies
movies.forEach(movie => {
    const movieCard = document.createElement('div');
    movieCard.classList.add('movie-card');

    movieCard.innerHTML = `
        <img src="${movie.poster}" alt="${movie.title}">
        <div class="movie-overlay"></div>
        <div class="movie-info">
            <h3>${movie.title}</h3>
            <p>${movie.description}</p>
            <a href="${movie.downloadUrl}" class="download-button" target="_blank">
                <i class="fas fa-download"></i> Download
            </a>
        </div>
    `;

    movieGrid.appendChild(movieCard);
    setTimeout(() => {
        movieCard.classList.add('show');
    }, 100);
});

// Render features with download button
features.forEach(feature => {
    const featureCard = document.createElement('div');
    featureCard.classList.add('feature-card');

    featureCard.innerHTML = `
        <img src="${feature.image}" alt="${feature.title}">
        <div class="feature-info">
            <h3>${feature.title}</h3>
            <p>${feature.description}</p>
            ${feature.downloadUrl ? `<a href="${feature.downloadUrl}" class="download-button" target="_blank">
                <i class="fas fa-download"></i> Download
            </a>` : ''}
        </div>
    `;

    featureGrid.appendChild(featureCard);
    setTimeout(() => {
        featureCard.classList.add('show');
    }, 100);
});

// Render slideshow
const slides = [
    {
        image: 'sky.jpg',
        title: 'Slide 1 Title',
        description: 'Slide 1 Description',
        buttonText: 'Watch Now'
    },
    {
        image: 'sky.jpg',
        title: 'Slide 2 Title',
        description: 'Slide 2 Description',
        buttonText: 'Watch Now'
    },
    {
        image: 'sky.jpg',
        title: 'Slide 3 Title',
        description: 'Slide 3 Description',
        buttonText: 'Watch Now'
    }
];

slides.forEach((slide, index) => {
    const slideElement = document.createElement('div');
    slideElement.classList.add('slide');
    slideElement.style.backgroundImage = `url(${slide.image})`;

    slideElement.innerHTML = `
        <div class="slide-content">
            <h2>${slide.title}</h2>
            <p>${slide.description}</p>
            <button>${slide.buttonText}</button>
        </div>
    `;

    slideshowContainer.appendChild(slideElement);
});

let currentSlide = 0;

function showSlide(index) {
    const slides = document.querySelectorAll('.slide');
    slides.forEach((slide, i) => {
        slide.style.transform = `translateX(${100 * (i - index)}%)`;
    });
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
}

setInterval(nextSlide, 5000);

// Search functionality
searchInput.addEventListener('input', (e) => {
    const query = e.target.value.toLowerCase();
    searchResults.innerHTML = '';

    if (query.length > 0) {
        const filteredItems = allItems.filter(item => 
            item.title.toLowerCase().includes(query) || 
            item.description.toLowerCase().includes(query)
        );

        if (filteredItems.length > 0) {
            filteredItems.forEach(item => {
                const resultItem = document.createElement('div');
                resultItem.innerHTML = `
                    <h3>${item.title}</h3>
                    <p>${item.description}</p>
                    ${item.downloadUrl ? `<a href="${item.downloadUrl}" target="_blank">Download</a>` : ''}
                `;
                resultItem.addEventListener('click', () => {
                    if (item.downloadUrl) {
                        window.location.href = item.downloadUrl;
                    }
                });
                searchResults.appendChild(resultItem);
            });
            searchResults.classList.add('show');
        } else {
            searchResults.classList.remove('show');
        }
    } else {
        searchResults.classList.remove('show');
    }
});

// Close search results when clicking outside
document.addEventListener('click', (e) => {
    if (!e.target.closest('.search-bar')) {
        searchResults.classList.remove('show');
    }
});