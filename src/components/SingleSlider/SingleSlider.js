import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../pages/Home/home.css";
import "./SingleSlider.css";

const SingleSlider = ({ movies, title }) => {
    const navigate = useNavigate();
    const [currentIndex, setCurrentIndex] = useState(0); 

    const handleMovieClick = (movie) => {
        navigate(`/movies/${movie.movie_id}`, { state: { movie } });
    };

    const handleNext = () => {

        if (currentIndex < Math.ceil(movies.length / 6) - 1) {
            setCurrentIndex((prevIndex) => prevIndex + 1);
        }
    };

    const handlePrev = () => {

        if (currentIndex > 0) {
            setCurrentIndex((prevIndex) => prevIndex - 1);
        }
    };

    return (
        <div className="single-slider">
            <p>{title}</p>
            <span className="slider-arrow left" onClick={handlePrev}>
                &#8592;
            </span>
            <div
                className="slider-container"
                style={{
                    transform: `translateX(-${currentIndex * (100 / 6)}%)`, // Adjusted
                }}
            >
                {movies.map((movie) => (
                    <div
                        key={movie.movie_id}
                        className="movie-box"
                        id={movie.movie_id}
                        onClick={() => handleMovieClick(movie)}
                    >
                        <img src={movie.poster_path} alt="poster" />
                        <div className="movie-info">
                            <h2>{movie.original_title}</h2>
                            <p>POPULARITY: {Math.round(parseInt(movie.popularity, 10))}</p>
                            <p>YEAR: {movie.release_date.slice(-4)}</p>
                        </div>
                    </div>
                ))}
            </div>
            <span className="slider-arrow right" onClick={handleNext}>
                &#8594;
            </span>
        </div>
    
    );
};

export default SingleSlider;
