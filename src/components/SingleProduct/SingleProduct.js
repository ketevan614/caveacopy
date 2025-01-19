import { useLocation } from 'react-router-dom';
import { useState } from 'react';
import './SingleProduct.css';

const SingleProduct = () => {
    const location = useLocation();
    const [movie, setMovie] = useState(location.state?.movie);
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const loggedInUser = users.find((el) => el.login);
    const [favourites, setFavourites] = useState(
        loggedInUser ? loggedInUser.favourites : []
    );
    const [isFavourite, setIsFavourite] = useState(() =>
        favourites.some((el) => el.movie_id === movie?.movie_id)
    );

    if (!movie) return <div className="loading">Loading...</div>;

    const handleFavouriteClick = () => {
        HandleFavourite(movie, favourites, setFavourites);
        setIsFavourite(!isFavourite);
    };

    return (
        <div className="single-movie-container">
            <div className="backdrop-container">
                <img src={movie.backdrop_path} alt="Backdrop" />
            </div>
            <div className="movie-details">
                <img src={movie.poster_path} alt="Poster" />
                <div className="single-movie-info">
                    <span
                        className={`material-symbols-outlined favourite ${
                            isFavourite ? 'in-favourite' : ''
                        }`}
                        onClick={handleFavouriteClick}
                    >
                        star
                    </span>
                    <h2>
                        {movie.original_title}{' '}
                        <span>
                            ({movie.release_date.slice(movie.release_date.length - 4)}){' '}
                            {movie.original_language.toUpperCase()}
                        </span>
                    </h2>
                    <p className="overview">{movie.overview}</p>
                </div>
            </div>
        </div>
    );
};
export const HandleFavourite = (movie, favourites = [], setFavourites) => {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const loggedInUser = users.find((user) => user.login);
    let fav = loggedInUser
    if (!loggedInUser) {
        alert("You need to log in to add favourites.");
        return;
    }

    const isFavourite =  favourites.some((fav) => fav.movie_id === movie.movie_id) ;
    let updatedFavourites;

    if (isFavourite) {
        updatedFavourites = favourites.filter((fav) => fav.movie_id !== movie.movie_id);
    } else {
        updatedFavourites = [...favourites, movie];
    }

    loggedInUser.favourites = updatedFavourites;
    setFavourites(updatedFavourites);

    
    localStorage.setItem('users', JSON.stringify(users));
};


export default SingleProduct;
