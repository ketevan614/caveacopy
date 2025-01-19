import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './favourites.css';

const Favourites = () => {
    let users = JSON.parse(localStorage.getItem('users')) || [];
    let logedIn = users.find(el => el.login);
    const [favourites, setFavourites] = useState(() => {
        return logedIn ? logedIn.favourites : []
    });
    const navigate = useNavigate();
    useEffect(() => {
        const storedFavourites = logedIn? logedIn.favourites : [];
        setFavourites(storedFavourites);
    }, []);

    const removeFavourite = (movieId) => {
       
        const updatedFavourites = favourites.filter((movie) => movie.movie_id !== movieId);
    
        
        setFavourites(updatedFavourites);
    
        
        if (logedIn) {
            const updatedUsers = users.map((user) =>
                user.login === logedIn.login ? { ...user, favourites: updatedFavourites } : user
            );
    
           
            localStorage.setItem('users', JSON.stringify(updatedUsers));
        }
    };
    
    const handleMovieClick = (movie) => {
        navigate(`/movies/${movie.movie_id}`, { state: { movie } });
    };
    return (

        <div className="favourites-container">
            {logedIn !== null ? (
                favourites.map((movie) => (
                    <div className="favourite-movie" key={movie.movie_id} onClick={() => handleMovieClick(movie)}>
                        <img src={movie.poster_path} alt={movie.original_title} />
                        <div className="fav-movie-info">
                            <p>{movie.original_title}</p>
                            <p>IMDB: {movie.vote_average}</p>
                        </div>
                        <span
                            className="material-symbols-outlined favourite"
                            onClick={(e) => {e.stopPropagation(); removeFavourite(movie.movie_id)}}
                            
                        >
                            delete
                        </span>
                    </div>
                ))
            ) : (
                <>
                    <p className='empty'>No favourites added yet!</p>
                    <img src='../not-found.png'></img>
                </>
            )}
        </div>
    );
};

export default Favourites;
