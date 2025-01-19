import { useEffect, useState } from 'react';
import { useMovies } from '../../services/Api';
import { useNavigate, useLocation } from 'react-router-dom';
import './movies.css';
import { HandleFavourite } from '../../components/SingleProduct/SingleProduct';

const Movies = () => {
    const { movies, loading, error, loadMoreMovies } = useMovies();
    const navigate = useNavigate();
    const location = useLocation();

    const [filteredMovies, setFilteredMovies] = useState([]);
    const [favourites, setFavourites] = useState(() => {
        const users = JSON.parse(localStorage.getItem('users')) || [];
        const loggedInUser = users.find((user) => user.login);
        return loggedInUser?.favourites || [];
    });

    const handleMovieClick = (movie) => {
        navigate(`/movies/${movie.movie_id}`, { state: { movie } });
    };

    useEffect(() => {
        const searchMovies = () => {
            const searchParams = new URLSearchParams(location.search);
            const input = searchParams.get('input')?.toLowerCase() || ''; 
            if (input) {
                const filtered = movies.filter(movie =>
                    movie.original_title.toLowerCase().includes(input)
                );
                setFilteredMovies(filtered);
            } else {
                setFilteredMovies(movies); 
                
            }
        };
        searchMovies();
    }, [location.search, movies]);

    const moviesToRender = filteredMovies.length > 0 ? filteredMovies : movies;

    return (
        <div className='movie-container'>
            {loading && <div className='loading'>Loading...</div>}
            {error && <div>Error fetching movies</div>}
            {moviesToRender.map((movie, index) => (
                <div key={index} className='movie-box' id={movie.movie_id} onClick={() => handleMovieClick(movie)}>
                    <img src={movie.poster_path} alt='poster'></img>
                    <div className='movie-info'>
                        <h2>{movie.original_title}</h2>
                        <p>POPULARITY: {Math.round(parseInt(movie.popularity, 10))}</p>
                        <p>YEAR: {movie.release_date.slice(movie.release_date.length - 4)}</p>
                    </div>
                    <span
                        className={`material-symbols-outlined favourite ${
                            favourites?.some((fav) => fav.movie_id === movie.movie_id) ? 'in-favourite' : ''
                        }`}
                        onClick={(e) => {
                            e.stopPropagation(); 
                            HandleFavourite(movie, favourites || [], setFavourites);
                        }}
                    >
                        star
                    </span>
                </div>
            ))}
            <div className='load-container'>
                <span className='material-symbols-outlined load' onClick={loadMoreMovies}>
                    add
                </span>
            </div>
        </div>
    );
};

export default Movies;
