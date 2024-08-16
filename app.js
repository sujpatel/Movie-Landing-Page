const API_KEY = 'fcbe3c4a58cec164ce4ee969d5cee8fa';
const BASE_URL = 'https://api.themoviedb.org/3';
const POPULAR_MOVIES_URL = `${BASE_URL}/movie/popular?api_key=${API_KEY}&language=en-US&page=1`;
const UPCOMING_MOVIES_URL = `${BASE_URL}/movie/upcoming?api_key=${API_KEY}&language=en-US&page=1`;
const TOP_MOVIES_URL = `${BASE_URL}/movie/top_rated?api_key=${API_KEY}&language=en-US&page=1`;
const PLAYING_MOVIES_URL = `${BASE_URL}/movie/now_playing?api_key=${API_KEY}&language=en-US&page=1`;

async function fetchMovies(url, sectionId) {
    try {
        const response = await fetch(url);
        const data = await response.json();
        displayMovies(data.results, sectionId);
    } catch (error) {
        console.error(`Error fetching movies for ${sectionId}: `, error);
    }
}

function displayMovies(movies, sectionId) {
    const section = document.getElementById(sectionId);
    const movieRow = section.querySelector('.movie-row');

    movies.forEach(movie => {
        const movieItem = document.createElement('div');
        movieItem.classList.add('movie-item');
        movieItem.setAttribute('data-id', movie.id);
        movieItem.innerHTML = `<img src="https://image.tmdb.org/t/p/w200${movie.poster_path}" alt="${movie.title}">`;
        movieRow.appendChild(movieItem);
    });

    addMovieClickListener();
}

function addMovieClickListener() {
    document.querySelectorAll('.movie-item').forEach(item => {
        item.addEventListener('click', function () {
            const movieId = this.getAttribute('data-id');
            fetchMovieDetails(movieId);
        });
    });
}

async function fetchMovieDetails(movieId) {
    const MOVIE_DETAILS_URL = `${BASE_URL}/movie/${movieId}?api_key=${API_KEY}&language=en-US`;
    try {
        const response = await fetch(MOVIE_DETAILS_URL);
        const movie = await response.json();
        displayMovieDetails(movie);
    } catch (error) {
        console.error('Error fetching movie details: ', error);
    }
}

function displayMovieDetails(movie) {
    const detailsSection = document.getElementById('movie-details');
    const overlay = document.getElementById('overlay');
    detailsSection.innerHTML = `
    <span class="close-btn" style="cursor:pointer; float:right; font-size: 1.5rem;">&times;</span>
    <h2>${movie.title}</h2>
    <p>${movie.overview}</p>
    <img src="https://image.tmdb.org/t/p/w200${movie.poster_path}" alt="${movie.title}">
    <p>Release Date: ${movie.release_date}</p>
    <p>Rating: ${movie.vote_average}</p>
    <div class = "movie-links">
    <a href="https://www.youtube.com/results?search_query=${movie.title}+trailer" target="_blank">Watch Trailer</a>
    <a href="#" class="watch-link">Watch Movie</a>
    </div>`
    detailsSection.style.display = 'block';
    overlay.style.display = 'block';

    document.querySelector('.close-btn').addEventListener('click', function () {
        detailsSection.style.display = 'none';
        overlay.style.display = 'none';
    });

}


fetchMovies(POPULAR_MOVIES_URL, 'popular');
fetchMovies(UPCOMING_MOVIES_URL, 'upcoming');
fetchMovies(TOP_MOVIES_URL, 'top_rated');
fetchMovies(PLAYING_MOVIES_URL, 'now_playing');

