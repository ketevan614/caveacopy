import { useState, useEffect } from "react";
import { useMovies } from "../../services/Api";
import "./slider.css";

const Slider = () => {
    const { movies, loading, error } = useMovies();
    const [currentIndex, setCurrentIndex] = useState(0);

    const sliderMovies = movies.slice(0, 6);


    const handlePrev = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === 0 ? sliderMovies.length - 1 : prevIndex - 1
        );
    };


    const handleNext = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === sliderMovies.length - 1 ? 0 : prevIndex + 1
        );
    };
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) =>
                prevIndex === sliderMovies.length - 1 ? 0 : prevIndex + 1
            );
        }, 7000); 
        return () => clearInterval(interval); 
    }, [sliderMovies.length]);


    useEffect(() => {
        console.log("Current Index:", currentIndex);
    }, [currentIndex]);


    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error loading movies!</p>;
    if (!sliderMovies.length) return <p>No movies available</p>;

    const currentMovie = sliderMovies[currentIndex];

    return (
        <div className="slider-container">
            <span
                className="material-symbols-outlined backward"
                onClick={handlePrev}
            >
                arrow_back_ios
            </span>
            <div className="slider-wrapper">
                <div key={currentIndex} className="single-slider-movie">
                    <img
                        src={currentMovie.backdrop_path}
                        alt={currentMovie.original_title}
                        className="slider-image"
                    />
                    <div className="slider-movie-info">
                        <h2>
                            {currentMovie.original_title}
                           
                        </h2>
                        <p>                                ({currentMovie.release_date.slice(-4)}){" "}
                        {currentMovie.original_language.toUpperCase()}</p>
                        <button className="play-now">PLAY NOW</button>
                    </div>
                </div>
            </div>
            <span
                className="material-symbols-outlined forward"
                onClick={handleNext}
            >
                arrow_forward_ios
            </span>
        </div>
    );
};

export default Slider;
