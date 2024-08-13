const API_KEY = 'fcbe3c4a58cec164ce4ee969d5cee8fa';
const BASE_URL = 'https://api.themoviedb.org/3';
const POPULAR_MOVIES_URL = `${BASE_URL}/movie/popular?api_key=${API_KEY}&language=en-US&page=1`;

async function fetchPopularMovies() {
    try {
        const response = await fetch(POPULAR_MOVIES_URL);
        const data = await response.json();
        console.log(data.results);
        displayMovies(data.results, 'popular');
    } catch (error) {
        console.error('Error fetching popular movies: ', error);
    }
}

function displayMovies(movies, sectionId) {
    const section = document.getElementById(sectionId);
    const movieRow = section.querySelector('.movie-row');

    movies.forEach(movie => {
        const movieItem = document.createElement('div');
        movieItem.classList.add('movie-item');
        movieItem.innerHTML = `<img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}">`;
        movieRow.appendChild(movieItem);
    });
}

fetchPopularMovies();