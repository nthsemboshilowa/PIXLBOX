// TMDB API Configuration
const API_KEY = 'bee2e199532755eba2c0424e6c805c5f'; // Replace with your actual TMDB API key
const BASE_URL = 'https://api.themoviedb.org/3';
const IMG_BASE_URL = 'https://image.tmdb.org/t/p/w500';

// DOM Elements
const filmGrid = document.getElementById('filmGrid');
const searchInput = document.getElementById('searchInput');

// Initialize with trending movies when page loads
document.addEventListener('DOMContentLoaded', function () {
    fetchTrendingMovies();
});

// -------------------------------
// Fetching Movie Categories
// -------------------------------

// Fetch trending movies
async function fetchTrendingMovies() {
    try {
        showLoadingState();
        const response = await fetch(`${BASE_URL}/trending/movie/week?api_key=${API_KEY}`);
        if (!response.ok) throw new Error('Failed to fetch trending movies');
        const data = await response.json();
        displayMovies(data.results);
        setActiveFilter('TRENDING');
    } catch (error) {
        console.error('Error fetching trending movies:', error);
        showErrorState('Failed to load trending movies');
    }
}

// Fetch popular movies
async function fetchPopularMovies() {
    try {
        showLoadingState();
        const response = await fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}`);
        if (!response.ok) throw new Error('Failed to fetch popular movies');
        const data = await response.json();
        displayMovies(data.results);
        setActiveFilter('POPULAR');
    } catch (error) {
        console.error('Error fetching popular movies:', error);
        showErrorState('Failed to load popular movies');
    }
}

// Fetch now playing movies
async function fetchNowPlayingMovies() {
    try {
        showLoadingState();
        const response = await fetch(`${BASE_URL}/movie/now_playing?api_key=${API_KEY}`);
        if (!response.ok) throw new Error('Failed to fetch now playing movies');
        const data = await response.json();
        displayMovies(data.results);
        setActiveFilter('NOW PLAYING');
    } catch (error) {
        console.error('Error fetching now playing movies:', error);
        showErrorState('Failed to load now playing movies');
    }
}

// Fetch top rated movies
async function fetchTopRatedMovies() {
    try {
        showLoadingState();
        const response = await fetch(`${BASE_URL}/movie/top_rated?api_key=${API_KEY}`);
        if (!response.ok) throw new Error('Failed to fetch top rated movies');
        const data = await response.json();
        displayMovies(data.results);
        setActiveFilter('TOP RATED');
    } catch (error) {
        console.error('Error fetching top rated movies:', error);
        showErrorState('Failed to load top rated movies');
    }
}

// -------------------------------
// Search Functionality
// -------------------------------

async function searchMovies(event) {
    if (event.key === 'Enter') {
        const query = searchInput.value.trim();

        if (query === '') {
            fetchTrendingMovies();
            return;
        }

        try {
            showLoadingState();
            const response = await fetch(
                `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}`
            );
            if (!response.ok) throw new Error('Failed to search movies');

            const data = await response.json();
            displayMovies(data.results);
            setActiveFilter(null);
        } catch (error) {
            console.error('Error searching movies:', error);
            showErrorState('Failed to search movies');
        }
    }
}

// -------------------------------
// UI Rendering
// -------------------------------

// Display movies in the grid
function displayMovies(movies) {
    if (!filmGrid) return;

    filmGrid.innerHTML = '';

    if (!movies || movies.length === 0) {
        filmGrid.innerHTML = '<p class="no-results">No movies found</p>';
        return;
    }

    movies.forEach((movie) => {
        const movieElement = createMovieElement(movie);
        filmGrid.appendChild(movieElement);
    });
}

// Create individual movie element
function createMovieElement(movie) {
    const movieDiv = document.createElement('div');
    movieDiv.className = 'movie-item';

    const posterPath = movie.poster_path
        ? `${IMG_BASE_URL}${movie.poster_path}`
        : '../img/placeholder-movie.jpg';

    movieDiv.innerHTML = `
        <img src="${posterPath}" alt="${movie.title}" class="movie-poster">
        <div class="movie-info">
            <h3 class="movie-title">${movie.title}</h3>
            <p class="movie-year">${movie.release_date ? movie.release_date.substring(0, 4) : 'TBA'}</p>
            <div class="movie-rating">⭐ ${movie.vote_average ? movie.vote_average.toFixed(1) : 'N/A'}</div>
        </div>
    `;

    movieDiv.addEventListener('click', () => {
        console.log('Selected movie:', movie.title);
    });

    return movieDiv;
}

// Set active filter button
function setActiveFilter(activeFilter) {
    document.querySelectorAll('.filter-btn').forEach((btn) => {
        btn.classList.remove('active');
    });

    if (activeFilter) {
        document.querySelectorAll('.filter-btn').forEach((btn) => {
            if (btn.textContent === activeFilter) {
                btn.classList.add('active');
            }
        });
    }
}

// -------------------------------
// UI States
// -------------------------------

function showLoadingState() {
    if (filmGrid) {
        filmGrid.innerHTML = '<div class="loading">Loading movies...</div>';
    }
}

function showErrorState(message) {
    if (filmGrid) {
        filmGrid.innerHTML = `<div class="error">${message}. Please try again later.</div>`;
    }
}

// -------------------------------
// Navigation Fix (Prevents onclick Error)
// -------------------------------

function goToFilms() {
    window.location.href = '../pages/films.html';
}

function goToGenre() {
    window.location.href = '../pages/genre.html';
}

function goToWatchlist() {
    window.location.href = '../pages/watchlist.html';
}

function goToFavourites() {
    window.location.href = '../pages/favourites.html';
}
